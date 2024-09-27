const express = require("express");
const EmailTemplateController = require("../controllers/EamailTemplateController");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth.js");

router.get("/getEmailTemplates", EmailTemplateController.getEmailTemplates);
router.put(
  "/updateEmailTemplate/:templateId",
  isAuthenticated,
  EmailTemplateController.updateEmailTemplate
);

module.exports = router;
