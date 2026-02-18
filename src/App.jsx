import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */
const CAT = {
  "product-design":            { label:"Product Design", color:"#dc3545" },
  "ai-ml":                     { label:"AI / ML",        color:"#f59e0b" },
  "data-visualization":        { label:"Data Viz",       color:"#a78bfa" },
  "data-analysis":             { label:"Data Analysis",  color:"#60a5fa" },
  "mobile-design":             { label:"Mobile",         color:"#34d399" },
  "writing":                   { label:"Research",       color:"#fb7185" },
  "human-computer-interaction":{ label:"HCI",            color:"#38bdf8" },
};
const gc = id => CAT[id] || CAT["product-design"];

const PROJECTS = [
  { id:"lattice",       title:"Lattice",                  sub:"Next Gen Experiment Tracking", desc:"ML experiment tracker connecting experiments, papers, and evaluations.",              cat:"product-design", img:"/images/lattice.png",         link:"https://tanhata.github.io/lattice-case-study/",    year:"2026", tags:["Product Design"],                featured:true },
  { id:"model-pulse",   title:"ModelPulse",               sub:"AI Performance Platform",      desc:"Enterprise observability — detect drift, monitor accuracy, manage compliance.",       cat:"product-design", img:"/images/model-pulse.jpg",     link:"https://tanhata.github.io/modelpulse-case-study/", year:"2025", tags:["React","D3.js","Product Design"], featured:true },
  { id:"plotmind",      title:"Plotmind",                  sub:"No-Code Data Intelligence",    desc:"Low-code environment for advanced data visualizations in enterprise pipelines.",     cat:"product-design", img:"/images/plotmind.png",        link:"https://tanhata.github.io/plotmind-case-study/",   year:"2025", tags:["Framer","Python","Product Design"], featured:true },
  { id:"code-gen",      title:"AI Design Tools",           sub:"Code Gen Research",            desc:"How design teams leverage LLM-driven code assistants for front-end prototyping.",     cat:"writing",        img:"/images/codereview.png",      link:"https://open.substack.com/pub/talshe/p/dissecting-ai-design-capabilities", year:"2025", tags:["Research"] },
  { id:"mcp",           title:"Multi-Agent Collaboration", sub:"MCP Interface",                desc:"Conversation UIs enabling distributed AI agents to coordinate and refine outputs.",   cat:"product-design", img:"/images/mcp.gif",            link:"https://tanhata.github.io/mcp-case-study/",        year:"2024", tags:["Figma","Product Design"],        featured:true },
  { id:"tangent",       title:"Tangent",                   sub:"Parametric Geometry",          desc:"Real-time parametric geometry with natural language input and live 3D.",             cat:"product-design", img:"/images/tangent.png",  link:"https://docs.google.com/presentation/d/e/2PACX-1vRjNEWLMh6TRxoEeeHaeL_ePIp357aN6xCbF96EgSPOmyIOAjsyWw7KoLbwnlk5QlhleyfO8OZxrGbA/pub", year:"2024", tags:["Figma","Python"] },
  { id:"recursive-orbit",title:"Recursive Orbit",         sub:"Grief & Memory",               desc:"Interactive visualization exploring grief via generative data.",                     cat:"data-visualization", img:"/images/recursive-orbit.gif", link:"https://tanhata.github.io/recursive-orbit/",   year:"2024", tags:["Javascript"] },
  { id:"aura",          title:"AURA",                      sub:"AR Museum Guide",              desc:"AR museum guide — spatial storytelling through layered narratives.",                 cat:"mobile-design",  img:"/images/aura.png",           link:"https://tanhata.github.io/aura-case-study/",       year:"2022", tags:["AR/VR","Mobile"], featured:true },
  { id:"green-spaces",  title:"The Green Divide",          sub:"NYC Park Access",              desc:"Mapping disparities in park access across NYC neighborhoods.",                      cat:"data-analysis",  img:"/images/green_spaces.gif",   link:"/green_divide_story.html",                         year:"2021", tags:["Python"] },
  { id:"bitlot",        title:"BitLot",                    sub:"Product Analytics",            desc:"Product analytics platform for data-driven decisions.",                            cat:"data-analysis",  img:"/images/bitlot.gif",         link:"https://drive.google.com/file/d/1tAwTFKHjWch9u-SEe0oKMHvTClIR3FT8/view", year:"2021", tags:["Python"] },
  { id:"heating",       title:"Energy Optimization",       sub:"Predictive ML",                desc:"Building heating load optimization and energy efficiency.",                        cat:"ai-ml",          img:"/images/heating-loads.gif",   link:"https://drive.google.com/file/d/1FHQsm3s1dJWWMKKBy-QRjClEO3rS2OZ8/view", year:"2022", tags:["Python","AI/ML"] },
  { id:"living",        title:"Living Computing",          sub:"Adaptive Interfaces",          desc:"Interfaces that respond to human behavior and context.",                           cat:"human-computer-interaction", img:"/images/living-computing.gif", link:"https://www.youtube.com/watch?v=Geo17VbvWtU", year:"2021", tags:["Arduino","C++"] },
  { id:"gravity",       title:"Gravity Game",              sub:"Physics Simulation",           desc:"Physics-based interactive game.",                                                 cat:"human-computer-interaction", img:"/images/gravitygame.png", link:"https://tanhata.github.io/gravitygame/",       year:"2020", tags:["HCI"] },
];
const FEATURED = PROJECTS.filter(p => p.featured);
const DATA_PROJECTS = PROJECTS.filter(p => ["data-analysis","ai-ml","data-visualization","writing"].includes(p.cat) && !p.featured);

const CAREER = [
  { id:"high-school", title:"High School",           kicker:"Math was my first love",                         body:"I used to solve equations for fun and sketch whatever I saw around me — usually while scrolling Tumblr deep into the night." },
  { id:"undergrad",   title:"Undergrad",              kicker:"I studied art and technology",                   body:"I explored creative tech projects that lived between mediums — coding installations, designing speculative tools, and studying how systems and people interact." },
  { id:"grad",        title:"Grad School",            kicker:"Architecture & Data Science era (barely slept)", body:"I pivoted to architecture to bring more math and physics into my creative work. That curiosity expanded into data science — and then transformers dropped, and suddenly I was prototyping everything from spatial tools to AI-powered workflows." },
  { id:"work",        title:"Work",                   kicker:"Working across disciplines",                    body:"I've worked across disciplines — designing, analyzing, and building with teams at Google, JPMorgan Chase, The Bond Center, CUNY, and Flad." },
  { id:"sabbatical",  title:"Bereavement Sabbatical", kicker:"Loss",                                          body:"A sudden cancer diagnosis and ultimately losing my mom shattered my world. I took some time to heal." },
  { id:"now",         title:"Now",                    kicker:"",                                              body:"I've leaned fully into what I do best — crafting intuitive design systems powered by ML. My mother's ambition, intelligence, and kindness continue to inspire my work." },
];

const VISUALS = [
  { id:"followme",     title:"Follow Me, Dania",              type:"album cover",     img:"/images/visual/followme.png", ratio:"1/1" },
  { id:"mecollage",    title:"Self Portrait",                  type:"illustration, handdrawn", img:"/images/visual/mecollage.jpg" },
  { id:"hejaz",        title:"Hejaz, Kingdom of Saudi Arabia", type:"branding",        img:"/images/visual/hejaz.gif", ratio:"1/1" },
  { id:"bldg",         title:"NYC Commissioner Building",      type:"illustration",    img:"/images/visual/bldg.jpg" },
  { id:"sheikhdallah", title:"Sheikhdallah Corp",              type:"graphic design",  img:"/images/visual/sheikhdallah_corp.jpg" },
  { id:"jism",         title:"Jism, \u062c\u0633\u0645 (Body)",type:"illustration, handdrawn", img:"/images/visual/jism.jpg" },
  { id:"atc",          title:"Arab Tech Collective",           type:"branding",        img:"/images/visual/atc.jpg" },
  { id:"year2050",     title:"Year 2050, Film Festival",       type:"poster",          img:"/images/visual/year2050.png" },
];

/* ═══════════════════════════════════════════════════════════════════
   INTENT
   ═══════════════════════════════════════════════════════════════════ */
const PROJECT_RESPONSES = {
  lattice:          { text:"Lattice — next-gen ML experiment tracker. Teams lose track of how experiments connect to papers and prior work. I designed the full end-to-end experience.", link:"https://tanhata.github.io/lattice-case-study/" },
  "model-pulse":    { text:"ModelPulse — enterprise observability for ML in production. Drift detection, accuracy monitoring, compliance. Built the data viz layer with React + D3.js.", link:"https://tanhata.github.io/modelpulse-case-study/" },
  plotmind:         { text:"Plotmind — low-code data intelligence. Enterprise teams build advanced visualizations without writing code. I designed the visual pipeline builder.", link:"https://tanhata.github.io/plotmind-case-study/" },
  mcp:              { text:"MCP — multi-agent AI collaboration. Multiple language models coordinate and refine each other's outputs. I designed conversation playback and the developer console.", link:"https://tanhata.github.io/mcp-case-study/" },
  tangent:          { text:"Tangent — parametric geometry with natural language. Describe a shape in words, watch it build in real-time." },
  "recursive-orbit":{ text:"Recursive Orbit — grief through generative data. Orbits decay, patterns shift. Built in pure JavaScript. The most emotionally honest piece I've made." },
  aura:             { text:"AURA — AR museum guide. Spatial storytelling through layered narratives. I designed the navigation, AR overlays, and content architecture." },
};
const PROJECT_CHIPS = ["Tell me about Lattice","What's ModelPulse?","Explore MCP","What's Plotmind?"];

