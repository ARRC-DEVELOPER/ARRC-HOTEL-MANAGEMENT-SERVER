const express = require("express");
const router = express.Router();
const salesSummaryController = require("../controllers/salesSummaryStatsController.js");
const { isAuthenticated } = require("../middlewares/auth.js");

router.get(
  "/monthly-summary",
  isAuthenticated,
  salesSummaryController.monthlySummary
);

router.get(
  "/yearly-summary",
  isAuthenticated,
  salesSummaryController.getYearlySalesSummary
);

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
