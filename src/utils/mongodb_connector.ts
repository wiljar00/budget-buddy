import { MongoClient, Collection } from 'mongodb';

interface MongoDBConnector {
  client: MongoClient;
  incomeCollection: Collection;
  expenseCollection: Collection;
}

const uri = import.meta.env.VITE_MONGODB_URI;
const dbName = 'budget-buddy';

export async function connectToMongoDB(): Promise<MongoDBConnector> {
  const client = new MongoClient(uri);
  await client.connect();
  
  const db = client.db(dbName);
  const incomeCollection = db.collection('income');
  const expenseCollection = db.collection('expenses');

  return {
    client,
    incomeCollection,
    expenseCollection
  };
} 