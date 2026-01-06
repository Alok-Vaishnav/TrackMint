const express = require('express');
const expenseController = require('../controllers/expenseController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

/**
 * All expense routes are protected - require JWT token
 */

/**
 * Insights Routes - must come BEFORE generic routes to avoid conflict with :id
 */

// GET /api/expenses/insights/monthly - Get monthly insights and summary
router.get('/insights/monthly', verifyToken, expenseController.getMonthlySummary);

// GET /api/expenses - Get all expenses for user (with optional month/year filtering)
router.get('/', verifyToken, expenseController.getExpenses);

// POST /api/expenses - Create new expense
router.post('/', verifyToken, expenseController.createExpense);

// PUT /api/expenses/:id - Update expense
router.put('/:id', verifyToken, expenseController.updateExpense);

// DELETE /api/expenses/:id - Delete expense
router.delete('/:id', verifyToken, expenseController.deleteExpense);

module.exports = router;
