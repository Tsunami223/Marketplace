const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const multer = require("multer");
const {CloudinaryStorage} = require('multer-storage-cloudinary');
dotenv.config();


    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'prodotti',
           allowed_format: ['png, jpg'],
            public_id: (req, file) => `${Date.now()}-${file.originalname}`
            
        },
    });
    
    module.exports = multer({ storage: storage });