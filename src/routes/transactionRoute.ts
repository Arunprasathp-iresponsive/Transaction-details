import express from 'express';
import { getAllTransactions, updateTransaction } from '../controllers/transaction.controller';

const router = express.Router();

router.get('/getAll', getAllTransactions);
router.patch('/update/:id', updateTransaction);

export default router;
