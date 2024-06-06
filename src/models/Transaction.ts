import mongoose, { Document, Schema } from 'mongoose';

// Define the sender sub-schema
const SenderSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  IDNumber: { type: String, required: true }
});

// Define the recipient sub-schema
const RecipientSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  accountNumber: { type: String, required: true },
  bank: { type: String, required: true }
});

// Define the main transaction schema
const TransactionSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  sender: { type: SenderSchema, required: true },
  recipient: { type: RecipientSchema, required: true },
  amount: { type: Number, required: true },
  currencyCd: { type: String, required: true },
  comments: { type: String, required: false },
  status: { type: String, required: true }
});

// Define the Transaction interface
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
  comments?: string;
  status: string;
}

// Create the model from the schema
export const Transaction = mongoose.model<ITransaction>('transactions', TransactionSchema);
