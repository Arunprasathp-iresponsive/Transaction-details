import express from 'express';
import { getAllTransactions, insertTransactions, updateTransaction } from '../controllers/transaction.controller';

const router = express.Router();

router.get('/getAll', getAllTransactions);
router.patch('/update/:id', updateTransaction);
router.post('/insertData', insertTransactions);

export default router;
