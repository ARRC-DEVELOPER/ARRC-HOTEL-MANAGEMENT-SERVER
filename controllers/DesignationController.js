const Designation = require('../models/Designations');

exports.getDesignations = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const query = search
    ? { title: { $regex: search, $options: 'i' } }
    : {};

  const designations = await Designation.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
  const count = await Designation.countDocuments(query);

  res.json({
    designations,
    totalItems: count
  });
};

exports.createDesignation = async (req, res) => {
  const designation = new Designation(req.body);
  await designation.save();
  res.status(201).json(designation);
};

exports.updateDesignation = async (req, res) => {
  const designation = await Designation.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(designation);
};

exports.deleteDesignation = async (req, res) => {
  await Designation.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
