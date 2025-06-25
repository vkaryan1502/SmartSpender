import express from 'express';
import { addTransaction, getTransactions } from '../controllers/transactionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, addTransaction);
router.get('/:userId', authMiddleware, getTransactions);

export default router;
