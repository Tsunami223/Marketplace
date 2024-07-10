
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'prodotti',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const multerUploads = multer({ storage: storage });

module.exports = multerUploads;
