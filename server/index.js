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
  try {
    await client.connect();
    await client.db("budget-buddy").command({ ping: 1 });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
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
