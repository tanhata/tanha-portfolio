import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
      max-height: 520px;
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
      border-color: rgba(255,255,255,0.12);
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

  `}</style>
);

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
  orientation = "portrait", // "portrait" | "landscape" | "square"
  rotate = 0,
  accent = "#ff4d4d",
  caption,
}) => {
  const dims =
    orientation === "portrait"
      ? { width: 240, aspectRatio: "3 / 4" }
      : orientation === "landscape"
      ? { width: 320, aspectRatio: "4 / 3" }
      : { width: 260, aspectRatio: "1 / 1" };

  return (
    <figure
      style={{
        position: "relative",
        margin: "20px",
        transform: `rotate(${rotate}deg)`,
        width: dims.width,
        aspectRatio: dims.aspectRatio,
      }}
    >
      {/* tape */}
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
          borderRadius: 3,
        }}
      />
      {/* photo only */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          borderRadius: 0,
          boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
        }}
      />
      {caption && (
        <figcaption
          style={{
            fontSize: 13,
            marginTop: 6,
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
          Outside of work, I enjoy travel, design, photography, coffee, and collecting
          small moments that make life beautiful.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
            width: "100%",
          }}
        >
          <TapedPhoto
            src="/images/about/IMG_8660.JPG"
            orientation="landscape"
            rotate={0}
              accent={accent}
            />
          <TapedPhoto
            src="/images/about/coffeesteel.JPEG"
            orientation="square"
            rotate={0}
            accent={accent}
          />
          <TapedPhoto
            src="/images/about/IMG_0975.JPEG"
            orientation="landscape"
            rotate={0}
            accent={accent}
          />
          <TapedPhoto
            src="/images/about/IMG_1640.JPG"
            orientation="portrait"
            rotate={0}
            accent={accent}
          />
          <TapedPhoto
            src="/images/about/IMG_2222.JPG"
            orientation="landscape"
            rotate={0}
            accent={accent}
          />
          <TapedPhoto
            src="/images/about/IMG_2989.JPG"
            orientation="portrait"
            rotate={0}
            accent={accent}
          />
          <TapedPhoto
            src="/images/about/IMG_3223.JPG"
            orientation="square"
            rotate={0}
            accent={accent}
          />
          <TapedPhoto
            src="/images/about/IMG_3623.JPEG"
            orientation="landscape"
            rotate={0}
            accent={accent}
          />
          <TapedPhoto
            src="/images/about/IMG_4848.JPEG"
            orientation="portrait"
            rotate={0}
            accent={accent}
          />
          <TapedPhoto
            src="/images/about/IMG_4970.JPEG"
            orientation="square"
            rotate={0}
            accent={accent}
          />
          <TapedPhoto
            src="/images/about/IMG_5034.JPEG"
            orientation="landscape"
            rotate={0}
            accent={accent}
          />
          <TapedPhoto
            src="/images/about/1033B10E-A711-4AB7-96A1-02DC9925DD5D.JPEG"
            orientation="portrait"
            rotate={0}
            accent={accent}
          />
          <TapedPhoto
            src="/images/about/776A973B-1C0C-4623-A390-4F5469BA2454.JPG"
            orientation="square"
            rotate={0}
            accent={accent}
          />
          <TapedPhoto
            src="/images/about/8AF0AAAC-B8CB-4347-8DDE-D1504A0358BA.jpg"
            orientation="landscape"
            rotate={0}
            accent={accent}
          />
          <TapedPhoto
            src="/images/about/IDG_20250719_124959_569.JPEG"
            orientation="portrait"
            rotate={0}
            accent={accent}
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
    { id: 'spatial-geospatial', label: 'Spatial' },
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
        I'm a Product Designer and Data Scientist.
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
          {filteredProjects.map(project => {
            const ProjectWrapper = project.externalLink ? 'a' : 'div';
            const wrapperProps = project.externalLink ? {
              href: project.externalLink,
              target: "_blank",
              rel: "noopener noreferrer",
              style: { textDecoration: 'none', color: 'inherit' }
            } : {};
            
            return (
              <ProjectWrapper
                key={project.id}
                {...wrapperProps}
              >
                <div
                  className={`project-card ${theme === 'ink' ? 'ink' : theme === 'rose' ? 'rose' : ''}`}
                  style={{ 
                    color: 'inherit', 
                    transform: "translateZ(0)",
                    transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
                    border: "0.75px solid currentColor",
                    borderRadius: 12,
                    padding: 16,
                    background: theme === 'ink' ? '#0f0f0f' : theme === 'rose' ? 'rgba(255,255,255,0.06)' : '#fff',
                    cursor: project.externalLink ? 'pointer' : 'default',
                    position: 'relative'
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
                  <div className="project-card__media" style={{ position: 'relative' }}>
                    <img
                      src={project.imageData}
                      alt={project.title}
                    />
                    {project.externalLink && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(255,255,255,0.9)',
                        color: '#000',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        ↗
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="project-card__title">
                      {project.title}
                    </h3>
                    
                    {/* Company and Year metadata */}
                    {(project.company || project.year) && (
                      <div style={{ marginBottom: '8px' }}>
                        <span style={{ 
                          fontSize: '12px', 
                          color: 'rgba(255,255,255,0.6)', 
                          fontWeight: '500' 
                        }}>
                          {project.year}{project.year && project.company && ' • '}{project.company}
                        </span>
                      </div>
                    )}
                    
                    <p className="project-card__meta">
                      {project.type}
                    </p>
                    <p className="project-card__desc">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '4px', 
                        marginTop: '12px' 
                      }}>
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span 
                            key={index} 
                            style={{
                              fontSize: '10px',
                              background: 'rgba(255,255,255,0.1)',
                              color: 'rgba(255,255,255,0.8)',
                              padding: '2px 6px',
                              borderRadius: '8px',
                              border: '1px solid rgba(255,255,255,0.15)',
                              fontWeight: '500'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span style={{
                            fontSize: '10px',
                            background: 'rgba(255,255,255,0.05)',
                            color: 'rgba(255,255,255,0.6)',
                            padding: '2px 6px',
                            borderRadius: '8px',
                            fontWeight: '500'
                          }}>
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </ProjectWrapper>
            );
          })}
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
