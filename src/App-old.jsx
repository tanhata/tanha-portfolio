import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const NotebookLayout = ({ children, theme }) => {
  const themeBackgrounds = {
    ink: {
      background: "#000000",
      grid: "rgba(255,255,255,0.1)",
      text: "#ffffff",
      accent: "#ff4d4d",
    },
    pearl: {
      background: "#ffffff",
      grid: "rgba(0,0,0,0.08)",
      text: "#000000",
      accent: "#00bcd4",
    },
    rose: {
      background: "linear-gradient(135deg, #ff0000 0%, #ff0062 50%, #ff0000 100%)",
      grid: "rgba(255,255,255,0.1)",
      text: "#ffffff",
      accent: "#ff66cc",
    },
    ocean: {
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      grid: "rgba(255,255,255,0.1)",
      text: "#ffffff",
      accent: "#64b5f6",
    },
    forest: {
      background: "linear-gradient(135deg, #0d2818 0%, #1a4d2e 50%, #2d5a3d 100%)",
      grid: "rgba(255,255,255,0.1)",
      text: "#ffffff",
      accent: "#81c784",
    },
    cosmic: {
      background: "linear-gradient(135deg, #1a0033 0%, #2d1b69 50%, #4a148c 100%)",
      grid: "rgba(255,255,255,0.1)",
      text: "#ffffff",
      accent: "#ba68c8",
    },
  };

  const config = themeBackgrounds[theme] || themeBackgrounds.ink;

  return (
    <div
      style={{
        minHeight: "100vh",
        color: config.text,
        fontFamily: '"Space Grotesk", sans-serif',
        position: "relative",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `${config.background}, linear-gradient(to right, ${config.grid} 1px, transparent 1px), linear-gradient(to bottom, ${config.grid} 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 20px 20px, 20px 20px",
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "60px",
          width: "2px",
          height: "100%",
          background: config.accent,
          opacity: 0.7,
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

const HomePage = () => (
  <section style={{ padding: "150px 40px 80px" }}>
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "60px" }}>
      <img 
        src="/images/profile-dark.gif"
        alt="Tanha profile"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          objectFit: 'cover',
          display: 'block',
          margin: '0 auto'
        }}
      />
    </div>
    <h1 style={{ fontSize: "48px", fontWeight: 700, marginBottom: "20px", textAlign: "right", color: "inherit" }}>
      I'm a Product Designer and Data Scientist.
    </h1>
    <p style={{ fontSize: "30px", marginBottom: "40px", textAlign: "right", color: "inherit" }}>
      I design from the inside out. I focus on turning AI driven systems into intuitive tools.
    </p>
  </section>
);

const AboutPage = () => (
  <section style={{ padding: "150px 40px 80px" }}>
    <h1 style={{ fontSize: "40px", marginBottom: "30px", color: "inherit" }}>About Me</h1>
    <p style={{ fontSize: "20px", lineHeight: "1.6", color: "inherit" }}>
      My journey has always been at the intersection of math, design, and machine learning.
    </p>
  </section>
);

const VisualPage = () => (
  <section style={{ padding: "150px 40px 80px" }}>
    <h1 style={{ fontSize: "40px", marginBottom: "30px", color: "inherit" }}>Visual Projects</h1>
    <p style={{ fontSize: "20px", color: "inherit" }}>Branding, illustration, experimental design explorations.</p>
  </section>
);

const ContactPage = () => (
  <section style={{ padding: "150px 40px 80px" }}>
    <h1 style={{ fontSize: "40px", marginBottom: "30px", color: "inherit" }}>Contact</h1>
    <p style={{ fontSize: "20px", color: "inherit" }}>
      Always open to collaboration — <a href="mailto:tanharchitecture@gmail.com" style={{ color: "inherit" }}>email me</a>.
    </p>
  </section>
);

const Portfolio = () => {
  const [currentTheme, setCurrentTheme] = useState("ink");

  const themeNames = {
    ink: "Ink",
    pearl: "Pearl", 
    rose: "Rose",
    ocean: "Ocean",
    forest: "Forest",
    cosmic: "Cosmic",
  };

  return (
    <Router>
      <NotebookLayout theme={currentTheme}>
        <header
          style={{
            padding: "20px 40px",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <nav style={{ display: "flex", gap: "30px" }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
            <Link to="/about" style={{ color: "inherit", textDecoration: "none" }}>About</Link>
            <Link to="/visual" style={{ color: "inherit", textDecoration: "none" }}>Visual</Link>
            <Link to="/contact" style={{ color: "inherit", textDecoration: "none" }}>Contact</Link>
          </nav>
          <div>
            {Object.entries(themeNames).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCurrentTheme(key)}
                style={{
                  marginLeft: "10px",
                  padding: "6px 10px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "6px",
                  color: "inherit",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/visual" element={<VisualPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <footer
          style={{
            padding: "40px",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            textAlign: "center",
            marginTop: "80px",
            opacity: 0.7,
          }}
        >
          © Tanha Alsheikhdallah 2025
        </footer>
      </NotebookLayout>
    </Router>
  );
};

export default Portfolio;