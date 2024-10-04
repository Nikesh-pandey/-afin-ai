// lib/models/Transaction.ts
import { Schema, model, models } from 'mongoose';

export interface ITransaction {
  description: string;
  category: string;
  date: Date;
  amount: string;
}

const TransactionSchema = new Schema<ITransaction>({
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: String, required: true },
});

const Transaction = models.Transaction || model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
