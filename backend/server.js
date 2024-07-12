const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');
const auth = require('./middleware/auth'); // Middleware per l'autenticazione JWT
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bodyParser = require('body-parser');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const upload = multer({ dest: 'uploads/' });
const newsletterRoutes = require('./routes/newsletter');

const productRoutes = require('./routes/products');
const multerUploads = require('./config/cloudinaryConfig'); 
const verifyToken = require('./middleware/auth');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/newsletter', newsletterRoutes);
app.use(express.json());
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


app.use('/api/products', productRoutes);
app.post('/api/products', upload.single('imageUrl'), async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const imageUrl = req.file.path;
    console.log(imageUrl);
    const newProduct = { name, description, category, price, imageUrl };
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la creazione del prodotto.' });
  }
});

mongoose.connect(process.env.MONGO_URI);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));


app.get('/auth/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));