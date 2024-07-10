import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', color: 'red'}}>
      <BootstrapSpinner animation="border" role="status">
        <p className="visually-hidden">Loading...</p>
      </BootstrapSpinner>
    </div>
  );
};

export default Spinner;

