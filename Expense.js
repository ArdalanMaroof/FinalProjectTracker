const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