function matchIntent(q) {
  const s = q.toLowerCase();
  if (/lattice/i.test(s)) return "p:lattice";
  if (/model\s?pulse/i.test(s)) return "p:model-pulse";
  if (/plotmind/i.test(s)) return "p:plotmind";
  if (/mcp|multi.?agent/i.test(s)) return "p:mcp";
  if (/tangent/i.test(s)) return "p:tangent";
  if (/recursive|orbit/i.test(s)) return "p:recursive-orbit";
  if (/aura|museum/i.test(s)) return "p:aura";
  if (/all.?project|everything|archive|13/i.test(s)) return "all";
  if (/project|work|portfolio|show|featured/i.test(s)) return "projects";
  if (/about|who|background|story/i.test(s)) return "about";
  if (/skill|stack|tool|process|approach/i.test(s)) return "skills";
  if (/contact|email|reach|hire|linkedin/i.test(s)) return "contact";
  if (/visual|art|illustration/i.test(s)) return "visual";
  return "fallback";
}
function getResponse(intent) {
  if (intent.startsWith("p:")) { const pr = PROJECT_RESPONSES[intent.slice(2)]; if (pr) return { text:pr.text, link:pr.link }; }
  const m = {
    projects:{ text:"Here are four featured projects.", tiles:true },
    all:     { text:"All 13 projects live on the Work page.", nav:"work" },
    about:   { text:"Art & technology \u2192 architecture & data science \u2192 all-in on AI product design. Shipped at Google, JPMorgan Chase, CUNY.", nav:"about" },
    skills:  { text:"Product Design \u00b7 AI/ML Design \u00b7 Data Viz \u00b7 Prototyping \u00b7 Design Systems \u00b7 Research. Figma, Python, React, D3, BigQuery." },
    contact: { text:"\u2709\ufe0f tanharchitecture@gmail.com \u00b7 linkedin.com/in/tanhata" },
    visual:  { text:"Branding, illustration, and graphic design.", nav:"visual" },
    fallback:{ text:"I can tell you about specific projects, my design approach, background, or how to connect." },
  };
  return m[intent] || m.fallback;
}
function getChips(intent) {
  if (intent.startsWith("p:")) return [...PROJECT_CHIPS.filter(c => !c.toLowerCase().includes(intent.slice(2).replace("-","").slice(0,5))).slice(0,3), "Your background?"];
  return PROJECT_CHIPS;
}

/* ═══════════════════════════════════════════════════════════════════
   SHARED
   ═══════════════════════════════════════════════════════════════════ */
const Img = ({ src, alt, style, fb }) => { const [f,setF]=useState(false); if(f||!src) return <div style={{...style,background:fb||"#111"}} />; return <img src={src} alt={alt||""} style={style} onError={()=>setF(true)} />; };

const Reveal = ({ children, delay = 0, y = 30, mode = "fade" }) => {
  const ref = useRef(null); const [v,setV]=useState(false);
  useEffect(() => { const el=ref.current; if(!el) return; const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);io.unobserve(el);}},{threshold:.1}); io.observe(el); return()=>io.disconnect(); },[]);
  if (mode === "wipe") return <div ref={ref} style={{ clipPath:v?"inset(0 0% 0 0)":"inset(0 100% 0 0)", transition:`clip-path 1s cubic-bezier(.4,0,.2,1) ${delay}ms` }}>{children}</div>;
  if (mode === "clipUp") return <div ref={ref} style={{ clipPath:v?"inset(0 0 0% 0)":"inset(0 0 100% 0)", transition:`clip-path .8s cubic-bezier(.4,0,.2,1) ${delay}ms` }}>{children}</div>;
  return <div ref={ref} style={{ opacity:v?1:0, transform:v?"translateY(0)":`translateY(${y}px)`, transition:`opacity .9s cubic-bezier(.4,0,.2,1) ${delay}ms, transform .9s cubic-bezier(.4,0,.2,1) ${delay}ms` }}>{children}</div>;
};

