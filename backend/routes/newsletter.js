const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.post('/newsletter', async (req, res) => {
  const { email } = req.body;

  // Verifica che l'email sia fornita
  if (!email) {
    return res.status(400).json({ message: 'Email è richiesta.' });
  }

  // Verifica che le credenziali siano presenti
  if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
    return res.status(500).json({ message: 'Credenziali email mancanti.' });
  }

  // Configura il trasportatore per nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.libero.it',
    port: 587, 
    secure: false, 
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  // Opzioni per l'email
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Grazie per esserti iscritto alla nostra Newsletter',
    text: 'Grazie per esserti iscritto alla nostra newsletter. Restate sintonizzati per aggiornamenti!',
  };

  try {
    // Invio dell'email
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Iscrizione completata con successo. Controlla la tua email per il messaggio di conferma.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Errore durante l\'invio dell\'email. Riprova più tardi.' });
  }
});

module.exports = router;
