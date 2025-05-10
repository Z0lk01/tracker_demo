import React from 'react';

function Header({ startTour, toggleLanguage, title, tourText, langText }) {
  return (
    <div className="header">
      <h1>{title}</h1>
      <button 
        className="tour-button" 
        onClick={startTour}
        data-testid="start-tour-button"
      >
        {tourText}
      </button>
      <button 
        className="lang-button" 
        onClick={toggleLanguage}  
        data-testid="change-lang-button"
      >
        {langText}
      </button>
    </div>
  );
}

export default Header;