const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Test connection
app.get("/api/test-connection", async (req, res) => {
  console.log("Attempting MongoDB connection...");
  try {
    console.log("URI:", uri.replace(/:[^:@]+@/, ":****@")); // Hide password in logs
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("budget-buddy");
    console.log("Attempting ping...");
    await db.command({ ping: 1 });
    console.log("Ping successful");

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      database: "budget-buddy",
      collections: ["income", "expenses"],
    });
  } catch (error) {
    console.error("MongoDB connection error:", {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      name: error.name,
      timestamp: new Date().toISOString(),
      details: {
        code: error.code,
        codeName: error.codeName,
        connectionId: error.connectionId,
      },
    });
  } finally {
    await client.close();
  }
});

// Income endpoints
app.get("/api/income", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("budget-buddy");
    const income = await db.collection("income").find().toArray();
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.post("/api/income", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("budget-buddy");
    await db.collection("income").deleteMany({});
    await db.collection("income").insertMany(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

// Expenses endpoints
app.get("/api/expenses", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("budget-buddy");
    const expenses = await db.collection("expenses").find().toArray();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.post("/api/expenses", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("budget-buddy");
    await db.collection("expenses").deleteMany({});
    await db.collection("expenses").insertMany(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
