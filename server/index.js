const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Connect once at startup
let db;
async function connectDB() {
  try {
    await client.connect();
    db = client.db("budget-buddy");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
connectDB();

// Test connection
app.get("/api/test-connection", async (req, res) => {
  try {
    await db.command({ ping: 1 });
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      database: "budget-buddy",
      collections: ["income", "expenses"],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Income endpoints
app.get("/api/income", async (req, res) => {
  try {
    const income = await db.collection("income").find().toArray();
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/income", async (req, res) => {
  try {
    await db.collection("income").deleteMany({});
    await db.collection("income").insertMany(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Expenses endpoints
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await db.collection("expenses").find().toArray();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/expenses", async (req, res) => {
  try {
    await db.collection("expenses").deleteMany({});
    await db.collection("expenses").insertMany(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add test data endpoint
app.post("/api/test-data", async (req, res) => {
  try {
    // Add test income
    await db.collection("income").insertOne({
      description: "Test Salary",
      amount: 5000,
      date: new Date(),
    });

    // Add test expense
    await db.collection("expenses").insertOne({
      description: "Test Rent",
      amount: 1500,
      date: new Date(),
    });

    res.json({
      success: true,
      message: "Test data added successfully",
      details: "Added: Income ($5000) and Expense ($1500)",
    });
  } catch (error) {
    console.error("Error adding test data:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: "Failed to add test data to MongoDB",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