const Nav = ({ page, go, dark, setDark, t }) => {
  const links = [{id:"home",label:"Home"},{id:"about",label:"About"},{id:"work",label:"Work"},{id:"visual",label:"Visual"}];
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 32px",background:t.navBg,backdropFilter:"blur(24px)",borderBottom:`1px solid ${t.rule}`,transition:"background .5s, border .5s" }}>
      {/* theme toggle */}
      <button onClick={()=>setDark(!dark)} style={{ width:36,height:36,borderRadius:99,background:t.card,border:`1px solid ${t.cardBorder}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .3s" }} aria-label="Toggle theme">
        {dark
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        }
      </button>
      <div style={{ display:"flex",gap:6 }}>{links.map(l => <button key={l.id} onClick={()=>go(l.id)} style={{ background:page===l.id?t.accentSoft:"transparent",border:page===l.id?`1px solid ${t.accentBorder}`:"1px solid transparent",borderRadius:8,padding:"7px 16px",color:page===l.id?t.fg:t.fgMuted,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",transition:"all .25s" }}>{l.label}</button>)}</div>
    </nav>
  );
};

const GlassTile = ({ p, delay = 0, dark = true }) => {
  const [h,setH]=useState(false); const [ok,setOk]=useState(true); const cat=gc(p.cat);
  const bg = dark ? "rgba(255,255,255,.025)" : "rgba(0,0,0,.02)";
  const border = dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.06)";
  const sub = dark ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.4)";
  const desc = dark ? "rgba(255,255,255,.5)" : "rgba(0,0,0,.5)";
  return (
    <a href={p.link} target="_blank" rel="noopener noreferrer" onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",textDecoration:"none",color:dark?"#fff":"#1a1a1a",cursor:"pointer",borderRadius:14,background:bg,backdropFilter:"blur(12px)",border:h?`1px solid ${cat.color}50`:`1px solid ${border}`,boxShadow:h?`0 8px 32px ${cat.color}12`:"none",transition:"all .35s",transform:h?"translateY(-3px)":"translateY(0)",animation:`fadeUp .7s cubic-bezier(.4,0,.2,1) ${delay}ms both` }}>
      <div style={{ position:"relative",width:"100%",aspectRatio:"4/3",overflow:"hidden",borderRadius:"13px 13px 0 0" }}>
        {ok&&p.img&&<img src={p.img} alt={p.title} onError={()=>setOk(false)} style={{ width:"100%",height:"100%",objectFit:"cover",transition:"transform .5s",transform:h?"scale(1.05)":"scale(1)" }} />}
        {(!ok||!p.img)&&<div style={{ width:"100%",height:"100%",background:`linear-gradient(135deg,${cat.color}15,${cat.color}30)` }} />}
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(0deg,rgba(0,0,0,.5) 0%,transparent 60%)" }} />
        <span style={{ position:"absolute",top:10,left:10,fontSize:9,padding:"3px 8px",borderRadius:99,background:"rgba(0,0,0,.7)",border:`1px solid ${cat.color}35`,color:cat.color,fontWeight:600,letterSpacing:.5 }}>{cat.label}</span>
      </div>
      <div style={{ padding:"14px 16px 16px",flex:1 }}>
        <h3 style={{ fontSize:16,fontWeight:700,marginBottom:3 }}>{p.title}</h3>
        <div style={{ fontSize:11.5,color:sub,fontWeight:500 }}>{p.sub}</div>
      </div>
    </a>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MESH
   ═══════════════════════════════════════════════════════════════════ */
const MeshBG = ({ dark, mx = 0.5, my = 0.5 }) => {
  const px = mx * 30 - 15;
  const py = my * 30 - 15;
  return (
    <div style={{ position:"fixed",inset:0,zIndex:0,overflow:"hidden",background:dark?"#000":"#f5f2eb",transition:"background .5s" }}>
      <div style={{ position:"absolute",inset:"-50%",background:dark
        ?`radial-gradient(ellipse 80% 60% at 15% 25%, hsla(220,10%,8%,.5) 0%, transparent 70%),radial-gradient(ellipse 60% 80% at 85% 75%, hsla(240,10%,7%,.35) 0%, transparent 70%),radial-gradient(ellipse 40% 40% at 55% 15%, rgba(255,255,255,.015) 0%, transparent 60%)`
        :`radial-gradient(ellipse 80% 60% at 15% 25%, hsla(40,30%,85%,.15) 0%, transparent 70%),radial-gradient(ellipse 60% 80% at 85% 75%, hsla(30,20%,82%,.12) 0%, transparent 70%),radial-gradient(ellipse 40% 40% at 55% 15%, rgba(180,160,130,.04) 0%, transparent 60%)`,
        animation:"meshDrift 25s ease-in-out infinite",transition:"background 1s" }} />
      {/* cursor-reactive orbs */}
      <div style={{ position:"absolute",width:500,height:500,borderRadius:"50%",top:"5%",left:"-8%",background:`radial-gradient(circle,${dark?"rgba(255,255,255,.02)":"rgba(180,160,130,.03)"} 0%,transparent 70%)`,filter:"blur(80px)",transform:`translate(${px*.8}px,${py*.6}px)`,transition:"transform .3s ease-out" }} />
      <div style={{ position:"absolute",width:350,height:350,borderRadius:"50%",bottom:"10%",right:"-5%",background:`radial-gradient(circle,${dark?"rgba(255,255,255,.015)":"rgba(160,145,120,.03)"} 0%,transparent 70%)`,filter:"blur(60px)",transform:`translate(${-px*.5}px,${-py*.4}px)`,transition:"transform .3s ease-out" }} />
      <div style={{ position:"absolute",width:250,height:250,borderRadius:"50%",top:"35%",left:"55%",background:`radial-gradient(circle,${dark?"rgba(255,255,255,.015)":"rgba(170,155,130,.025)"} 0%,transparent 70%)`,filter:"blur(50px)",transform:`translate(${px*.6}px,${-py*.7}px)`,transition:"transform .3s ease-out" }} />
      {/* grain */}
      <div style={{ position:"absolute",inset:0,opacity:dark?.035:.02,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:"200px" }} />
      {/* dotted grid — shifts with cursor */}
      <div style={{ position:"absolute",inset:0,backgroundImage:`radial-gradient(circle, ${dark?"rgba(255,255,255,.12)":"rgba(0,0,0,.09)"} 1px, transparent 1px)`,backgroundSize:"30px 30px",transform:`translate(${px*.15}px,${py*.15}px)`,transition:"transform .4s ease-out" }} />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   DRAGGABLE CANVAS
   ═══════════════════════════════════════════════════════════════════ */
const DraggableCanvas = ({ items, dark, t }) => {
  const cols = Math.min(3, Math.ceil(items.length / 2));
  const cardW = 260;
  const cardH = 310;
  const gap = 16;
  const canvasW = cols * cardW + (cols - 1) * gap;
  const canvasH = Math.ceil(items.length / cols) * (cardH + gap);

  const initPos = () => items.map((_, i) => ({
    x: (i % cols) * (cardW + gap),
    y: Math.floor(i / cols) * (cardH + gap),
  }));

  const [positions, setPositions] = useState(initPos);
  const [dragging, setDragging] = useState(null);
  const [dragStart, setDragStart] = useState({ mx:0, my:0, ox:0, oy:0 });
  const [zStack, setZStack] = useState(items.map((_,i) => i));
  const [moved, setMoved] = useState(false);
  const [hintVis, setHintVis] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => { if (dragging !== null) setHintVis(false); }, [dragging]);

  const onDown = (e, idx) => {
    e.preventDefault();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    setDragging(idx);
    setMoved(false);
    setDragStart({ mx:cx, my:cy, ox:positions[idx].x, oy:positions[idx].y });
    setZStack(prev => { const n=[...prev]; n[idx]=Math.max(...prev)+1; return n; });
  };

  useEffect(() => {
    if (dragging === null) return;
    const onMove = e => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = cx - dragStart.mx;
      const dy = cy - dragStart.my;
      if (Math.abs(dx)>3||Math.abs(dy)>3) setMoved(true);
      setPositions(prev => prev.map((p,i) => i===dragging ? { x:dragStart.ox+dx, y:dragStart.oy+dy } : p));
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove",onMove,{passive:true});
    window.addEventListener("mouseup",onUp);
    window.addEventListener("touchmove",onMove,{passive:true});
    window.addEventListener("touchend",onUp);
    return () => { window.removeEventListener("mousemove",onMove); window.removeEventListener("mouseup",onUp); window.removeEventListener("touchmove",onMove); window.removeEventListener("touchend",onUp); };
  }, [dragging, dragStart]);

  return (
    <div ref={containerRef} style={{ position:"relative",width:canvasW,height:canvasH+20 }}>
      {hintVis && (
        <div style={{ position:"absolute",top:-32,right:0,display:"flex",alignItems:"center",gap:6,fontSize:11,fontFamily:"var(--mono)",color:t.fgMuted,animation:"fadeUp .6s ease 1.5s both" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>
          drag to explore
        </div>
      )}
      {items.map((p,i) => (
        <DragItem key={p.id} p={p} i={i} dark={dark} dragging={dragging} positions={positions} zStack={zStack} moved={moved} onDown={onDown} />
      ))}
    </div>
  );
};

const DragItem = ({ p, i, dark, dragging, positions, zStack, moved, onDown }) => {
  const [ok,setOk] = useState(true);
  const [flipped,setFlipped] = useState(false);
  const [hovered,setHovered] = useState(false);
  const c = gc(p.cat);
  const isDrag = dragging === i;
  const pos = positions[i];
  const bg = dark?"rgba(255,255,255,.025)":"rgba(0,0,0,.02)";
  const bdr = dark?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)";
  const sub = dark?"rgba(255,255,255,.35)":"rgba(0,0,0,.4)";
  const txt = dark?"rgba(255,255,255,.6)":"rgba(0,0,0,.55)";
  const fg = dark?"#fff":"#1a1a1a";

  // flip on hover after a short delay, unflip on leave
  const hoverTimer = useRef(null);
  const handleEnter = () => {
    setHovered(true);
    hoverTimer.current = setTimeout(() => setFlipped(true), 300);
  };
  const handleLeave = () => {
    setHovered(false);
    clearTimeout(hoverTimer.current);
    setFlipped(false);
  };

  return (
    <div
      onMouseDown={e=>{ if(!flipped) onDown(e,i); }}
      onTouchStart={e=>{ if(!flipped) onDown(e,i); }}
      onClick={() => { if(!moved && !flipped) window.open(p.link,"_blank"); }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position:"absolute", left:pos.x, top:pos.y, width:260, height:310,
        zIndex: flipped ? 999 : hovered ? 998 : zStack[i],
        cursor:flipped?"default":isDrag?"grabbing":"grab",
        transition:isDrag?"none":"left .35s cubic-bezier(.4,0,.2,1), top .35s cubic-bezier(.4,0,.2,1), box-shadow .5s ease",
        boxShadow:isDrag?`0 24px 60px rgba(0,0,0,.4)`:(flipped||hovered)?`0 12px 40px rgba(0,0,0,.2)`:"none",
        perspective:600, userSelect:"none",
      }}>
      <div style={{
        width:"100%", height:"100%", position:"relative",
        transformStyle:"preserve-3d",
        willChange:"transform",
        transition:"transform .9s cubic-bezier(.25,.1,.25,1)",
        transform:flipped?"scale(1.03) rotateY(180deg)":isDrag?"scale(1.05)":"scale(1)",
      }}>
        {/* ── FRONT ── */}
        <div style={{ position:"absolute",inset:0,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",borderRadius:14,overflow:"hidden" }}>
          <div style={{ background:dark?"rgba(20,20,20,.95)":"rgba(255,255,255,.95)",border:`1px solid ${isDrag?c.color+"50":bdr}`,borderRadius:14,overflow:"hidden",color:fg,height:"100%",display:"flex",flexDirection:"column" }}>
            <div style={{ position:"relative",width:"100%",flex:1,overflow:"hidden",borderRadius:"13px 13px 0 0",minHeight:0 }}>
              {ok&&p.img&&<img src={p.img} alt={p.title} onError={()=>setOk(false)} style={{ width:"100%",height:"100%",objectFit:"cover" }} draggable={false} />}
              {(!ok||!p.img)&&<div style={{ width:"100%",height:"100%",background:`linear-gradient(135deg,${c.color}15,${c.color}30)` }} />}
              <div style={{ position:"absolute",inset:0,background:"linear-gradient(0deg,rgba(0,0,0,.5) 0%,transparent 60%)" }} />
              <span style={{ position:"absolute",top:10,left:10,fontSize:9,padding:"3px 8px",borderRadius:99,background:"rgba(0,0,0,.7)",border:`1px solid ${c.color}35`,color:c.color,fontWeight:600,letterSpacing:.5 }}>{c.label}</span>
              <a href={p.link} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{ position:"absolute",top:10,right:10,width:28,height:28,borderRadius:"50%",background:"rgba(0,0,0,.7)",border:`1px solid ${dark?"rgba(255,255,255,.15)":"rgba(0,0,0,.1)"}`,display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",pointerEvents:"auto",transition:"all .25s" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </a>
            </div>
            <div style={{ padding:"12px 16px 14px",flexShrink:0 }}>
              <h3 style={{ fontSize:14,fontWeight:700,marginBottom:2,lineHeight:1.3 }}>{p.title}</h3>
              <div style={{ fontSize:11,color:sub,fontWeight:500 }}>{p.sub}</div>
            </div>
          </div>
        </div>
        {/* ── BACK ── */}
        <div style={{ position:"absolute",inset:0,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"rotateY(180deg)",borderRadius:14,overflow:"hidden" }}>
          <div style={{ background:dark?`linear-gradient(145deg, ${c.color}22, rgba(10,10,10,.97))`:`linear-gradient(145deg, ${c.color}15, rgba(255,255,255,.97))`,border:`1.5px solid ${c.color}40`,borderRadius:14,color:fg,height:"100%",display:"flex",flexDirection:"column",padding:"24px 20px",pointerEvents:"none",position:"relative" }}>
            <div style={{ position:"absolute",top:12,right:12,width:20,height:20,borderTop:`2px solid ${c.color}40`,borderRight:`2px solid ${c.color}40`,borderRadius:"0 4px 0 0" }} />
            <div style={{ position:"absolute",bottom:12,left:12,width:20,height:20,borderBottom:`2px solid ${c.color}40`,borderLeft:`2px solid ${c.color}40`,borderRadius:"0 0 0 4px" }} />
            <div style={{ width:32,height:3,borderRadius:2,background:c.color,marginBottom:16 }} />
            <h3 style={{ fontSize:20,fontWeight:800,marginBottom:4,letterSpacing:"-.02em" }}>{p.title}</h3>
            <div style={{ fontSize:11,color:c.color,fontWeight:600,marginBottom:14,fontFamily:"var(--mono)" }}>{p.sub}</div>
            <p style={{ fontSize:12.5,lineHeight:1.65,color:txt,flex:1 }}>{p.desc}</p>
            {p.tags && <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginTop:14,marginBottom:14 }}>{p.tags.map(tag => <span key={tag} style={{ fontSize:9,padding:"3px 8px",borderRadius:99,background:`${c.color}15`,border:`1px solid ${c.color}30`,color:c.color,fontWeight:600 }}>{tag}</span>)}</div>}
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"auto" }}>
              <span style={{ fontSize:10,fontFamily:"var(--mono)",color:sub }}>{p.year}</span>
              <a href={p.link} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{ fontSize:11,color:c.color,textDecoration:"none",fontWeight:700,pointerEvents:"auto",display:"flex",alignItems:"center",gap:4 }}>
                View project <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SIGNATURE TYPE — typed out like a handwritten note
   ═══════════════════════════════════════════════════════════════════ */
const SignatureFlip = ({ t, size = "18px" }) => {
  const eng = "hi, i'm tanha";
  const [count, setCount] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);
  const [showArabic, setShowArabic] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.unobserve(el); } }, { threshold:.1 });
    io.observe(el); return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || count >= eng.length) {
      if (started && count >= eng.length && !doneTyping) {
        const id = setTimeout(() => setDoneTyping(true), 600);
        return () => clearTimeout(id);
      }
      return;
    }
    const timeout = setTimeout(() => setCount(c => c + 1), count === 0 ? 800 : 65 + Math.random() * 45);
    return () => clearTimeout(timeout);
  }, [started, count, doneTyping]);

  useEffect(() => {
    if (!doneTyping) return;
    const id = setInterval(() => setShowArabic(s => !s), 3000);
    return () => clearInterval(id);
  }, [doneTyping]);

  const baseStyle = { fontSize:size,fontWeight:900,letterSpacing:"-.05em",lineHeight:1 };

  return (
    <div ref={ref} style={{ height:"2em",perspective:400,overflow:"visible",...baseStyle }}>
      {!doneTyping ? (
        <div style={{ display:"flex",alignItems:"center",height:"100%" }}>
          <span style={{ ...baseStyle,fontFamily:"'DM Sans',sans-serif",color:t.fg }}>
            {eng.slice(0, count)}
          </span>
          {started && count < eng.length && (
            <span style={{ display:"inline-block",width:3,height:"0.8em",background:t.accent,marginLeft:2,animation:"blink 1s step-end infinite" }} />
          )}
        </div>
      ) : (
        <div style={{
          position:"relative",transformStyle:"preserve-3d",
          transition:"transform .8s cubic-bezier(.4,0,.2,1)",
          transform:showArabic?"rotateX(180deg)":"rotateX(0deg)",
          height:"100%",
        }}>
          <div style={{ backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",height:"100%",display:"flex",alignItems:"center" }}>
            <span style={{ ...baseStyle,fontFamily:"'DM Sans',sans-serif",color:t.fg,whiteSpace:"nowrap" }}>hi, i'm tanha</span>
          </div>
          <div style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",alignItems:"center",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"rotateX(180deg)" }}>
            <span style={{ ...baseStyle,fontFamily:"'Aref Ruqaa',serif",color:t.fg,direction:"rtl",whiteSpace:"nowrap",display:"block",textAlign:"left" }}>{"\u0645\u0631\u062d\u0628\u0627\u064b\u060c \u0623\u0646\u0627 \u062a\u0646\u062d\u0649 "}</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   TANH CURVE — animated signature stroke
   ═══════════════════════════════════════════════════════════════════ */
const TanhCurve = ({ color = "#dc3545", width = 280, delay = 800 }) => {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.unobserve(el); } }, { threshold: .1 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const pts = [];
  for (let i = -40; i <= 40; i++) {
    const x = i / 10;
    const y = Math.tanh(x);
    pts.push(`${((x + 4) / 8) * 200},${(1 - (y + 1) / 2) * 80}`);
  }
  const d = "M" + pts.join(" L");
  return (
    <svg ref={ref} viewBox="0 0 200 80" style={{ width, height: width * 0.4, overflow:"visible",display:"block" }}>
      {/* axis lines */}
      <line x1="0" y1="40" x2="200" y2="40" stroke={color} strokeWidth=".4" opacity=".1" />
      <line x1="100" y1="5" x2="100" y2="75" stroke={color} strokeWidth=".4" opacity=".1" />
      {/* curve — glow layer */}
      <path d={d} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" opacity=".06"
        style={{ filter:`blur(8px)` }} />
      {/* curve — main */}
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity=".35"
        style={{
          strokeDasharray: 500,
          strokeDashoffset: vis ? 0 : 500,
          transition: `stroke-dashoffset 2.5s cubic-bezier(.4,0,.2,1) ${delay}ms`,
        }} />
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   HOME — EDITORIAL
   ═══════════════════════════════════════════════════════════════════ */
const HomePage = ({ setPage, dark, t, mx = 0.5, my = 0.5 }) => {
  const [time, setTime] = useState("");
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [chips, setChips] = useState(PROJECT_CHIPS);
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { const t=()=>setTime(new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:true,timeZone:"America/New_York"})); t(); const id=setInterval(t,1000); return()=>clearInterval(id); }, []);

  const ask = useCallback((text) => {
    if (!text.trim()) return;
    setInput(""); setChips([]); setTyping(true);
    setResponses(p => [...p, { role:"user", text:text.trim() }]);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior:"smooth" }), 80);
    const intent = matchIntent(text);
    setTimeout(() => {
      const r = getResponse(intent);
      setTyping(false);
      setResponses(p => [...p, { role:"assistant", ...r }]);
      setTimeout(() => { setChips(getChips(intent)); setTimeout(() => endRef.current?.scrollIntoView({ behavior:"smooth" }), 80); }, 300);
      if (r.nav) setTimeout(() => setPage(r.nav), 2000);
    }, 600 + Math.random() * 400);
  }, [setPage]);

  // parallax values for hero elements
  const px = (mx - 0.5) * 20;
  const py = (my - 0.5) * 20;

  return (
    <div style={{ position:"relative",zIndex:1 }}>

      {/* ══ HERO ══ */}
      <div style={{ minHeight:"100vh",display:"flex",flexDirection:"column",padding:"0 6vw",maxWidth:1200,margin:"0 auto",position:"relative",overflow:"hidden" }}>

        {/* ── tanh curve with icon at inflection point ── */}
        <div style={{ position:"relative",display:"flex",justifyContent:"center",alignItems:"center",paddingTop:"14vh",marginBottom:16 }}>
          {/* the curve — full width */}
          <div style={{ position:"absolute",width:"100%",left:0,top:"50%",transform:`translateY(-50%) translate(${-px*.4}px,${-py*.3}px)`,transition:"transform .2s ease-out" }}>
            <TanhCurve color={t.accent} width={900} delay={200} />
          </div>
          {/* icon — at inflection point */}
          <div style={{ position:"relative",zIndex:2,transform:`translate(${px*.3}px,${py*.3}px)`,transition:"transform .15s ease-out" }}>
            <Reveal delay={0}>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
                <div style={{ width:170,height:170,borderRadius:"50%",overflow:"hidden",background:"#f5f2eb",border:`2.5px solid ${t.accent}`,boxShadow:`0 0 40px ${t.accent}15` }}>
                  <Img src="/images/profilepic.png" alt="T" fb="linear-gradient(135deg,#dc3545,#c62836)" style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* coords + time — clearly below the curve */}
        <Reveal delay={400}>
          <div style={{ display:"flex",justifyContent:"center",gap:16,alignItems:"center",fontSize:11,fontFamily:"var(--mono)",color:t.fgMuted,marginBottom:48,marginTop:60 }}>
            <span>40.71°N, 74.01°W</span>
            <span style={{ width:3,height:3,borderRadius:"50%",background:t.fgGhost }} />
            <span>{time}</span>
          </div>
        </Reveal>

        {/* typographic collision zone */}
        <div style={{ position:"relative",flex:1,display:"flex",alignItems:"center",paddingBottom:"8vh" }}>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,width:"100%",alignItems:"end" }}>
            {/* left — colliding headline */}
            <div style={{ position:"relative" }}>
              <Reveal delay={300} mode="clipUp">
                <div style={{ position:"relative" }}>
                  {/* signature flip — blended intro */}
                  <div style={{ marginBottom:-4,transform:`translate(${px*.15}px,${py*.1}px)`,transition:"transform .15s ease-out" }}>
                    <SignatureFlip t={t} size="clamp(36px,5.5vw,72px)" />
                  </div>
                  {/* headline */}
                  <div style={{ fontSize:"clamp(36px,5.5vw,72px)",fontWeight:900,lineHeight:1,letterSpacing:"-.05em",color:t.fgMuted,transform:`translate(${px*.15}px,${py*.1}px)`,transition:"transform .15s ease-out" }}>
                    i'm a designer<br/>
                    with a background<br/>in data science
                  </div>
                </div>
              </Reveal>
            </div>
            {/* right — pull quote */}
            <div style={{ paddingLeft:"2vw",paddingBottom:20 }}>
              <Reveal delay={600} mode="wipe">
                <div style={{ borderLeft:`2px solid ${t.accent}`,paddingLeft:24 }}>
                  <p style={{ fontSize:17,lineHeight:1.7,color:t.fgSoft,maxWidth:340 }}>
                    I design from the inside out — turning AI-driven systems into intuitive tools.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>


      {/* ══ WORK ══ */}
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"10vh 6vw" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 2fr",gap:60,alignItems:"start" }}>
          {/* left — label */}
          <div style={{ position:"sticky",top:120 }}>
            <Reveal>
              <div style={{ fontSize:11,fontFamily:"var(--mono)",color:t.accent,letterSpacing:4,marginBottom:12,fontWeight:600 }}>WORK</div>
              <div style={{ fontSize:13,color:t.fgMuted,lineHeight:1.6,marginBottom:24 }}>Product design, AI/ML,<br/>data visualization,<br/>and research.</div>
            </Reveal>
          </div>
          {/* right — draggable project canvas */}
          <DraggableCanvas items={PROJECTS} dark={dark} t={t} />
        </div>
      </section>



      {/* ══ EXPLORE — the prompt ══ */}
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 6vw" }}>
        <div style={{ height:1,background:t.rule }} />
      </div>
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"14vh 6vw 10vh" }}>
        <Reveal>
          <div style={{ textAlign:"center",marginBottom:48 }}>
            <div style={{ fontSize:11,fontFamily:"var(--mono)",color:t.accent,letterSpacing:4,marginBottom:16,fontWeight:600 }}>EXPLORE</div>
            <h2 style={{ fontSize:"clamp(28px,4vw,48px)",fontWeight:900,letterSpacing:"-.04em",lineHeight:1,marginBottom:12 }}>
              Curious about <span style={{ fontFamily:"'EB Garamond',serif",fontStyle:"italic",fontWeight:400 }}>something?</span>
            </h2>
            <p style={{ fontSize:14,color:t.fgMuted,lineHeight:1.6,maxWidth:400,margin:"0 auto" }}>Ask about projects, process, background, or how to connect.</p>
          </div>
        </Reveal>

        {/* centered conversation container */}
        <div style={{ maxWidth:600,margin:"0 auto" }}>

          {/* input first — prominent */}
          <Reveal delay={100}>
            <div style={{ marginBottom:20 }}>
              <div style={{ display:"flex",gap:8,alignItems:"center",background:t.card,border:"1px solid "+t.cardBorder,borderRadius:16,padding:"6px 6px 6px 22px",transition:"border .3s, box-shadow .3s" }}
                onFocus={e=>{e.currentTarget.style.borderColor=t.accentBorder;e.currentTarget.style.boxShadow=`0 0 0 3px ${t.accentSoft}`;}}
                onBlur={e=>{e.currentTarget.style.borderColor=t.cardBorder;e.currentTarget.style.boxShadow="none";}}>
                <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();ask(input);}}} placeholder="Ask me anything..." style={{ flex:1,background:"transparent",border:"none",outline:"none",color:t.fg,fontSize:15,fontFamily:"inherit",padding:"12px 0" }} />
                <button onClick={()=>ask(input)} disabled={!input.trim()} style={{ width:42,height:42,borderRadius:12,background:input.trim()?"linear-gradient(135deg,"+t.accent+",#c62836)":t.card,border:"none",cursor:input.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .25s",flexShrink:0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity:input.trim()?1:.1 }}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
            </div>
          </Reveal>

          {/* chips — centered */}
          {chips.length > 0 && (
            <Reveal delay={200}>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:32 }}>
                {chips.map(c => (
                  <button key={c} onClick={()=>ask(c)} style={{ background:t.card,border:"1px solid "+t.cardBorder,borderRadius:99,padding:"9px 18px",color:t.fgMuted,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",transition:"all .3s" }}
                    onMouseEnter={e=>{e.target.style.color=t.accent;e.target.style.borderColor=t.accentBorder;}}
                    onMouseLeave={e=>{e.target.style.color=t.fgMuted;e.target.style.borderColor=t.cardBorder;}}
                  >{c}</button>
                ))}
              </div>
            </Reveal>
          )}

          {/* conversation thread */}
          {responses.length > 0 && (
            <div style={{ borderTop:`1px solid ${t.rule}`,paddingTop:24 }}>
              {responses.map((r,i) => (
                <div key={i} style={{ marginBottom:16,animation:"fadeUp .4s ease both" }}>
                  {r.role==="user" ? (
                    <div style={{ display:"flex",justifyContent:"flex-end" }}>
                      <div style={{ background:t.bubbleUser,border:"1px solid "+t.bubbleUserBorder,borderRadius:"16px 16px 4px 16px",padding:"12px 20px",fontSize:14,lineHeight:1.6,color:t.fgSoft,maxWidth:400 }}>{r.text}</div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ background:t.card,border:"1px solid "+t.cardBorder,borderRadius:"16px 16px 16px 4px",padding:"14px 20px",fontSize:14,lineHeight:1.65,color:t.fgSoft,maxWidth:480 }}>
                        {r.text}
                        {r.link && <div style={{ marginTop:10 }}><a href={r.link} target="_blank" rel="noopener noreferrer" style={{ fontSize:12,color:t.accent,textDecoration:"none",borderBottom:"1px solid rgba(220,53,69,.2)",paddingBottom:1,fontWeight:600 }}>View case study {"\u2192"}</a></div>}
                        {r.nav && <div style={{ marginTop:10 }}><button onClick={()=>setPage(r.nav)} style={{ fontSize:12,color:t.accent,background:"none",border:"none",borderBottom:"1px solid rgba(220,53,69,.2)",padding:"0 0 1px",cursor:"pointer",fontFamily:"inherit",fontWeight:600 }}>Go to page {"\u2192"}</button></div>}
                        {r.tiles && <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:14 }}>{FEATURED.map(p => <GlassTile key={p.id} p={p} dark={dark} />)}</div>}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {typing && <div style={{ display:"inline-flex",gap:4,padding:"14px 20px",background:t.card,border:"1px solid "+t.cardBorder,borderRadius:"16px 16px 16px 4px",animation:"fadeUp .25s ease both" }}>{[0,1,2].map(j => <span key={j} style={{ width:6,height:6,borderRadius:"50%",background:"rgba(220,80,80,.5)",animation:`dotPulse 1.2s ease-in-out ${j*.2}s infinite` }} />)}</div>}
              <div ref={endRef} />
            </div>
          )}
        </div>

        {/* contact strip */}
        <Reveal>
          <div style={{ display:"flex",justifyContent:"center",gap:32,marginTop:80,paddingTop:32,borderTop:"1px solid "+t.rule }}>
            {[{href:"mailto:tanharchitecture@gmail.com",label:"tanharchitecture@gmail.com"},{href:"https://linkedin.com/in/tanhata",label:"linkedin.com/in/tanhata",ext:true}].map(l => (
              <a key={l.label} href={l.href} target={l.ext?"_blank":undefined} rel={l.ext?"noopener noreferrer":undefined} style={{ fontSize:12,color:t.fgMuted,textDecoration:"none",fontFamily:"var(--mono)",transition:"color .3s" }}
                onMouseEnter={e=>e.target.style.color=t.accent}
                onMouseLeave={e=>e.target.style.color=t.fgMuted}
              >{l.label}</a>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   WORK PAGE
   ═══════════════════════════════════════════════════════════════════ */
const FILTERS = [{id:"all",label:"All"}, ...Object.entries(CAT).map(([id,v])=>({id,label:v.label}))];
const WorkPage = ({ dark, t }) => {
  const [f,setF]=useState("all");
  const list = f==="all"?PROJECTS:PROJECTS.filter(p=>p.cat===f);
  return (
    <div style={{ paddingTop:80,position:"relative",zIndex:1 }}>
      <div style={{ maxWidth:1100,margin:"0 auto",padding:"60px 6vw 0" }}>
        <Reveal>
          <div style={{ marginBottom:48 }}>
            <h1 style={{ fontSize:"clamp(36px,5vw,64px)",fontWeight:900,letterSpacing:"-.04em",marginBottom:8,lineHeight:.95 }}>
              Selected<br/>
              <span style={{ fontFamily:"'EB Garamond',serif",fontWeight:400,fontStyle:"italic",letterSpacing:"-.02em" }}>Works</span>
            </h1>
            <p style={{ fontSize:14,color:t.fgMuted }}>{list.length} project{list.length!==1?"s":""}</p>
          </div>
        </Reveal>
        <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:48 }}>
          {FILTERS.map(fl => { const a=f===fl.id; const cat=CAT[fl.id]; return (
            <button key={fl.id} onClick={()=>setF(fl.id)} style={{ padding:"8px 18px",borderRadius:99,fontSize:12,fontWeight:600,fontFamily:"var(--mono)",cursor:"pointer",transition:"all .25s",background:a?(cat?`${cat.color}15`:t.accent+"15"):"transparent",border:a?`1px solid ${cat?cat.color+"40":t.accent+"40"}`:`1px solid ${t.rule}`,color:a?(cat?cat.color:t.accent):t.fgMuted,letterSpacing:.5 }}>{fl.label}</button>
          );})}
        </div>
      </div>
      <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 6vw 80px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:20 }}>
          {list.map((p,i) => <WorkFlipCard key={p.id} p={p} dark={dark} t={t} delay={i*80} />)}
        </div>
      </div>
    </div>
  );
};

/* work page flip card — matches home cards */
const WorkFlipCard = ({ p, dark, t, delay = 0 }) => {
  const [flipped,setFlipped] = useState(false);
  const [ok,setOk] = useState(true);
  const c = gc(p.cat);
  const bg = dark?"rgba(255,255,255,.025)":"rgba(0,0,0,.02)";
  const bdr = dark?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)";
  const sub = dark?"rgba(255,255,255,.35)":"rgba(0,0,0,.4)";
  const txt = dark?"rgba(255,255,255,.6)":"rgba(0,0,0,.55)";
  const fg = dark?"#fff":"#1a1a1a";
  const hoverTimer = useRef(null);

  return (
    <div
      onMouseEnter={() => { hoverTimer.current = setTimeout(() => setFlipped(true), 300); }}
      onMouseLeave={() => { clearTimeout(hoverTimer.current); setFlipped(false); }}
      style={{ height:370,perspective:600,cursor:"pointer",animation:`fadeUp .6s cubic-bezier(.4,0,.2,1) ${delay}ms both` }}>
      <div style={{ width:"100%",height:"100%",position:"relative",transformStyle:"preserve-3d",willChange:"transform",transition:"transform .9s cubic-bezier(.25,.1,.25,1), box-shadow .5s ease",transform:flipped?"scale(1.03) rotateY(180deg)":"rotateY(0deg)",boxShadow:flipped?`0 12px 40px rgba(0,0,0,.2)`:"none" }}>
        {/* FRONT */}
        <div style={{ position:"absolute",inset:0,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",borderRadius:14,overflow:"hidden" }}>
          <div style={{ background:dark?"rgba(20,20,20,.95)":"rgba(255,255,255,.95)",border:`1px solid ${bdr}`,borderRadius:14,overflow:"hidden",color:fg,height:"100%",display:"flex",flexDirection:"column" }}>
            <div style={{ position:"relative",width:"100%",flex:1,overflow:"hidden",borderRadius:"13px 13px 0 0",minHeight:0 }}>
              {ok&&p.img&&<img src={p.img} alt={p.title} onError={()=>setOk(false)} style={{ width:"100%",height:"100%",objectFit:"cover" }} />}
              {(!ok||!p.img)&&<div style={{ width:"100%",height:"100%",background:`linear-gradient(135deg,${c.color}15,${c.color}30)` }} />}
              <div style={{ position:"absolute",inset:0,background:"linear-gradient(0deg,rgba(0,0,0,.5) 0%,transparent 60%)" }} />
              <span style={{ position:"absolute",top:10,left:10,fontSize:9,padding:"3px 8px",borderRadius:99,background:"rgba(0,0,0,.7)",border:`1px solid ${c.color}35`,color:c.color,fontWeight:600,letterSpacing:.5 }}>{c.label}</span>
              <a href={p.link} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{ position:"absolute",top:10,right:10,width:28,height:28,borderRadius:"50%",background:"rgba(0,0,0,.7)",border:`1px solid ${dark?"rgba(255,255,255,.15)":"rgba(0,0,0,.1)"}`,display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </a>
            </div>
            <div style={{ padding:"12px 16px 14px",flexShrink:0 }}>
              <h3 style={{ fontSize:14,fontWeight:700,marginBottom:2,lineHeight:1.3 }}>{p.title}</h3>
              <div style={{ fontSize:11,color:sub,fontWeight:500 }}>{p.sub}</div>
            </div>
          </div>
        </div>
        {/* BACK */}
        <div style={{ position:"absolute",inset:0,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"rotateY(180deg)",borderRadius:14,overflow:"hidden" }}>
          <div style={{ background:dark?`linear-gradient(145deg, ${c.color}22, rgba(10,10,10,.97))`:`linear-gradient(145deg, ${c.color}15, rgba(255,255,255,.97))`,border:`1.5px solid ${c.color}40`,borderRadius:14,color:fg,height:"100%",display:"flex",flexDirection:"column",padding:"24px 20px",position:"relative" }}>
            <div style={{ position:"absolute",top:12,right:12,width:20,height:20,borderTop:`2px solid ${c.color}40`,borderRight:`2px solid ${c.color}40`,borderRadius:"0 4px 0 0" }} />
            <div style={{ position:"absolute",bottom:12,left:12,width:20,height:20,borderBottom:`2px solid ${c.color}40`,borderLeft:`2px solid ${c.color}40`,borderRadius:"0 0 0 4px" }} />
            <div style={{ width:32,height:3,borderRadius:2,background:c.color,marginBottom:16 }} />
            <h3 style={{ fontSize:20,fontWeight:800,marginBottom:4,letterSpacing:"-.02em" }}>{p.title}</h3>
            <div style={{ fontSize:11,color:c.color,fontWeight:600,marginBottom:14,fontFamily:"var(--mono)" }}>{p.sub}</div>
            <p style={{ fontSize:12.5,lineHeight:1.65,color:txt,flex:1 }}>{p.desc}</p>
            {p.tags && <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginTop:14,marginBottom:14 }}>{p.tags.map(tag => <span key={tag} style={{ fontSize:9,padding:"3px 8px",borderRadius:99,background:`${c.color}15`,border:`1px solid ${c.color}30`,color:c.color,fontWeight:600 }}>{tag}</span>)}</div>}
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"auto" }}>
              <span style={{ fontSize:10,fontFamily:"var(--mono)",color:sub }}>{p.year}</span>
              <a href={p.link} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{ fontSize:11,color:c.color,textDecoration:"none",fontWeight:700,display:"flex",alignItems:"center",gap:4 }}>
                View project <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════
   TANH TIMELINE — life as a function, with bubbles
   ═══════════════════════════════════════════════════════════════════ */
const LIFE = [
  { x:-2.5, title:"High School",    kicker:"Math was my first love",      body:"I used to solve equations for fun and sketch whatever I saw around me — usually while scrolling Tumblr deep into the night.", r:18 },
  { x:-1.5, title:"Undergrad",      kicker:"Art and technology",           body:"I explored creative tech projects that lived between mediums — coding installations, designing speculative tools, and studying how systems and people interact.", r:22 },
  { x:-0.5, title:"Grad School",    kicker:"Architecture & Data Science",  body:"I pivoted to architecture to bring more math and physics into my creative work. That curiosity expanded into data science — and then transformers dropped, and suddenly I was prototyping everything from spatial tools to AI-powered workflows.", r:28 },
  { x: 0.5, title:"Work",           kicker:"Across disciplines",           body:"I've worked across disciplines — designing, analyzing, and building with teams at Google, JPMorgan Chase, The Bond Center, CUNY, and Flad.", r:26 },
  { x: 1.5, title:"Loss",           kicker:"The inflection point",         body:"A sudden cancer diagnosis and ultimately losing my mom shattered my world. I took some time to heal.", r:34, inflection:true },
  { x: 2.5, title:"Now",            kicker:"Converging",                   body:"I've leaned fully into what I do best — crafting intuitive design systems powered by ML. My mother's ambition, intelligence, and kindness continue to inspire my work.", r:24 },
];

const tanh = x => (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));

const TanhTimeline = ({ t, dark }) => {
  const [active, setActive] = useState(null);
  const [drawn, setDrawn] = useState(false);
  const ref = useRef(null);

  // draw curve on scroll into view
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); io.unobserve(el); } }, { threshold:.15 });
    io.observe(el); return () => io.disconnect();
  }, []);

  const W = 900, H = 380;
  const pad = { l:60, r:60, t:80, b:120 };
  const pw = W - pad.l - pad.r, ph = H - pad.t - pad.b;
  const mapX = x => pad.l + ((x + 3) / 6) * pw;
  const mapY = y => pad.t + ((1 - y) / 2) * ph;

  // curve path
  const steps = 200;
  const pathD = Array.from({ length: steps + 1 }, (_, i) => {
    const x = -3 + (6 * i) / steps;
    const y = tanh(x);
    return `${i === 0 ? "M" : "L"}${mapX(x).toFixed(1)},${mapY(y).toFixed(1)}`;
  }).join(" ");

  const pts = LIFE.map(ch => ({ cx: mapX(ch.x), cy: mapY(tanh(ch.x)), ...ch }));

  return (
    <div ref={ref} style={{ maxWidth:960,margin:"0 auto",padding:"6vh 3vw 2vh" }}>
      <Reveal>
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:11,fontFamily:"var(--mono)",color:t.fgMuted,letterSpacing:3 }}>TIMELINE</div>
        </div>
      </Reveal>

      {/* SVG viz */}
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%",height:"auto",overflow:"visible",cursor:"default" }}>
        <defs>
          <filter id="tbglow"><feGaussianBlur stdDeviation="6" /></filter>
        </defs>

        {/* zero axis */}
        <line x1={pad.l} y1={mapY(0)} x2={W - pad.r} y2={mapY(0)} stroke={dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.04)"} strokeWidth="1" strokeDasharray="3 5" />

        {/* asymptote labels */}
        <text x={pad.l - 8} y={mapY(1)} textAnchor="end" fill={dark?"rgba(255,255,255,.12)":"rgba(0,0,0,.08)"} fontSize="9" fontFamily="var(--mono)" dominantBaseline="middle">+1</text>
        <text x={pad.l - 8} y={mapY(-1)} textAnchor="end" fill={dark?"rgba(255,255,255,.12)":"rgba(0,0,0,.08)"} fontSize="9" fontFamily="var(--mono)" dominantBaseline="middle">−1</text>

        {/* glow behind curve */}
        <path d={pathD} fill="none" stroke={t.accent} strokeWidth="8" opacity=".06" filter="url(#tbglow)" />

        {/* ghost curve (full, faint) */}
        <path d={pathD} fill="none" stroke={dark?"rgba(255,255,255,.08)":"rgba(0,0,0,.06)"} strokeWidth="1.5" />

        {/* drawn curve */}
        <path d={pathD} fill="none" stroke={t.accent} strokeWidth="2"
          strokeDasharray="2000" strokeDashoffset={drawn ? 0 : 2000}
          style={{ transition:"stroke-dashoffset 2.5s cubic-bezier(.4,0,.2,1)" }} />

        {/* bubbles */}
        {pts.map((p, i) => {
          const isActive = active === i;
          const delay = `${0.8 + i * 0.3}s`;
          return (
            <g key={i} style={{ cursor:"pointer" }}
              onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === i ? null : i)}>
              {/* pulse ring */}
              {isActive && !p.inflection && (
                <circle cx={p.cx} cy={p.cy} r={p.r + 8} fill="none" stroke={t.accent} strokeWidth="1" opacity=".2">
                  <animate attributeName="r" values={`${p.r};${p.r + 16}`} dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values=".3;0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              {/* outer ring */}
              <circle cx={p.cx} cy={p.cy}
                r={drawn ? (isActive ? p.r + 3 : p.r) : 0}
                fill={p.inflection ? "transparent" : `${t.accent}${isActive ? "20" : "08"}`}
                stroke={p.inflection ? (isActive ? t.fg : dark?"rgba(255,255,255,.15)":"rgba(0,0,0,.1)") : (isActive ? t.accent : `${t.accent}40`)}
                strokeWidth={p.inflection ? 1.5 : 1}
                style={{ transition:`all .6s cubic-bezier(.4,0,.2,1) ${drawn ? delay : "0s"}` }} />
              {/* inner dot */}
              <circle cx={p.cx} cy={p.cy}
                r={drawn ? (isActive ? 5 : 3) : 0}
                fill={p.inflection ? (isActive ? t.fg : dark?"rgba(255,255,255,.25)":"rgba(0,0,0,.15)") : t.accent}
                style={{ transition:`all .5s cubic-bezier(.4,0,.2,1) ${drawn ? delay : "0s"}` }} />
              {/* title above bubble */}
              <text x={p.cx} y={p.cy - p.r - 10} textAnchor="middle"
                fill={isActive ? t.fg : dark?"rgba(255,255,255,.3)":"rgba(0,0,0,.2)"}
                fontSize={isActive ? "13" : "11"} fontWeight={isActive ? "700" : "500"}
                fontFamily="'DM Sans',sans-serif"
                style={{ transition:"all .3s" }}>
                {p.title}
              </text>
            </g>
          );
        })}
      </svg>

      {/* text panel — clearly below the viz */}
      <div style={{ minHeight:100,padding:"4px 0 12px" }}>
        {active !== null ? (
          <div style={{
            maxWidth:460,
            margin: active <= 2 ? "0" : active === 4 ? "0 auto" : "0 0 0 auto",
            textAlign: LIFE[active].inflection ? "center" : "left",
            animation:"fadeUp .4s ease both",
          }}>
            <div style={{ display:"flex",alignItems:"baseline",gap:8,marginBottom:4,justifyContent:LIFE[active].inflection?"center":"flex-start" }}>
              <span style={{ fontSize:10,fontFamily:"var(--mono)",color:LIFE[active].inflection?t.fgGhost:t.accent,fontWeight:600 }}>
                {String(active + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize:15,fontFamily:"'EB Garamond',serif",fontStyle:"italic",color:t.fgMuted }}>{LIFE[active].kicker}</span>
            </div>
            <p style={{
              fontSize:15,lineHeight:1.75,
              color:LIFE[active].inflection ? t.fgMuted : t.fgSoft,
            }}>{LIFE[active].body}</p>
          </div>
        ) : (
          <div style={{ textAlign:"center",padding:"8px 0" }}>
            <p style={{ fontSize:12,fontFamily:"var(--mono)",color:t.fgMuted }}>hover a moment to read its story</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   ABOUT — DICTIONARY ENTRY
   ═══════════════════════════════════════════════════════════════════ */
const AboutPage = ({ dark, t }) => {
  const [showArabic, setShowArabic] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setShowArabic(s => !s), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ paddingTop:80,position:"relative",zIndex:1 }}>

      {/* ── dictionary entry ── */}
      <div style={{ maxWidth:900,margin:"0 auto",padding:"12vh 6vw 4vh" }}>
        <Reveal>
          <div style={{ display:"flex",alignItems:"stretch",gap:32,maxWidth:800 }}>
            {/* portrait — stretches to match text height */}
            <div style={{ width:280,borderRadius:4,overflow:"hidden",flexShrink:0,marginLeft:-16,border:`2px solid ${t.accent}` }}>
              <Img src="/images/tanha.jpg" alt="Tanha" fb={`linear-gradient(135deg,${t.accent}20,${t.accent}40)`} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
            </div>
            {/* dictionary content */}
            <div style={{ flex:1 }}>
              {/* headword + pronunciation */}
              <div style={{ marginBottom:16 }}>
                <div style={{ height:"clamp(80px,9vw,110px)",perspective:500,marginBottom:4 }}>
                  <div style={{
                    position:"relative",transformStyle:"preserve-3d",
                    transition:"transform .8s cubic-bezier(.4,0,.2,1)",
                    transform:showArabic?"rotateX(180deg)":"rotateX(0deg)",
                    height:"100%",
                  }}>
                    <div style={{ backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",height:"100%",display:"flex",alignItems:"center" }}>
                      <h1 style={{ fontSize:"clamp(36px,5vw,56px)",fontWeight:900,letterSpacing:"-.05em",lineHeight:1,margin:0 }}>tanha</h1>
                    </div>
                    <div style={{ position:"absolute",top:0,left:0,height:"100%",display:"flex",alignItems:"center",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"rotateX(180deg)" }}>
                      <h1 style={{ fontSize:"clamp(36px,5vw,56px)",fontFamily:"'Aref Ruqaa',serif",fontWeight:700,lineHeight:1,margin:0,color:t.fg }}>{"\u062a\u0646\u062d\u0649 "}</h1>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize:15,fontFamily:"'EB Garamond',serif",fontStyle:"italic",color:t.fgMuted }}>/taan·haa/</div>
              </div>

              {/* definitions */}
              <div style={{ borderTop:`1px solid ${t.rule}`,paddingTop:16 }}>
                {/* definition 1 — Arabic */}
                <div style={{ marginBottom:18 }}>
                  <div style={{ display:"flex",alignItems:"baseline",gap:8,marginBottom:4 }}>
                    <span style={{ fontSize:12,fontFamily:"var(--mono)",color:t.accent,fontWeight:700 }}>1</span>
                    <span style={{ fontSize:11,fontFamily:"var(--mono)",color:t.fgMuted,letterSpacing:3 }}>ARABIC</span>
                    <span style={{ fontSize:13,fontFamily:"'EB Garamond',serif",fontStyle:"italic",color:t.fgMuted }}>noun</span>
                  </div>
                  <p style={{ fontSize:15,lineHeight:1.65,color:t.fgSoft,paddingLeft:24 }}>
                    Carving, etching — to shape by removing. From the root <span style={{ fontFamily:"'Aref Ruqaa',serif",fontSize:17 }}>{"\u0646\u062d\u062a"}</span> (n-ḥ-t).
                  </p>
                </div>

                {/* definition 2 — mathematics */}
                <div style={{ marginBottom:16 }}>
                  <div style={{ display:"flex",alignItems:"baseline",gap:8,marginBottom:4 }}>
                    <span style={{ fontSize:12,fontFamily:"var(--mono)",color:t.accent,fontWeight:700 }}>2</span>
                    <span style={{ fontSize:11,fontFamily:"var(--mono)",color:t.fgMuted,letterSpacing:3 }}>MATHEMATICS</span>
                    <span style={{ fontSize:13,fontFamily:"'EB Garamond',serif",fontStyle:"italic",color:t.fgMuted }}>function</span>
                  </div>
                  <p style={{ fontSize:15,lineHeight:1.65,color:t.fgSoft,paddingLeft:24 }}>
                    tanh(x) — the hyperbolic tangent. Maps any input to a value between −1 and 1. Smooth, bounded, always converging.<sup style={{ fontSize:9,color:t.accent,marginLeft:2,cursor:"default" }}>3</sup>
                  </p>
                  <div style={{ paddingLeft:24,marginTop:8 }}>
                    <code style={{ fontSize:12,fontFamily:"var(--mono)",color:t.fgMuted,background:t.card,padding:"4px 10px",borderRadius:4,border:`1px solid ${t.rule}` }}>tanh(x) = (eˣ − e⁻ˣ) / (eˣ + e⁻ˣ)</code>
                  </div>
                </div>
              </div>
              {/* footnote */}
              <div style={{ marginTop:20,paddingTop:12,borderTop:`1px solid ${t.rule}` }}>
                <p style={{ fontSize:12,lineHeight:1.6,color:t.fgMuted,fontFamily:"'EB Garamond',serif",fontStyle:"italic" }}>
                  <sup style={{ fontSize:8,color:t.accent,marginRight:4 }}>3</sup>
                  Also travels compulsively, photographs everything, and has strong opinions about coffee.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>


      {/* ── TANH TIMELINE VIZ ── */}
      <TanhTimeline t={t} dark={dark} />


      {/* ── contact strip ── */}
      <div style={{ maxWidth:900,margin:"0 auto",padding:"4vh 6vw 10vh" }}>
        <Reveal>
          <div style={{ height:1,background:t.rule,marginBottom:32 }} />
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div style={{ fontSize:13,color:t.fgMuted }}>Let's connect</div>
            <div style={{ display:"flex",gap:24 }}>
              {[{href:"mailto:tanharchitecture@gmail.com",label:"Email"},{href:"https://linkedin.com/in/tanhata",label:"LinkedIn",ext:true}].map(l => (
                <a key={l.label} href={l.href} target={l.ext?"_blank":undefined} rel={l.ext?"noopener noreferrer":undefined} style={{ fontSize:12,fontFamily:"var(--mono)",color:t.fgMuted,textDecoration:"none",transition:"color .3s" }}
                  onMouseEnter={e=>e.target.style.color=t.accent}
                  onMouseLeave={e=>e.target.style.color=t.fgMuted}
                >{l.label}</a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

const VisualPage = ({ dark, t }) => {
  return (
    <div style={{ paddingTop:80,position:"relative",zIndex:1 }}>
      {/* masthead */}
      <div style={{ padding:"10vh 6vw 2vh",maxWidth:1200,margin:"0 auto" }}>
        <Reveal>
          <div style={{ borderBottom:`2px solid ${t.fg}`,paddingBottom:16,marginBottom:8 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end" }}>
              <div>
                <div style={{ fontSize:11,fontFamily:"var(--mono)",color:t.accent,letterSpacing:6,fontWeight:700,marginBottom:8 }}>THE VISUAL ISSUE</div>
                <h1 style={{ fontSize:"clamp(56px,9vw,120px)",fontWeight:900,letterSpacing:"-.06em",lineHeight:.85,fontFamily:"'DM Sans',sans-serif" }}>
                  Visual<br/>
                  <span style={{ fontFamily:"'EB Garamond',serif",fontWeight:400,fontStyle:"italic",letterSpacing:"-.02em" }}>Works</span>
                </h1>
              </div>
              <div style={{ fontSize:11,fontFamily:"var(--mono)",color:t.fgGhost,textAlign:"right",paddingBottom:8 }}>
                <div>Nº 01 — 2026</div>
                <div style={{ marginTop:4 }}>{VISUALS.length} pieces</div>
              </div>
            </div>
          </div>
        </Reveal>
        {/* subhead strip */}
        <Reveal delay={100}>
          <div style={{ display:"flex",justifyContent:"space-between",fontSize:10,fontFamily:"var(--mono)",color:t.fgMuted,letterSpacing:2,paddingTop:8,paddingBottom:40,borderBottom:`1px solid ${t.rule}` }}>
            <span>BRANDING</span><span>ILLUSTRATION</span><span>CREATIVE EXPLORATION</span><span>PHOTOGRAPHY</span>
          </div>
        </Reveal>
      </div>

      {/* editorial spreads */}
      {VISUALS.map((v,i) => {
        const layout = i % 4;
        const ratio = v.ratio || "3/4";
        return (
          <Reveal key={v.id} delay={i*50}>
            {layout === 0 ? (
              /* type-heavy spread — big title, portrait image */
              <div style={{ maxWidth:1200,margin:"0 auto",padding:"8vh 6vw",display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:60,alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:10,fontFamily:"var(--mono)",color:t.accent,letterSpacing:4,marginBottom:16,fontWeight:600 }}>{String(i+1).padStart(2,"0")} — {v.type.toUpperCase()}</div>
                  <h2 style={{ fontSize:"clamp(40px,5vw,72px)",fontWeight:900,letterSpacing:"-.04em",lineHeight:.95,marginBottom:20 }}>
                    {v.title.split(" ").map((w,wi) => (
                      <span key={wi}>
                        {wi === 1 ? <span style={{ fontFamily:"'EB Garamond',serif",fontStyle:"italic",fontWeight:400,background:`${t.accent}15`,padding:"0 6px",borderRadius:4 }}>{w}</span> : w}
                        {wi < v.title.split(" ").length - 1 ? " " : ""}
                      </span>
                    ))}
                  </h2>
                  <p style={{ fontSize:14,lineHeight:1.7,color:t.fgMuted,maxWidth:360 }}>{v.type}</p>
                </div>
                <div style={{ aspectRatio:ratio,borderRadius:4,overflow:"hidden",border:`1px solid ${t.rule}` }}>
                  <Img src={v.img} alt={v.title} fb={dark?"#111":"#ddd"} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                </div>
              </div>
            ) : layout === 1 ? (
              /* image-left portrait, stacked type right */
              <div style={{ maxWidth:1200,margin:"0 auto",padding:"4vh 6vw",display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center" }}>
                <div style={{ aspectRatio:ratio,borderRadius:4,overflow:"hidden" }}>
                  <Img src={v.img} alt={v.title} fb={dark?"#111":"#ddd"} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                </div>
                <div style={{ paddingLeft:20 }}>
                  <div style={{ fontSize:80,fontWeight:900,color:t.fgGhost,lineHeight:1,letterSpacing:"-.06em",fontFamily:"'DM Sans',sans-serif" }}>{String(i+1).padStart(2,"0")}</div>
                  <h3 style={{ fontSize:28,fontWeight:800,letterSpacing:"-.02em",marginTop:-12,marginBottom:8,position:"relative" }}>
                    {v.title}
                    <span style={{ display:"inline-block",width:8,height:8,borderRadius:"50%",background:t.accent,marginLeft:8,verticalAlign:"super" }} />
                  </h3>
                  <div style={{ color:t.fgMuted,fontFamily:"'EB Garamond',serif",fontStyle:"italic",fontSize:16 }}>{v.type}</div>
                </div>
              </div>
            ) : layout === 2 ? (
              /* portrait image centered with type below */
              <div style={{ maxWidth:1200,margin:"0 auto",padding:"8vh 6vw",textAlign:"center" }}>
                <div style={{ maxWidth:700,margin:"0 auto" }}>
                  <div style={{ aspectRatio:ratio,maxWidth:320,borderRadius:4,overflow:"hidden",margin:"0 auto 24px",border:`1px solid ${t.rule}` }}>
                    <Img src={v.img} alt={v.title} fb={dark?"#111":"#ddd"} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                  </div>
                  <div style={{ fontSize:11,fontFamily:"var(--mono)",color:t.accent,letterSpacing:4,marginBottom:16 }}>{v.type.toUpperCase()}</div>
                  <h3 style={{ fontSize:"clamp(28px,4vw,48px)",fontWeight:800,letterSpacing:"-.03em",lineHeight:1.1,marginBottom:16 }}>
                    <span style={{ borderBottom:`3px solid ${t.accent}` }}>{v.title}</span>
                  </h3>
                  <div style={{ width:40,height:1,background:t.rule,margin:"0 auto" }} />
                </div>
              </div>
            ) : (
              /* full-width contained — portrait image, type below */
              <div style={{ maxWidth:1200,margin:"0 auto",padding:"4vh 6vw" }}>
                <div style={{ aspectRatio:ratio,maxHeight:"70vh",borderRadius:8,overflow:"hidden" }}>
                  <Img src={v.img} alt={v.title} fb={dark?"#111":"#ddd"} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:16 }}>
                  <div>
                    <div style={{ fontSize:10,fontFamily:"var(--mono)",letterSpacing:3,color:t.accent,marginBottom:4 }}>{v.type.toUpperCase()}</div>
                    <h3 style={{ fontSize:28,fontWeight:800,letterSpacing:"-.02em" }}>{v.title}</h3>
                  </div>
                  <div style={{ fontSize:64,fontWeight:900,color:t.fgGhost,lineHeight:1 }}>{String(i+1).padStart(2,"0")}</div>
                </div>
              </div>
            )}

            {/* divider between items */}
            {i < VISUALS.length - 1 && (
              <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 6vw" }}>
                <div style={{ height:1,background:t.rule }} />
              </div>
            )}
          </Reveal>
        );
      })}

      {/* colophon */}
      <div style={{ padding:"10vh 6vw 6vh",textAlign:"center" }}>
        <div style={{ fontSize:11,fontFamily:"var(--mono)",color:t.fgGhost,letterSpacing:6 }}>FIN</div>
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [dark, setDark] = useState(false);
  const [mx, setMx] = useState(0.5);
  const [my, setMy] = useState(0.5);
  const go = p => { setPage(p); window.scrollTo({top:0,behavior:"smooth"}); };

  useEffect(() => {
    const h = e => { setMx(e.clientX / window.innerWidth); setMy(e.clientY / window.innerHeight); };
    window.addEventListener("mousemove", h, { passive:true });
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const t = dark ? {
    bg:"#000", fg:"#fff", fgSoft:"rgba(255,255,255,.55)", fgMuted:"rgba(255,255,255,.25)", fgGhost:"rgba(255,255,255,.1)",
    card:"rgba(255,255,255,.02)", cardBorder:"rgba(255,255,255,.06)", rule:"rgba(255,255,255,.06)",
    navBg:"rgba(0,0,0,.8)", inputBg:"rgba(255,255,255,.012)", inputBorder:"rgba(255,255,255,.04)",
    accent:"#dc3545", accentSoft:"rgba(220,53,69,.08)", accentBorder:"rgba(220,53,69,.15)",
    bubbleUser:"rgba(220,53,69,.05)", bubbleUserBorder:"rgba(220,53,69,.08)",
    bubbleBot:"rgba(255,255,255,.012)", bubbleBotBorder:"rgba(255,255,255,.04)",
    scrollbar:"rgba(255,255,255,.06)", selection:"rgba(220,53,69,.3)",
  } : {
    bg:"#f5f2eb", fg:"#1a1a1a", fgSoft:"rgba(0,0,0,.55)", fgMuted:"rgba(0,0,0,.3)", fgGhost:"rgba(0,0,0,.08)",
    card:"rgba(0,0,0,.02)", cardBorder:"rgba(0,0,0,.06)", rule:"rgba(0,0,0,.08)",
    navBg:"rgba(245,242,235,.95)", inputBg:"rgba(0,0,0,.02)", inputBorder:"rgba(0,0,0,.08)",
    accent:"#c0392b", accentSoft:"rgba(192,57,43,.06)", accentBorder:"rgba(192,57,43,.12)",
    bubbleUser:"rgba(192,57,43,.05)", bubbleUserBorder:"rgba(192,57,43,.08)",
    bubbleBot:"rgba(0,0,0,.02)", bubbleBotBorder:"rgba(0,0,0,.06)",
    scrollbar:"rgba(0,0,0,.08)", selection:"rgba(192,57,43,.15)",
  };

  return (
    <div style={{ minHeight:"100vh",color:t.fg,fontFamily:"'DM Sans','Helvetica Neue',sans-serif","--mono":"'JetBrains Mono',monospace","--fg":t.fg,"--fgSoft":t.fgSoft,"--fgMuted":t.fgMuted,"--fgGhost":t.fgGhost,"--accent":t.accent,"--card":t.card,"--cardBorder":t.cardBorder,"--rule":t.rule,"--bg":t.bg, transition:"color .5s, background .5s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Playball&display=swap');
        @keyframes dotPulse{0%,80%,100%{transform:scale(.4);opacity:.3}40%{transform:scale(1);opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes meshDrift{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(2%,-1%) rotate(.3deg)}66%{transform:translate(-1%,1.5%) rotate(-.3deg)}}
        @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:${t.bg};transition:background .5s}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${t.scrollbar};border-radius:99px}
        ::selection{background:${t.selection}}
      `}</style>
      <MeshBG dark={dark} mx={mx} my={my} />
      <Nav page={page} go={go} dark={dark} setDark={setDark} t={t} />
      {page==="home" && <HomePage setPage={go} dark={dark} t={t} mx={mx} my={my} />}
      {page==="work" && <WorkPage dark={dark} t={t} />}
      {page==="about" && <AboutPage dark={dark} t={t} />}
      {page==="visual" && <VisualPage dark={dark} t={t} />}
      <div style={{ position:"relative",zIndex:1,borderTop:`1px solid ${t.rule}`,padding:"32px 24px",textAlign:"center",fontSize:11,opacity:.15,fontFamily:"var(--mono)" }}>{"\u00a9"} Tanha Alsheikhdallah 2025</div>
    </div>
  );
}