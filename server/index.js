const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Connect once at startup
let db;
async function connectDB() {
  try {
    await client.connect();
    db = client.db("budget-buddy");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
connectDB();

// User Authentication Routes
app.post("/api/register", async (req, res) => {
  console.log("Register endpoint hit");
  console.log("Request body:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ error: "Email and password are required" });
    }

    const usersCollection = db.collection("users");

    // Check if user exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    console.log("User created successfully:", result.insertedId);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usersCollection = db.collection("users");

    // Find user
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Update last login
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    );

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error during login" });
  }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

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
app.get("/api/income", authenticateToken, async (req, res) => {
  try {
    const income = await db
      .collection("income")
      .find({ userId: new ObjectId(req.user.userId) })
      .toArray();
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: "Error fetching income" });
  }
});

app.post("/api/income", authenticateToken, async (req, res) => {
  try {
    const entries = req.body;
    const entriesWithUser = entries.map((entry) => ({
      ...entry,
      userId: new ObjectId(req.user.userId),
    }));
    await db.collection("income").insertMany(entriesWithUser);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Error saving income" });
  }
});

// Expenses endpoints
app.get("/api/expenses", authenticateToken, async (req, res) => {
  try {
    const expenses = await db
      .collection("expenses")
      .find({ userId: new ObjectId(req.user.userId) })
      .toArray();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/expenses", authenticateToken, async (req, res) => {
  try {
    const entries = req.body;
    const entriesWithUser = entries.map((entry) => ({
      ...entry,
      userId: new ObjectId(req.user.userId),
    }));
    await db.collection("expenses").insertMany(entriesWithUser);
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
