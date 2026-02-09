import React, { useState, useEffect, useMemo, useRef } from 'react';
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

/* ---------- MathNotebookViz (SVG lissajous path + stage dots) ---------- */
const MathNotebookViz = ({ stages, activeIndex, theme = "ink" }) => {
  const themeColors = {
    ink:   { stroke: "#ff4d4d", dot: "#ff4d4d", base: "rgba(255,255,255,0.25)" },
    pearl: { stroke: "#00bcd4", dot: "#00bcd4", base: "rgba(0,0,0,0.35)" },
    rose:  { stroke: "#ffffff", dot: "#ffffff", base: "rgba(255,255,255,0.45)" },
  };
  const colors = themeColors[theme] || themeColors.ink;

  const W = 320;           // svg width
  const H = 420;           // svg height
  const PAD = 24;          // padding inside svg
  const cx = W / 2, cy = H / 2;
  const R = Math.min(W, H) / 2 - PAD;

  // Lissajous parameters (mildly asymmetrical for visual interest)
  const Ax = R * 0.95, Ay = R * 0.78;
  const a = 3, b = 2, delta = Math.PI / 6;

  // Build the curve
  const samples = 600;
  const pts = Array.from({ length: samples }, (_, i) => {
    const t = (i / (samples - 1)) * Math.PI * 2;
    const x = cx + Ax * Math.sin(a * t + delta);
    const y = cy + Ay * Math.sin(b * t);
    return [x, y];
  });
  const pathD = `M ${pts.map(p => p.join(",")).join(" L ")}`;

  // Evenly place N stage markers along the curve
  const n = stages.length;
  const markIdx = Array.from({ length: n }, (_, i) =>
    Math.round((i / (n - 1)) * (samples - 1))
  );
  const marks = markIdx.map(i => pts[i]);

  // "Progress" dot follows activeIndex along the path
  const progressIdx = Math.round(
    ((activeIndex) / (n - 1)) * (samples - 1)
  );
  const progressPt = pts[progressIdx];

  return (
    <svg
      width="100%"
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Career path visualization"
      style={{ display: "block" }}
    >
      {/* Axes (subtle, notebook-ish) */}
      <line x1={PAD} y1={cy} x2={W-PAD} y2={cy} stroke={colors.base} strokeWidth="1" />
      <line x1={cx} y1={PAD} x2={cx} y2={H-PAD} stroke={colors.base} strokeWidth="1" />

      {/* Curve */}
      <path d={pathD} fill="none" stroke={colors.base} strokeWidth="1.5" />

      {/* Stage markers */}
      {marks.map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r={i <= activeIndex ? 6 : 5}
            fill={i <= activeIndex ? colors.dot : "transparent"}
            stroke={i <= activeIndex ? colors.dot : colors.base}
            strokeWidth="1.5"
          />
          {/* tiny label nudge so it doesn't overlap the dot */}
          <text
            x={x + 10}
            y={y - 8}
            fontSize="11"
            fill={i <= activeIndex ? colors.dot : colors.base}
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            {stages[i].title}
          </text>
        </g>
      ))}

      {/* Progress beacon */}
      <circle
        cx={progressPt[0]}
        cy={progressPt[1]}
        r="8"
        fill={colors.dot}
        opacity="0.85"
      >
        <animate attributeName="r" values="7;9;7" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

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

