import React, { useState, useEffect, useRef, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { projects } from './data/projects.js';

/* ---------- Custom Cursor Component ---------- */
const CustomCursor = ({ theme = "ink" }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [t, setT] = useState(0);
  const ref = useRef();

  const accent = theme === "pearl" ? "#00bcd4" : theme === "rose" ? "#ff66cc" : "#ff4d4d";

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setHovering(true);
    const handleMouseLeave = () => setHovering(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      setT((prev) => prev + 0.02);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <svg
      ref={ref}
      width="80"
      height="80"
      viewBox="-40 -40 80 80"
      style={{
        position: "fixed",
        left: pos.x - 40,
        top: pos.y - 40,
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
      }}
    >
      {/* central dot — larger + brighter */}
      <circle
        r="2.8"
        fill={hovering ? accent : "#ffffff"}
        opacity={hovering ? 1 : 0.9}
      />

      {/* thicker crosshair lines */}
      <line
        x1="-8"
        y1="0"
        x2="8"
        y2="0"
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth="1.2"
      />
      <line
        x1="0"
        y1="-8"
        x2="0"
        y2="8"
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth="1.2"
      />

      {/* Lissajous orbit — larger radius + thicker points */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x = (hovering ? 20 : 14) * Math.sin((hovering ? 1.8 : 1.2) * (t + a));
        const y = (hovering ? 20 : 14) * Math.sin((hovering ? 2.4 : 1.6) * (t + a + Math.PI / 4));
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={hovering ? 2.5 : 1.8}
            fill={hovering ? accent : "#ffffff"}
            opacity={hovering ? 1 : 0.85}
          />
        );
      })}
    </svg>
  );
};

/* ---------- Math Cursor Component ---------- */
const themeAccents = {
  ink:   "#ff4d4d",
  pearl: "#00bcd4",
  rose:  "#ff66cc",
};

