// app/api/transactions/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';

// Fetch all transactions (GET)
export async function GET() {
  const { db } = await connectToDatabase();
  const transactions = await db.collection('transactions').find().toArray();
  return NextResponse.json(transactions);
}

// Add a new transaction (POST)
export async function POST(req: Request) {
  const { db } = await connectToDatabase();
  const body = await req.json();

  const { description, category, date, amount } = body;

  if (!description || !category || !date || !amount) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const result = await db.collection('transactions').insertOne({
    description,
    category,
    date: new Date(date), // Ensure date is correctly parsed
    amount,
  });

  const insertedTransaction = await db.collection('transactions').findOne({ _id: result.insertedId });
  return NextResponse.json(insertedTransaction); // Return the inserted transaction
}
