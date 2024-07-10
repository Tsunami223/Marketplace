import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ChiSiamo = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4">
            <Card.Body>
              <h1>Chi Siamo</h1>
              <p className="lead">
                Benvenuti nel nostro Marketplace! Siamo dedicati a fornire i migliori prodotti e servizi ai nostri clienti. Il nostro team lavora sodo per trovare gli articoli migliori e garantire che la tua esperienza di acquisto sia piacevole e senza problemi.
              </p>
              <h3>La Nostra Missione</h3>
              <p>
                La nostra missione è connettere le persone con i prodotti che amano. Miriamo a creare una piattaforma che renda facile per i clienti scoprire, acquistare e ricevere prodotti di alta qualità da venditori di fiducia.
              </p>
              <h3>I Nostri Valori</h3>
              <ul>
                <li>Soddisfazione del Cliente: Prioritizziamo le esigenze e la soddisfazione dei nostri clienti sopra ogni altra cosa.</li>
                <li>Qualità: Garantiamo che tutti i prodotti elencati sul nostro marketplace soddisfino standard di alta qualità.</li>
                <li>Integrità: Crediamo nella trasparenza e nell'onestà in tutte le nostre operazioni.</li>
                <li>Innovazione: Ci sforziamo continuamente di migliorare la nostra piattaforma e i nostri servizi attraverso l'innovazione.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChiSiamo;