/* --- tiny hand-drawn doodles (inline SVGs) --- */
const DoodleSigma = ({ size=26, stroke="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={{ filter: "url(#squiggle)" }}>
    <defs>
      <filter id="squiggle">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1"/>
      </filter>
    </defs>
    <path d="M52 10H16l18 22-18 22h36" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DoodleTanh = ({ size=26, stroke="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={{ filter: "url(#squiggle)" }}>
    <defs>
      <filter id="squiggle">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1"/>
      </filter>
    </defs>
    <path d="M6 32 C 14 32, 18 8, 28 8 S 38 56, 48 56 S 58 36, 58 32" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const DoodleIntegral = ({ size=26, stroke="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={{ filter: "url(#squiggle)" }}>
    <path d="M30 4c-8 0-10 8-10 16v24c0 8 2 16 10 16M34 60c8 0 10-8 10-16" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const DoodleLoss = ({ size=26, stroke="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={{ filter: "url(#squiggle)" }}>
    <path d="M8 52 L24 36 L38 44 L56 12" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round"/>
    <path d="M56 12l-10 2" stroke={stroke} strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const DoodleHeart = ({ size=26, stroke="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={{ filter: "url(#squiggle)" }}>
    <path d="M32 56s-18-12-22-22c-4-10 4-18 12-18 6 0 10 4 10 4s4-4 10-4c8 0 16 8 12 18-4 10-22 22-22 22z" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DoodleBraces = ({ size=26, stroke="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={{ filter: "url(#squiggle)" }}>
    <path d="M24 8c-6 0-10 4-10 10v6c0 4-2 6-6 6 4 0 6 2 6 6v6c0 6 4 10 10 10M40 8c6 0 10 4 10 10v6c0 4 2 6 6 6-4 0-6 2-6 6v6c0 6-4 10-10 10" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

/* choose doodle by key */
const DOODLES = {
  sigma: DoodleSigma,
  tanh: DoodleTanh,
  integral: DoodleIntegral,
  loss: DoodleLoss,
  heart: DoodleHeart,
  braces: DoodleBraces,
};

function useScrollProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const start = vh * 0.1;   // start anim when top hits 10% viewport
        const end   = vh * 0.9;   // finish by 90%
        const y = rect.top;
        const raw = 1 - (y - start) / (rect.height + (vh - end));
        setP(Math.max(0, Math.min(1, raw)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return p;
}

/* ---------- Arc of Practice (parametric curve w/ sketches & reveals) ---------- */
const ArcOfPractice = ({
  milestones,            // [{title, subtitle, note, artifact, sketch}, ...]
  accent = "#ff4d4d",
  onActive = () => {}
}) => {
  // Lissajous params (tweak tastefully)
  const A = 260, B = 180, a = 3, b = 2, δ = Math.PI / 2.8, PAD = 40;
  const samples = 420;

  // Build curve points
  const pts = Array.from({ length: samples }, (_, i) => {
    const t = (i / (samples - 1)) * 2 * Math.PI;
    const x = A * Math.sin(a * t + δ);
    const y = B * Math.sin(b * t);
    return [x + A + PAD, y + B + PAD];
  });

  const pathD = pts.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");

  // Milestone positions evenly along t
  const stops = milestones.map((m, i) => {
    const t = (i / (milestones.length - 1)) * (samples - 1);
    const idx = Math.round(t);
    const [x, y] = pts[idx];
    return { ...m, idx, x, y, progressAt: idx / (samples - 1) }; // 0..1
  });

  // Scroll progress
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const el = wrapRef.current;
    const onScroll = () => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress while the SVG block is in view. Multiplier < 1 => slower.
      const p = 1 - Math.min(1, Math.max(0, (r.bottom - vh * 0.2) / (r.height + vh * 0.6)));
      setProgress(Math.max(0, Math.min(1, p * 0.8))); // slower feel (0.8)
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Active milestone (closest whose progressAt <= progress)
  const activeIdx = useMemo(() => {
    let idx = 0;
    for (let i = 0; i < stops.length; i++) {
      if (stops[i].progressAt <= progress) idx = i;
    }
    return idx;
  }, [stops, progress]);

  useEffect(() => onActive(activeIdx), [activeIdx, onActive]);

  const cursorIdx = Math.max(0, Math.min(samples - 1, Math.round(progress * (samples - 1))));
  const [cx, cy] = pts[cursorIdx];

  // tiny "hand-drawn" sketches (SVG strokes)
  const Sketch = ({ kind, x, y, active }) => {
    const stroke = active ? accent : "rgba(255,255,255,0.4)";
    const fill = active ? accent : "transparent";
    const s = 1;
    switch ((kind || "").toLowerCase()) {
      case "sigma":
        return (
          <g transform={`translate(${x},${y}) scale(${s})`} stroke={stroke} fill="none" strokeWidth="2">
            <path d="M-10,-8 L10,-8 M-10,8 L10,8 M-10,-8 L0,0 L-10,8" />
          </g>
        );
      case "tanh":
        return (
          <g transform={`translate(${x},${y}) scale(${s})`} stroke={stroke} fill="none" strokeWidth="2">
            <path d="M-12,0 C-8,-14 8,14 12,0" />
          </g>
        );
      case "integral":
        return (
          <g transform={`translate(${x},${y}) scale(${s})`} stroke={stroke} fill="none" strokeWidth="2">
            <path d="M-4,-12 C-10,-8 -10,8 -4,12 M4,-12 C10,-8 10,8 4,12" />
          </g>
        );
      case "heart":
        return (
          <g transform={`translate(${x},${y}) scale(${s})`} fill={fill} stroke={stroke} strokeWidth="2">
            <path d="M0,8 C-6,2 -10,-2 -10,-6 C-10,-10 -6,-12 -3,-10 C-1,-9 0,-7 0,-7
                     C0,-7 1,-9 3,-10 C6,-12 10,-10 10,-6 C10,-2 6,2 0,8 Z"/>
          </g>
        );
      default:
        return <circle cx={x} cy={y} r="4" fill={fill} stroke={stroke} strokeWidth="2" />;
    }
  };

  return (
    <div ref={wrapRef} style={{ position: "sticky", top: "8vh" }}>
      <svg
        width={A * 2 + PAD * 2}
        height={B * 2 + PAD * 2}
        viewBox={`0 0 ${A * 2 + PAD * 2} ${B * 2 + PAD * 2}`}
        style={{ display: "block", overflow: "visible" }}
      >
        {/* base curve */}
        <path d={pathD} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

        {/* progress curve */}
        <path
          d={pts.slice(0, cursorIdx + 1).map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ")}
          fill="none"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* cursor */}
        <circle cx={cx} cy={cy} r="6" fill={accent} stroke="white" strokeWidth="2" />

        {/* stops, labels, sketches */}
        {stops.map((s, i) => {
          const active = i <= activeIdx;
          return (
            <g key={i}>
              <circle cx={s.x} cy={s.y} r="7" fill={active ? accent : "black"} stroke="white" strokeWidth="2" />
              <Sketch kind={s.sketch} x={s.x - 22} y={s.y - 18} active={active} />
              <text
                x={s.x + 14}
                y={s.y + 4}
                fill={active ? "white" : "rgba(255,255,255,0.6)"}
                fontSize="12"
                fontFamily='"Space Grotesk", system-ui, sans-serif'
              >
                {s.title}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Reveal cards for active milestone */}
      {stops.map((s, i) => {
        const active = i === activeIdx;
        return (
          <div
            key={`card-${i}`}
            style={{
              position: "absolute",
              left: s.x + 60,
              top: s.y - 40,
              width: 360,
              padding: "14px 16px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(6px)",
              color: "white",
              pointerEvents: "none",
              opacity: active ? 1 : 0,
              transform: `translateY(${active ? 0 : 8}px)`,
              transition: "opacity 320ms ease, transform 320ms ease",
            }}
          >
            <div style={{ fontSize: 14, letterSpacing: 0.2, opacity: 0.9 }}>{s.subtitle}</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{s.title}</div>
            <div style={{ fontSize: 14, fontStyle: "italic", marginTop: 8, opacity: 0.85 }}>{s.note}</div>
            {s.artifact && (
              <div style={{ marginTop: 10, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
                <img src={s.artifact} alt={s.title} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ---------- Scrolly About (Pudding-style) ---------- */
const AboutPage = ({ theme = "ink" }) => {
  const careerStages = [
    {
      id: "intro",
      title: "Tanha (تنحى)",
      kicker: "Carving",
      body:
        "My name, Tanha (تنحى) — pronounced (taan-haa) — means 'carving' in Arabic and mirrors the tanh (hyperbolic tangent of (a)) function. That dual meaning reflects how I work: structured yet intuitive, deeply analytical but always grounded in human-centered design.",
      glyph: "σ",
    },
    {
      id: "high-school",
      title: "High School",
      kicker: "Math was my first love",
      body:
        "I used to solve equations for fun and sketch whatever I saw around me—usually while scrolling Tumblr deep into the night.",
      glyph: "tanh",
    },
    {
      id: "undergrad",
      title: "Undergrad",
      kicker: "I studied art and technology",
      body:
        "I explored creative tech projects that lived between mediums—coding installations, designing speculative tools, and studying how systems and people interact.",
      glyph: "∫",
    },
    {
      id: "grad",
      title: "Grad School",
      kicker: "Architecture & Data Science era (barely slept)",
      body:
        "I pivoted to architecture to bring more math and physics into my creative work. That curiosity very quickly expanded into data science — and then transformers dropped, and suddenly I was prototyping everything from spatial tools to AI-powered workflows.",
      glyph: "▥",
    },
    {
      id: "work",
      title: "Work",
      kicker: "Working across disciplines",
      body:
        "I've worked across disciplines—designing, analyzing, and building with teams at Google, JPMorgan Chase, The Bond Center, CUNY, and Flad. My projects have spanned everything from data platforms and digital workflows to ML-driven product experiences.",
      glyph: "♥",
    },
    {
      id: "sabbatical",
      title: "Bereavement Sabbatical",
      kicker: "Loss",
      body:
        "A sudden cancer diagnosis and ultimately losing my mom shattered my world. I took some time to heal.",
      glyph: "♥",
    },
    {
      id: "now",
      title: "Now",
      kicker: "Persevered and returned to doing what I love!",
      body:
        "I've leaned fully into what I do best—crafting intuitive design systems powered by ML. My mother's ambition, intelligence, kindness, and tenacity have deeply shaped my values and drive. She remains the inspiration behind my pursuit of meaningful work. Outside of work, I really enjoy traveling, fashion, food, photography, and tinkering with mechanical keyboards. I really enjoy coffee — I'm currently experimenting with grind size and brew temperature.",
      glyph: "{…}",
    },
  ];

  const accent = theme === "pearl" ? "#00bcd4" : theme === "rose" ? "#ff66cc" : "#ff4d4d";

  // Track active section
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRefs = useRef([]);

  // Observe sections to update active index + URL hash like The Pudding
  useEffect(() => {
    const opts = { root: null, rootMargin: "0px 0px -50% 0px", threshold: 0.1 };
    const io = new IntersectionObserver((entries) => {
      // pick the most visible in viewport center-ish
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const idx = Number(visible.target.getAttribute("data-index"));
      setActiveIdx(idx);

      // update hash (so deep-links work) without jump
      const id = careerStages[idx].id;
      if (id && window.location.hash.replace("#", "") !== id) {
        history.replaceState(null, "", `#${id}`);
      }
    }, opts);

    sectionRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // On load, scroll to hash if present
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const idx = careerStages.findIndex((s) => s.id === id);
    if (idx >= 0 && sectionRefs.current[idx]) {
      sectionRefs.current[idx].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Smooth scroll when clicking left index
  const goTo = (i) => {
    const el = sectionRefs.current[i];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="about-scrolly"
      style={{
        paddingTop: "140px",
        paddingBottom: "140px",
        minHeight: "100vh",
        position: "relative",
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
      }}
    >
      {/* Debug info */}
      <div style={{ position: "fixed", top: "10px", right: "10px", background: "rgba(0,0,0,0.8)", color: "white", padding: "10px", fontSize: "12px", zIndex: 9999 }}>
        Active: {activeIdx} | Theme: {theme} | Accent: {accent}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px",
        }}
      >
        {/* LEFT: sticky index with progress spine + dots (Pudding style) */}
        <aside
          style={{
            position: "sticky",
            alignSelf: "start",
            top: "120px",
            height: "calc(100vh - 160px)",
            paddingRight: "10px",
          }}
        >
          <div style={{ position: "relative", height: "100%" }}>
            {/* spine */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: "10px",
                top: 0,
                bottom: 0,
                width: "2px",
                background: "rgba(255,255,255,0.2)",
              }}
            />
            {/* progress bar (fills behind the dots) */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: "10px",
                top: 0,
                width: "2px",
                height: `${((activeIdx + 1) / careerStages.length) * 100}%`,
                background: accent,
                transition: "height 300ms ease",
              }}
            />

            {/* items */}
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {careerStages.map((s, i) => {
                const active = i === activeIdx;
                return (
                  <li
                    key={s.id}
                    onClick={() => goTo(i)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "24px 1fr",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      padding: "14px 0",
                      opacity: active ? 1 : 0.7,
                      transition: "opacity 200ms ease",
                    }}
                  >
                    {/* dot */}
                    <span
                      aria-hidden
                      style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        border: "2px solid white",
                        background: active ? accent : "black",
                        boxShadow: active ? "0 0 0 2px rgba(255,255,255,0.6)" : "none",
                      }}
                    />
                    {/* labels */}
                    <div>
                      <div style={{ fontSize: 12, letterSpacing: 0.5, opacity: 0.7 }}>{s.kicker}</div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{s.title}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* RIGHT: content sections drive the left index */}
        <div>
          {careerStages.map((s, i) => (
            <article
              id={s.id}
              key={s.id}
              data-index={i}
              ref={(el) => (sectionRefs.current[i] = el)}
              style={{
                scrollMarginTop: "120px",
                padding: "48px 0 80px",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {/* "math glyph" divider row */}
              <div
                aria-hidden
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "18px",
                  opacity: i <= activeIdx ? 1 : 0.4,
                }}
              >
                <span style={{ fontStyle: "italic", fontSize: 20 }}>{s.glyph}</span>
                <div style={{ height: 1, background: "rgba(255,255,255,0.25)", flex: 1 }} />
              </div>

              <h2 style={{ fontSize: 28, lineHeight: 1.12, margin: "0 0 6px" }}>{s.title}</h2>
              <div style={{ fontSize: 16, opacity: 0.75, marginBottom: 12 }}>{s.kicker}</div>
              <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 760, opacity: 0.9 }}>{s.body}</p>

              {/* optional artifact row (drop your images/gifs here) */}
              {/* <img src="/images/..." alt="" style={{ marginTop: 14, borderRadius: 10, maxWidth: "100%", border: "1px solid rgba(255,255,255,0.15)" }} /> */}
            </article>
          ))}
        </div>
      </div>

      {/* Mobile: put the index on top as a horizontal scrubber */}
      <style>{`
        @media (max-width: 900px) {
          .about-scrolly > div { 
            grid-template-columns: 1fr; 
          }
          .about-scrolly aside {
            position: sticky;
            top: 80px;
            height: auto;
            padding-bottom: 12px;
            background: transparent;
            margin-bottom: 10px;
          }
          .about-scrolly aside > div { height: auto; }
          .about-scrolly aside ul {
            display: grid;
            grid-template-columns: repeat(${careerStages.length}, minmax(140px, 1fr));
            gap: 10px;
            overflow-x: auto;
            padding-bottom: 8px;
          }
          .about-scrolly aside > div > div:first-child,
          .about-scrolly aside > div > div:nth-child(2) {
            display: none; /* hide vertical spine/progress on mobile */
          }
        }
      `}</style>
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
