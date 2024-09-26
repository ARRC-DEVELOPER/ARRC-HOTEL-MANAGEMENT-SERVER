const express = require("express");
const router = express.Router();
const SystemSettingController = require("../controllers/SystemSettingController");

router.get("/getSystemSettings", SystemSettingController.getSystemSettings);
router.post("/updateSystemSettings", SystemSettingController.updateSystemSettings);

module.exports = router;