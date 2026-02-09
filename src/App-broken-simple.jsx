// Portfolio.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// THEME DEFINITIONS
const themeBackgrounds = {
  ink: {
    background: "#000000", // black
    grid: "rgba(255,255,255,0.1)", // white grid
    text: "#ffffff",
    accent: "#ff4d4d",
  },
  pearl: {
    background: "#ffffff", // white
    grid: "rgba(0,0,0,0.08)", // black grid
    text: "#000000",
    accent: "#00bcd4",
  },
  rose: {
    background:
      "linear-gradient(135deg, #ff0000 0%, #ff0062 50%, #ff0000 100%)",
    grid: "rgba(255,255,255,0.1)",
    text: "#ffffff",
    accent: "#ff66cc",
  },
  ocean: {
    background:
      "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
    grid: "rgba(255,255,255,0.1)",
    text: "#ffffff",
    accent: "#64b5f6",
  },
  forest: {
    background:
      "linear-gradient(135deg, #0d2818 0%, #1a4d2e 50%, #2d5a3d 100%)",
    grid: "rgba(255,255,255,0.1)",
    text: "#ffffff",
    accent: "#81c784",
  },
  cosmic: {
    background:
      "linear-gradient(135deg, #1a0033 0%, #2d1b69 50%, #4a148c 100%)",
    grid: "rgba(255,255,255,0.1)",
    text: "#ffffff",
    accent: "#ba68c8",
  },
};

// GLOBAL NOTEBOOK LAYOUT
const NotebookLayout = ({ children, theme }) => {
  const config = themeBackgrounds[theme] || themeBackgrounds.ink;
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: '"Space Grotesk", sans-serif',
        color: config.text,
        position: "relative",
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          background: `
            ${config.background},
            linear-gradient(to right, ${config.grid} 1px, transparent 1px),
            linear-gradient(to bottom, ${config.grid} 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 20px 20px, 20px 20px",
        }}
      />
      {/* Margin line */}
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
      {/* Page content */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

// PAGES
const HomePage = () => (
  <section style={{ padding: "150px 40px" }}>
    <h1 style={{ fontSize: "48px" }}>I'm a Product Designer + Data Scientist</h1>
    <p style={{ marginTop: "20px", fontSize: "22px" }}>
      I design from the inside out. I focus on turning AI systems into intuitive
      tools.
    </p>
  </section>
);

const AboutPage = () => (
  <section style={{ padding: "150px 40px" }}>
    <h2>About Me</h2>
    <p style={{ marginTop: "20px", fontSize: "20px", lineHeight: "1.6" }}>
      My journey has always been at the intersection of math, design, and
      machine learning. Think{" "}
      <span style={{ fontStyle: "italic" }}>∑ f(x)dx</span> in the margins.
    </p>
  </section>
);

const VisualPage = () => (
  <section style={{ padding: "150px 40px" }}>
    <h2>Visual Projects</h2>
    <p>Branding, illustration, experimental design explorations.</p>
  </section>
);

const ContactPage = () => (
  <section style={{ padding: "150px 40px" }}>
    <h2>Contact</h2>
    <p>
      Always open to collaboration —{" "}
      <a href="mailto:tanharchitecture@gmail.com">email me</a>.
    </p>
  </section>
);

// MAIN APP
const Portfolio = () => {
  const [theme, setTheme] = useState("ink");

  return (
    <Router>
      <NotebookLayout theme={theme}>
        {/* HEADER */}
        <header
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            padding: "20px 40px",
            display: "flex",
            justifyContent: "space-between",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            zIndex: 10,
          }}
        >
          {/* Theme switcher */}
          <div style={{ display: "flex", gap: "10px" }}>
            {Object.keys(themeBackgrounds).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid white",
                  background: theme === t ? "white" : "transparent",
                  color: theme === t ? "black" : "white",
                  cursor: "pointer",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {/* Nav */}
          <nav>
            <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/about">about</Link>
              </li>
              <li>
                <Link to="/visual">visual</Link>
              </li>
              <li>
                <Link to="/contact">contact</Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* ROUTES */}
        <div style={{ paddingTop: "100px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/visual" element={<VisualPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>

        {/* FOOTER */}
        <footer style={{ padding: "40px", textAlign: "center" }}>
          © Tanha Alsheikhdallah 2025
        </footer>
      </NotebookLayout>
    </Router>
  );
};

export default Portfolio;

