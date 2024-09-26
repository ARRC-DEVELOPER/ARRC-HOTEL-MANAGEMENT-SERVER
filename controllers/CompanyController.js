const Company = require('../models/Company');

exports.getCompanyDetails = async (req, res) => {
    try {
        const company = await Company.findOne();

        res.status(200).json({
            success: true,
            message: 'Company details fetched successfully!',
            company,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error,
        });
    }
};

exports.updateCompanyDetails = async (req, res) => {
    const { companyName, companyEmail, companyPhone, companyTaxNumber, companyAddress } = req.body;

    try {
        let company = await Company.findOne();

        if (!company) {
            company = new Company({
                companyName,
                companyEmail,
                companyPhone,
                companyTaxNumber,
                companyAddress,
            });
        } else {
            company.companyName = companyName;
            company.companyEmail = companyEmail;
            company.companyPhone = companyPhone;
            company.companyTaxNumber = companyTaxNumber;
            company.companyAddress = companyAddress;
        }

        await company.save();

        res.status(200).json({
            success: true,
            message: 'Company details updated successfully!',
            company,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error,
        });
    }
};