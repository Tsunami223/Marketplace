const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const verifyToken = require('../middleware/auth');

// Ottieni tutti i prodotti
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Errore nel recupero dei prodotti:', error);
    res.status(500).json({ error: 'Errore nel recupero dei prodotti' });
  }
});

// Aggiunge un nuovo prodotto
router.post('/', verifyToken,  async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;
    const newProduct = new Product({ name, description, price, category, imageUrl });
    await newProduct.save();
    res.status(201).json({ message: 'Prodotto aggiunto con successo', product: newProduct });
  } catch (error) {
    console.error('Errore nell\'aggiunta del prodotto:', error);
    res.status(500).json({ error: 'Errore nell\'aggiunta del prodotto' });
  }
});

// Aggiorna un prodotto esistente
router.put('/:id', verifyToken , async (req, res) => {
  const { name, description, category, price, imageUrl} = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, category,  price, imageUrl },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Prodotto non trovato' });
    }
    res.json({ message: 'Prodotto aggiornato con successo', product: updatedProduct });
  } catch (error) {
    console.error('Errore nell\'aggiornamento del prodotto:', error);
    res.status(500).json({ error: 'Errore nell\'aggiornamento del prodotto' });
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
    res.status(500).json({ error: 'Errore nella rimozione del prodotto' });
  }
});

// Ottieni un prodotto esistente
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Prodotto non trovato' });
    }
    res.json(product);
  } catch (error) {
    console.error('Errore nel recupero del prodotto:', error);
    res.status(500).json({ error: 'Errore nel recupero del prodotto' });
  }
});

module.exports = router;
