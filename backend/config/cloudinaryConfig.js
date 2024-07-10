const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const multer = require("multer");
const {CloudinaryStorage} = require('multer-storage-cloudinary');
dotenv.config();


    cloudinary.config({ 
        cloud_name: 'dcmsdsbpx', 
        api_key: '851813761621374', 
        api_secret: 'uesn1WSCi4gOlaT0pYnsSzFrMTk' 
    });
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'prodotti',
            format: async (req, file) => 'png',
            public_id: (req, file) => req.file
        },
    });
    
    module.exports = multer({ storage: storage });