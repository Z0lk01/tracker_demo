import React from 'react';

function Header({ startTour }) {
  return (
    <div className="header">
      <h1>Personal Finance Tracker</h1>
      <button 
        className="tour-button" 
        onClick={startTour}
        data-testid="start-tour-button"
      >
        Take a Tour
      </button>
    </div>
  );
}

export default Header;