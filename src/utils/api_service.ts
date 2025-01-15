import { connectToMongoDB } from './mongodb_connector';
import { IncomeEntry, ExpenseEntry } from './storage';

export async function saveIncomeToMongo(entries: IncomeEntry[]) {
  const { client, incomeCollection } = await connectToMongoDB();
  try {
    await incomeCollection.deleteMany({});
    await incomeCollection.insertMany(entries);
  } finally {
    await client.close();
  }
}

export async function loadIncomeFromMongo(): Promise<IncomeEntry[]> {
  const { client, incomeCollection } = await connectToMongoDB();
  try {
    const entries = await incomeCollection.find().toArray();
    return entries.map(entry => ({
      description: entry.description,
      amount: entry.amount,
      date: new Date(entry.date)
    }));
  } finally {
    await client.close();
  }
}

export async function saveExpensesToMongo(entries: ExpenseEntry[]) {
  const { client, expenseCollection } = await connectToMongoDB();
  try {
    await expenseCollection.deleteMany({});
    await expenseCollection.insertMany(entries);
  } finally {
    await client.close();
  }
}

export async function loadExpensesFromMongo(): Promise<ExpenseEntry[]> {
  const { client, expenseCollection } = await connectToMongoDB();
  try {
    const entries = await expenseCollection.find().toArray();
    return entries.map(entry => ({
      description: entry.description,
      amount: entry.amount,
      date: new Date(entry.date)
    }));
  } finally {
    await client.close();
  }
}

export async function testMongoConnection() {
  const { client, incomeCollection } = await connectToMongoDB();
  try {
    // Try to insert and then delete a test document
    await incomeCollection.insertOne({
      description: "Test Entry",
      amount: 0,
      date: new Date()
    });
    await incomeCollection.deleteOne({ description: "Test Entry" });
    console.log("MongoDB connection successful!");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    return false;
  } finally {
    await client.close();
  }
} 