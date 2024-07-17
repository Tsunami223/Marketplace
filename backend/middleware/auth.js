const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();
const verifyToken= async (req, res, next) => {
  
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  // Verifica se il token non è presente
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verifica il token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Aggiunge l'utente dal token decodificato all'oggetto della richiesta
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = verifyToken
