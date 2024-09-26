const express = require('express');
const router = express.Router();
const multer = require('multer');
const settingsController = require('../controllers/SettingController');

const upload = multer({ dest: 'uploads/' });

router.get('/getGeneralSettings', settingsController.getSettings);
router.post('/updateGeneralSettings', upload.fields([
  { name: 'logo' },
  { name: 'favicon' },
  { name: 'preloader' }
]), settingsController.updateSettings);


module.exports = router;
