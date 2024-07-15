const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');
const auth = require('./middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const {cloudinary} = require('./config/cloudinaryConfig');
const Product = require('./models/Product');
const app = express();
const PORT = process.env.PORT || 5000;
const newsletterRoutes = require('./routes/newsletter');
const productRoutes = require('./routes/products');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
dotenv.config();


// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/newsletter', newsletterRoutes);
app.use('/api/products', productRoutes); 



// Route per gestire l'upload di un nuovo prodotto con immagine su Cloudinary
app.post('/api/products', upload.single('imageUrl'), async (req, res) => {
  try {
    // Gestione dell'upload dell'immagine
    if (!req.file) {
      return res.status(400).json({ error: 'Upload an image file' });
    }
    const result = await cloudinary.uploader.upload(req.file.path); // Percorso dell'immagine salvata

    // Dati del prodotto dal corpo della richiesta e URL dell'immagine caricata
    const { name, description, price, category } = req.body;
    const imageUrl = result.secure_url;

    // Creazione di un nuovo prodotto utilizzando il modello Product
    const newProduct = new Product({ name, description, price, category, imageUrl });

    // Salvataggio del prodotto nel database
    await newProduct.save();
    // Elimina il file caricato dall'upload per evitare problemi di memoria
    fs.unlinkSync(req.file.path);


    // Risposta con il nuovo prodotto creato
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Errore durante l\'upload dell\'immagine' });
  }
});

// Route per gestire il login degli utenti
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se l'utente esiste nel database
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Verifica la password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Genera il token JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route per gestire la registrazione di nuovi utenti
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifica se l'utente esiste già
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Crea un nuovo utente
    user = new User({
      username,
      email,
      password,
    });

    // Hash della password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Salva l'utente nel database
    await user.save();
    res.status(201).json({ msg: 'User created' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Connessione al database MongoDB
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Middleware per autenticazione JWT e restituzione dell'utente autenticato
app.get('/auth/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Avvio del server Express
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
