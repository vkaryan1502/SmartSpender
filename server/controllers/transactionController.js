import mongoose from 'mongoose';
import Transaction from '../models/transactionModel.js';

export const addTransaction = async (req, res) => {
  const { type, amount, category, note, date } = req.body;

  try {
    const transaction = new Transaction({
      user: req.user.userId, 
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
  try {
    const transactions = await Transaction.find({
      user: req.user.userId, 
    }).sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Get Transactions Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};


export const updateTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update transaction',
      error: error.message,
    });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete transaction',
      error: error.message,
    });
  }
};
