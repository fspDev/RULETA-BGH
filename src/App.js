import React, { useState } from 'react';
import './App.css';
import Ruleta from './Ruleta';
import logo from './images/logo.png';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'ruleta':
        return <Ruleta onResult={(res) => console.log('Resultado:', res)} />;
      default:
        return (
          <div className="App-home">
            <img 
              src={logo} 
              className="App-logo" 
              alt="logo" 
            />
            <div>
              <button className='Ruleta' onClick={() => setCurrentPage('ruleta')}>JUGAR</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {renderPage()}
      </header>
    </div>
  );
}

export default App;
