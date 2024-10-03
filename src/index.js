const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("../config/db");

const purchaseRoutes = require("../routes/PurchaseRoutes");
const tableRoutes = require("../routes/tableRoute");
const foodItemRoutes = require("../routes/foodItem");
const foodGroupRoutes = require("../routes/FoodGroup");
const modifierRoutes = require("../routes/Modifiers");
const ingredientRoutes = require("../routes/IngredientRoutes");
const accountRoutes = require("../routes/accountRoute");
const depositRoutes = require("../routes/depositRoutes");
const transferRoutes = require("../routes/transferRoutes");
const expenseRoutes = require("../routes/expensesRoutes");
const customerRoutes = require("../routes/customerRoute");
const supplierRoutes = require("../routes/supplierRoutes");
const departmentRoutes = require("../routes/departmentRoutes");
const designationRoutes = require("../routes/designationRoutes");
const shiftRoutes = require("../routes/shiftRoutes");
const employeeRoutes = require("../routes/employeeRoute");
const holidayRoutes = require("../routes/holidayRoute");
const leaveRequestRoutes = require("../routes/leaverequestRoute");
const userRoute = require("../routes/userRoutes");
const paymentRoutes = require("../routes/paymentRoute");
const taxRateRoutes = require("../routes/taxRatesRoute");
const discountRoutes = require("../routes/discountRoute");
const chargeRoutes = require("../routes/chargesRoutes");
const companyRoutes = require("../routes/companyRoutes");
const settingsRoutes = require("../routes/settingRoute");
const systemSettingsRoutes = require("../routes/systemSettingsRoute");
const mailSettingsRoutes = require("../routes/emailRoutes");
const emailTemplateRoutes = require("../routes/emailTemplateRoutes");
const salseRoute = require("../routes/salseRoute");
const purchaseAccountRoute = require("../routes/purchaseAccountRoutes");
const payrollRoute = require("../routes/payrollRoutes");
const cartRoute = require("../routes/cartRoutes");
const orderRoute = require("../routes/orderRoutes");
const cookieParser = require("cookie-parser");

const path = require("path");

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const port = process.env.PORT || 5000;
const hostname = process.env.HOSTNAME || "localhost";

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/v1/purchase", purchaseRoutes);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/tables", tableRoutes);
app.use("/api/v1/foodItems", foodItemRoutes);
app.use("/api/v1/foodgroups", foodGroupRoutes);
app.use("/api", modifierRoutes);
app.use("/api/v1/ingredients", ingredientRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/deposits", depositRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/suppliers", supplierRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/designations", designationRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/holidays", holidayRoutes);
app.use("/api/leaverequest", leaveRequestRoutes);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/paymentmethods", paymentRoutes);
app.use("/api/v1/taxrates", taxRateRoutes);
app.use("/api/v1/discounts", discountRoutes);
app.use("/api/v1/charges", chargeRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/settings", settingsRoutes);
app.use("/api/v1/systemSettings", systemSettingsRoutes);
app.use("/api/v1/mailSettings", mailSettingsRoutes);
app.use("/api/v1/email-templates", emailTemplateRoutes);
app.use("/api/v1/salse", salseRoute);
app.use("/api/v1/purchaseAccount", purchaseAccountRoute);
app.use("/api/v1/payroll", payrollRoute);

// Catch-all route to handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
