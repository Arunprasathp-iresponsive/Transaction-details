import { Request, Response } from 'express';
import { Transaction, ITransaction } from '../models/Transaction';

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions: Partial<ITransaction>[] = await Transaction.find(
      { status: { $in: ['COMPLETED', 'IN PROGRESS', 'REJECTED'] } },
      { id: 1, date: 1, Comments: 1 }
    );

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Comments } = req.body;

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { id }, 
      { Comments },
      { new: true } // to return the updated document
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json({ ...updatedTransaction.toObject(), Comments });
  } catch (error) {
    res.status(400).send(error);
  }
};
