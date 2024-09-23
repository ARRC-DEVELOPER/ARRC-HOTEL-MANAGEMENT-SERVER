const express = require('express');
const router = express.Router();
const { upload, createEmployee, updateEmployee, getEmployees, deleteEmployee } = require('../controllers/EmployeeControlller');

// Route to get all employees
router.get('/', getEmployees);

// Route to create a new employee with image upload
router.post('/', upload.single('image'), createEmployee);

// Route to update an employee with image upload
router.put('/:id', upload.single('image'), updateEmployee);

// Route to delete an employee
router.delete('/:id', deleteEmployee);

module.exports = router;
