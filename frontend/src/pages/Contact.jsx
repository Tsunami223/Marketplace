import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Contatto = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4">
            <Card.Body>
              <h1>Contattaci</h1>
              <p className="lead">
                Se hai domande o hai bisogno di assistenza, puoi contattarci tramite le seguenti modalità.
              </p>
              <h3>Email</h3>
              <p>
                <a href="mailto:lorenzoromano552@gmail.com">lorenzoromano552@gmail.com</a>
              </p>
              <h3>Telefono</h3>
              <p>
                +39 123 456 7890
              </p>
              <h3>Indirizzo</h3>
              <p>
                Via Roma 123, 00100 Roma, Italia
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contatto;
