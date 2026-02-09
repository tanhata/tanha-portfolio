import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

/* ---------- Notebook Layout (global background grid + margin) ---------- */
const NotebookLayout = ({ children, theme }) => {
  const themeBackgrounds = {
    ink: {
      background: "black",
      grid: "rgba(255,255,255,0.08)",
      text: "white",
      accent: "#ff4d4d",
    },
    pearl: {
      background: "white",
      grid: "rgba(0,0,0,0.08)",
      text: "black",
      accent: "#00bcd4",
    },
    rose: {
      background: "linear-gradient(135deg, #ff0000 0%, #ff0062 50%, #ff0000 100%)",
      grid: "rgba(255,255,255,0.15)",
      text: "white",
      accent: "#ff66cc",
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
      {/* Grid background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `
            ${config.background},
            linear-gradient(to right, ${config.grid} 1px, transparent 1px),
            linear-gradient(to bottom, ${config.grid} 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 20px 20px, 20px 20px",
          zIndex: 0,
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
          zIndex: 1,
        }}
      />
      {/* Foreground content */}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
};

/* ---------- About Page (uses timeline) ---------- */
const TimelineStep = ({ stage, index, activeIndex, setActiveIndex }) => {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: false });

  useEffect(() => {
    if (inView) setActiveIndex(index);
  }, [inView, index, setActiveIndex]);

  return (
    <div
      ref={ref}
      style={{
        marginBottom: "200px",
        opacity: inView ? 1 : 0.2,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.6s ease-out",
      }}
    >
      <h3 style={{ fontSize: "26px", marginBottom: "8px" }}>{stage.title}</h3>
      <p style={{ fontSize: "18px", opacity: 0.8 }}>{stage.description}</p>
      <p style={{ fontSize: "16px", marginTop: "10px", fontStyle: "italic" }}>
        {stage.content}
      </p>
    </div>
  );
};

const AboutPage = ({ theme = "ink" }) => {
  const careerStages = [
    { title: "High School", description: "The spark", content: "I filled pages with equations and doodles, realizing math wasn't just numbers—it was a way of seeing patterns everywhere.", doodle: "∑ f(x)dx" },
    { title: "Undergrad", description: "Where art met code", content: "I discovered creative coding and began blending math with design.", doodle: "tanh(a)" },
    { title: "Grad School", description: "Architecture + AI", content: "Architecture trained me to think in 3D systems. Around the same time, transformers changed everything in AI.", doodle: "∫ neural · dx" },
    { title: "Industry", description: "Building tools for others", content: "I designed ML dashboards and data platforms.", doodle: "loss ↓" },
    { title: "Sabbatical", description: "Grief as teacher", content: "Losing my mother to cancer changed me.", doodle: "♥ mom" },
    { title: "Designing at the edge", description: "Human + Machine", content: "I'm back to filling notebooks, this time with product ideas and AI experiments.", doodle: "{…}" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const accent = theme === "pearl" ? "#4dd2ff" : theme === "rose" ? "#ff66cc" : "#ff4d4d";

  return (
    <section
      className="about-page"
      style={{
        paddingTop: "150px",
        paddingBottom: "150px",
        minHeight: "100vh",
      }}
    >
      <div style={{ display: "flex", maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        {/* LEFT timeline */}
        <div style={{ position: "sticky", top: "15%", flex: 1, padding: "40px", height: "80vh" }}>
          <svg width="100%" height="400" viewBox="0 0 100 400">
            <line x1="50" y1="0" x2="50" y2="400" stroke={accent} strokeWidth="2" />
            <line
              x1="50"
              y1="0"
              x2="50"
              y2={(activeIndex / (careerStages.length - 1)) * 400}
              stroke="red"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {careerStages.map((_, i) => (
              <circle
                key={i}
                cx="50"
                cy={(i / (careerStages.length - 1)) * 400}
                r="6"
                fill={i <= activeIndex ? "red" : "black"}
                stroke="white"
              />
            ))}
          </svg>
          {/* Margin doodles */}
          <div style={{ marginTop: "20px", fontFamily: "Caveat, cursive" }}>
            {careerStages.map((stage, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: "80px",
                  top: `${(i / (careerStages.length - 1)) * 400 + 100}px`,
                  fontSize: "22px",
                  color: i === activeIndex ? "white" : "rgba(255,255,255,0.2)",
                  transition: "all 0.4s ease-out",
                }}
              >
                {stage.doodle}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT scrollable notes */}
        <div style={{ flex: 2, padding: "40px" }}>
          {careerStages.map((stage, i) => (
            <TimelineStep
              key={i}
              stage={stage}
              index={i}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Home Page ---------- */
const HomePage = () => (
  <section style={{ padding: "150px 40px 80px" }}>
    <div className="profile-image-container" style={{ display: "flex", justifyContent: "center", marginBottom: "60px" }}>
      <img 
        src="/images/profile-dark.gif"
        alt="Tanha profile"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          objectFit: 'cover',
          objectPosition: 'center center',
          border: '0px solid currentColor',
          display: 'block',
          margin: '0 auto'
        }}
      />
    </div>
    <h1 style={{ fontSize: "48px", fontWeight: 700, marginBottom: "20px", textAlign: "right" }}>
      I'm a Product Designer and Data Scientist.
    </h1>
    <p style={{ fontSize: "30px", marginBottom: "40px", textAlign: "right" }}>
      I design from the inside out. I focus on turning AI driven systems into intuitive tools.
    </p>
  </section>
);

/* ---------- Visual Page ---------- */
const VisualPage = () => (
  <section style={{ padding: "150px 40px 80px" }}>
    <h1 style={{ fontSize: "40px", fontWeight: 700, marginBottom: "30px" }}>
      Visual Projects
    </h1>
    <p style={{ fontSize: "18px", marginBottom: "40px", opacity: 0.8 }}>
      A collection of branding, illustration, and creative explorations.
    </p>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "30px",
      }}
    >
      {/* Visual projects would go here */}
    </div>
  </section>
);

/* ---------- Contact Page ---------- */
const ContactPage = () => (
  <section style={{ padding: "150px 40px 80px", textAlign: "center" }}>
    <h1 style={{ fontSize: "40px", fontWeight: 700, marginBottom: "20px" }}>
      Get in Touch
    </h1>
    <p style={{ fontSize: "18px", marginBottom: "40px", opacity: 0.8 }}>
      Always open to collaboration and conversation.
    </p>
    <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
      <a
        href="mailto:tanharchitecture@gmail.com"
        style={{ fontSize: "20px", textDecoration: "underline" }}
      >
        Email
      </a>
      <a
        href="https://linkedin.com/in/tanhata"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: "20px", textDecoration: "underline" }}
      >
        LinkedIn
      </a>
    </div>
  </section>
);

/* ---------- Main Portfolio ---------- */
const Portfolio = () => {
  const [currentTheme, setCurrentTheme] = useState("ink");

  const themeNames = {
    ink: "Ink",
    pearl: "Pearl",
    rose: "Rose",
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
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Home
            </Link>
            <Link
              to="/about"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              About
            </Link>
            <Link
              to="/visual"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Visual
            </Link>
            <Link
              to="/contact"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Contact
            </Link>
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
          <Route path="/about" element={<AboutPage theme={currentTheme} />} />
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
