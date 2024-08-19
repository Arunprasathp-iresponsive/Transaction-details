import { Request, Response, NextFunction } from 'express';
import { Transaction, ITransaction } from '../models/Transaction';
import { AppError } from '../utils/AppError';

export const getAllTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transactions: Partial<ITransaction>[] = await Transaction.find(
      { status: { $in: ['COMPLETED', 'IN PROGRESS', 'REJECTED'] } },
      { id: 1, date: 1, Comments: 1 }
    );

    res.status(200).json(transactions);
  } catch (error) {
    next(new AppError('Failed to fetch transactions', 500));
  }
};

export const updateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { Comments } = req.body;

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { id },
      { Comments },
      { new: true } 
    );

    if (!updatedTransaction) {
      return next(new AppError('Transaction not found', 404));
    }

    res.status(200).json({ ...updatedTransaction.toObject(), Comments });
  } catch (error) {
    next(new AppError('Failed to update transaction', 400));
  }
};

export const insertTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  for(let i=0; i< req.body.length; i++){
    const document = new Transaction(req.body[i]);
    const result = await document.save();
  }
  res.status(201).json({ message: 'Document inserted' });

}
