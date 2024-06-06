import mongoose, { Document, Schema } from 'mongoose';

const SenderSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  IDNumber: { type: String, required: true }
});

const RecipientSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  accountNumber: { type: String, required: true },
  bank: { type: String, required: true }
});

const TransactionSchema: Schema = new Schema({
  id: { type: String, required: true },
  date: { type: Date, required: true },
  sender: { type: SenderSchema, required: true },
  recipient: { type: RecipientSchema, required: true },
  amount: { type: Number, required: true },
  currencyCd: { type: String, required: true },
  Comments: { type: String, required: false },
  status: { type: String, required: true }
});

export interface ITransaction extends Document {
  id: string;
  date: Date;
  sender: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    IDNumber: string;
  };
  recipient: {
    firstName: string;
    lastName: string;
    email: string;
    accountNumber: string;
    bank: string;
  };
  amount: number;
  currencyCd: string;
  Comments?: string;
  status: string;
}

export const Transaction = mongoose.model<ITransaction>('transactions', TransactionSchema);
