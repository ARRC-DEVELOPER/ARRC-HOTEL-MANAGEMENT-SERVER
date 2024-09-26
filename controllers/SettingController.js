const Settings = require('../models/Setting');
const { uploadToS3 } = require("../middlewares/singleUpload");

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    res.status(200).json({
      success: true,
      message: "General Settings fetched successfully!",
      settings,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching settings' });
  }
};

exports.updateSettings = async (req, res) => {
  const { appName, defaultCustomer, saleAccount, purchaseAccount, payrollAccount, copyright, sendInvoiceEmail } = req.body;

  let settings = await Settings.findOne();
  if (!settings) {
    settings = new Settings();
  }

  settings.appName = appName;
  settings.defaultCustomer = defaultCustomer;
  settings.saleAccount = saleAccount;
  settings.purchaseAccount = purchaseAccount;
  settings.payrollAccount = payrollAccount;
  settings.copyright = copyright;
  settings.sendInvoiceEmail = sendInvoiceEmail === 'true';

  // Upload images to S3
  if (req.files['logo']) {
    settings.logo = await uploadToS3(req.files['logo'][0], 'logo');
  }

  if (req.files['favicon']) {
    settings.favicon = await uploadToS3(req.files['favicon'][0], 'favicon');
  }

  if (req.files['preloader']) {
    settings.preloader = await uploadToS3(req.files['preloader'][0], 'preloader');
  }

  try {
    await settings.save();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Error updating settings' });
  }
};
