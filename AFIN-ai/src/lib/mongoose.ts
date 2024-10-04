import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
  }

  const db = client.db(process.env.MONGODB_DB);
  return { db };
}
