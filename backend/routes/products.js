const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinaryConfig');


// Ottieni tutti i prodotti
router.get('/',  async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Errore nel recupero dei prodotti:', error);
    res.status(500).json({ error: error.message });
  }
});

// Aggiunge un nuovo prodotto
router.post('/api/products', verifyToken, upload.single('prodotti'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const result = await cloudinary.uploader.prodotti(req.file.path); 
    const imageUrl = result.secure_url;
    const newProduct = new Product({ 
      name, 
      description, 
      price, 
      category, 
      imageUrl,
      priceHistory: [{ price }]
    });
    
    await newProduct.save();
    res.status(201).json({ message: 'Prodotto aggiunto con successo', product: newProduct });
    console.log(this.post);
  } catch (error) {
    console.error('Errore nell\'aggiunta del prodotto:', error);
    res.status(500).json({ error: error.message });
  }
});

// Aggiorna un prodotto esistente
router.put('/:id', verifyToken, upload.single('imageUrl'), async (req, res) => {
  const { name, description, category, price } = req.body;
  const productId = req.params.id;

  try {
    let imageUrl;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, category, price, imageUrl },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Prodotto non trovato' });
    }
    res.json({ message: 'Prodotto aggiornato con successo', product: updatedProduct });
  } catch (error) {
    console.error('Errore nell\'aggiornamento del prodotto:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rimuove un prodotto esistente
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Prodotto non trovato' });
    }
    res.json({ message: 'Prodotto rimosso con successo', product: deletedProduct });
  } catch (error) {
    console.error('Errore nella rimozione del prodotto:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ottiene un prodotto esistente
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Prodotto non trovato' });
    }
    res.json(product);
  } catch (error) {
    console.error('Errore nel recupero del prodotto:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
