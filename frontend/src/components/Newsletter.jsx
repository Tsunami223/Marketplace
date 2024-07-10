import React, { useState } from 'react';
import '../styles/Newsletter.css'; // Importa il tuo stile per il form

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aggiungi la logica per gestire l'iscrizione alla newsletter qui (e.g., chiamata API)
    setMessage('Grazie per esserti iscritto!');
    setEmail('');
  };

  return (
    <div className="newsletter-form">
      <h2>Iscriviti alla nostra Newsletter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Inserisci la tua email"
          required
        />
        <button type="submit">Iscriviti</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewsletterForm;
