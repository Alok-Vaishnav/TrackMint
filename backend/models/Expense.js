const mongoose = require('mongoose');

/**
 * Expense Schema
 * - userId: reference to User document
 * - amount: expense amount in currency
 * - category: predefined categories (Food, Travel, Rent, Other)
 * - date: when the expense occurred
 * - note: optional description of expense
 * - createdAt: timestamp of expense creation
 */
const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0'],
  },
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Rent', 'Other'],
    required: [true, 'Category is required'],
    default: 'Other',
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now,
  },
  note: {
    type: String,
    maxlength: [200, 'Note cannot exceed 200 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for efficient queries
expenseSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Expense', expenseSchema);
