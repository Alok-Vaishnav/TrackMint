const Expense = require('../models/Expense');

/**
 * Get expenses for authenticated user with optional month/year filtering
 * GET /api/expenses?month=&year=
 * If month/year provided, returns only expenses from that month
 * Otherwise returns all expenses
 */
exports.getExpenses = async (req, res) => {
  try {
    const { month, year } = req.query;
    let query = { userId: req.userId };

    // If month and year are provided, filter by date range
    if (month && year) {
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);

      // Validate month and year
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        return res.status(400).json({
          message: 'Month must be between 1 and 12',
        });
      }

      if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
        return res.status(400).json({
          message: 'Year must be between 2000 and 2100',
        });
      }

      const monthIndex = monthNum - 1; // Convert 1-12 to 0-11

      // Start of month (1st day at 00:00)
      const startDate = new Date(yearNum, monthIndex, 1);
      // End of month (last day at 23:59:59)
      const endDate = new Date(yearNum, monthIndex + 1, 0, 23, 59, 59);

      query.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json({ expenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create new expense
 * POST /api/expenses
 */
exports.createExpense = async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;

    // Validate input
    if (!amount || !category) {
      return res
        .status(400)
        .json({ message: 'Amount and category are required' });
    }

    // Create expense
    const expense = new Expense({
      userId: req.userId,
      amount,
      category,
      date: date ? new Date(date) : new Date(),
      note,
    });

    await expense.save();
    res.status(201).json({
      message: 'Expense created successfully',
      expense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update expense
 * PUT /api/expenses/:id
 */
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, date, note } = req.body;

    // Check if expense belongs to user
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: 'Not authorized to update this expense' });
    }

    // Update fields
    if (amount) expense.amount = amount;
    if (category) expense.category = category;
    if (date) expense.date = new Date(date);
    if (note) expense.note = note;

    await expense.save();

    res.json({
      message: 'Expense updated successfully',
      expense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete expense
 * DELETE /api/expenses/:id
 */
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: 'Not authorized to delete this expense' });
    }

    await Expense.deleteOne({ _id: id });

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get monthly insights for selected month
 * GET /api/insights/monthly?month=&year=
 * Returns: total expenses, category-wise breakdown, comparison with previous month
 */
exports.getMonthlySummary = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        message: 'Month and year parameters are required',
      });
    }

    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // Validate month and year
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return res.status(400).json({
        message: 'Month must be between 1 and 12',
      });
    }

    if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
      return res.status(400).json({
        message: 'Year must be between 2000 and 2100',
      });
    }

    const monthIndex = monthNum - 1; // Convert 1-12 to 0-11

    // Calculate date ranges for selected month
    const selectedMonthStart = new Date(yearNum, monthIndex, 1);
    const selectedMonthEnd = new Date(yearNum, monthIndex + 1, 0, 23, 59, 59);

    // Calculate date ranges for previous month
    const previousMonthStart = new Date(yearNum, monthIndex - 1, 1);
    const previousMonthEnd = new Date(yearNum, monthIndex, 0, 23, 59, 59);

    // Fetch expenses for selected month
    const selectedMonthExpenses = await Expense.find({
      userId: req.userId,
      date: {
        $gte: selectedMonthStart,
        $lte: selectedMonthEnd,
      },
    });

    // Fetch expenses for previous month
    const previousMonthExpenses = await Expense.find({
      userId: req.userId,
      date: {
        $gte: previousMonthStart,
        $lte: previousMonthEnd,
      },
    });

    // Calculate total for selected month
    const selectedTotal = selectedMonthExpenses.reduce(
      (sum, exp) => sum + exp.amount,
      0
    );

    // Calculate total for previous month
    const previousTotal = previousMonthExpenses.reduce(
      (sum, exp) => sum + exp.amount,
      0
    );

    // Build category breakdown for selected month
    const categoryBreakdown = {};
    selectedMonthExpenses.forEach((exp) => {
      categoryBreakdown[exp.category] =
        (categoryBreakdown[exp.category] || 0) + exp.amount;
    });

    // Build category breakdown for previous month
    const previousCategoryBreakdown = {};
    previousMonthExpenses.forEach((exp) => {
      previousCategoryBreakdown[exp.category] =
        (previousCategoryBreakdown[exp.category] || 0) + exp.amount;
    });

    // Generate month comparisons
    const monthComparisons = [];
    Object.keys(categoryBreakdown).forEach((category) => {
      const currentAmount = categoryBreakdown[category];
      const previousAmount = previousCategoryBreakdown[category] || 0;
      const difference = currentAmount - previousAmount;

      if (difference > 0) {
        monthComparisons.push({
          category,
          message: `You spent ₹${difference.toFixed(2)} more on ${category} compared to last month`,
          difference,
          type: 'increase',
        });
      } else if (difference < 0) {
        monthComparisons.push({
          category,
          message: `You spent ₹${Math.abs(difference).toFixed(2)} less on ${category} compared to last month`,
          difference: Math.abs(difference),
          type: 'decrease',
        });
      }
    });

    // Find highest spending category
    const highestSpendingCategory = Object.entries(categoryBreakdown).sort(
      (a, b) => b[1] - a[1]
    )[0];

    res.json({
      selectedMonth: {
        month: parseInt(month),
        year: yearNum,
        total: selectedTotal,
        categoryBreakdown,
        expenses: selectedMonthExpenses,
      },
      previousMonth: {
        total: previousTotal,
        categoryBreakdown: previousCategoryBreakdown,
      },
      highestSpendingCategory: highestSpendingCategory
        ? {
            category: highestSpendingCategory[0],
            amount: highestSpendingCategory[1],
          }
        : null,
      monthComparisons,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
