const express = require('express');
const router = express.Router();
const MailController = require("../controllers/emailController");

router.get("/getMailSettings", MailController.getMailSettings);
router.post("/updateMailSettings", MailController.updateMailSettings);

module.exports = router;