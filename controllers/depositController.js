const Deposit = require('../models/Deposits');

// Create a new deposit
exports.createDeposit = async (req, res) => {
  try {
    const { account, depositDate, amount, note } = req.body;
    
    const deposit = new Deposit({ account, depositDate, amount, note });
    await deposit.save();

    res.status(201).json({ success: true, deposit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all deposits with optional filters
exports.getDeposits = async (req, res) => {
  try {
    const { fromDate, toDate, account, search, page = 1, pageSize = 10 } = req.query;
    
    const query = {};
    if (fromDate && toDate) {
      query.depositDate = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    }
    if (account) {
      query.account = account;
    }
    if (search) {
      query.$text = { $search: search };
    }
    
    const deposits = await Deposit.find(query)
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize))
      .exec();
    
    const totalCount = await Deposit.countDocuments(query);

    res.status(200).json({ deposits, totalCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a deposit
exports.updateDeposit = async (req, res) => {
  try {
    const { id } = req.params;
    const { account, depositDate, amount, note } = req.body;

    const deposit = await Deposit.findByIdAndUpdate(id, { account, depositDate, amount, note }, { new: true });
    
    if (!deposit) {
      return res.status(404).json({ success: false, message: 'Deposit not found' });
    }

    res.status(200).json({ success: true, deposit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a deposit
exports.deleteDeposit = async (req, res) => {
  try {
    const { id } = req.params;

    const deposit = await Deposit.findByIdAndDelete(id);
    
    if (!deposit) {
      return res.status(404).json({ success: false, message: 'Deposit not found' });
    }

    res.status(200).json({ success: true, message: 'Deposit deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
