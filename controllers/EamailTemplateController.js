const EmailTemplate = require("../models/EmailTemplates");
const Users = require("../models/Users");

exports.getEmailTemplates = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const emailTemplates = await EmailTemplate.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await EmailTemplate.countDocuments();

    res.status(200).json({
      success: true,
      message: "Email templates fetched successfully!",
      emailTemplates,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

exports.updateEmailTemplate = async (req, res) => {
  const { name, subject, body } = req.body;

  try {
    const user = await Users.findById(req.userId);
    const template = await EmailTemplate.findById(req.params.templateId);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    template.name = name || template.name;
    template.subject = subject || template.subject;
    template.body = body || template.body;
    template.updatedAt = new Date();
    template.updatedBy = user.role;

    await template.save();
    res.status(200).json({
      success: true,
      message: "Template updated successfully",
      template,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};
