const SystemSettings = require('../models/SystemSettings');

exports.getSystemSettings = async (req, res) => {
    try {
        const settings = await SystemSettings.findOne();

        res.status(200).json({
            success: true,
            message: "General Settings fetched successfully!",
            settings,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateSystemSettings = async (req, res) => {
    try {
        const { defaultRegion, defaultLanguage, timezone, currencyName, currencySymbol, currencyPosition } = req.body;

        let settings = await SystemSettings.findOne();

        if (settings) {
            settings.defaultRegion = defaultRegion;
            settings.defaultLanguage = defaultLanguage;
            settings.timezone = timezone;
            settings.currencyName = currencyName;
            settings.currencySymbol = currencySymbol;
            settings.currencyPosition = currencyPosition;
        } else {
            settings = new SystemSettings({
                defaultRegion,
                defaultLanguage,
                timezone,
                currencyName,
                currencySymbol,
                currencyPosition,
            });
        }

        await settings.save();
        res.status(200).json({ message: 'Settings updated successfully', settings });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};