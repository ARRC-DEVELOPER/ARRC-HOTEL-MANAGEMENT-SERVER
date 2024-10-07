const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/ExpensesController");

router.get("/getExpenses", expenseController.getExpenses);
router.get("/getExpenseById/:id", expenseController.getExpenseById);
router.put("/updateExpense/:id", expenseController.updateExpense);
router.delete("/deleteExpense/:id", expenseController.deleteExpense);

module.exports = router;
