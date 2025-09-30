import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Portfolio = () => {
  const [currentTheme, setCurrentTheme] = useState('ink');

  return (
    <Router>
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: currentTheme === 'ink' ? '#000000' : '#ffffff',
        color: currentTheme === 'ink' ? '#ffffff' : '#000000',
        fontFamily: '"Space Grotesk", sans-serif',
        padding: '20px'
      }}>
        <header style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
          <nav style={{ display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About</Link>
            <Link to="/visual" style={{ color: 'inherit', textDecoration: 'none' }}>Visual</Link>
            <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
          </nav>
          <div style={{ marginTop: '10px' }}>
            <button 
              onClick={() => setCurrentTheme('ink')}
              style={{ 
                padding: '5px 10px', 
                marginRight: '10px',
                backgroundColor: currentTheme === 'ink' ? '#ff4d4d' : 'transparent',
                color: 'inherit',
                border: '1px solid currentColor',
                cursor: 'pointer'
              }}
            >
              Ink
            </button>
            <button 
              onClick={() => setCurrentTheme('pearl')}
              style={{ 
                padding: '5px 10px',
                backgroundColor: currentTheme === 'pearl' ? '#00bcd4' : 'transparent',
                color: 'inherit',
                border: '1px solid currentColor',
                cursor: 'pointer'
              }}
            >
              Pearl
            </button>
          </div>
        </header>
        
        <main style={{ padding: '40px' }}>
          <Routes>
            <Route path="/" element={<div><h1>Home Page</h1><p>Welcome to my portfolio!</p></div>} />
            <Route path="/about" element={<div><h1>About Page</h1><p>About me content</p></div>} />
            <Route path="/visual" element={<div><h1>Visual Page</h1><p>Visual projects</p></div>} />
            <Route path="/contact" element={<div><h1>Contact Page</h1><p>Contact information</p></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default Portfolio;

