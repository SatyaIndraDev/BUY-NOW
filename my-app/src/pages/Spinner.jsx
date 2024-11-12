import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  );
};

export default Spinner;
