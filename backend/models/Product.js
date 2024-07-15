const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: false },
  category: { type: String, required: false},
  priceHistory: [
    {
      price: { type: Number, required: false },
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Product', productSchema);
