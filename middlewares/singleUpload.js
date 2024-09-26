const AWS = require('aws-sdk');
const fs = require('fs');

// AWS S3 setup
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const uploadToS3 = async (file, folderName) => {
    const fileContent = fs.readFileSync(file.path);

    const params = {
        Bucket: process.env.SETTINGDATA_BUCKET_NAME,
        Key: `${folderName}/${Date.now()}_${file.originalname}`,
        Body: fileContent,
        ContentType: file.mimetype,
    };

    const { Location } = await s3.upload(params).promise();
    return Location;
};

module.exports = { uploadToS3 };