const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const mailSettingsSchema = new mongoose.Schema({
    mailProtocol: {
        type: String,
    },
    mailEncryption: {
        type: String,
    },
    mailHost: {
        type: String,
    },
    mailPort: {
        type: Number,
    },
    mailUsername: {
        type: String,
    },
    mailPassword: {
        type: String,
    },
}, { timestamps: true });

mailSettingsSchema.pre("save", async function (next) {
    if (!this.isModified("mailPassword")) return next();
    this.mailPassword = await bcrypt.hash(this.mailPassword, 10);
    next();
});

mailSettingsSchema.methods.compareEmailPassword = async function (password) {
    return await bcrypt.compare(password, this.mailPassword);
}

module.exports = mongoose.model('MailSettings', mailSettingsSchema);
