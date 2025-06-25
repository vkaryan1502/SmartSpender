import mongoose from 'mongoose';
import Transaction from '../models/transactionModel.js';

export const addTransaction = async (req, res) => {
  const {userId, type, amount, category, note, date } = req.body;
  
  try {
      const transaction = new Transaction({
      userId: req.user.userId, 
      type,
      amount,
      category,
      note,
      date,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    console.error('💥 Add Transaction Error:', err.message);
    res.status(500).json({ error: 'Server error while adding transaction.' });
  }
};


export const getTransactions = async (req, res) => {
  const userId = req.params.userId;

  try {
      const transactions = await Transaction.find({
      userId: new mongoose.Types.ObjectId(userId)
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Get Transactions Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};


