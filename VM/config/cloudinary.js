const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'user_photos', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Allowed file types
    },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
