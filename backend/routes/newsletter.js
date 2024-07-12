const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/newsletter', async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASSWORD 
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Grazie per esserti iscritto alla nostra Newsletter',
    text: 'Grazie per esserti iscritto alla nostra newsletter. Restate sintonizzati per aggiornamenti!'
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Iscrizione completata con successo. Controlla la tua email per il messaggio di conferma.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Errore durante l\'invio dell\'email. Riprova più tardi.' });
  }
});

module.exports = router;