const MathCursor = ({ theme = "ink" }) => {
  const accent = themeAccents[theme] || themeAccents.ink;
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({ x: -100, y: -100 });
  const [hovering, setHovering] = React.useState(false);
  const targetRef = React.useRef({ x: -100, y: -100 });

  /* Track mouse movement with smoothing */
  React.useEffect(() => {
    const onMove = (e) => (targetRef.current = { x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* Animate motion */
  React.useEffect(() => {
    let raf;
    const loop = () => {
      setPos((p) => {
        const k = 0.24;
        const { x, y } = targetRef.current;
        return { x: p.x + (x - p.x) * k, y: p.y + (y - p.y) * k };
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Detect hover */
  React.useEffect(() => {
    const sel = "a, button, [role='button'], .project, .filter-item";
    const enter = () => setHovering(true);
    const leave = () => setHovering(false);
    const els = document.querySelectorAll(sel);
    els.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    return () => els.forEach((el) => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    });
  }, []);

    return (
    <>
      <style>{`
        @media (hover: hover) {
          html, body { cursor: none; }
        }
      `}</style>
      <svg
        ref={ref}
        width="60"
        height="60"
        viewBox="-30 -30 60 60"
        style={{
          position: "fixed",
          left: pos.x - 30,
          top: pos.y - 30,
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          filter: `drop-shadow(0 0 8px ${accent})`,
        }}
      >
        <circle
          r={hovering ? 18 : 14}
          fill={accent}
          opacity={hovering ? 1 : 0.8}
        />
      </svg>
    </>
  );
};

/* ---------- Guide Dot Cursor Component ---------- */
const GuideDotCursor = ({ theme = "ink", grid = 20 }) => {
  const accent = themeAccents[theme] || themeAccents.ink;
  const [pos, setPos] = React.useState({ x: -100, y: -100 }); // start offscreen

  React.useEffect(() => {
    const onMove = (e) => {
      // snap to nearest grid
      const x = Math.round(e.clientX / grid) * grid;
      const y = Math.round(e.clientY / grid) * grid;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [grid]);

    return (
    <>
      {/* only show on pointer/hover devices */}
      <style>{`
        @media (hover: none) {
          .guide-dot { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .guide-dot { transition: none !important; }
        }
      `}</style>
      <div
        className="guide-dot"
        style={{
          position: "fixed",
          left: pos.x - 4,  // center a 8x8 dot
          top: pos.y - 4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          border: `1px solid ${accent}`,
          background: "transparent",
          opacity: 0.45,
          pointerEvents: "none",
          zIndex: 9998,
          transition: "transform 90ms linear, opacity 120ms ease",
          transform: "translateZ(0)", // keep it crisp
          boxShadow: `0 0 0 1px ${accent}20`,
        }}
      />
    </>
  );
};

/* ---------- Slow Typewriter Component ---------- */
const Typewriter = ({
  text,
  speed = 90,        // ms per character (slower typing)
  startDelay = 600,   // pause before starting
  cursorChar = "▎",
}) => {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const startT = setTimeout(() => {
      const id = setInterval(() => {
        setI((n) => {
          if (n >= text.length) {
            clearInterval(id);
            return n;
          }
          return n + 1;
        });
      }, speed);
    }, startDelay);
    return () => clearTimeout(startT);
  }, [text, speed, startDelay]);

    return (
    <>
      <style>{`
        .tw-caret {
          display: inline-block;
          animation: tw-blink 1s steps(1, end) infinite;
          margin-left: 2px;
        }
        @keyframes tw-blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
      <span aria-label={text}>
        {text.slice(0, i)}
        <span className="tw-caret">{cursorChar}</span>
      </span>
    </>
  );
};

/* ---------- Typewriter Text Component ---------- */
const TypewriterText = ({
  text,
  speed = 28,          // ms per character
  delayStart = 300,     // wait before typing
  showCursor = true
}) => {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setOut(text);
      setDone(true);
      return;
    }

    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        setOut(text.slice(0, i + 1));
        i += 1;
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speed);
    }, delayStart);

    return () => clearTimeout(start);
  }, [text, speed, delayStart]);

  return (
    <span style={{ position: "relative", whiteSpace: "pre-wrap" }}>
      {out}
      {showCursor && (
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: "0.6ch",
            height: "1.1em",
            marginLeft: "2px",
            transform: "translateY(2px)",
            background: "currentColor",
            opacity: done ? 0 : 1,
            animation: "blink 1s steps(1) infinite"
          }}
        />
      )}
      {/* keyframes once per page render */}
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </span>
  );
};

/* ---------- Responsive Grid CSS ---------- */
const ResponsiveGridCSS = () => (
  <style id="responsive-grid-fix">{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
      /* Responsive project grid */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 300px));
      gap: 32px;
      justify-content: center;
      align-items: start;

      /* FULL BLEED: remove all container padding and centering */
      width: 100vw;
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      /* ensure grid spans entire viewport */
      position: relative;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
    }

    /* Project card base */
    .project-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;  /* ensures spacing stays consistent */
      height: 100%;                    /* equal card height */
      min-height: 440px;
      max-height: 620px;
      min-width: 0;           /* prevent overflow */
      border-radius: 12px;
      border: 1px solid rgba(0,0,0,0.08);
      background: #fff;       /* Pearl default; override inline for other themes */
      padding: 16px;
      box-sizing: border-box;
      transition: transform .25s ease, box-shadow .25s ease;
    }

    /* Dark theme override (optional): set this class only when currentTheme === 'ink' */
    .project-card.ink {
      background: #0f0f0f;
      border-color: rgba(255,255,255,0.75);
    }

    /* Rose (gradient) override (optional) */
    .project-card.rose {
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,255,255,0.22);
      backdrop-filter: blur(6px);
    }

    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.12);
    }

    /* Image wrapper keeps cards even and prevents collisions */
    .project-card__media {
      width: 100%;
      aspect-ratio: 1 / 1;    /* perfect square */
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 14px;
      border: 1px solid rgba(0,0,0,0.06);
    }
    .project-card.ink .project-card__media { border-color: rgba(255,255,255,0.12); }
    .project-card.rose .project-card__media { border-color: rgba(255,255,255,0.18); }

    .project-card__media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .project-card__title {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.25;
      margin-bottom: 6px;
      word-break: break-word;
    }

    .project-card__meta,
    .project-card__desc {
      font-size: 13px;
      line-height: 1.45;
      opacity: 0.8;
    }

    /* Wrap tags neatly on the same line(s) without overflow */
    .project-card__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 10px;
    }
    .project-card__tag {
      font-size: 11px;
      line-height: 1;
      padding: 6px 8px;
      border-radius: 999px;
      border: 1px solid currentColor;
      opacity: 0.8;
      white-space: nowrap;
    }

    /* Small screens: allow narrower columns */
    @media (max-width: 640px) {
      .projects-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
      }
    }

    /* Timeline mobile responsiveness */
    @media (max-width: 768px) {
      .about-page {
        padding-top: 80px !important;
        padding-bottom: 80px !important;
      }
      
      .about-page .timeline-grid {
        display: block !important;
        padding: 0 20px !important;
        gap: 0 !important;
      }
      
      .about-page .timeline-sidebar {
        display: none !important;
      }
      
      .about-page .timeline-content {
        width: 100% !important;
      }
      
      .about-page .timeline-content article {
        margin-bottom: 60px !important;
        padding-bottom: 30px !important;
        border-bottom: 1px solid rgba(255,255,255,0.1) !important;
      }
      
      .about-page .timeline-content article:last-child {
        border-bottom: none !important;
      }
      
      .about-page .timeline-content h3 {
        font-size: 24px !important;
        margin-bottom: 12px !important;
        display: flex !important;
        align-items: center !important;
      }
      
      .about-page .timeline-content p {
        font-size: 16px !important;
        line-height: 1.6 !important;
        margin-bottom: 15px !important;
      }
      
      .about-page .timeline-content .glyph {
        font-size: 20px !important;
        margin-right: 12px !important;
      }
      
      .about-page .timeline-content .kicker {
        font-size: 14px !important;
        opacity: 0.7 !important;
        margin-bottom: 8px !important;
        text-transform: uppercase !important;
        letter-spacing: 0.5px !important;
      }
    }

    /* Project Detail Page Styles */
    .project-detail {
      padding: 120px 40px 80px;
      max-width: 1000px;
      margin: 0 auto;
      font-family: "Space Grotesk", sans-serif !important;
    }

    /* Force Space Grotesk font on all project detail elements */
    .project-detail * {
      font-family: "Space Grotesk", sans-serif !important;
    }

    .project-detail h1,
    .project-detail h2,
    .project-detail h3,
    .project-detail h4,
    .project-detail h5,
    .project-detail h6,
    .project-detail p,
    .project-detail span,
    .project-detail div {
      font-family: "Space Grotesk", sans-serif !important;
    }

    /* Additional specificity to override any other CSS */
    body .project-detail,
    html .project-detail,
    #root .project-detail {
      font-family: "Space Grotesk", sans-serif !important;
    }

    body .project-detail *,
    html .project-detail *,
    #root .project-detail * {
      font-family: "Space Grotesk", sans-serif !important;
    }

    .project-detail-header {
      margin-bottom: 40px;
    }

    .back-button {
      background: none;
      border: 1px solid rgba(255,255,255,0.3);
      color: inherit;
      padding: 12px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-family: '"Space Grotesk", sans-serif' !important;
      transition: all 0.3s ease;
    }

    .back-button:hover {
      background: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.5);
    }

    .project-hero-simple {
      margin-bottom: 60px;
      text-align: center;
      font-family: '"Space Grotesk", sans-serif' !important;
    }

    .project-detail-title {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 16px;
      line-height: 1.2;
    }

    .project-detail-subtitle {
      font-size: 20px;
      opacity: 0.8;
      margin-bottom: 24px;
      font-style: italic;
    }

    .project-meta-simple {
      font-size: 16px;
      opacity: 0.9;
    }

    .project-meta-simple p {
      margin: 8px 0;
    }

    .project-content-simple {
      line-height: 1.7;
      font-family: '"Space Grotesk", sans-serif' !important;
    }

    .content-heading {
      font-size: 28px;
      font-weight: 600;
      margin: 60px 0 24px 0;
      color: inherit;
      font-family: '"Space Grotesk", sans-serif' !important;
    }

    .content-paragraph {
      font-size: 18px;
      margin-bottom: 24px;
      opacity: 0.9;
      font-family: '"Space Grotesk", sans-serif' !important;
    }

    .content-image {
      margin: 40px 0;
      text-align: center;
    }

    .content-image img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }

    .content-image-pair {
      margin: 40px 0;
    }

    .side-by-side-images {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 40px 0;
    }

    .side-by-side-images img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }

    /* Project Card Styles */
    .project {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      min-height: 440px;
      max-height: 620px;
      min-width: 0;
      border-radius: 12px;
      border: 1px solid rgba(0,0,0,0.08);
      background: #fff;
      padding: 16px;
      box-sizing: border-box;
      transition: transform .25s ease, box-shadow .25s ease;
      text-decoration: none;
      color: inherit;
    }

    /* Theme-specific project card styles */
    .project.ink {
      background: #0f0f0f;
      border-color: rgba(255,255,255,0.12);
      color: white;
    }

    .project.rose {
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,255,255,0.22);
      backdrop-filter: blur(6px);
      color: white;
    }

    .project.pearl {
      background: #fff;
      border-color: rgba(0,0,0,0.08);
      color: black;
    }

    .project:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.12);
    }

    .project-image {
      width: 100%;
      aspect-ratio: 1 / 1;
      flex-shrink: 0;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 14px;
      border: 1px solid rgba(0,0,0,0.06);
      position: relative; 
    }

    .project.ink .project-image { 
      border-color: rgba(255,255,255,0.12); 
    }

    .project.rose .project-image { 
      border-color: rgba(255,255,255,0.18); 
    }

    .project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .external-link-indicator {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(255,255,255,0.9);
      color: #000;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
    }

    .project-title {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.25;
      margin-bottom: 6px;
      word-break: break-word;
    }

    .project-meta {
      margin-bottom: 8px;
    }

    .project-year-company {
      font-size: 12px;
      font-weight: 500;
    }

    .project.ink .project-year-company {
      color: rgba(255,255,255,0.6);
    }

    .project.rose .project-year-company {
      color: rgba(255,255,255,0.6);
    }

    .project.pearl .project-year-company {
      color: rgba(0,0,0,0.6);
    }

    .project-type {
      font-size: 13px;
      line-height: 1.45;
      opacity: 0.8;
      margin-bottom: 8px;
    }

    .project-description {
      font-size: 13px;
      line-height: 1.45;
      opacity: 0.8;
      margin-bottom: 12px;
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 10px;
    }

    .project-tag {
      font-size: 11px;
      line-height: 1;
      padding: 6px 8px;
      border-radius: 999px;
      border: 1px solid currentColor;
      opacity: 0.8;
      white-space: nowrap;
    }

    .project-tag-more {
      font-size: 11px;
      line-height: 1;
      padding: 6px 8px;
      border-radius: 999px;
      opacity: 0.6;
      white-space: nowrap;
    }

    .project.ink .project-tag-more {
      background: rgba(255,255,255,0.1);
    }

    .project.rose .project-tag-more {
      background: rgba(255,255,255,0.1);
    }

    .project.pearl .project-tag-more {
      background: rgba(0,0,0,0.1);
    }

    /* Mobile responsiveness for project detail */
    @media (max-width: 768px) {
      .project-detail {
        padding: 100px 20px 60px;
      }
      
      .project-detail-title {
        font-size: 36px;
      }
      
      .project-detail-subtitle {
        font-size: 18px;
      }
      
      .content-heading {
        font-size: 24px;
        margin: 40px 0 16px 0;
      }
      
      .content-paragraph {
        font-size: 16px;
        margin-bottom: 20px;
      }
      
      .side-by-side-images {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }

  `}</style>
);

/* ---------- Project Card Component ---------- */
const ProjectCard = ({ project, theme }) => {
  // Check if it's a project with detail page content defined
  const hasDetailPage = ['mcp', 'forma', 'muse'].includes(project.id);
  
  if (project.externalLink) {
    return (
      <a 
        href={project.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`project ${project.className} ${theme}`}
        data-category={project.category}
      >
        <div className="project-image">
          <img src={project.imageData} alt={project.title} />
        </div>

        {/* ADD THIS NEW METADATA SECTION */}
        <h3 className="project-title">{project.title}</h3>

        {/* THEN year/company metadata */}
        {(project.year || project.company) && (
          <div className="project-meta">
            <span className="project-year-company">
              {project.year}{project.year && project.company && ' • '}{project.company}
            </span>
          </div>
        )}
        <div className="project-type">{project.type}</div>
        <p className="project-description">{project.description}</p>

        {/* ADD THIS NEW TAGS SECTION */}
        {project.tags && project.tags.length > 0 && (
          <div className="project-tags">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="project-tag">{tag}</span>
            ))}
            {project.tags.length > 3 && (
              <span className="project-tag-more">+{project.tags.length - 3}</span>
            )}
          </div>
        )}
      </a>
    );
  }
  /* If it doesn't have a detail page, render as non-clickable */
  if (!hasDetailPage) {
    return (
      <div
        className={`project ${project.className} ${theme}`}
        data-category={project.category}
        style={{ cursor: 'default' }}
      >
        <div className="project-image">
          <img
            src={project.imageData}
            alt={project.title}
          />
        </div>
        <h3 className="project-title">{project.title}</h3>
        
        {/* ADD THIS METADATA */}
        {(project.year || project.company) && (
          <div className="project-meta">
            <span className="project-year-company">
              {project.year}{project.year && project.company && ' • '}{project.company}
            </span>
          </div>
        )}
        
        <div className="project-type">{project.type}</div>
        <p className="project-description">{project.description}</p>
        
        {/* ADD TAGS */}
        {project.tags && project.tags.length > 0 && (
          <div className="project-tags">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="project-tag">{tag}</span>
            ))}
            {project.tags.length > 3 && (
              <span className="project-tag-more">+{project.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    );
  }
  return (
    <Link
      to={`/project/${project.id}`}
      className={`project ${project.className} ${theme}`}
      data-category={project.category}
    >
      <div className="project-image">
        <img
          src={project.imageData}
          alt={project.title}
        />
      </div>
      <h3 className="project-title">{project.title}</h3>
      
      {/* ADD THIS METADATA */}
      {(project.year || project.company) && (
        <div className="project-meta">
          <span className="project-year-company">
            {project.year}{project.year && project.company && ' • '}{project.company}
          </span>
        </div>
      )}
      
      <div className="project-type">{project.type}</div>
      <p className="project-description">{project.description}</p>
      
      {/* ADD TAGS */}
      {project.tags && project.tags.length > 0 && (
        <div className="project-tags">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="project-tag">{tag}</span>
          ))}
          {project.tags.length > 3 && (
            <span className="project-tag-more">+{project.tags.length - 3}</span>
          )}
        </div>
      )}
    </Link>
    );
};

/* ---------- Project Detail Page Component ---------- */
const ProjectDetailPage = ({ theme }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  if (!id) return null;

  // Project-specific content based on ID
  const getProjectContent = (projectId) => {
    const contentMap = {
      'mcp': {
        title: "MCP Interface",
        subtitle: "Interface for Multi-Agent Interaction",
        role: "Lead Product Designer",
        team: "Founding Machine Learning Developers, Product Manager, Frontend Engineers",
        content: [
          "Model Communication Protocol (MCP) is a framework for orchestrating multiple language models as coordinated agents—each with a defined role, scoped context, and turn in the reasoning chain. It shifts prompting from monolithic to modular: models summarize, critique, and rewrite each other's outputs in sequence, forming a structured dialogue.",
          "",
          "While MCP introduces a powerful mental model, current workflows are often fragmented—spread across notebooks, orchestration libraries, and opaque API calls.",
          "",
          "This project visualizes MCP from an interface perspective—making agent interactions transparent, inspectable, and user-directed. Users assign roles, define execution order, and trace how ideas evolve across model handoffs. Designed through both a product and engineering lens, the system supports reproducibility, orchestration, and step-level debugging.",
          "",
          "## Unblocking the Workflow",
          "",
          "MCPs involve multiple moving parts — developers define specs, PMs scope features, engineers implement, and designers shape behavior. But without a shared interface, the flow breaks. Specs live across Notion, Slack, and code. This tool restructures that journey: model behavior is visualized, editable, and versioned — so every role stays in sync.",
          "",
          "## Designing for Dialogue",
          "",
          "Agents can be confusing-- make model-to-model collaboration legible. I leaned on conversation as a UI structure — each agent speaks, critiques, or rewrites. Users assign roles like Summarizer, Critic, or Rewriter to selected models. The interface supports multi-step task orchestration through simple dropdowns and a guided prompt builder.",
          "",
          "## Conversation Playback",
          "",
          "Outputs are presented as threaded messages, reflecting the sequence and evolution of ideas. The interface supports user feedback mid-dialogue, offering opportunities to intervene, redirect, or co-create.",
          "",
          "## Agent & Model Onboarding",
          "",
          "Educational overlays help non-technical users understand how agent roles function, and how models differ in tone, reliability, and application.",
          "",
          "## Session History & Sharing",
          "",
          "A lightweight session dashboard where past conversations can be reviewed, duplicated, or exported. Each session displays a timestamp, the assigned models and roles, and a preview of the final output. Users can sort by agent, task type, or date to surface relevant collaborations.",
          "",
          "## Developer Console: Multi-Agent Config & Execution",
          "",
          "This screen bridges interface design with the realities of modern LLMOps. It allows developers to structure multi-agent chains by assigning roles (e.g., Summarizer, Critic) to specific models, with full control over system prompts, temperature, and token limits. Configs are output as JSON payloads — not as an afterthought, but as a first-class asset for versioning and API execution.",
          "",
          "Each agent's response is logged with its inputs, latency, and token usage visible — because understanding model behavior at the step level is essential when chaining reasoning tasks across systems. Every interaction is replayable and forkable, supporting fast iteration and fine-grained debugging.",
          "",
          "The API panel integrates directly with live endpoints and code exports, supporting transition from prototype to production. By exposing telemetry (rate limits, response times, token consumption) alongside structured configuration, this interface doesn't just make LLM workflows usable — it makes them observable and maintainable.",
          "",
          "## User Journey & Flow",
          "",
          "The user experience maps a clear path from concept to execution. Users begin by defining their multi-agent task, selecting models and assigning roles, then watch as agents collaborate in real-time. The interface provides intervention points throughout—allowing users to redirect conversations, adjust parameters, or fork successful patterns into new workflows.",
          "",
          "## Making Model Communication Legible",
          "",
          "Building this interface began as an exploration of how multiple AI agents could collaborate more transparently—but it quickly evolved into a deeper question of how humans, too, might better understand, debug, and direct these interactions. What emerged is a system that treats multi-agent workflows not as code-first automations, but as legible, structured conversations.",
          "",
          "Through role assignment, sequential reasoning, and step-level traceability, this tool reframes prompting as orchestration—making LLM behavior both observable and controllable.",
          "",
          "## Reflection & Future Directions",
          "",
          "While this prototype focuses on visualizing core MCP flows, there's exciting room for future exploration:",
          "",
          "• Inter-agent memory systems (e.g., letting agents remember and reference prior states)",
          "• Non-linear agent logic (e.g., conditionals, feedback loops, and voting)",
          "• Live debugging + annotation layers for teams reviewing AI behavior",
          "• LLMOps integrations like exporting traces to LangSmith, OpenPipe, or Hugging Face Spaces",
          "• More expressive agent identities including tone preferences, formatting styles, or instructional personas",
          "",
          "Above all, this project reflects a belief that as models become more collaborative, so too must our tools—giving people a way to reason about AI reasoning."
        ],
        images: ['/images/projects/mcp/mcp-1.png','/images/projects/mcp/Setup.png', '/images/projects/mcp/Conversation.png', '/images/projects/mcp/Understanding Agents.png', '/images/projects/mcp/History.png', '/images/projects/mcp/Dev.png', '/images/projects/mcp/journey.png', '/images/projects/mcp/Model Guide.png']
      },

      'forma': {
        title: "Forma Platform",
        subtitle: "TEXT-SVG-IMAGE GENERATION ITERATION PLATFORM",
        role: "Sr. Product Designer",
        team: "Machine Learning Engineer, Founding Frontend Developer",
        content: [
          "This image-generating platform reimagines how users engage with generative art by merging intuitive creation tools with a transparent ecosystem for attribution, discovery, and iteration.",
          "While generative tools often obscure the labor behind machine-made art, this platform foregrounds the time, iteration, and inspiration behind each piece.",
          "",
          "## WELCOME",
          "",
          "The welcome flow is intentionally minimal - a three-screen sequence consisting of a logo splash, followed by sign-up or sign-in. In a product that leverages complex machine learning systems and layered image iteration, the introduction is deliberately pared back.",
          "",
          "## DISCOVER", 
          "",
          "A scrollable feed surfaces trending and curated generative works. Clicking into any image reveals its creation journey - including iterations, total time, prompt history, and credited inspiration. Featured artists are showcased with bio blurbs and linked works.",
          "",
          "## CREATE + ITERATE",
          "",
          "Users generate images using a smart fill-in-the-blank prompt system, with controls for style, influence, and vibe. Outputs are editable as SVGs with a Figma-like toolbar, making it easy to tweak, remix, and iterate. Time and edit history are tracked to reflect effort.",
          "",
          "## ARTISTIC LINEAGE", 
          "",
          "This platform doesn't erase the origin of visual inspiration. It actively surfaces the artists, styles, and practices that shape generative works. Every image carries a thread back to its non-AI source.",
          "",
          "Original artists are credited throughout. Their profiles feature original works, a tab of inspired creations, and short bios with imagery - reinforcing transparency and showing their influence across the platform.",
          "",
          "## USER PROFILE",
          "",
          "Each user has a profile with tabs for created, liked, saved, and reposted work. The UI encourages identity-building and creative exploration, while tracking iteration timelines to celebrate the craft of generative art.",
          "",
          "## MACHINE LEARNING FOUNDATIONS",
          "",
          "The creative engine is powered by a few key ML-driven features that enhance control and transparency throughout the generation pipeline:",
          "",
          "## Prompt Temperature",
          "",
          "Controls allow users to modulate the randomness and creative looseness of their image generations, from structured to wildly abstract.",
          "",
          "## SVG-Based Output & Iteration Tracking",
          "",
          "Each visual is editable post-generation. Users can fine-tune details, mask out elements, and re-generate parts, creating a clear history of iterative effort.",
          "",
          "## Artist Influence Matching",
          "",
          "Leverages similarity search across training embeddings to surface likely inspirations behind generated works. These matched artists are credited, and users can explore their original pieces - spotlighting the real creatives behind the data.",
        ],
        images: [
          '/images/projects/forma/forma2.png', 
          '/images/projects/forma/forma3.png',
          '/images/projects/forma/forma4.png',
          '/images/projects/forma/forma6.png',
          '/images/projects/forma/forma7.png',
        ]
      },
      'muse': {
        title: "Museum Experience",
        subtitle: "Reimagining the Museum Experience: Smart Navigation & AR Exploration Confidential Client 8XX579",
        role: "Sr. Product Designer",
        team: "Frontend Developer, Product Manager, Software Engineer (FS), iOS Mobile Engineer, MLE: AR/VR ",
        content: [
          "## Reimagining the Museum Experience",
          "Most museum apps are functional but flat. They provide basic maps and lists, but don't account for the way people actually move through and experience space. This project reimagined the museum guide — not as a static app, but as a context-aware spatial experience layered with exploration, orientation, and storytelling.",
          "## Mapping the Existing User Journey",
          "The existing flow revealed long stretches without context, requiring users to exit the app or retrace steps. It became clear that content needed to be tightly integrated with spatial navigation — not siloed in menus.",
          "",
          "Analyzing visitor behavior uncovered two core insights: Over 40% of visit time was spent trying to find locations. Most users abandoned the app after the first map interaction. These findings guided the structural redesign — the experience needed to adapt to physical movement and reduce friction in discovery.",
          "## Designing the Flow", 
          "The redesigned system flows naturally from 2D map → 3D environment → object-level stories. This progression lets users zoom in and out as they explore, surfacing relevant content without overwhelming the interface. Wireframes were built to test structure, hierarchy, and movement. The goal was to make exploration feel intuitive — like you're walking through the space, not clicking through an app.",
          "",
          "## A Layered Experience",
          "To solve this, the app was built around three core components, layered seamlessly into the navigation: A live 2D wayfinding map that centers the visitor in real time and helps them navigate. A 3D spatial experience that previews exhibit zones, rooms, and transitions between spaces. A Featured Works section, embedded within the map and galleries, where users can explore individual objects, stories, and artist details",
          "This structure lets visitors zoom in and out naturally — from building → exhibit → object — without losing their place or context.", 
          "## 2D Map Navigation",
          "A clean, zoomable map helps users orient themselves within the museum. Visitors can tap to preview galleries, view current location, and follow visual wayfinding cues designed to mirror real-world signage.",
          "",
          "## 3D Spatial Experience",
          "The 3D mode offers a layered, immersive view of the museum layout. Users can explore floors and rooms in spatial context, making the app feel like an extension of the physical space.",
          "",
          "## Featured Exhibits & Object Detail",
          "A curated section surfaces key works and exhibitions. Each object opens into an editorial-style layout, offering rich descriptions, artist context, and optional AR previews for selected pieces.",
          "## System Architecture Overview",
          "Data Collection: User interactions (clicks, dwell time, exhibit views), indoor location (BLE beacons or WiFi triangulation), time of visit",
          "Processing Pipeline", 
          "Event data is streamed and cleaned using Python + BigQuery, then passed to a lightweight content recommendation engine (collaborative filtering + content-based hybrid model)",
          "## Model Outputs",
          "Personalized exhibit recommendations shown in the Featured tab: Dynamic reorder of UI cards based on predicted interest score. Traffic heatmaps sent to a curator-facing dashboard (Metabase prototype). Feedback loop: User behavior is re-ingested to fine-tune recommendations over time. Privacy: All data collection is anonymized and opt-in, with local storage fallback for one-time guest users",
          "## Tooling",
          "Python (data pipeline), BigQuery (storage & queries), Scikit-learn (prototype ML models), Metabase (dashboard), Figma (UX/UI)"
        ],
        images: [
          '/images/projects/muse/muse2.png',
          '/images/projects/muse/muse3.png',
          '/images/projects/muse/muse4.png',
          '/images/projects/muse/muse5.png',
          '/images/projects/muse/muse6.png',
          '/images/projects/muse/muse7.png',
          '/images/projects/muse/muse10.png',
          '/images/projects/muse/muse13.png',
        ]
      }
    };

    return contentMap[projectId] || contentMap['default'];
  };

  const content = getProjectContent(id);

  // Define specific image mappings for each project
  const getImageForHeading = (heading, projectId, images) => {
    const mappings = {
      'muse': {
        "Reimagining the Museum Experience": 0,
        "Mapping the Existing User Journey": 1,
        "Designing the Flow": 2,
        "A Layered Experience": 3,
        "2D Map Navigation": 4,
        "3D Spatial Experience": 5,
        "Featured Exhibits & Object Detail": 6,
        "System Architecture Overview": 7,
        "Model Outputs": 8,
        "Tooling": 9
      },
      'mcp': {
        "Unblocking the Workflow": 0,
        "Designing for Dialogue": 1,
        "Conversation Playback": 2,
        "Agent & Model Onboarding": 3,
        "Session History & Sharing": 4,
        "Developer Console: Multi-Agent Config & Execution": 5,
        "User Journey & Flow": 6,
        "Making Model Communication Legible": 7,
        "Reflection & Future Directions": 8
      },
      'forma': {
        "WELCOME": 0,
        "DISCOVER": 1,
        "CREATE + ITERATE": 2,
        "ARTISTIC LINEAGE": 3,
        "USER PROFILE": 4,
        "MACHINE LEARNING FOUNDATIONS": 5
      }
    };
    
    const projectMapping = mappings[projectId];
    if (projectMapping && projectMapping[heading] !== undefined) {
      return images[projectMapping[heading]];
    }
    return null;
  };

  const renderContent = () => {
    const elements = [];

    content.content.forEach((text, index) => {
      if (text === "") {
        elements.push(<br key={`br-${index}`} />);
      } else if (text.startsWith("## ")) {
        const headingText = text.replace("## ", "");
        
        elements.push(
          <h2 key={`h2-${index}`} className="content-heading">
            {headingText}
          </h2>
        );
        
        // Get the specific image for this heading
        const imageData = getImageForHeading(headingText, id, content.images);
        
        if (imageData) {
          if (typeof imageData === 'string' && imageData.includes('|')) {
            const [leftImg, rightImg] = imageData.split('|');
            elements.push(
              <div key={`img-${index}`} className="content-image-pair">
                <div className="side-by-side-images">
                  <img src={leftImg} alt={`${content.title} - ${headingText} (1)`} />
                  <img src={rightImg} alt={`${content.title} - ${headingText} (2)`} />
                </div>
              </div>
            );
          } else {
            elements.push(
              <div key={`img-${index}`} className="content-image">
                <img src={imageData} alt={`${content.title} - ${headingText}`} />
              </div>
            );
          }
        }
      } else {
        elements.push(
          <p key={`p-${index}`} className="content-paragraph">
            {text}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <Fragment>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .project-detail, .project-detail * {
          font-family: "Space Grotesk", sans-serif !important;
        }
      `}</style>
      <div className="project-detail" style={{ fontFamily: "Space Grotesk, sans-serif !important" }}>
        <div className="project-detail-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Work
        </button>
      </div>

      <div className="project-hero-simple" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
        <h1 className="project-detail-title">{content.title}</h1>
        {content.subtitle && (
          <p className="project-detail-subtitle">{content.subtitle}</p>
        )}
        
        {content.role && (
          <div className="project-meta-simple">
            <p><strong>Role:</strong> {content.role}</p>
            {content.team && <p><strong>Team:</strong> {content.team}</p>}
          </div>
        )}
      </div>

      <div className="project-content-simple" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
        {renderContent()}
      </div>

      <div className="project-navigation">
      </div>
    </div>
    </Fragment>
  );
};

/* ---------- Notebook Layout (global background grid + margin) ---------- */
const NotebookLayout = ({ children, theme }) => {
  const themeBackgrounds = {
    ink:   { background: "black",                                                grid: "rgba(255,255,255,0.10)", text: "white", accent: "#ff4d4d" },
    pearl: { background: "white",                                                grid: "rgba(0,0,0,0.08)",       text: "black", accent: "#00bcd4" },
    rose:  { background: "linear-gradient(135deg, #ff0000 0%, #ff0062 50%, #ff0000 100%)",
             grid: "rgba(255,255,255,0.15)",                                     text: "white", accent: "#ff66cc" },
  };

  const config = themeBackgrounds[theme] || themeBackgrounds.ink;

  return (
    <div
      className="use-custom-cursor"   // ← ADD THIS
      style={{
        minHeight: "100vh",
        color: config.text,
        fontFamily: '"Space Grotesk", sans-serif',
        position: "relative",
      }}
    >
      {/* BACKGROUND FILL (bottom layer) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: config.background,
          zIndex: -2,
        }}
      />

      {/* GRID OVERLAY (always above the fill) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, ${config.grid} 1px, transparent 1px),
            linear-gradient(to bottom, ${config.grid} 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px, 20px 20px",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {/* NOTEBOOK MARGIN LINE */}
      {/*
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 60,
          width: 2,
          height: "100%",
          background: config.accent,
          opacity: 0.8,
          zIndex: 0,
        }}
      />
      */}

      {/* Foreground content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <GuideDotCursor theme={theme} grid={20} />
        {children}
          </div>
      </div>
  );
};

/* ---------- About Page (uses timeline) ---------- */
const TimelineStep = React.forwardRef(({ stage }, ref) => {
  const { ref: inViewRef, inView } = useInView({ threshold: 0.35, triggerOnce: false });

  // Merge the two refs so we can both measure and observe
  const setRefs = (el) => {
    if (ref) ref.current = el;
    inViewRef(el);
  };

  return (
    <div
      ref={setRefs}
      style={{
        marginBottom: "200px",
        opacity: inView ? 1 : 0.25,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "transform 450ms ease, opacity 450ms ease",
      }}
    >
      <h3 style={{ fontSize: 26, marginBottom: 8 }}>{stage.title}</h3>
      <p style={{ fontSize: 18, opacity: 0.8 }}>{stage.description}</p>
      <p style={{ fontSize: 16, marginTop: 10, fontStyle: "italic" }}>{stage.content}</p>
    </div>
  );
});

const TapedPhoto = ({
  src,
  alt,
  orientation = "portrait",
  rotate = 0,
  accent = "#ff4d4d",
  caption = "",
  backNote = "📓",
}) => {
  const [flipped, setFlipped] = React.useState(false);

  const dims =
    orientation === "portrait"
      ? { width: 240, aspectRatio: "3 / 4" }
      : orientation === "landscape"
      ? { width: 320, aspectRatio: "4 / 3" }
      : { width: 260, aspectRatio: "1 / 1" };

  return (
    <figure
      onClick={() => setFlipped(!flipped)}
      style={{
        perspective: "1000px",
        cursor: "pointer",
        width: dims.width,
        aspectRatio: dims.aspectRatio,
        margin: "20px",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {/* tape strip */}
      <span
        style={{
          position: "absolute",
          top: -12,
          left: "50%",
          transform: "translateX(-50%) rotate(-2deg)",
          width: 70,
          height: 16,
          background: "#d4a574",
          opacity: 0.8,
          borderRadius: 0,
          zIndex: 2,
        }}
      />

      {/* flipping card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* front image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: "0px",
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* back side */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.9)",
            color: "#333",
            borderRadius: "0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: '"Space Grotesk", monospace',
            fontSize: "16px",
            fontWeight: 500,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          }}
        >
          {backNote}
        </div>
      </div>

      {caption && (
        <figcaption
          style={{
            fontSize: 13,
            marginTop: 8,
            textAlign: "center",
            opacity: 0.75,
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

const AboutPage = ({ theme = "ink" }) => {
  const careerStages = [
    {
      id: "high-school",
      title: "High School",
      kicker: "Math was my first love",
      body: "I used to solve equations for fun and sketch whatever I saw around me—usually while scrolling Tumblr deep into the night.",
      glyph: "tanh",
    },
    {
      id: "undergrad",
      title: "Undergrad",
      kicker: "I studied art and technology",
      body: "I explored creative tech projects that lived between mediums—coding installations, designing speculative tools, and studying how systems and people interact.",
      glyph: "∫",
    },
    {
      id: "grad",
      title: "Grad School",
      kicker: "Architecture & Data Science era (barely slept)",
      body: "I pivoted to architecture to bring more math and physics into my creative work. That curiosity expanded into data science—and then transformers dropped, and suddenly I was prototyping everything from spatial tools to AI-powered workflows.",
      glyph: "▥",
    },
    {
      id: "work",
      title: "Work",
      kicker: "Working across disciplines",
      body: "I've worked across disciplines—designing, analyzing, and building with teams at Google, JPMorgan Chase, The Bond Center, CUNY, and Flad.",
      glyph: "⚡",
    },
    {
      id: "sabbatical",
      title: "Bereavement Sabbatical",
      kicker: "Loss",
      body: "A sudden cancer diagnosis and ultimately losing my mom shattered my world. I took some time to heal.",
      glyph: "♥",
    },
    {
      id: "work-now",
      title: "Now",
      kicker: "",
      body: "I've leaned fully into what I do best—crafting intuitive design systems powered by ML. My mother's ambition, intelligence, and kindness continue to inspire my work.",
      glyph: "{…}",
    },
  ];

  const accent =
    theme === "pearl" ? "#00bcd4" : theme === "rose" ? "#ff66cc" : "#ff4d4d";

  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const opts = { rootMargin: "0px 0px -50% 0px", threshold: 0.2 };
    const io = new IntersectionObserver((entries) => {
      const visible = entries.find((e) => e.isIntersecting);
      if (visible) setActiveIdx(Number(visible.target.dataset.index));
    }, opts);
    sectionRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const progress = ((activeIdx + 1) / careerStages.length) * 100;

  return (
    <section
      className="about-page"
      style={{
        paddingTop: "140px",
        paddingBottom: "140px",
        fontFamily: '"Space Grotesk", sans-serif',
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        boxSizing: "border-box",
      }}
    >
      {/* intro */}
      <div
        style={{
          marginBottom: "140px",
          padding: "80px 6vw", // keep a bit of breathing room
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <div style={{ flex: "1 1 420px", maxWidth: 700, textAlign: "center" }}>
          <img 
            src="/images/myname.gif" 
            alt="Tanha" 
            style={{ 
              height: "180px", 
              width: "auto", 
              marginBottom: "12px",
              objectFit: "contain"
            }} 
          />
          <p style={{ fontSize: 22, lineHeight: 1.75, opacity: 0.9 }}>
            My name, Tanha (تنحى) — pronounced (taan-haa) — means "carving" in Arabic
            and mirrors the tanh (hyperbolic tangent) function. That dual meaning
            reflects how I work: structured yet intuitive, analytical yet human.
          </p>
        </div>
        <div style={{ flex: "0 0 auto" }}>
          <TapedPhoto
            src={theme === "pearl" ? "/images/tanha.jpg" : "/images/tanha.jpg"}
            alt="Portrait"
            orientation="portrait"
            rotate={0}
            accent={accent}
          />
        </div>
      </div>

      {/* timeline grid */}
      <div
        className="timeline-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "60px",
          alignItems: "start",
          width: "100%",
          padding: "0 6vw",
          boxSizing: "border-box",
        }}
      >
        {/* sidebar */}
        <aside
          className="timeline-sidebar"
          style={{
            position: "sticky",
            top: "120px",
            alignSelf: "start",
          }}
        >
          <div style={{ position: "relative", paddingLeft: "20px" }}>
            {/* base line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "10px",
                width: "2px",
                height: "100%",
                background: "rgba(255,255,255,0.2)",
              }}
            />
            {/* red scroll */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "10px",
                width: "2px",
                height: `${progress}%`,
                background: accent,
                transition: "height 0.3s ease",
              }}
            />
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {careerStages.map((s, i) => (
                <li
                  key={s.id}
                  onClick={() =>
                    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    padding: "12px 0",
                    cursor: "pointer",
                    opacity: i === activeIdx ? 1 : 0.6,
                    transition: "opacity 0.3s",
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{s.title}</div>
                  <div style={{ fontSize: 13, opacity: 0.7 }}>{s.kicker}</div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* main content */}
        <div className="timeline-content">
          {careerStages.map((s, i) => (
            <article
              key={s.id}
              data-index={i}
              ref={(el) => (sectionRefs.current[i] = el)}
                style={{
                marginBottom: "100px",
                paddingBottom: "50px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h3 style={{ fontSize: 28, marginBottom: 8 }}>{s.title}</h3>
              {s.kicker && (
                <div style={{ fontSize: 16, opacity: 0.7, marginBottom: 10 }}>
                  {s.kicker}
              </div>
              )}
              <p style={{ fontSize: 20, lineHeight: 1.8, opacity: 0.9 }}>{s.body}</p>
            </article>
            ))}
          </div>
        </div>

      {/* hobbies collage */}
      <div
        style={{
          marginTop: "120px",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          padding: "80px 6vw",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            fontSize: 20,
            lineHeight: 1.7,
            maxWidth: 760,
            margin: "0 auto 70px",
            opacity: 0.9,
            textAlign: "center",
          }}
        >
          Outside of work, I really enjoy travel, photography and drinking coffee. I'm currently experimenting with brew temperature and grind size.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src="/images/about_scrap.gif"
            alt="About scrapbook"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

/* ---------- Home Page ---------- */
const HomePage = ({ theme }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Update local time
  useEffect(() => {
    const el = document.getElementById("local-time");
    if (!el) return;

    const updateTime = () => {
      const now = new Date();
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "America/New_York",
      };
      el.textContent = now.toLocaleTimeString([], options);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'product-design', label: 'Product Design' },
    { id: 'ai-ml', label: 'AI/ML' },
    { id: 'mobile-design', label: 'Mobile Design' },
    { id: 'data-visualization', label: 'Data Viz' },
    { id: 'writing', label: 'Writing/Research' },
    { id: 'human-computer-interaction', label: 'HCI' },
    { id: 'data-analysis', label: 'Data Analysis' },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section style={{ padding: "150px 40px 80px" }}>
      <div className="profile-image-container" style={{ display: "flex", justifyContent: "center", marginBottom: "60px" }}>
        <img 
          src={theme === "pearl" ? "/images/profile-light.gif" : "/images/profile-dark.gif"}
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
      <h1 style={{ fontSize: "48px", fontWeight: 700, marginBottom: "20px", textAlign: "right", color: "inherit" }}>
        I'm a Designer with a background in Data Science.
      </h1>
      <p style={{ fontSize: "30px", marginBottom: "40px", textAlign: "right", minHeight: 38 }}>
        <Typewriter
          text="I design from the inside out. I focus on turning AI-driven systems into intuitive tools."
          speed={90}        // slower; tweak 70–120 as you like
          startDelay={600}  // initial pause before typing
          cursorChar="▎"    // try "|" or "▋" if you prefer
        />
      </p>
      
      {/* Local time + coordinates */}
      <div
        style={{
          textAlign: "right",
          fontSize: "14px",
          opacity: 0.7,
          marginTop: "-20px",
          marginBottom: "60px",
          fontFamily: '"Space Grotesk", monospace',
        }}
      >
        <span id="local-time"></span> • 40.7128°N, 74.0060°W
      </div>
      
      {/* Projects Section */}
      <div style={{ marginTop: "80px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 600, marginBottom: "30px", color: "inherit" }}>
          Selected Work
        </h2>
        
        {/* Category filters */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: selectedCategory === category.id ? "rgba(255,255,255,0.1)" : "transparent",
                  color: "inherit",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
          </div>
          
        {/* Projects grid */}
        <div className="projects-grid" style={{ 
          width: "100vw", 
          position: "relative", 
          left: "50%", 
          right: "50%", 
          marginLeft: "-50vw", 
          marginRight: "-50vw"
        }}>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Visual Page ---------- */
const VisualPage = ({ theme }) => {
  const visualProjects = [
    {
      id: 'followme',
      title: 'Follow Me, Dania',
      type: 'album cover',
      description: 'Album cover design featuring bold typography and atmospheric visual elements.',
      imageData: '/images/visual/followme.png',
      externalLink: true
    },
    {
      id: 'mecollage',
      title: 'Self Portrait',
      type: 'art, graphic design',
      description: 'Abstract.',
      imageData: '/images/visual/mecollage.jpg'
    },
    {
      id: 'hejaz',
      title: 'Hejaz, Kingdom of Saudi Arabia',
      type: 'branding, visual design, logo',
      description: 'Cultural branding project celebrating the heritage and identity of the Hejaz region.',
      imageData: '/images/visual/hejaz.gif'
    },
    {
      id: 'bldg',
      title: 'New York Commissioner Building',
      type: 'illustration, commission',
      description: 'Detailed architectural illustration capturing the historic character of NYC landmark.',
      imageData: '/images/visual/bldg.jpg'
    },
    {
      id: 'sheikhdallah-corp',
      title: 'Sheikhdallah Corp',
      type: 'graphic design, commission',
      description: 'Corporate identity and graphic design solutions for business branding needs.',
      imageData: '/images/visual/sheikhdallah_corp.jpg'
    },
    {
      id: 'jism',
      title: 'Jism, جسم (Body)',
      type: 'illustration, anatomy series',
      description: 'Anatomical illustration series exploring the human form through artistic interpretation.',
      imageData: '/images/visual/jism.jpg'
    },
    {
      id: 'atc',
      title: 'Arab Tech Collective',
      type: 'graphic design, logo, branding',
      description: 'Modern identity design for tech community bridging Arab culture and innovation.',
      imageData: '/images/visual/atc.jpg'
    },
    {
      id: 'year2050',
      title: 'Year 2050, Film Festival',
      type: 'visual design, film poster, commission',
      description: 'Futuristic poster design commission capturing the essence of forward-thinking cinema.',
      imageData: '/images/visual/year2050.png'
    }
  ];

  return (
    <section style={{ padding: "150px 40px 80px" }}>
      <h1 style={{ fontSize: "40px", fontWeight: 700, marginBottom: "30px", color: "inherit" }}>
        Visual Projects
      </h1>
      <p style={{ fontSize: "18px", marginBottom: "40px", opacity: 0.8, color: "inherit" }}>
        A collection of branding, illustration, and creative explorations.
      </p>
      
      {/* Visual projects grid */}
      <div className="projects-grid">
        {visualProjects.map(project => (
          <div
            key={project.id}
            className={`project-card ${theme === 'ink' ? 'ink' : theme === 'rose' ? 'rose' : ''}`}
              style={{ 
                color: 'inherit', 
              transform: "translateZ(0)",
              transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
              border: "0.75px solid currentColor",
              borderRadius: 12,
              padding: 16,
              background: theme === 'ink' ? '#0f0f0f' : theme === 'rose' ? 'rgba(255,255,255,0.06)' : '#fff',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.18)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div className="project-card__media">
              <img
                src={project.imageData}
                alt={project.title}
                />
              </div>
            <div>
              <h3 className="project-card__title">
                {project.title}
              </h3>
              <p className="project-card__meta">
                {project.type}
              </p>
              <p className="project-card__desc">
                {project.description}
          </p>
        </div>
                  </div>
          ))}
      </div>
    </section>
  );
};

/* ---------- Contact Page ---------- */
const ContactPage = ({ theme = "ink" }) => {
  const linkColor = theme === "rose" ? "#ffffff" : "#ff4d4d";
  
  return (
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
          style={{ fontSize: "20px", textDecoration: "underline", color: linkColor }}
        >
          Email
        </a>
        <a
          href="https://linkedin.com/in/tanhata"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "20px", textDecoration: "underline", color: linkColor }}
        >
          LinkedIn
        </a>
    </div>
  </section>
);
};

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
      <ResponsiveGridCSS />
      <NotebookLayout theme={currentTheme}>
        <header
                  style={{
            padding: "20px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 10,
            borderBottom: "1px solid rgba(255,255,255,0.2)",

            // Theme background logic
            background:
              currentTheme === "ink"
                ? "#000000"
                : currentTheme === "pearl"
                ? "#ffffff"
                : "linear-gradient(135deg, #ff0044 0%, #ff0066 50%, #ff0044 100%)",
            color:
              currentTheme === "ink"
                ? "#ffffff"
                : currentTheme === "pearl"
                ? "#000000"
                : "#ffffff",

            boxShadow:
              currentTheme === "pearl"
                ? "0 2px 10px rgba(0,0,0,0.05)"
                : "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          {/* Navigation */}
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

          {/* Theme toggle buttons */}
          <div>
            {Object.entries(themeNames).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCurrentTheme(key)}
                style={{
                  marginLeft: "10px",
                  padding: "6px 10px",
                  background:
                    currentTheme === key
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                  border:
                    currentTheme === "pearl"
                      ? "1px solid rgba(0,0,0,0.2)"
                      : "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "6px",
                  color: "inherit",
                  cursor: "pointer",
                  fontSize: "12px",
                  transition: "all 0.25s ease",
                }}
              >
                {label}
              </button>
            ))}
          </div>
      </header>
      <Routes>
          <Route path="/" element={<HomePage theme={currentTheme} />} />
          <Route path="/about" element={<AboutPage theme={currentTheme} />} />
          <Route path="/visual" element={<VisualPage theme={currentTheme} />} />
          <Route path="/contact" element={<ContactPage theme={currentTheme} />} />
          <Route path="/project/:id" element={<ProjectDetailPage theme={currentTheme} />} />
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
