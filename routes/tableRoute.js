const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const path = require('path');

// Create S3 client using AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Set up Multer storage with AWS SDK v3
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.TABLE_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `images/${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
});

// Routes
router.get('/', tableController.getAllTables);
router.post('/', upload.single('image'), tableController.addTable);
router.put('/:id',  upload.single('image'),tableController.updateTable);
router.delete('/:id', tableController.deleteTable);

module.exports = router;
