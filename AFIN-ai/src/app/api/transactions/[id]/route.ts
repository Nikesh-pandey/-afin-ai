// app/api/transactions/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { ObjectId } from 'mongodb';

interface Params {
  params: {
    id: string;
  };
}

// Update a transaction (PUT)
export async function PUT(req: Request, { params }: Params) {
  const { id } = params;
  const { db } = await connectToDatabase();
  const body = await req.json();
  const { description, category, date, amount } = body;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid transaction ID' }, { status: 400 });
  }

  const result = await db.collection('transactions').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { description, category, date: new Date(date), amount } },
    { returnDocument: 'after' }
  );

  if (!result) {
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }

  if (!result.value) {
    return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
  }
  return NextResponse.json(result.value);
}

// Delete a transaction (DELETE)
export async function DELETE(req: Request, { params }: Params) {
  const { id } = params;
  const { db } = await connectToDatabase();

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid transaction ID' }, { status: 400 });
  }

  const result = await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Transaction deleted successfully' });
}
