const express = require("express");
const router = express.Router();
const salesSummaryController = require("../controllers/salesSummaryStatsController.js");
const { isAuthenticated } = require("../middlewares/auth.js");

router.get(
  "/sales-summary",
  isAuthenticated,
  salesSummaryController.getSalesSummary
);

router.get(
  "/todays-saleSummary",
  isAuthenticated,
  salesSummaryController.getTodaysSummary
);

module.exports = router;
