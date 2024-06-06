import express, { Request, Response } from 'express';
import { Transaction, ITransaction } from '../models/Transaction'; 

const router = express.Router();

router.get('/getAll', async (req: Request, res: Response) => {
    try {
      const transactions: Partial<ITransaction>[] = await Transaction.find(
        { status: { $in: ['COMPLETED', 'IN PROGRESS', 'REJECTED'] } }, 
        { id: 1, date: 1, Comments: 1 }
      );
  
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).send(error);
    }
});

router.patch('/update/', async (req: Request, res: Response) => {
    try {
    const payload: Partial<any> = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      payload.id,
      payload,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json(updatedTransaction);
    } catch (error) {
      res.status(400).send(error);
    }
});

export default router;
