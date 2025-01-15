import { MongoClient, Collection } from 'mongodb';

interface MongoDBConnector {
  client: MongoClient;
  incomeCollection: Collection;
  expenseCollection: Collection;
}

const uri = import.meta.env.VITE_MONGODB_URI;
const dbName = 'budget-buddy';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  forceServerObjectId: true,
  monitorCommands: true,
};

export async function connectToMongoDB(): Promise<MongoDBConnector> {
  const client = new MongoClient(uri, options);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const incomeCollection = db.collection('income');
    const expenseCollection = db.collection('expenses');

    return {
      client,
      incomeCollection,
      expenseCollection
    };
  } catch (error) {
    await client.close();
    throw error;
  }
} 