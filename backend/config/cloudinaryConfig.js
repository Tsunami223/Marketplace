const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
const multer = require('multer');
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
      format: async (req, file) =>  'jpg, png',
      public_id: (req, file) => file.originalname,
    },
  });
  
   const upload = multer({ storage: storage });
   module.exports = {
    cloudinary,
    upload,
  };