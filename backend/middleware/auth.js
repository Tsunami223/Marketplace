const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function (req, res, next) {
  // Ottieni il token dal header della richiesta
  const token = req.header('x-auth-token');

  // Verifica se il token non è presente
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verifica il token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Aggiungi l'utente dal token decodificato all'oggetto della richiesta
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
