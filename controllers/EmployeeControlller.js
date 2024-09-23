const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Employee = require('../models/Employees');
const { v4: uuidv4 } = require('uuid');

// Create an S3 client instance
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Configure multer to use multer-s3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.EMPDATA_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `employees/${uuidv4()}_${file.originalname}`);
    },
    // Remove `acl` configuration
  }),
});

const createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;

    if (req.file) {
      employeeData.image = req.file.location; // URL of the uploaded image
    }

    const employee = new Employee(employeeData);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('File:', req.file);

    const { id } = req.params;
    const updateData = req.body;

    if (req.file) {
      updateData.image = req.file.location;
    }

    const employee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    console.log('Updated Employee:', employee);
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: error.message });
  }
};


const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employee.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  upload,
  createEmployee,
  updateEmployee,
  getEmployees,
  deleteEmployee,
};
