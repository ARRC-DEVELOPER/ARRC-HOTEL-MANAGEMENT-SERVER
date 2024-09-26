const MailSettings = require("../models/Email");

exports.getMailSettings = async (req, res) => {
    try {
        const mailSettings = await MailSettings.findOne({}, "-mailPassword") || []; //exclude mail password

        return res.status(201).json({
            success: true,
            message: "Mail settings fetched!",
            mailSettings
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while getting mail settings",
            error
        })
    }
}

exports.updateMailSettings = async (req, res) => {
    const { mailProtocol, mailEncryption, mailHost, mailPort, mailUsername, mailPassword } = req.body;

    try {
        let mailSettings = await MailSettings.findOne({});

        if (mailSettings) {
            mailSettings.mailProtocol = mailProtocol;
            mailSettings.mailEncryption = mailEncryption;
            mailSettings.mailHost = mailHost;
            mailSettings.mailPort = mailPort;
            mailSettings.mailUsername = mailUsername;
            if (mailPassword) {
                mailSettings.mailPassword = mailPassword;
            }

            await mailSettings.save();
            return res.status(200).json({
                success: true,
                message: 'Mail settings updated successfully',
            });
        } else {
            mailSettings = new MailSettings({
                mailProtocol,
                mailEncryption,
                mailHost,
                mailPort,
                mailUsername,
                mailPassword,
            });

            await mailSettings.save();
            return res.status(201).json({
                success: true,
                message: 'Mail settings created successfully',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating mail settings',
        });
    }
}