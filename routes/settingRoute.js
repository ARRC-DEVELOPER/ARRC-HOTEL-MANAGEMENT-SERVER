const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/SettingController');

// Route to get settings
router.get('/settings', settingsController.getSettings);

// Route to update settings
router.post('/settings', 
  settingsController.uploadLogo,
  settingsController.uploadFavicon,
  settingsController.uploadPreloader,
  settingsController.updateSettings
);

module.exports = router;
