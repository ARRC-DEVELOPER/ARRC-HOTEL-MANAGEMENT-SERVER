const Settings = require('../models/Setting');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

// AWS S3 setup
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Multer setup
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.SETTINGDATA_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, `settings/${Date.now()}${path.extname(file.originalname)}`);
    }
  })
});

// Controller methods
exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) {
      updates[req.file.fieldname] = req.file.location; // Get file URL from S3
    }

    const settings = await Settings.findOneAndUpdate({}, updates, { new: true, upsert: true });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings', error });
  }
};

// Setup multer for file uploads
exports.uploadLogo = upload.single('logo');
exports.uploadFavicon = upload.single('favicon');
exports.uploadPreloader = upload.single('preloader');
