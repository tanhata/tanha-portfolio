import { useState, useEffect, useRef, useCallback } from "react";

const useMobile = (bp = 768) => {
  const [m, setM] = useState(typeof window !== "undefined" ? window.innerWidth < bp : false);
  useEffect(() => { const h = () => setM(window.innerWidth < bp); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, [bp]);
  return m;
};

const useClipReveal = (_delay = 0) => {
  return [useRef(null), {}];
};

const CAT = {
  "product-design":             { label:"Product Design", color:"#c0392b" },
  "ai-ml":                      { label:"AI / ML",        color:"#d97706" },
  "data-visualization":         { label:"Data Viz",       color:"#7c3aed" },
  "data-analysis":              { label:"Data Analysis",  color:"#0369a1" },
  "mobile-design":              { label:"Mobile",         color:"#059669" },
  "writing":                    { label:"Research",       color:"#db2777" },
  "human-computer-interaction": { label:"HCI",            color:"#0891b2" },
};
const gc = id => CAT[id] || CAT["product-design"];

const PROJECTS = [
  { id:"lattice",        title:"Lattice",         sub:"Next Gen Experiment Tracking", desc:"ML experiment tracker connecting experiments, papers, and evaluations.",             cat:"product-design",            color:"#c0392b", img:"/images/lattice.png",         link:"https://tanhata.github.io/lattice-case-study/",    year:"2026", frame:"browser",      featured:true },
  { id:"clear-exp",      title:"Clear Expression", sub:"Designing AI Typography",      desc:"I encoded reading instructions into AI typography.",                               cat:"writing",                   color:"#db2777", img:"/images/clearexp.png",        link:"https://tanhata.github.io/clear-expression/",      year:"2026", frame:"browser",      featured:true },
  { id:"plotmind",       title:"Plotmind",         sub:"No-Code Data Intelligence",    desc:"Low-code environment for advanced data visualizations in enterprise pipelines.",    cat:"product-design",            color:"#7c3aed", img:"/images/plotmind.png",        link:"https://tanhata.github.io/plotmind-case-study/",   year:"2025", frame:"browser",      featured:true },
  { id:"model-pulse",    title:"ModelPulse",       sub:"AI Performance Platform",      desc:"Enterprise observability — detect drift, monitor accuracy, manage compliance.",      cat:"product-design",            color:"#0369a1", img:"/images/model-pulse.jpg",     link:"https://tanhata.github.io/modelpulse-case-study/", year:"2025", frame:"laptop",       featured:true },
  { id:"mcp",            title:"Multi-Agent",      sub:"MCP Interface",                desc:"Conversation UIs enabling distributed AI agents to coordinate and refine outputs.", cat:"product-design",            color:"#d97706", img:"/images/mcp.gif",             link:"https://tanhata.github.io/mcp-case-study/",        year:"2024", frame:"laptop",       featured:true },
  { id:"aura",           title:"AURA",             sub:"AR Museum Guide",              desc:"AR museum guide — spatial storytelling through layered narratives.",                cat:"mobile-design",             color:"#059669", img:"/images/aura.png",            link:"https://tanhata.github.io/aura-case-study/",       year:"2022", frame:"triplePhone",  featured:true },
  { id:"tangent",        title:"Tangent",          sub:"Parametric Geometry",          desc:"Real-time parametric geometry with natural language input and live 3D.",            cat:"product-design",            color:"#b4e000", img:"/images/tangent.png",         link:"https://docs.google.com/presentation/d/e/2PACX-1vRjNEWLMh6TRxoEeeHaeL_ePIp357aN6xCbF96EgSPOmyIOAjsyWw7KoLbwnlk5QlhleyfO8OZxrGbA/pub", year:"2024", frame:"browser" },
  { id:"recursive-orbit",title:"Recursive Orbit",  sub:"Grief & Memory",              desc:"Interactive visualization exploring grief via generative data.",                    cat:"data-visualization",        color:"#7c3aed", img:"/images/recursive-orbit.gif", link:"https://tanhata.github.io/recursive-orbit/",       year:"2024", frame:"browser" },
  { id:"green-spaces",   title:"The Green Divide", sub:"NYC Park Access",              desc:"Mapping disparities in park access across NYC neighborhoods.",                     cat:"data-analysis",             color:"#059669", img:"/images/green_spaces.gif",    link:"/green_divide_story.html",                         year:"2021", frame:"laptop"  },
  { id:"bitlot",         title:"BitLot",           sub:"Air Rights & Affordable Housing", desc:"A policy proposal leveraging 70M sq ft of unused air rights to build community-owned affordable housing in Harlem — combining financial modeling, parametric design, and reparative economics.", cat:"data-analysis", color:"#16a34a", img:"/images/bitlot.gif", link:"https://drive.google.com/file/d/1tAwTFKHjWch9u-SEe0oKMHvTClIR3FT8/view", year:"2021", frame:"browser" },
  { id:"heating",        title:"Thermodynamic ML",   sub:"Heating Load Prediction",   desc:"Thermodynamic analysis + machine learning for building energy prediction. Random Forest achieved R² = 0.997, enabling 15% cooling energy reduction.", cat:"ai-ml", color:"#d97706", img:"/images/heating-loads.gif", link:"https://drive.google.com/file/d/1FHQsm3s1dJWWMKKBy-QRjClEO3rS2OZ8/view", year:"2022", frame:"laptop" },
  { id:"living",         title:"Living Computing", sub:"Adaptive Interfaces",          desc:"Interfaces that respond to human behavior and context.",                          cat:"human-computer-interaction",color:"#db2777", img:"/images/living-computing.gif",link:"https://www.youtube.com/watch?v=Geo17VbvWtU",       year:"2021", frame:"youtube" },
];
const FEATURED = PROJECTS.filter(p => p.featured);

const VISUALS = [
  { id:"followme",     title:"Follow Me, Dania",               type:"album cover",             img:"/images/visual/followme.png",            ratio:"1/1" },
  { id:"mecollage",    title:"Self Portrait",                   type:"illustration, handdrawn", img:"/images/visual/mecollage.jpg"                        },
  { id:"hejaz",        title:"Hejaz, Kingdom of Saudi Arabia",  type:"branding",                img:"/images/visual/hejaz.gif",               ratio:"1/1" },
  { id:"bldg",         title:"NYC Commissioner Building",       type:"illustration",            img:"/images/visual/bldg.jpg"                             },
  { id:"sheikhdallah", title:"Sheikhdallah Corp",               type:"graphic design",          img:"/images/visual/sheikhdallah_corp.jpg"                },
  { id:"jism",         title:"Jism, \u062c\u0633\u0645 (Body)", type:"illustration, handdrawn", img:"/images/visual/jism.jpg"                             },
  { id:"atc",          title:"Arab Tech Collective",            type:"branding",                img:"/images/visual/atc.jpg"                              },
  { id:"year2050",     title:"Year 2050, Film Festival",        type:"poster",                  img:"/images/visual/year2050.png"                         },
];

const tanh = x => (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
const LIFE = [
  { x:-2.5, title:"High School", kicker:"Math was my first love",       body:"I used to solve equations for fun and sketch whatever I saw around me — usually while scrolling Tumblr deep into the night.", r:18 },
  { x:-1.5, title:"Undergrad",   kicker:"Art and technology",           body:"I explored creative tech projects that lived between mediums — coding installations, designing speculative tools, and studying how systems and people interact.", r:22 },
  { x:-0.5, title:"Grad School", kicker:"Architecture & Data Science",  body:"I pivoted to architecture to bring more math and physics into my creative work. That curiosity expanded into data science — and then transformers dropped, and suddenly I was prototyping everything.", r:28 },
  { x: 0.5, title:"Work",        kicker:"Across disciplines",           body:"I've worked across disciplines — designing, analyzing, and building with teams at Google, JPMorgan Chase, The Bond Center, CUNY, and Flad.", r:26 },
  { x: 1.5, title:"Loss",        kicker:"The inflection point",         body:"A sudden cancer diagnosis and ultimately losing my mom shattered my world. I took some time to heal.", r:34, inflection:true },
  { x: 2.5, title:"Now",         kicker:"Converging",                   body:"I've leaned fully into what I do best — crafting intuitive design systems powered by ML. My mother's ambition, intelligence, and kindness continue to inspire my work.", r:24 },
];

const THEMES = {
  light: {
    bg:"#f7f4ee", fg:"#1a1714", fgMuted:"rgba(26,23,20,.42)", fgGhost:"rgba(26,23,20,.07)",
    rule:"rgba(26,23,20,.1)", accent:"#b83228", navBg:"rgba(247,244,238,.92)",
    frameBg:"#ede9e1", frameBorder:"rgba(26,23,20,.11)", shadow:"rgba(26,23,20,.1)",
    laptopKey:"rgba(26,23,20,.07)", screenBg:"#d8d3c8",
  },
  dark: {
    bg:"#111009", fg:"#ece8e0", fgMuted:"rgba(236,232,224,.36)", fgGhost:"rgba(236,232,224,.055)",
    rule:"rgba(236,232,224,.07)", accent:"#d4453b", navBg:"rgba(17,16,9,.92)",
    frameBg:"#1c1a16", frameBorder:"rgba(236,232,224,.09)", shadow:"rgba(0,0,0,.45)",
    laptopKey:"rgba(236,232,224,.055)", screenBg:"#0d0c0a",
  },
};

/* ── AURA scenes — museum spatial storytelling, matches tanhata.github.io/aura ── */

/* Scene 1: Floating artwork frames in dark museum space (hero view) */
/* ── Scene 1: Floating paintings in museum space ── */
const AuraScene1 = () => (
  <div style={{ width:"100%", height:"100%", background:"#080808", position:"relative", overflow:"hidden" }}>
    <style>{`
      @keyframes paintingFloat { 0%,100%{transform:translate(-50%,-54%) translateY(0)} 50%{transform:translate(-50%,-54%) translateY(-6px)} }
      @keyframes sideFloat { 0%,100%{transform:translateY(-50%) translateY(0)} 50%{transform:translateY(-50%) translateY(-4px)} }
      @keyframes fadeInUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    `}</style>
    {/* wordmark */}
    <div style={{ position:"absolute", top:14, left:16, fontSize:10, fontWeight:600, color:"rgba(255,255,255,.5)", letterSpacing:4, fontFamily:"'DM Sans',sans-serif", animation:"fadeInUp .8s ease both" }}>AURA</div>
    <div style={{ position:"absolute", top:14, right:16, display:"flex", gap:12 }}>
      {["EXPLORE","TIMELINE","VISION"].map((l,i) => (
        <span key={l} style={{ fontSize:5.5, color:"rgba(255,255,255,.2)", letterSpacing:1.5, fontFamily:"'JetBrains Mono',monospace", animation:`fadeInUp .8s ease ${.1+i*.08}s both` }}>{l}</span>
      ))}
    </div>
    {/* main painting — centered, floating */}
    <div style={{ position:"absolute", top:"50%", left:"50%", width:"38%", aspectRatio:"3/4", animation:"paintingFloat 4s ease-in-out infinite" }}>
      <div style={{ width:"100%", height:"100%", background:"linear-gradient(165deg,#4a7c72 0%,#3d6b61 55%,#2e5249 100%)", border:"2.5px solid #8b6f3a", borderRadius:2, overflow:"hidden", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:"0 24px 60px rgba(0,0,0,.7)" }}>
        <div style={{ width:"38%", aspectRatio:"1/1", background:"#c8a882", borderRadius:"50%", marginBottom:5 }} />
        <div style={{ width:"26%", height:"5%", background:"#e8d5b8", borderRadius:99, marginBottom:3 }} />
        <div style={{ width:"50%", height:"24%", background:"#5c3d1e", borderRadius:"6px 6px 0 0", marginTop:3 }} />
      </div>
    </div>
    {/* left painting */}
    <div style={{ position:"absolute", top:"46%", left:"7%", width:"24%", aspectRatio:"4/3", animation:"sideFloat 4.6s ease-in-out .4s infinite", opacity:.65 }}>
      <div style={{ width:"100%", height:"100%", background:"linear-gradient(135deg,#1a2535,#2d3f56)", border:"2px solid #6b5228", borderRadius:1, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 12px 32px rgba(0,0,0,.5)" }}>
        <div style={{ width:"28%", aspectRatio:"1/1", background:"rgba(200,180,140,.45)", borderRadius:"50%", marginRight:4 }} />
        <div style={{ width:"18%", height:"55%", background:"rgba(200,190,170,.25)", borderRadius:2 }} />
      </div>
    </div>
    {/* right painting */}
    <div style={{ position:"absolute", top:"46%", right:"7%", width:"24%", aspectRatio:"4/3", animation:"sideFloat 5.2s ease-in-out .8s infinite", opacity:.65 }}>
      <div style={{ width:"100%", height:"100%", background:"linear-gradient(135deg,#0e1a28,#162338)", border:"2px solid #6b5228", borderRadius:1, overflow:"hidden", position:"relative", boxShadow:"0 12px 32px rgba(0,0,0,.5)" }}>
        {[[15,25],[62,18],[80,34],[42,44]].map(([x,y],i) => (
          <div key={i} style={{ position:"absolute", left:`${x}%`, top:`${y}%`, width:i===2?5:3, height:i===2?5:3, borderRadius:"50%", background:"rgba(220,210,180,.75)" }} />
        ))}
        <div style={{ position:"absolute", bottom:"22%", left:0, right:0, height:1, background:"rgba(100,140,100,.25)" }} />
      </div>
    </div>
    {/* bottom label */}
    <div style={{ position:"absolute", bottom:12, left:0, right:0, textAlign:"center", animation:"fadeInUp 1s ease .6s both" }}>
      <div style={{ fontSize:6.5, color:"rgba(255,255,255,.18)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:3 }}>SPATIAL STORYTELLING</div>
    </div>
  </div>
);

/* ── Scene 2: AR identification on phone camera ── */
const AuraScene2 = () => (
  <div style={{ width:"100%", height:"100%", background:"#0d0e0c", fontFamily:"'DM Sans',sans-serif", position:"relative", overflow:"hidden" }}>
    <style>{`
      @keyframes scanDown { 0%{top:12%} 100%{top:68%} }
      @keyframes cardUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      @keyframes cornerPulse { 0%,100%{opacity:.4} 50%{opacity:1} }
    `}</style>
    {/* warm museum wall bg */}
    <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#181410 0%,#221d13 55%,#181410 100%)" }} />
    {/* painting on wall */}
    <div style={{ position:"absolute", top:"15%", left:"50%", transform:"translateX(-50%)", width:"52%", aspectRatio:"3/4", background:"linear-gradient(165deg,#4a7c72,#2e5249)", border:"2.5px solid #7a5f30", borderRadius:1, boxShadow:"0 8px 40px rgba(0,0,0,.6)" }}>
      <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translateX(-50%)", width:"44%", aspectRatio:"1/1", background:"#c8a882", borderRadius:"50%" }} />
    </div>
    {/* AR scan border — matches painting exactly */}
    <div style={{ position:"absolute", top:"15%", left:"24%", width:"52%", aspectRatio:"3/4", animation:"cornerPulse 2s ease-in-out infinite" }}>
      {[{t:0,l:0,bt:"borderTop",bl:"borderLeft"},{t:0,r:0,bt:"borderTop",bl:"borderRight"},{b:0,l:0,bt:"borderBottom",bl:"borderLeft"},{b:0,r:0,bt:"borderBottom",bl:"borderRight"}].map((pos,i)=>(
        <div key={i} style={{ position:"absolute", top:pos.t, bottom:pos.b, left:pos.l, right:pos.r, width:10, height:10, [pos.bt]:"1.5px solid rgba(200,230,0,.7)", [pos.bl]:"1.5px solid rgba(200,230,0,.7)" }} />
      ))}
    </div>
    {/* moving scan line — same horizontal bounds as painting */}
    <div style={{ position:"absolute", left:"24%", width:"52%", height:1, background:"linear-gradient(to right, transparent, rgba(200,230,0,.5), transparent)", animation:"scanDown 2.4s ease-in-out infinite alternate" }} />
    {/* identified card */}
    <div style={{ position:"absolute", bottom:"8%", left:"7%", right:"7%", background:"rgba(8,10,8,.92)", border:"1px solid rgba(200,230,0,.22)", borderRadius:6, padding:"9px 11px", animation:"cardUp .6s ease .5s both", backdropFilter:"blur(8px)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:5 }}>
        <div style={{ width:4, height:4, borderRadius:"50%", background:"#c8e600" }} />
        <span style={{ fontSize:6, color:"rgba(200,230,0,.7)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:1.5 }}>ARTWORK IDENTIFIED</span>
      </div>
      <div style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,.88)", letterSpacing:"-.01em", marginBottom:2 }}>Portrait of a Lady</div>
      <div style={{ fontSize:7.5, color:"rgba(255,255,255,.38)" }}>Rogier van der Weyden · c. 1460 · Early Netherlandish</div>
    </div>
  </div>
);

/* ── Scene 3: Wayfinding floor plan ── */
const AuraScene3 = () => (
  <div style={{ width:"100%", height:"100%", background:"#0a0b0a", fontFamily:"'DM Sans',sans-serif", display:"flex", flexDirection:"column", overflow:"hidden" }}>
    <style>{`
      @keyframes youAreHere { 0%,100%{transform:scale(1);opacity:.9} 50%{transform:scale(1.35);opacity:.4} }
      @keyframes routeLine { from{stroke-dashoffset:120} to{stroke-dashoffset:0} }
    `}</style>
    {/* top bar */}
    <div style={{ padding:"10px 12px 7px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span style={{ fontSize:9, fontWeight:600, color:"rgba(255,255,255,.5)", letterSpacing:3 }}>AURA</span>
      <span style={{ fontSize:7, color:"rgba(255,255,255,.28)", fontFamily:"'JetBrains Mono',monospace" }}>Gallery 3 · East Wing</span>
    </div>
    {/* floor plan */}
    <div style={{ flex:1, padding:"8px 14px 6px", position:"relative" }}>
      <svg width="100%" height="100%" viewBox="0 0 180 130" style={{ overflow:"visible" }}>
        {/* rooms */}
        <rect x="8"  y="8"  width="50" height="38" rx="3" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
        <rect x="65" y="8"  width="50" height="38" rx="3" fill="rgba(200,230,0,.05)"   stroke="rgba(200,230,0,.3)"   strokeWidth="1.2"/>
        <rect x="122"y="8"  width="50" height="38" rx="3" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
        <rect x="8"  y="54" width="50" height="38" rx="3" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
        <rect x="65" y="54" width="107"height="38" rx="3" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
        {/* corridor */}
        <rect x="8" y="100" width="164" height="22" rx="3" fill="rgba(255,255,255,.015)" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
        {/* room labels */}
        <text x="33"  y="30" textAnchor="middle" fill="rgba(255,255,255,.22)" fontSize="5.5" fontFamily="JetBrains Mono">GALLERY 1</text>
        <text x="90"  y="25" textAnchor="middle" fill="rgba(200,230,0,.7)"    fontSize="5.5" fontFamily="JetBrains Mono">GALLERY 3</text>
        <text x="90"  y="33" textAnchor="middle" fill="rgba(200,230,0,.45)"   fontSize="4.5" fontFamily="JetBrains Mono">Early Netherlandish</text>
        <text x="147" y="30" textAnchor="middle" fill="rgba(255,255,255,.22)" fontSize="5.5" fontFamily="JetBrains Mono">GALLERY 5</text>
        <text x="33"  y="76" textAnchor="middle" fill="rgba(255,255,255,.22)" fontSize="5.5" fontFamily="JetBrains Mono">GALLERY 2</text>
        <text x="118" y="76" textAnchor="middle" fill="rgba(255,255,255,.18)" fontSize="5.5" fontFamily="JetBrains Mono">CONTEMPORARY</text>
        <text x="90"  y="113"textAnchor="middle" fill="rgba(255,255,255,.15)" fontSize="5"   fontFamily="JetBrains Mono">MAIN CORRIDOR</text>
        {/* route path */}
        <polyline points="90,111 90,92" fill="none" stroke="rgba(200,230,0,.5)" strokeWidth="1.5" strokeDasharray="120" strokeDashoffset="0" style={{ animation:"routeLine 1.5s ease .3s both" }}/>
        <polyline points="90,92 90,54" fill="none" stroke="rgba(200,230,0,.5)" strokeWidth="1.5" strokeDasharray="120" strokeDashoffset="0" style={{ animation:"routeLine 1.5s ease .7s both" }}/>
        {/* destination marker */}
        <circle cx="90" cy="27" r="5" fill="rgba(200,230,0,.15)" stroke="#c8e600" strokeWidth="1.2"/>
        <circle cx="90" cy="27" r="2" fill="#c8e600"/>
        {/* you are here */}
        <circle cx="90" cy="111" r="5" fill="rgba(255,255,255,.08)" style={{ animation:"youAreHere 1.8s ease-in-out infinite", transformOrigin:"90px 111px" }}/>
        <circle cx="90" cy="111" r="2.5" fill="#fff" opacity=".8"/>
        <text x="100" y="114" fill="rgba(255,255,255,.35)" fontSize="4.5" fontFamily="JetBrains Mono">YOU</text>
      </svg>
    </div>
    {/* bottom card */}
    <div style={{ padding:"0 12px 11px" }}>
      <div style={{ padding:"6px 9px", background:"rgba(200,230,0,.05)", border:"1px solid rgba(200,230,0,.15)", borderRadius:5, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:8, fontWeight:600, color:"rgba(255,255,255,.7)", marginBottom:1 }}>Gallery 3 · 2 min walk</div>
          <div style={{ fontSize:6.5, color:"rgba(255,255,255,.3)", fontFamily:"'JetBrains Mono',monospace" }}>Portrait of a Lady · on display</div>
        </div>
        <div style={{ fontSize:8, color:"#c8e600", fontFamily:"'JetBrains Mono',monospace" }}>GO →</div>
      </div>
    </div>
  </div>
);

const AURA_SCENES = [AuraScene1, AuraScene2, AuraScene3];
const AuraScreen = AuraScene1;

/* ══════════════════════════════════════════════════
   CUSTOM SCREENS
══════════════════════════════════════════════════ */
const LatticeScreen = () => (
  <div style={{ width:"100%", height:"100%", background:"#fafaf8", fontFamily:"'DM Sans',sans-serif", position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(192,57,43,.07) 1px, transparent 1px)", backgroundSize:"22px 22px", pointerEvents:"none" }} />
    {/* top bar */}
    <div style={{ padding:"9px 13px 7px", borderBottom:"1px solid rgba(26,23,20,.07)", display:"flex", alignItems:"center", justifyContent:"space-between", position:"relative", zIndex:1 }}>
      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
        <div style={{ width:15, height:15, background:"#c0392b", borderRadius:3, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:"#fff" }}>L</div>
        <span style={{ fontSize:10, fontWeight:700, color:"#1a1714", letterSpacing:"-.02em" }}>lattice</span>
        <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.28)", background:"rgba(26,23,20,.04)", padding:"2px 7px", borderRadius:99 }}>experiment lineage</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:5 }}>
        <div style={{ width:5, height:5, borderRadius:"50%", background:"#16a34a" }} />
        <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"#16a34a" }}>vit-042 · top-1 84.17%</span>
      </div>
    </div>
    {/* main content */}
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", height:"calc(100% - 80px)" }}>
      {/* LEFT — lineage graph */}
      <div style={{ borderRight:"1px solid rgba(26,23,20,.06)", padding:"10px 10px", position:"relative", overflow:"hidden" }}>
        <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.28)", letterSpacing:2, marginBottom:8 }}>PROVENANCE</div>
        <svg width="100%" height="85%" viewBox="0 0 200 158" style={{ overflow:"visible" }}>
          <defs>
            <marker id="lat2-arr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L0,5 L5,2.5 z" fill="rgba(26,23,20,.18)"/>
            </marker>
            <marker id="lat2-arr-r" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L0,5 L5,2.5 z" fill="rgba(22,163,74,.5)"/>
            </marker>
            <marker id="lat2-arr-fail" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L0,5 L5,2.5 z" fill="rgba(230,82,82,.5)"/>
            </marker>
            <filter id="lat2-glow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          {/* row 1: paper + dataset */}
          <rect x="8" y="8" width="82" height="30" rx="5" fill="#fff" stroke="rgba(26,23,20,.09)" strokeWidth="1"/>
          <text x="49" y="19" textAnchor="middle" fill="rgba(26,23,20,.28)" fontSize="5.5" fontFamily="JetBrains Mono" letterSpacing="1">PAPER</text>
          <text x="49" y="31" textAnchor="middle" fill="#1a1714" fontSize="7.5" fontFamily="DM Sans" fontWeight="600">arXiv:2301.07041</text>
          <rect x="110" y="8" width="82" height="30" rx="5" fill="#fff" stroke="rgba(26,23,20,.09)" strokeWidth="1"/>
          <text x="151" y="19" textAnchor="middle" fill="rgba(26,23,20,.28)" fontSize="5.5" fontFamily="JetBrains Mono" letterSpacing="1">DATASET</text>
          <text x="151" y="31" textAnchor="middle" fill="#1a1714" fontSize="7.5" fontFamily="DM Sans" fontWeight="600">ImageNet-1k</text>
          {/* edges → experiment */}
          <line x1="49" y1="38" x2="88" y2="62" stroke="rgba(26,23,20,.13)" strokeWidth="1.2" markerEnd="url(#lat2-arr)"/>
          <line x1="151" y1="38" x2="112" y2="62" stroke="rgba(26,23,20,.13)" strokeWidth="1.2" markerEnd="url(#lat2-arr)"/>
          {/* row 2: hero experiment */}
          <rect x="50" y="58" width="100" height="38" rx="7" fill="#fafaf8" stroke="#c0392b" strokeWidth="1.8" filter="url(#lat2-glow)"/>
          <circle cx="62" cy="70" r="3.5" fill="#c0392b"/>
          <text x="100" y="72" textAnchor="middle" fill="rgba(26,23,20,.32)" fontSize="5.5" fontFamily="JetBrains Mono" letterSpacing="1">EXPERIMENT</text>
          <text x="100" y="87" textAnchor="middle" fill="#1a1714" fontSize="10" fontFamily="DM Sans" fontWeight="700">vit-finetune-042</text>
          {/* edges → children */}
          <line x1="80" y1="96" x2="49" y2="116" stroke="rgba(22,163,74,.4)" strokeWidth="1.2" markerEnd="url(#lat2-arr-r)"/>
          <line x1="120" y1="96" x2="151" y2="118" stroke="rgba(230,82,82,.4)" strokeWidth="1.2" strokeDasharray="3,2" markerEnd="url(#lat2-arr-fail)"/>
          {/* row 3: eval (pass) + failed experiment */}
          <rect x="8" y="112" width="82" height="30" rx="5" fill="#fff" stroke="rgba(22,163,74,.28)" strokeWidth="1"/>
          <text x="49" y="123" textAnchor="middle" fill="rgba(26,23,20,.28)" fontSize="5.5" fontFamily="JetBrains Mono">EVALUATION</text>
          <text x="49" y="135" textAnchor="middle" fill="#16a34a" fontSize="8" fontFamily="DM Sans" fontWeight="600">✓ Safety v2.1</text>
          {/* failed next experiment */}
          <rect x="110" y="114" width="82" height="30" rx="5" fill="rgba(230,82,82,.04)" stroke="rgba(230,82,82,.35)" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="151" y="125" textAnchor="middle" fill="rgba(26,23,20,.28)" fontSize="5.5" fontFamily="JetBrains Mono">EXPERIMENT</text>
          <text x="151" y="137" textAnchor="middle" fill="#e05252" fontSize="7.5" fontFamily="DM Sans" fontWeight="600">✗ vit-043 −3.2%</text>
        </svg>
      </div>
      {/* RIGHT — detail */}
      <div style={{ padding:"10px 11px", display:"flex", flexDirection:"column", gap:7, overflow:"hidden" }}>
        <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.28)", letterSpacing:2 }}>HYPERPARAMETER DELTA</div>
        {[
          { k:"lr",      prev:"3e-4", curr:"1e-4", good:true  },
          { k:"epochs",  prev:"10",   curr:"20",   good:true  },
          { k:"dropout", prev:"0.1",  curr:"0.3",  good:false },
          { k:"batch",   prev:"32",   curr:"64",   good:true  },
        ].map(({k,prev,curr,good})=>(
          <div key={k} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.35)", width:40 }}>{k}</span>
            <span style={{ fontSize:7.5, color:"rgba(26,23,20,.3)", background:"rgba(26,23,20,.04)", padding:"1px 5px", borderRadius:2, fontFamily:"'JetBrains Mono',monospace" }}>{prev}</span>
            <span style={{ fontSize:8, color:"rgba(26,23,20,.2)" }}>→</span>
            <span style={{ fontSize:7.5, color:good?"#16a34a":"#e05252", background:good?"rgba(22,163,74,.08)":"rgba(230,82,82,.08)", padding:"1px 5px", borderRadius:2, fontFamily:"'JetBrains Mono',monospace", fontWeight:600 }}>{curr}</span>
          </div>
        ))}
        <div style={{ height:1, background:"rgba(26,23,20,.06)" }} />
        <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.28)", letterSpacing:2 }}>METRIC OUTCOME</div>
        {[
          { label:"top-1 acc", val:"84.17%", delta:"+5.07%", color:"#c0392b" },
          { label:"top-5 acc", val:"96.84%", delta:"+2.64%", color:"#7c3aed" },
        ].map(({label,val,delta,color})=>(
          <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
            <span style={{ fontSize:7.5, color:"rgba(26,23,20,.5)" }}>{label}</span>
            <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
              <span style={{ fontSize:12, fontWeight:700, color:"#1a1714", letterSpacing:"-.03em" }}>{val}</span>
              <span style={{ fontSize:7, color:"#16a34a", fontFamily:"'JetBrains Mono',monospace" }}>{delta}</span>
            </div>
          </div>
        ))}
        {/* failed run insight */}
        <div style={{ marginTop:"auto", padding:"6px 8px", background:"rgba(230,82,82,.04)", border:"1px solid rgba(230,82,82,.18)", borderRadius:5 }}>
          <div style={{ fontSize:7, fontWeight:600, color:"#e05252", marginBottom:3 }}>✗ vit-043 regression detected</div>
          <div style={{ fontSize:7.5, color:"rgba(26,23,20,.55)", lineHeight:1.5 }}>top-1 dropped 3.2% vs 042. lr+dropout interaction likely cause — suggest reverting one variable at a time.</div>
        </div>
        <div style={{ padding:"5px 0 2px", display:"flex", justifyContent:"space-between" }}>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.25)" }}>47 experiments · 3 papers</span>
          <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"#c0392b" }}>full graph →</span>
        </div>
      </div>
    </div>
  </div>
);


const ClearExpScreen = () => (
  <div style={{ width:"100%", height:"100%", background:"#0f0c08", fontFamily:"'EB Garamond',serif", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column" }}>
    <style>{`
      @keyframes scanReveal { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
      @keyframes underlineGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
      @keyframes fadeFloat { 0%,100%{opacity:.07;transform:translateY(0)} 50%{opacity:.12;transform:translateY(-8px)} }
      @keyframes barFill { from{width:0} to{width:var(--w)} }
    `}</style>

    {/* massive ghost letterform — decorative backdrop */}
    <div style={{ position:"absolute", top:"-15%", right:"-8%", fontSize:260, fontFamily:"'EB Garamond',serif", fontStyle:"italic", color:"#db2777", lineHeight:1, userSelect:"none", pointerEvents:"none", animation:"fadeFloat 6s ease-in-out infinite", opacity:.08, letterSpacing:-10 }}>T</div>
    <div style={{ position:"absolute", bottom:"-10%", left:"-4%", fontSize:180, fontFamily:"'Amiri',serif", color:"#7c3aed", direction:"rtl", lineHeight:1, userSelect:"none", pointerEvents:"none", animation:"fadeFloat 8s ease-in-out 2s infinite", opacity:.07 }}>{"ن"}</div>

    {/* top bar */}
    <div style={{ padding:"10px 14px 8px", borderBottom:"1px solid rgba(255,255,255,.07)", display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", zIndex:1 }}>
      <span style={{ fontSize:7.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(219,39,119,.6)", letterSpacing:3 }}>CLEAR EXPRESSION</span>
      <div style={{ display:"flex", gap:5 }}>
        {[["COLOR","#db2777"],["WEIGHT","#2e9e6a"],["SPACE","#7c3aed"]].map(([l,c])=>(
          <div key={l} style={{ padding:"2px 6px", borderRadius:2, border:`1px solid ${c}35`, background:`${c}10` }}>
            <span style={{ fontSize:6, fontFamily:"'JetBrains Mono',monospace", color:c, letterSpacing:1 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>

    {/* hero — the sentence, three times, getting more alive */}
    <div style={{ flex:1, padding:"14px 14px 8px", display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", zIndex:1 }}>

      {/* version 01 — raw, flat */}
      <div style={{ paddingBottom:10, borderBottom:"1px solid rgba(255,255,255,.06)" }}>
        <div style={{ fontSize:6, fontFamily:"'JetBrains Mono',monospace", color:"rgba(255,255,255,.2)", letterSpacing:2, marginBottom:6 }}>01 · RAW</div>
        <p style={{ fontSize:12, lineHeight:1.7, color:"rgba(255,255,255,.28)", margin:0 }}>
          The earth orbits the sun in roughly the same way a yo-yo swings around your hand — pulled inward, never arriving.
        </p>
      </div>

      {/* version 02 — color encoded */}
      <div style={{ paddingBottom:10, borderBottom:"1px solid rgba(255,255,255,.06)" }}>
        <div style={{ fontSize:6, fontFamily:"'JetBrains Mono',monospace", color:"rgba(255,255,255,.2)", letterSpacing:2, marginBottom:6 }}>02 · COLOR ENCODING</div>
        <p style={{ fontSize:12, lineHeight:1.7, color:"rgba(255,255,255,.55)", margin:0 }}>
          The earth orbits the sun{" "}
          <span style={{ color:"rgba(255,255,255,.55)", fontStyle:"italic" }}>in roughly the same way</span>{" "}
          <span style={{ color:"#db2777", fontWeight:700, fontStyle:"normal", fontFamily:"'DM Sans',sans-serif" }}>a yo-yo swings around your hand</span>
          <span style={{ color:"rgba(255,255,255,.4)" }}> — pulled inward, never arriving.</span>
        </p>
      </div>

      {/* version 03 — fully encoded, beautiful */}
      <div style={{ paddingBottom:6 }}>
        <div style={{ fontSize:6, fontFamily:"'JetBrains Mono',monospace", color:"rgba(219,39,119,.5)", letterSpacing:2, marginBottom:6 }}>03 · FULLY ENCODED</div>
        <p style={{ fontSize:13, lineHeight:1.85, color:"rgba(255,255,255,.88)", margin:0 }}>
          <span style={{ fontWeight:400 }}>The earth orbits the sun{" "}</span>
          <span style={{ fontStyle:"italic", color:"rgba(255,255,255,.55)" }}>in roughly the same way{" "}</span>
          <span style={{
            color:"#db2777",
            fontWeight:700,
            fontFamily:"'DM Sans',sans-serif",
            fontSize:13,
            position:"relative",
            display:"inline",
          }}>a yo-yo swings around your hand
            <span style={{ position:"absolute", bottom:-1, left:0, right:0, height:"1.5px", background:"#db2777", transformOrigin:"left", animation:"underlineGrow 1s ease .5s both", display:"block" }}/>
          </span>
          <span style={{ color:"rgba(255,255,255,.5)" }}> — </span>
          <span style={{ background:"rgba(124,58,237,.2)", color:"#c4b5fd", padding:"1px 4px", borderRadius:3, fontStyle:"italic" }}>pulled inward, never arriving.</span>
        </p>
      </div>
    </div>

    {/* recall bars — the research outcome */}
    <div style={{ padding:"8px 14px 10px", borderTop:"1px solid rgba(255,255,255,.06)", display:"flex", gap:10, alignItems:"center", position:"relative", zIndex:1 }}>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
          <div style={{ flex:1, height:3, background:"rgba(255,255,255,.07)", borderRadius:99, overflow:"hidden" }}>
            <div style={{ "--w":"24%", height:"100%", background:"#e05252", borderRadius:99, animation:"barFill .8s ease both", width:"24%" }}/>
          </div>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"#e05252", width:22 }}>24%</span>
          <span style={{ fontSize:6.5, color:"rgba(255,255,255,.2)" }}>raw</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ flex:1, height:3, background:"rgba(255,255,255,.07)", borderRadius:99, overflow:"hidden" }}>
            <div style={{ "--w":"83%", height:"100%", background:"#db2777", borderRadius:99, animation:"barFill 1s ease .3s both", width:"83%" }}/>
          </div>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"#db2777", width:22 }}>83%</span>
          <span style={{ fontSize:6.5, color:"rgba(255,255,255,.2)" }}>encoded</span>
        </div>
      </div>
      <div style={{ flexShrink:0, textAlign:"right" }}>
        <div style={{ fontSize:18, fontWeight:800, fontFamily:"'DM Sans',sans-serif", color:"#db2777", letterSpacing:"-.04em", lineHeight:1 }}>+3.5×</div>
        <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(255,255,255,.25)", letterSpacing:1 }}>recall</div>
      </div>
    </div>
  </div>
);


const MCPScreen = () => (
  <div style={{ width:"100%", height:"100%", background:"#f9f8f5", fontFamily:"'DM Sans',sans-serif", display:"flex", flexDirection:"column", overflow:"hidden" }}>
    {/* header */}
    <div style={{ padding:"9px 13px 7px", borderBottom:"1px solid rgba(26,23,20,.07)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
        <span style={{ fontSize:10, fontWeight:700, color:"#1a1714", letterSpacing:"-.02em" }}>Multi-Agent</span>
        <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.35)", background:"rgba(26,23,20,.05)", padding:"2px 7px", borderRadius:99 }}>round 3 / convergence</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.3)" }}>consensus</span>
        <div style={{ width:44, height:4, background:"rgba(26,23,20,.08)", borderRadius:99, overflow:"hidden" }}>
          <div style={{ width:"82%", height:"100%", background:"linear-gradient(to right,#d97706,#16a34a)", borderRadius:99 }} />
        </div>
        <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"#16a34a" }}>82%</span>
      </div>
    </div>
    {/* human prompt */}
    <div style={{ padding:"8px 13px 7px", borderBottom:"1px solid rgba(26,23,20,.06)", background:"rgba(26,23,20,.02)" }}>
      <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.3)", letterSpacing:2, marginBottom:4 }}>USER PROMPT</div>
      <div style={{ fontSize:8.5, color:"rgba(26,23,20,.65)", lineHeight:1.55, fontStyle:"italic", fontFamily:"'EB Garamond',serif" }}>
        "we're onboarding 3 engineers next week — two are ml, one is infra. what should each of them read first?"
      </div>
    </div>
    {/* agent pills */}
    <div style={{ padding:"6px 13px 4px", display:"flex", gap:5 }}>
      {[["Claude 3.7","#4285f4","author"],["Mixtral","#d97706","critic"],["GPT-4o","#16a34a","synthesizer"]].map(([name,c,role])=>(
        <div key={name} style={{ display:"flex", alignItems:"center", gap:4, padding:"3px 7px", borderRadius:4, background:`${c}0a`, border:`1px solid ${c}30` }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:c }} />
          <span style={{ fontSize:7.5, fontWeight:600, color:c }}>{name}</span>
          <span style={{ fontSize:6, color:"rgba(26,23,20,.3)", fontFamily:"'JetBrains Mono',monospace" }}>/{role}</span>
        </div>
      ))}
    </div>
    {/* output evolution */}
    <div style={{ flex:1, padding:"5px 13px", display:"flex", flexDirection:"column", gap:4, overflow:"hidden" }}>
      <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.28)", letterSpacing:2 }}>OUTPUT EVOLUTION</div>
      {/* round 1 */}
      <div style={{ background:"rgba(26,23,20,.03)", border:"1px solid rgba(26,23,20,.08)", borderRadius:5, padding:"5px 8px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"#4285f4", letterSpacing:1 }}>R1 · Claude draft</span>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.25)" }}>clarity 38</span>
        </div>
        <div style={{ fontSize:7.5, lineHeight:1.5, color:"rgba(26,23,20,.35)" }}>
          Share the <span style={{ background:"rgba(220,38,38,.08)", color:"#dc2626", borderRadius:2, padding:"0 2px" }}>onboarding docs</span> and have them <span style={{ background:"rgba(220,38,38,.08)", color:"#dc2626", borderRadius:2, padding:"0 2px" }}>read the codebase</span> before the first week.
        </div>
      </div>
      {/* round 2 */}
      <div style={{ background:"rgba(26,23,20,.03)", border:"1px solid rgba(26,23,20,.07)", borderRadius:5, padding:"5px 8px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"#d97706", letterSpacing:1 }}>R2 · after critique</span>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.25)" }}>clarity 67</span>
        </div>
        <div style={{ fontSize:7.5, lineHeight:1.5, color:"rgba(26,23,20,.52)" }}>
          Route by role: <span style={{ background:"rgba(22,163,74,.1)", color:"#15803d", borderRadius:2, padding:"0 2px" }}>ML engineers → model cards + training pipeline</span>; infra → deployment runbooks.
        </div>
      </div>
      {/* round 3 */}
      <div style={{ background:"rgba(22,163,74,.04)", border:"1px solid rgba(22,163,74,.2)", borderRadius:5, padding:"5px 8px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"#16a34a", letterSpacing:1 }}>R3 · synthesized ✓</span>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"#16a34a" }}>clarity 91</span>
        </div>
        <div style={{ fontSize:7.5, lineHeight:1.55, color:"rgba(26,23,20,.78)" }}>
          <span style={{ color:"#1a1714", fontWeight:600 }}>ML ×2:</span>{" "}model cards → loss curves → open evals.{" "}
          <span style={{ color:"#1a1714", fontWeight:600 }}>Infra:</span>{" "}deploy runbook → on-call rotation → shadow an incident first.
        </div>
      </div>
    </div>
    {/* delta bar */}
    <div style={{ padding:"5px 13px 9px", display:"flex", alignItems:"center", gap:7, borderTop:"1px solid rgba(26,23,20,.06)" }}>
      <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.28)" }}>DELTA</span>
      <div style={{ flex:1, display:"flex", gap:3 }}>
        {[[38,"#e05252"],[67,"#d97706"],[91,"#16a34a"]].map(([v,c],i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:3, flex:1 }}>
            <div style={{ height:3, flex:1, background:`${c}35`, borderRadius:99 }} />
            <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.3)" }}>{v}</span>
          </div>
        ))}
      </div>
      <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"#16a34a" }}>+53 pts</span>
    </div>
  </div>
);


const PlotmindScreen = () => (
  <div style={{ width:"100%", height:"100%", background:"#fafaf8", fontFamily:"'DM Sans',sans-serif", display:"flex", flexDirection:"column", overflow:"hidden" }}>
    {/* header */}
    <div style={{ padding:"9px 13px 7px", borderBottom:"1px solid rgba(26,23,20,.07)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
        <div style={{ width:14, height:14, background:"linear-gradient(135deg,#7c3aed,#db2777)", borderRadius:3 }} />
        <span style={{ fontSize:10, fontWeight:700, color:"#1a1714", letterSpacing:"-.02em" }}>plotmind</span>
      </div>
      <div style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.3)", background:"rgba(124,58,237,.06)", border:"1px solid rgba(124,58,237,.12)", padding:"2px 8px", borderRadius:99 }}>nl → chart</div>
    </div>

    {/* NL input bar */}
    <div style={{ padding:"8px 13px 6px", borderBottom:"1px solid rgba(26,23,20,.06)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(26,23,20,.04)", border:"1px solid rgba(26,23,20,.09)", borderRadius:6, padding:"6px 10px" }}>
        <span style={{ fontSize:9, color:"rgba(26,23,20,.7)", flex:1, fontStyle:"italic" }}>"show me revenue trend by region, only where growth exceeded 15%"</span>
        <div style={{ width:14, height:14, borderRadius:"50%", background:"#7c3aed", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <div style={{ width:5, height:5, borderLeft:"1.5px solid #fff", borderBottom:"1.5px solid #fff", transform:"rotate(-135deg)", marginTop:1 }} />
        </div>
      </div>
    </div>

    {/* reasoning trace — the intelligence layer */}
    <div style={{ padding:"7px 13px 5px", display:"flex", flexDirection:"column", gap:4, borderBottom:"1px solid rgba(26,23,20,.05)" }}>
      <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.28)", letterSpacing:2, marginBottom:1 }}>INTENT TRACE</div>
      {[
        { step:"metric",    val:"revenue",           color:"#7c3aed", check:true },
        { step:"dimension", val:"region (geo)",      color:"#0369a1", check:true },
        { step:"filter",    val:"growth > 15%",      color:"#db2777", check:true },
        { step:"chart",     val:"line (trend implied)", color:"#059669", check:true },
      ].map(({step,val,color,check})=>(
        <div key={step} style={{ display:"flex", alignItems:"center", gap:7 }}>
          <div style={{ width:12, height:12, borderRadius:"50%", background:`${color}15`, border:`1px solid ${color}40`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            {check && <div style={{ width:5, height:3, borderLeft:`1.5px solid ${color}`, borderBottom:`1.5px solid ${color}`, transform:"rotate(-45deg)", marginTop:1 }} />}
          </div>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.3)", width:52 }}>{step}</span>
          <span style={{ fontSize:8, color:"rgba(26,23,20,.75)", fontWeight:500 }}>{val}</span>
        </div>
      ))}
    </div>

    {/* chart output — light, clean */}
    <div style={{ flex:1, padding:"6px 13px 2px", position:"relative" }}>
      <svg width="100%" height="100%" viewBox="0 0 300 80" preserveAspectRatio="none" style={{ overflow:"visible" }}>
        <defs>
          <linearGradient id="pm2-na" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7c3aed" stopOpacity=".15"/><stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/></linearGradient>
          <linearGradient id="pm2-eu" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0369a1" stopOpacity=".12"/><stop offset="100%" stopColor="#0369a1" stopOpacity="0"/></linearGradient>
        </defs>
        {/* grid */}
        {[0,27,54,80].map(y=><line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(26,23,20,.05)" strokeWidth="1"/>)}
        {/* NA line */}
        <polygon points="0,80 0,52 50,44 100,36 150,28 200,22 250,16 300,12 300,80" fill="url(#pm2-na)"/>
        <polyline points="0,52 50,44 100,36 150,28 200,22 250,16 300,12" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinejoin="round"/>
        {/* EU line */}
        <polygon points="0,80 0,60 50,58 100,52 150,46 200,42 250,38 300,34 300,80" fill="url(#pm2-eu)"/>
        <polyline points="0,60 50,58 100,52 150,46 200,42 250,38 300,34" fill="none" stroke="#0369a1" strokeWidth="1.8" strokeLinejoin="round"/>
        {/* filter threshold annotation */}
        <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(219,39,119,.25)" strokeWidth="1" strokeDasharray="4,3"/>
        <rect x="200" y="32" width="52" height="12" rx="2" fill="rgba(219,39,119,.08)" stroke="rgba(219,39,119,.2)" strokeWidth="1"/>
        <text x="226" y="40" textAnchor="middle" fill="#db2777" fontSize="6" fontFamily="JetBrains Mono">+15% filter</text>
      </svg>
    </div>

    {/* x-axis labels */}
    <div style={{ display:"flex", padding:"0 13px 4px" }}>
      {["Q1","Q2","Q3","Q4","Q1'25","Q2","Q3","Q4"].map((l,i)=>(
        <div key={i} style={{ flex:1, textAlign:"center", fontSize:6.5, color:"rgba(26,23,20,.25)", fontFamily:"'JetBrains Mono',monospace" }}>{l}</div>
      ))}
    </div>

    {/* confidence + explain footer */}
    <div style={{ padding:"5px 13px 9px", display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:"1px solid rgba(26,23,20,.05)" }}>
      <div style={{ display:"flex", gap:10 }}>
        {[["NA","#7c3aed"],["EU","#0369a1"]].map(([l,c])=>(
          <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}>
            <div style={{ width:12, height:2.5, background:c, borderRadius:99 }} />
            <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.4)" }}>{l}</span>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <span style={{ fontSize:7.5, color:"rgba(26,23,20,.35)", fontStyle:"italic" }}>why a line chart?</span>
        <div style={{ padding:"2px 7px", background:"rgba(124,58,237,.07)", border:"1px solid rgba(124,58,237,.18)", borderRadius:3, fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"#7c3aed" }}>explain ✦</div>
      </div>
    </div>
  </div>
);


const ModelPulseScreen = () => {
  const acc  = [88,89,91,90,88,86,84,82,79,76,73,74,76];
  const drift= [.02,.02,.03,.04,.06,.09,.12,.16,.21,.24,.23,.22,.21];
  const W=160, H=44;
  const apts = acc.map((v,i)=>`${(i/(acc.length-1))*W},${H-((v-60)/35)*H}`).join(" ");
  const dpts = drift.map((v,i)=>`${(i/(drift.length-1))*W},${H-(v/0.28)*H}`).join(" ");
  return (
    <div style={{ width:"100%", height:"100%", background:"#09080a", fontFamily:"'DM Sans',sans-serif", display:"flex", flexDirection:"column", overflow:"hidden" }}>
      {/* top bar */}
      <div style={{ padding:"9px 13px 7px", borderBottom:"1px solid rgba(255,255,255,.05)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <div style={{ width:16, height:16, background:"#0369a1", borderRadius:3, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:8, height:8, border:"1.5px solid #fff", borderRadius:"50%", borderTopColor:"transparent" }}/>
          </div>
          <span style={{ fontSize:10, fontWeight:700, color:"#ece8e0", letterSpacing:"-.02em" }}>ModelPulse</span>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(236,232,224,.2)", background:"rgba(255,255,255,.04)", padding:"2px 7px", borderRadius:99 }}>production · vit-prod-v2.1</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <div style={{ width:5, height:5, background:"#e63946", borderRadius:"50%" }}/>
          <span style={{ fontSize:7, color:"rgba(230,57,70,.75)", fontFamily:"'JetBrains Mono',monospace" }}>DRIFT ALERT</span>
        </div>
      </div>
      {/* metrics */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
        {[["Accuracy","73.18%","-14.83%",true],["Drift","0.213","+0.191",true],["Latency","138ms","+21ms",false],["Req/s","4,817","+1.8%",false]].map(([l,v,d,bad],i)=>(
          <div key={i} style={{ padding:"8px 11px", borderRight:i<3?"1px solid rgba(255,255,255,.04)":"none" }}>
            <div style={{ fontSize:6.5, color:"rgba(236,232,224,.22)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:1, marginBottom:3 }}>{l.toUpperCase()}</div>
            <div style={{ fontSize:14, fontWeight:800, color:bad?"#e63946":"#ece8e0", letterSpacing:"-.04em", lineHeight:1 }}>{v}</div>
            <div style={{ fontSize:7, color:bad?"rgba(230,57,70,.65)":"rgba(46,204,113,.65)", fontFamily:"'JetBrains Mono',monospace", marginTop:2 }}>{d}</div>
          </div>
        ))}
      </div>
      {/* charts */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
        <div style={{ padding:"7px 11px", borderRight:"1px solid rgba(255,255,255,.04)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
            <span style={{ fontSize:7.5, fontWeight:600, color:"rgba(236,232,224,.55)" }}>Accuracy</span>
            <span style={{ fontSize:6.5, color:"#e63946", fontFamily:"'JetBrains Mono',monospace" }}>degrading</span>
          </div>
          <svg width="100%" viewBox={`0 0 ${W} ${H+4}`} style={{ overflow:"visible" }}>
            <line x1="0" y1={H-((85-60)/35)*H} x2={W} y2={H-((85-60)/35)*H} stroke="rgba(236,232,224,.07)" strokeWidth="1" strokeDasharray="3,3"/>
            <polygon points={`0,${H} ${apts} ${W},${H}`} fill="rgba(3,105,161,.08)"/>
            <polyline points={apts} fill="none" stroke="#0369a1" strokeWidth="1.8" strokeLinejoin="round"/>
            <circle cx={W} cy={H-((76-60)/35)*H} r="3" fill="#e63946"/>
          </svg>
        </div>
        <div style={{ padding:"7px 11px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
            <span style={{ fontSize:7.5, fontWeight:600, color:"rgba(236,232,224,.55)" }}>Feature Drift</span>
            <span style={{ fontSize:6.5, color:"#e63946", fontFamily:"'JetBrains Mono',monospace" }}>critical</span>
          </div>
          <svg width="100%" viewBox={`0 0 ${W} ${H+4}`} style={{ overflow:"visible" }}>
            <line x1="0" y1={H-(0.1/0.28)*H} x2={W} y2={H-(0.1/0.28)*H} stroke="rgba(230,57,70,.18)" strokeWidth="1" strokeDasharray="3,3"/>
            <polygon points={`0,${H} ${dpts} ${W},${H}`} fill="rgba(230,57,70,.07)"/>
            <polyline points={dpts} fill="none" stroke="#e63946" strokeWidth="1.8" strokeLinejoin="round"/>
            <circle cx={W} cy={H-(0.21/0.28)*H} r="3" fill="#e63946"/>
          </svg>
        </div>
      </div>
      {/* ROOT CAUSE */}
      <div style={{ padding:"7px 13px 5px", display:"flex", flexDirection:"column", gap:4 }}>
        <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(236,232,224,.22)", letterSpacing:2 }}>ROOT CAUSE · FEATURE ATTRIBUTION</div>
        {[
          { feat:"age_feature",   contrib:0.42, status:"shifted", color:"#e63946" },
          { feat:"income_bucket", contrib:0.31, status:"shifted", color:"#e63946" },
          { feat:"region_code",   contrib:0.18, status:"stable",  color:"rgba(46,204,113,.7)" },
          { feat:"tenure_days",   contrib:0.09, status:"stable",  color:"rgba(46,204,113,.7)" },
        ].map(({feat,contrib,status,color})=>(
          <div key={feat} style={{ display:"flex", alignItems:"center", gap:7 }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:color, flexShrink:0 }} />
            <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"rgba(236,232,224,.45)", width:80, flexShrink:0 }}>{feat}</span>
            <div style={{ flex:1, height:3.5, background:"rgba(255,255,255,.05)", borderRadius:99, overflow:"hidden" }}>
              <div style={{ width:`${contrib*100}%`, height:"100%", background:color, borderRadius:99, opacity:.8 }} />
            </div>
            <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color, width:32, textAlign:"right" }}>{status}</span>
          </div>
        ))}
      </div>
      {/* TRUST SIGNAL — the Anthropic-specific panel */}
      <div style={{ margin:"4px 13px 9px", padding:"7px 10px", background:"rgba(245,158,11,.05)", border:"1px solid rgba(245,158,11,.22)", borderRadius:6 }}>
        <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(245,158,11,.7)", letterSpacing:2, marginBottom:4 }}>⚠ LOW-CONFIDENCE SEGMENT</div>
        <div style={{ fontSize:7.5, color:"rgba(236,232,224,.6)", lineHeight:1.5 }}>
          Predictions on <span style={{ color:"#fbbf24", fontWeight:600 }}>age_feature inputs</span> should be treated as <span style={{ color:"#fbbf24", fontWeight:600 }}>unreliable</span> until retrained. Confidence dropped below 0.61 threshold 17 min ago.
        </div>
        <div style={{ display:"flex", gap:8, marginTop:5 }}>
          <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"#0369a1", fontWeight:700 }}>RETRAIN →</span>
          <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"rgba(236,232,224,.25)" }}>flag outputs in UI</span>
        </div>
      </div>
    </div>
  );
};


const TangentScreen = () => (
  <div style={{ width:"100%", height:"100%", background:"#0a0a0a", fontFamily:"'DM Sans',sans-serif", display:"grid", gridTemplateColumns:"1fr 220px", overflow:"hidden" }}>
    <style>{`
      @keyframes tangRotate{from{transform:rotateY(0deg) rotateX(8deg)}to{transform:rotateY(360deg) rotateX(8deg)}}
      @keyframes tangCursor{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes tangCmd{from{opacity:0;transform:translateX(-4px)}to{opacity:1;transform:translateX(0)}}
    `}</style>
    <div style={{ position:"relative", overflow:"hidden", borderRight:"1px solid rgba(180,224,0,.15)" }}>
      <div style={{ position:"absolute", top:8, left:10, fontSize:7, color:"rgba(180,224,0,.5)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:1 }}>TANGENT / VIEWPORT</div>
      <svg width="100%" height="100%" viewBox="0 0 320 240" style={{ position:"absolute", inset:0 }}>
        {[0,40,80,120,160,200,240,280,320].map(x=><line key={x} x1={x} y1="0" x2={x} y2="240" stroke="rgba(180,224,0,.04)" strokeWidth="1"/>)}
        {[0,40,80,120,160,200,240].map(y=><line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(180,224,0,.04)" strokeWidth="1"/>)}
        <defs><marker id="arrow-lime2" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto"><path d="M0,0 L0,5 L5,2.5 z" fill="#b4e000"/></marker></defs>
        <text x="308" y="125" fill="rgba(180,224,0,.3)" fontSize="8" fontFamily="JetBrains Mono">X</text>
        <text x="162" y="235" fill="rgba(180,224,0,.3)" fontSize="8" fontFamily="JetBrains Mono">Y</text>
        <text x="222" y="48"  fill="rgba(180,224,0,.3)" fontSize="8" fontFamily="JetBrains Mono">Z</text>
        <line x1="140" y1="118" x2="140" y2="78" stroke="rgba(180,224,0,.45)" strokeWidth="1.2" markerEnd="url(#arrow-lime2)"/>
      </svg>
      <div style={{ position:"absolute", top:"50%", left:"46%", transform:"translate(-50%,-50%)", width:80, height:80, perspective:300 }}>
        <div style={{ width:"100%", height:"100%", transformStyle:"preserve-3d", animation:"tangRotate 9s linear infinite" }}>
          <div style={{ position:"absolute", inset:0, border:"1.5px solid #b4e000", background:"rgba(180,224,0,.03)", opacity:.85 }}/>
          <div style={{ position:"absolute", inset:0, border:"1.5px solid #b4e000", background:"rgba(180,224,0,.05)", transform:"rotateX(90deg) translateZ(40px)", opacity:.7 }}/>
          <div style={{ position:"absolute", inset:0, border:"1.5px solid #b4e000", background:"rgba(180,224,0,.04)", transform:"rotateY(90deg) translateZ(40px)", opacity:.6 }}/>
          <div style={{ position:"absolute", inset:0, border:"1px solid rgba(180,224,0,.4)", transform:"translateZ(-80px)", opacity:.4 }}/>
          {[[0,0],[80,0],[0,80],[80,80]].map(([x,y],i)=>(
            <div key={i} style={{ position:"absolute", left:x-3, top:y-3, width:6, height:6, borderRadius:"50%", background:"#b4e000", opacity:.7 }}/>
          ))}
        </div>
      </div>
    </div>
    <div style={{ padding:"10px 10px", display:"flex", flexDirection:"column", gap:8, overflow:"hidden" }}>
      <div style={{ fontSize:7, color:"rgba(180,224,0,.5)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:1.5 }}>PROMPT</div>
      <div style={{ background:"rgba(180,224,0,.05)", border:"1px solid rgba(180,224,0,.2)", borderRadius:5, padding:"7px 8px" }}>
        <div style={{ fontSize:7.5, color:"rgba(255,255,255,.7)", lineHeight:1.5 }}>make a rectangular prism, scale y by 1.5, round the top edges by 4px</div>
        <span style={{ fontSize:9, color:"rgba(180,224,0,.7)", animation:"tangCursor 1s step-end infinite" }}>|</span>
      </div>
      <div style={{ fontSize:7, color:"rgba(180,224,0,.4)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:1 }}>OUTPUT</div>
      <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
        {["box(2, 3, 2)","scale(y=1.5)","fillet(top, r=4)"].map((cmd,i)=>(
          <div key={i} style={{ padding:"4px 7px", background:"rgba(0,0,0,.3)", borderRadius:3, border:"1px solid rgba(180,224,0,.12)", animation:`tangCmd .4s ease ${i*.15+.2}s both` }}>
            <span style={{ fontSize:7.5, color:"#b4e000", fontFamily:"'JetBrains Mono',monospace" }}>{cmd}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop:"auto" }}>
        <div style={{ fontSize:7, color:"rgba(180,224,0,.3)", fontFamily:"'JetBrains Mono',monospace", marginBottom:4 }}>PARAMS</div>
        {[["width","2.0"],["height","3.0"],["depth","2.0"],["fillet","4px"]].map(([k,v])=>(
          <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"3px 0", borderBottom:"1px solid rgba(180,224,0,.07)" }}>
            <span style={{ fontSize:7.5, color:"rgba(255,255,255,.35)" }}>{k}</span>
            <span style={{ fontSize:7.5, color:"#b4e000", fontFamily:"'JetBrains Mono',monospace" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const RecursiveOrbitScreen = () => (
  <div style={{ width:"100%", height:"100%", background:"#060404", position:"relative", overflow:"hidden" }}>
    <style>{`
      @keyframes orbit1 { from{transform:rotate(0deg) translateX(22px) rotate(0deg)} to{transform:rotate(360deg) translateX(22px) rotate(-360deg)} }
      @keyframes orbit2 { from{transform:rotate(0deg) translateX(44px) rotate(0deg)} to{transform:rotate(-360deg) translateX(44px) rotate(360deg)} }
      @keyframes orbit3 { from{transform:rotate(0deg) translateX(70px) rotate(0deg)} to{transform:rotate(360deg) translateX(70px) rotate(-360deg)} }
      @keyframes orbit4 { from{transform:rotate(0deg) translateX(100px) rotate(0deg)} to{transform:rotate(-360deg) translateX(100px) rotate(360deg)} }
      @keyframes orbit5 { from{transform:rotate(0deg) translateX(132px) rotate(0deg)} to{transform:rotate(360deg) translateX(132px) rotate(-360deg)} }
      @keyframes corePulse { 0%,100%{transform:scale(1);opacity:.9} 50%{transform:scale(1.4);opacity:.5} }
      @keyframes glowBreath { 0%,100%{opacity:.18} 50%{opacity:.32} }
    `}</style>
    {/* ambient glow */}
    <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:340, height:340, borderRadius:"50%", background:"radial-gradient(circle, rgba(249,115,22,.22) 0%, rgba(220,38,38,.07) 50%, transparent 70%)", animation:"glowBreath 4s ease-in-out infinite", pointerEvents:"none" }} />
    {/* static orbit rings */}
    <svg width="100%" height="100%" viewBox="0 0 400 280" style={{ position:"absolute", inset:0 }}>
      <circle cx="200" cy="140" r="22"  fill="none" stroke="#fb923c" strokeWidth="1"   opacity=".3"/>
      <circle cx="200" cy="140" r="44"  fill="none" stroke="#f97316" strokeWidth="0.8" opacity=".25"/>
      <circle cx="200" cy="140" r="70"  fill="none" stroke="#ea580c" strokeWidth="1.2" opacity=".3"/>
      <circle cx="200" cy="140" r="100" fill="none" stroke="#dc2626" strokeWidth="0.6" opacity=".2" strokeDasharray="4,5"/>
      <circle cx="200" cy="140" r="132" fill="none" stroke="#9a3412" strokeWidth="0.5" opacity=".15" strokeDasharray="2,7"/>
    </svg>
    {/* center — core */}
    <div style={{ position:"absolute", top:"50%", left:"50%", width:10, height:10, marginTop:-5, marginLeft:-5, borderRadius:"50%", background:"#fb923c", animation:"corePulse 2.8s ease-in-out infinite" }} />
    <div style={{ position:"absolute", top:"50%", left:"50%", width:26, height:26, marginTop:-13, marginLeft:-13, borderRadius:"50%", border:"1px solid rgba(251,146,60,.2)", animation:"corePulse 2.8s ease-in-out .4s infinite" }} />
    {/* orbiting bodies */}
    {[
      { dur:"4s",  size:6,  color:"#fdba74", anim:"orbit1" },
      { dur:"7s",  size:5,  color:"#fb923c", anim:"orbit2" },
      { dur:"11s", size:8,  color:"#fed7aa", anim:"orbit3" },
      { dur:"16s", size:4,  color:"#dc2626", anim:"orbit4" },
      { dur:"22s", size:5,  color:"#9a3412", anim:"orbit5" },
    ].map(({dur,size,color,anim},i)=>(
      <div key={i} style={{ position:"absolute", top:"50%", left:"50%", marginTop:-size/2, marginLeft:-size/2, width:size, height:size, borderRadius:"50%", background:color, animation:`${anim} ${dur} linear infinite`, boxShadow:`0 0 ${size*2}px ${color}88` }} />
    ))}
    {/* label */}
    <div style={{ position:"absolute", bottom:10, left:0, right:0, textAlign:"center" }}>
      <span style={{ fontSize:6.5, color:"rgba(249,115,22,.3)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:3 }}>RECURSIVE ORBIT · GRIEF AS DATA</span>
    </div>
  </div>
);

const GreenDivideScreen = () => {
  const boroughs = [
    { name:"Manhattan",  high:14.2, low:2.1,  color:"#22c55e" },
    { name:"Brooklyn",   high:8.6,  low:1.8,  color:"#3b82f6" },
    { name:"Queens",     high:11.3, low:2.4,  color:"#f97316" },
    { name:"Bronx",      high:6.1,  low:1.2,  color:"#ec4899" },
    { name:"Staten I.",  high:18.4, low:4.8,  color:"#f59e0b" },
  ];
  const max = 20;
  return (
    <div style={{ width:"100%", height:"100%", background:"#0d0d0d", fontFamily:"'DM Sans',sans-serif", display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <style>{`@keyframes gdGrow{from{width:0}to{width:var(--w)}}`}</style>
      {/* header */}
      <div style={{ padding:"9px 14px 6px", borderBottom:"1px solid rgba(255,255,255,.07)" }}>
        <div style={{ fontSize:7, color:"rgba(255,255,255,.28)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:2, marginBottom:2 }}>THE GREEN DIVIDE · NYC</div>
        <div style={{ fontSize:11, fontWeight:700, color:"#fff", letterSpacing:"-.02em" }}>Acres of park per 1,000 residents</div>
      </div>
      {/* map card — light inset */}
      <div style={{ margin:"8px 12px 0", borderRadius:6, overflow:"hidden", border:"1px solid rgba(255,255,255,.08)", background:"#f0ede4" }}>
        <div style={{ padding:"5px 9px 4px", borderBottom:"1px solid rgba(26,23,20,.1)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:6, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.45)", letterSpacing:1.5 }}>NYC BOROUGHS · PARK ACCESS</span>
          <span style={{ fontSize:6, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.3)" }}>2021</span>
        </div>
        <svg width="100%" viewBox="0 0 300 80" style={{ display:"block" }}>
          {/* simplified borough shapes */}
          {[
            { path:"M60,10 L110,8 L118,35 L105,42 L62,40 Z",        color:"#22c55e", opacity:.7, label:"Manhattan",  lx:85,  ly:27 },
            { path:"M118,35 L155,28 L165,60 L130,68 L110,55 Z",     color:"#3b82f6", opacity:.65, label:"Brooklyn",  lx:138, ly:50 },
            { path:"M155,28 L210,20 L220,55 L175,62 L165,60 Z",     color:"#f97316", opacity:.65, label:"Queens",    lx:188, ly:42 },
            { path:"M62,10 L60,10 L62,40 L105,42 L100,15 Z",        color:"#ec4899", opacity:.65, label:"Bronx",     lx:80,  ly:24 },
            { path:"M220,55 L260,50 L265,72 L225,75 Z",             color:"#f59e0b", opacity:.7,  label:"Staten I.", lx:242, ly:64 },
          ].map(({path,color,opacity,label,lx,ly},i)=>(
            <g key={i}>
              <path d={path} fill={color} fillOpacity={opacity} stroke="#f0ede4" strokeWidth="1.5"/>
              <text x={lx} y={ly} textAnchor="middle" fill="rgba(26,23,20,.7)" fontSize="5.5" fontFamily="DM Sans" fontWeight="600">{label}</text>
            </g>
          ))}
        </svg>
      </div>
      {/* bars */}
      <div style={{ flex:1, padding:"8px 12px 4px", display:"flex", flexDirection:"column", justifyContent:"space-around" }}>
        {boroughs.map((b, bi) => (
          <div key={b.name} style={{ display:"flex", alignItems:"center", gap:7 }}>
            <div style={{ width:52, fontSize:7.5, color:"rgba(255,255,255,.45)", flexShrink:0, textAlign:"right" }}>{b.name}</div>
            <div style={{ flex:1, position:"relative", height:12 }}>
              <div style={{ position:"absolute", left:0, top:0, height:8, background:b.color, borderRadius:"0 2px 2px 0", opacity:.8, animation:`gdGrow .9s cubic-bezier(.4,0,.2,1) ${bi*.08}s both`, "--w":`${(b.high/max)*100}%`, width:`${(b.high/max)*100}%` }}/>
              <div style={{ position:"absolute", left:0, top:9, height:3, background:b.color, borderRadius:"0 2px 2px 0", opacity:.28, animation:`gdGrow .9s cubic-bezier(.4,0,.2,1) ${bi*.08+.1}s both`, "--w":`${(b.low/max)*100}%`, width:`${(b.low/max)*100}%` }}/>
            </div>
            <div style={{ fontSize:7.5, color:b.color, fontFamily:"'JetBrains Mono',monospace", flexShrink:0, width:28, textAlign:"right" }}>{b.high}</div>
          </div>
        ))}
      </div>
      {/* footer */}
      <div style={{ padding:"5px 12px 8px", borderTop:"1px solid rgba(255,255,255,.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:8, fontFamily:"'EB Garamond',serif", fontStyle:"italic", color:"rgba(255,255,255,.4)" }}>avg <span style={{ color:"#f59e0b" }}>5.4×</span> gap between high and low income</span>
        <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(255,255,255,.2)" }}>n=5 boroughs</span>
      </div>
    </div>
  );
};

const HeatingScreen = () => (
  <div style={{ width:"100%", height:"100%", background:"#fafaf8", fontFamily:"'DM Sans',sans-serif", display:"flex", flexDirection:"column", overflow:"hidden" }}>
    <div style={{ padding:"9px 13px 7px", borderBottom:"1px solid rgba(26,23,20,.07)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <div>
        <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.35)", letterSpacing:2 }}>ML RESEARCH · UC BERKELEY 2022</div>
        <div style={{ fontSize:10, fontWeight:600, color:"#1a1714" }}>Heating Load Prediction</div>
      </div>
      <div style={{ padding:"3px 9px", background:"rgba(217,119,6,.08)", border:"1px solid rgba(217,119,6,.25)", borderRadius:99, fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"#b45309" }}>R² = 0.997</div>
    </div>
    <div style={{ padding:"8px 13px 6px", borderBottom:"1px solid rgba(26,23,20,.05)" }}>
      <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.3)", letterSpacing:2, marginBottom:7 }}>MODEL COMPARISON</div>
      {[
        { name:"Random Forest",    r2:0.997, best:true  },
        { name:"Support Vector",   r2:0.968, best:false },
        { name:"Decision Tree",    r2:0.941, best:false },
        { name:"Linear Regression",r2:0.876, best:false },
      ].map(({name,r2,best})=>(
        <div key={name} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5 }}>
          <span style={{ fontSize:7.5, color:best?"#1a1714":"rgba(26,23,20,.4)", width:94, flexShrink:0, fontWeight:best?600:400 }}>{name}</span>
          <div style={{ flex:1, height:4, background:"rgba(26,23,20,.06)", borderRadius:99, overflow:"hidden" }}>
            <div style={{ width:`${r2*100}%`, height:"100%", background:best?"#d97706":"rgba(26,23,20,.18)", borderRadius:99 }}/>
          </div>
          <span style={{ fontSize:7.5, fontFamily:"'JetBrains Mono',monospace", color:best?"#b45309":"rgba(26,23,20,.35)", width:30, textAlign:"right", fontWeight:best?700:400 }}>{r2}</span>
        </div>
      ))}
    </div>
    <div style={{ flex:1, padding:"7px 13px 3px" }}>
      <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.3)", letterSpacing:2, marginBottom:4 }}>ACTUAL vs PREDICTED (kWh/m²)</div>
      <svg width="100%" height="78%" viewBox="0 0 300 80">
        <line x1="26" y1="6" x2="26" y2="72" stroke="rgba(26,23,20,.1)" strokeWidth="1"/>
        <line x1="26" y1="72" x2="295" y2="72" stroke="rgba(26,23,20,.1)" strokeWidth="1"/>
        {[20,40,60].map(y=><line key={y} x1="26" y1={y} x2="295" y2={y} stroke="rgba(26,23,20,.05)" strokeWidth="1"/>)}
        <polyline points="26,62 68,50 110,38 152,30 194,42 236,27 278,20" fill="none" stroke="rgba(26,23,20,.2)" strokeWidth="1.2" strokeDasharray="3,2"/>
        <polygon points="26,72 26,62 68,51 110,39 152,31 194,43 236,28 278,21 278,72" fill="rgba(217,119,6,.07)"/>
        <polyline points="26,62 68,51 110,39 152,31 194,43 236,28 278,21" fill="none" stroke="#d97706" strokeWidth="2"/>
        {["glazing","surface","height","compact","glazing","surface","height"].map((l,i)=>(
          <text key={i} x={26+i*42} y="80" textAnchor="middle" fill="rgba(26,23,20,.25)" fontSize="5" fontFamily="JetBrains Mono">{l}</text>
        ))}
      </svg>
    </div>
    <div style={{ padding:"4px 13px 9px", display:"flex", gap:7 }}>
      {[["RMSE","0.50 kWh"],["Cooling","−15%"],["Model","Random Forest"]].map(([k,v]) => (
        <div key={k} style={{ flex:1, padding:"5px 7px", background:"rgba(217,119,6,.05)", border:"1px solid rgba(217,119,6,.15)", borderRadius:4 }}>
          <div style={{ fontSize:6, color:"rgba(26,23,20,.35)", fontFamily:"'JetBrains Mono',monospace", marginBottom:2 }}>{k}</div>
          <div style={{ fontSize:k==="Model"?7.5:11, fontWeight:700, color:"#b45309", letterSpacing:"-.02em", lineHeight:1 }}>{v}</div>
        </div>
      ))}
    </div>
  </div>
);

const BitLotScreen = () => (
  <div style={{ width:"100%", height:"100%", background:"#f7f9f4", fontFamily:"'DM Sans',sans-serif", display:"flex", flexDirection:"column", overflow:"hidden" }}>
    <div style={{ padding:"9px 13px 7px", borderBottom:"1px solid rgba(26,23,20,.07)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
        <div style={{ width:15, height:15, background:"#16a34a", borderRadius:3, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:800, color:"#fff" }}>B</div>
        <span style={{ fontSize:10, fontWeight:700, color:"#1a1714", letterSpacing:"-.02em" }}>BitLot</span>
      </div>
      <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.35)", letterSpacing:1 }}>CUNY · Urban Policy · 2021</span>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderBottom:"1px solid rgba(26,23,20,.06)" }}>
      {[["70M+","sq ft air rights","#16a34a"],["10,000+","affordable units","#059669"],["$500M","community value","#047857"]].map(([v,l,c],i)=>(
        <div key={i} style={{ padding:"9px 11px", borderRight:i<2?"1px solid rgba(26,23,20,.05)":"none" }}>
          <div style={{ fontSize:16, fontWeight:800, color:c, letterSpacing:"-.04em", lineHeight:1, marginBottom:2 }}>{v}</div>
          <div style={{ fontSize:6.5, color:"rgba(26,23,20,.4)", fontFamily:"'JetBrains Mono',monospace", lineHeight:1.4 }}>{l}</div>
        </div>
      ))}
    </div>
    <div style={{ padding:"7px 13px 4px", borderBottom:"1px solid rgba(26,23,20,.05)" }}>
      <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.3)", letterSpacing:2, marginBottom:5 }}>AIR RIGHTS DENSITY · HARLEM</div>
      <svg width="100%" viewBox="0 0 320 56" style={{ overflow:"visible" }}>
        {[0,1,2,3,4,5,6].map(i=><line key={`v${i}`} x1={i*46+2} y1="0" x2={i*46+2} y2="56" stroke="rgba(26,23,20,.05)" strokeWidth="1"/>)}
        {[0,1].map(i=><line key={`h${i}`} x1="0" y1={i*28} x2="320" y2={i*28} stroke="rgba(26,23,20,.05)" strokeWidth="1"/>)}
        {[
          [2,1,40,25,.9],[46,1,36,25,.5],[86,1,44,25,.8],[134,1,38,25,.35],[176,1,42,25,.7],[222,1,40,25,.95],[266,1,48,25,.45],
          [2,29,46,25,.6],[50,29,38,25,.85],[92,29,44,25,.75],[140,29,40,25,.9],[184,29,42,25,.4],[228,29,36,25,.8],[268,29,46,25,.55],
        ].map(([x,y,w,h,d],i)=>(
          <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill={`rgba(22,163,74,${d*.35})`} stroke={`rgba(22,163,74,${d*.25})`} strokeWidth="0.5"/>
        ))}
        <rect x="2" y="0" width="316" height="54" rx="3" fill="none" stroke="rgba(22,163,74,.45)" strokeWidth="1.5" strokeDasharray="5,4"/>
        <text x="6" y="8.5" fill="rgba(22,163,74,.55)" fontSize="5" fontFamily="JetBrains Mono">HSTD BOUNDARY</text>
      </svg>
    </div>
    <div style={{ padding:"8px 13px 10px", flex:1, display:"flex", alignItems:"center" }}>
      <p style={{ fontSize:9, fontFamily:"'EB Garamond',serif", fontStyle:"italic", color:"rgba(26,23,20,.6)", lineHeight:1.7, margin:0 }}>
        "A community corporation aggregating air rights to develop affordable housing — promising <span style={{ color:"#16a34a", fontStyle:"normal", fontWeight:600 }}>$500M in community asset value</span> to legacy Harlem residents."
      </p>
    </div>
  </div>
);

const LivingComputingScreen = () => (
  <div style={{ width:"100%", height:"100%", background:"#0c0c0c", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column" }}>
    {/* YouTube chrome */}
    <div style={{ padding:"8px 10px 6px", display:"flex", alignItems:"center", gap:7, borderBottom:"1px solid rgba(255,255,255,.06)" }}>
      <div style={{ width:20, height:14, borderRadius:3, background:"#ff0000", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <div style={{ width:0, height:0, borderTop:"4px solid transparent", borderBottom:"4px solid transparent", borderLeft:"7px solid #fff", marginLeft:1 }} />
      </div>
      <span style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,.7)", letterSpacing:"-.01em" }}>YouTube</span>
      <div style={{ flex:1, height:16, background:"rgba(255,255,255,.06)", borderRadius:3, marginLeft:4 }} />
    </div>
    {/* 16:9 video area */}
    <div style={{ aspectRatio:"16/9", background:"#111", position:"relative", overflow:"hidden" }}>
      {/* gif placeholder */}
      <img src="/images/living-computing.gif" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", opacity:.85 }}
        onError={e => { e.target.style.display="none"; }} />
      {/* play button overlay */}
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,.25)" }}>
        <div style={{ width:44, height:44, borderRadius:"50%", background:"rgba(0,0,0,.65)", border:"2px solid rgba(255,255,255,.3)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:0, height:0, borderTop:"9px solid transparent", borderBottom:"9px solid transparent", borderLeft:"16px solid rgba(255,255,255,.85)", marginLeft:3 }} />
        </div>
      </div>
      {/* progress bar */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"rgba(255,255,255,.15)" }}>
        <div style={{ width:"38%", height:"100%", background:"#ff0000" }} />
      </div>
    </div>
    {/* video meta */}
    <div style={{ padding:"8px 10px 6px" }}>
      <div style={{ fontSize:9, fontWeight:600, color:"rgba(255,255,255,.75)", lineHeight:1.3, marginBottom:4 }}>Living Computing — Adaptive Interfaces</div>
      <div style={{ fontSize:7.5, color:"rgba(255,255,255,.3)", fontFamily:"'JetBrains Mono',monospace" }}>12,847 views · 2021</div>
    </div>
    {/* bottom controls */}
    <div style={{ padding:"0 10px 8px", display:"flex", gap:12, alignItems:"center" }}>
      {["▶","⏭","🔊"].map((ic,i) => (
        <span key={i} style={{ fontSize:10, color:"rgba(255,255,255,.4)" }}>{ic}</span>
      ))}
      <div style={{ flex:1 }} />
      <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"rgba(255,255,255,.25)" }}>2:14 / 5:47</span>
    </div>
  </div>
);

const SCREEN_COMPONENTS = {
  "lattice":        LatticeScreen,
  "model-pulse":    ModelPulseScreen,
  "aura":           AuraScreen,
  "clear-exp":      ClearExpScreen,
  "mcp":            MCPScreen,
  "plotmind":       PlotmindScreen,
  "tangent":        TangentScreen,
  "recursive-orbit":RecursiveOrbitScreen,
  "green-spaces":   GreenDivideScreen,
  "heating":        HeatingScreen,
  "living":         LivingComputingScreen,
  "bitlot":         BitLotScreen,
};

/* ══════════════════════════════════════════════════
   DEVICE FRAMES
══════════════════════════════════════════════════ */
const ScreenContent = ({ img, hovered, accent, style = {}, screenId }) => {
  const [ok, setOk] = useState(true);
  const CustomScreen = screenId && SCREEN_COMPONENTS[screenId];
  return (
    <div style={{ position:"relative", width:"100%", height:"100%", overflow:"hidden", ...style }}>
      {CustomScreen
        ? <CustomScreen />
        : ok && img
          ? <img src={img} alt="" onError={() => setOk(false)} draggable={false}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
                transform: hovered ? "scale(1.04)" : "scale(1)",
                transition:"transform .9s cubic-bezier(.4,0,.2,1)",
              }} />
          : <div style={{ width:"100%", height:"100%", background:`linear-gradient(145deg,${accent}15,${accent}06)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8 }}>
              <div style={{ width:32, height:32, borderRadius:"50%", border:`1.5px solid ${accent}40`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:`${accent}50` }} />
              </div>
              <span style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:`${accent}50`, letterSpacing:2, textAlign:"center" }}>image</span>
            </div>
      }
      <div style={{
        position:"absolute", top:0, left:0, height:2,
        background:`linear-gradient(to right, ${accent}, ${accent}80)`,
        width: hovered ? "100%" : "0%",
        transition:"width .8s cubic-bezier(.4,0,.2,1)",
        borderRadius:"0 2px 2px 0",
      }} />
    </div>
  );
};

const BrowserFrame = ({ img, hovered, t, accent, screenId, url }) => {
  const displayUrl = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'tanhata.github.io';
  return (
    <div style={{ width:"100%", borderRadius:10, overflow:"hidden", border:`1px solid ${accent}60`, background:t.frameBg }}>
      <div style={{ padding:"9px 14px", display:"flex", alignItems:"center", gap:8, borderBottom:`1px solid ${t.frameBorder}` }}>
        <div style={{ display:"flex", gap:5 }}>
          {["#e05252","#e6b04d","#52b952"].map((c,i) => (
            <div key={i} style={{ width:9, height:9, borderRadius:"50%", background: hovered ? c : `${accent}40`, transition:"background .3s" }} />
          ))}
        </div>
        <div style={{ flex:1, height:18, borderRadius:4, background:t.frameBorder, maxWidth:260, marginLeft:4, overflow:"hidden", display:"flex", alignItems:"center", paddingLeft:8 }}>
          <span style={{ fontSize:8, fontFamily:"'JetBrains Mono',monospace", color: hovered ? t.fgMuted : "transparent", letterSpacing:.5, whiteSpace:"nowrap", transition:"color .3s" }}>{displayUrl}</span>
        </div>
        <div style={{ width:7, height:7, borderRadius:"50%", background: hovered ? accent : t.frameBorder, transition:"background .3s", flexShrink:0 }} />
      </div>
      <div style={{ width:"100%", aspectRatio:"16/9", background:t.screenBg }}>
        <ScreenContent img={img} hovered={hovered} accent={accent} screenId={screenId} style={{ aspectRatio:"16/9" }} />
      </div>
    </div>
  );
};

const LaptopFrame = ({ img, hovered, t, accent, screenId }) => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:"100%" }}>
    <div style={{ width:"90%", borderRadius:"10px 10px 0 0", border:`1px solid ${accent}60`, borderBottom:"none", background:t.frameBg, padding:"7px 7px 0" }}>
      <div style={{ display:"flex", justifyContent:"center", marginBottom:5 }}>
        <div style={{ width:5, height:5, borderRadius:"50%", background: accent, opacity: hovered ? 1 : 0.4, transition:"opacity .4s" }} />
      </div>
      <div style={{ width:"100%", aspectRatio:"16/10", borderRadius:"4px 4px 0 0", background:t.screenBg, overflow:"hidden" }}>
        <ScreenContent img={img} hovered={hovered} accent={accent} screenId={screenId} style={{ aspectRatio:"16/10" }} />
      </div>
    </div>
    <div style={{ width:"100%", height:13, borderRadius:"0 0 8px 8px", background:t.frameBg, border:`1px solid ${accent}60`, borderTop:`1px solid ${t.frameBorder}`, display:"flex", justifyContent:"center", alignItems:"center" }}>
      <div style={{ width:"26%", height:3, borderRadius:99, background:`${accent}30` }} />
    </div>
  </div>
);

const PhoneFrame = ({ img, hovered, t, accent, screenId }) => (
  <div style={{ display:"flex", justifyContent:"center", width:"100%" }}>
    <div style={{ width:"50%", maxWidth:210, borderRadius:30, background:t.frameBg, padding:"10px 6px", position:"relative" }}>
      <div style={{ display:"flex", justifyContent:"center", marginBottom:7 }}>
        <div style={{ width:28, height:3, borderRadius:99, background:t.fgGhost }} />
      </div>
      <div style={{ borderRadius:20, overflow:"hidden", aspectRatio:"9/19.5", background:t.screenBg }}>
        <ScreenContent img={img} hovered={hovered} accent={accent} screenId={screenId} style={{ aspectRatio:"9/19.5" }} />
      </div>
      <div style={{ display:"flex", justifyContent:"center", marginTop:7 }}>
        <div style={{ width:22, height:3, borderRadius:99, background:t.fgGhost }} />
      </div>
    </div>
  </div>
);

const CircleFrame = ({ img, hovered, t, accent, screenId }) => (
  <div style={{ display:"flex", justifyContent:"center", width:"100%" }}>
    <div style={{ width:"60%", maxWidth:260, aspectRatio:"1/1", borderRadius:"50%", overflow:"hidden" }}>
      <ScreenContent img={img} hovered={hovered} accent={accent} screenId={screenId} style={{ width:"100%", height:"100%" }} />
    </div>
  </div>
);

const TriplePhoneFrame = ({ img, hovered, t, accent, screenId }) => (
  <div style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:"2%", padding:"12px 0" }}>
    {AURA_SCENES.map((Scene, i) => (
      <div key={i} style={{
        width:"clamp(110px,15vw,190px)", flexShrink:0,
        transform: hovered ? "scale(1.04) translateY(-6px)" : "scale(1) translateY(0)",
        transition:"transform .55s cubic-bezier(.4,0,.2,1)",
        transitionDelay: hovered ? `${i*40}ms` : "0ms",
        borderRadius:24, overflow:"hidden", aspectRatio:"9/19.5",
      }}>
        <Scene />
      </div>
    ))}
  </div>
);

const SquareFrame = ({ img, hovered, t, accent, screenId }) => (
  <div style={{ display:"flex", justifyContent:"center", width:"100%" }}>
    <div style={{ width:"70%", maxWidth:440, aspectRatio:"1/1", borderRadius:8, overflow:"hidden" }}>
      <ScreenContent img={img} hovered={hovered} accent={accent} screenId={screenId} style={{ width:"100%", height:"100%" }} />
    </div>
  </div>
);


const YouTubeFrame = ({ img, hovered, t, accent, screenId }) => (
  <div style={{ width:"100%", borderRadius:10, overflow:"hidden", border:`1px solid ${accent}60`, background:t.frameBg }}>
    <div style={{ width:"100%", aspectRatio:"16/9", background:t.screenBg }}>
      <ScreenContent img={img} hovered={hovered} accent={accent} screenId={screenId} style={{ aspectRatio:"16/9" }} />
    </div>
  </div>
);

const DeviceFrame = ({ frame, img, hovered, t, accent, screenId, url }) => {
  if (frame === "youtube")     return <YouTubeFrame   img={img} hovered={hovered} t={t} accent={accent} screenId={screenId} />;
  if (frame === "square")      return <SquareFrame    img={img} hovered={hovered} t={t} accent={accent} screenId={screenId} />;
  if (frame === "triplePhone") return <TriplePhoneFrame img={img} hovered={hovered} t={t} accent={accent} screenId={screenId} />;
  if (frame === "laptop")      return <LaptopFrame img={img} hovered={hovered} t={t} accent={accent} screenId={screenId} />;
  if (frame === "phone")       return <PhoneFrame  img={img} hovered={hovered} t={t} accent={accent} screenId={screenId} />;
  if (frame === "circle")      return <CircleFrame img={img} hovered={hovered} t={t} accent={accent} screenId={screenId} />;
  return                              <BrowserFrame img={img} hovered={hovered} t={t} accent={accent} screenId={screenId} url={url} />;
};

/* ══════════════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════════════ */
const CustomCursor = ({ hovered, t }) => {
  const el = useRef(null);
  const pos = useRef({ x:-200, y:-200 });
  const raf = useRef(null);
  useEffect(() => {
    const move = e => { pos.current = { x:e.clientX, y:e.clientY }; };
    const tick = () => { if (el.current) { el.current.style.left = pos.current.x+"px"; el.current.style.top = pos.current.y+"px"; } raf.current = requestAnimationFrame(tick); };
    window.addEventListener("mousemove", move, { passive:true });
    raf.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);
  return (
    <div ref={el} style={{ position:"fixed", top:0, left:0, zIndex:9999, pointerEvents:"none", willChange:"left,top" }}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ display:"block", filter:"drop-shadow(0 0 8px #c0392b80)" }}>
        <path d="M3 3L19.5 10.5L12.5 12.5L10.5 19.5L3 3Z" fill="#111" stroke="#8b1a10" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" paintOrder="stroke"/>
      </svg>
      {hovered && (
        <div style={{
          position:"absolute", top:28, left:20,
          background:hovered.color, color:"#fff",
          padding:"10px 18px", borderRadius:99,
          fontFamily:"'DM Sans',sans-serif",
          display:"flex", flexDirection:"column", alignItems:"flex-start", gap:2,
          boxShadow:`0 6px 32px ${hovered.color}50`,
          animation:"fadeUp .15s ease both",
          whiteSpace:"nowrap",
        }}>
          <span style={{ fontSize:15, fontWeight:700, letterSpacing:"-.03em", lineHeight:1.1 }}>{hovered.title} <span style={{ fontWeight:400, opacity:.7, fontSize:12 }}>{hovered.year}</span></span>
          <span style={{ fontSize:11, fontWeight:400, opacity:.75, letterSpacing:"-.01em" }}>{hovered.sub}</span>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   HOVER PHRASE
══════════════════════════════════════════════════ */
const CyclingPhrase = ({ phrases, t, interval = 2800 }) => {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % phrases.length);
        setVisible(true);
      }, 300);
    }, interval);
    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  return (
    <span style={{ position:"relative", display:"inline-block" }}>
      <span style={{
        color: t.accent,
        display:"inline-block",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) skewY(0)" : "translateY(6px) skewY(1deg)",
        transition:"opacity .28s cubic-bezier(.4,0,.2,1), transform .28s cubic-bezier(.4,0,.2,1)",
      }}>
        {phrases[idx]}
      </span>
    </span>
  );
};

const HoverPhrase = ({ text, tooltip, t, align="center" }) => {
  const [on, setOn] = useState(false);
  const [pos, setPos] = useState({ x:0, y:0 });
  const mob = useMobile();
  const ref = useRef(null);
  const toggle = e => { e.preventDefault(); setOn(v => !v); };
  useEffect(() => {
    if (!on) return;
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOn(false); };
    document.addEventListener("touchstart", handler);
    return () => document.removeEventListener("touchstart", handler);
  }, [on]);
  const handleMouseEnter = () => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setPos({ x: align==="right" ? r.right : align==="left" ? r.left : r.left + r.width/2, y: r.top });
    }
    setOn(true);
  };
  const tipLeft = align==="right" ? "auto" : align==="left" ? pos.x : pos.x;
  const tipRight = align==="right" ? (window.innerWidth - pos.x) : "auto";
  const tipTransform = align==="center" ? "translateX(-50%)" : align==="right" ? "none" : "none";
  return (
    <span ref={ref} style={{ position:"relative", display:"inline", cursor:"none" }}
      onMouseEnter={handleMouseEnter} onMouseLeave={() => setOn(false)} onTouchStart={toggle}>
      <span style={{ color: on ? t.accent : "inherit", transition:"color .2s" }}>{text}</span>
      {on && (
        <span style={{
          position:"fixed",
          bottom: `calc(100vh - ${pos.y}px + 10px)`,
          left: align==="right" ? "auto" : align==="left" ? pos.x : pos.x,
          right: align==="right" ? (typeof window!=="undefined" ? window.innerWidth - pos.x : "auto") : "auto",
          transform: tipTransform,
          background:t.fg, color:t.bg,
          fontSize:9, fontFamily:"'JetBrains Mono',monospace",
          fontWeight:400, letterSpacing:".02em",
          padding:"6px 12px", borderRadius:5,
          whiteSpace:"nowrap",
          pointerEvents:"none", zIndex:99999,
          animation:"fadeUp .15s ease both",
          lineHeight:1.5, textAlign:"center",
          boxShadow:`0 4px 24px rgba(0,0,0,.18)`,
        }}>
          {tooltip}
          <span style={{ position:"absolute", bottom:-4, left: align==="right"?"auto":align==="left"?"12px":"50%", right:align==="right"?"12px":undefined, transform:align==="center"?"translateX(-50%)":undefined, width:0, height:0, borderLeft:"4px solid transparent", borderRight:"4px solid transparent", borderTop:`4px solid ${t.fg}` }} />
        </span>
      )}
    </span>
  );
};

const TanhaFlip = ({ t, interval=3600 }) => {
  const [showArabic, setShowArabic] = useState(false);
  const [started, setStarted]       = useState(false);
  const [hovered, setHovered]       = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.unobserve(el); } }, { threshold:.1 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => setShowArabic(s => !s), interval);
    return () => clearInterval(id);
  }, [started]);
  return (
    <span ref={ref}
      style={{ display:"inline-block", position:"relative", verticalAlign:"baseline", cursor:"none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={e => { e.preventDefault(); setHovered(v => !v); }}
    >
      <span style={{ display:"inline-block", opacity: showArabic ? 0 : 1, transition:"opacity .25s ease", fontFamily:"'DM Sans',sans-serif", fontWeight:800, letterSpacing:"-.05em" }}>Tanha</span>
      <span style={{ position:"absolute", right:0, top:0, display:"inline-block", opacity: showArabic ? 1 : 0, transition: showArabic ? "opacity .3s ease .28s" : "opacity .2s ease", fontFamily:"'Amiri',serif", fontWeight:400, letterSpacing:"0em", whiteSpace:"nowrap" }}>{"\u062a\u0646\u062d\u0649"}</span>
      {hovered && (
        <span style={{
          position:"absolute",
          ...(typeof window !== "undefined" && window.innerWidth < 768
            ? { top:"calc(100% + 6px)", left:"50%", transform:"translateX(-50%)" }
            : { bottom:"calc(100% + 8px)", left:"50%", transform:"translateX(-50%)" }),
          background:t.fg, color:t.bg,
          fontSize:9, fontFamily:"'JetBrains Mono',monospace",
          fontWeight:400, letterSpacing:".02em", lineHeight:1.5,
          padding:"5px 10px", borderRadius:5,
          whiteSpace:"normal", maxWidth:"min(180px, 60vw)",
          pointerEvents:"none", zIndex:9999,
          animation:"fadeUp .15s ease both",
          display:"flex", flexDirection:"column", gap:1, textAlign:"center",
        }}>
          <span>means <em style={{ fontFamily:"'Amiri',serif", fontSize:"1.1em" }}>carving</em> in Arabic</span>
          <span>hyperbolic tangent of <em>a</em> in math</span>
          <span style={{ position:"absolute", bottom:-4, left:"50%", transform:"translateX(-50%)", width:0, height:0, borderLeft:"4px solid transparent", borderRight:"4px solid transparent", borderTop:`4px solid ${t.fg}` }} />
        </span>
      )}
    </span>
  );
};

/* ══════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════ */
const Nav = ({ page, go, dark, setDark, t, mob }) => (
  <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", justifyContent:"space-between", alignItems:"center", padding: mob?"16px 20px":"20px 44px", background:t.navBg, backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", borderBottom:`1px solid ${t.rule}`, transition:"background .4s" }}>
    <button onClick={() => go("home")} style={{ background:"#f7f4ee", border:"1.5px solid rgba(26,23,20,.12)", cursor:"none", padding:0, borderRadius:"50%", overflow:"hidden", width:32, height:32, flexShrink:0, transition:"border-color .2s", position:"relative" }}>
      <img src="/images/profilepic.png" alt="tanha" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
        onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
      <div style={{ display:"none", width:"100%", height:"100%", background:`${t.accent}18`, alignItems:"center", justifyContent:"center", position:"absolute", inset:0 }}>
        <span style={{ fontSize:12, fontWeight:800, color:t.accent, fontFamily:"'DM Sans',sans-serif" }}>T</span>
      </div>
    </button>
    <div style={{ display:"flex", alignItems:"center", gap: mob?0:2 }}>
      {["about","work","play"].map(id => (
        <button key={id} onClick={() => go(id)} style={{ background:"none", border:"none", cursor:"none", padding: mob?"5px 8px":"5px 14px", fontSize: mob?11:12, fontFamily:"'JetBrains Mono',monospace", color: page===id ? t.fg : t.fgMuted, letterSpacing:".05em", textTransform:"lowercase", transition:"color .2s", borderBottom: page===id ? `1px solid ${t.accent}` : "1px solid transparent", position:"relative" }}>{id}</button>
      ))}
      <button onClick={() => setDark(d => !d)} style={{ width:30, height:30, borderRadius:"50%", background:"transparent", border:`1px solid ${t.rule}`, cursor:"none", marginLeft: mob?4:8, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .25s" }} aria-label="toggle">
        {dark
          ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={t.fgMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={t.fgMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        }
      </button>
    </div>
  </nav>
);

/* ══════════════════════════════════════════════════
   REVEAL
══════════════════════════════════════════════════ */
const Reveal = ({ children, delay=0, y=18 }) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.unobserve(el); } }, { threshold:.06 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:v?1:0, transform:v?"none":`translateY(${y}px)`, transition:`opacity .85s cubic-bezier(.4,0,.2,1) ${delay}ms, transform .85s cubic-bezier(.4,0,.2,1) ${delay}ms` }}>
      {children}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   PROJECT ROW
══════════════════════════════════════════════════ */
const ProjectRow = ({ p, index, onEnter, onLeave, t, mob, onAccentChange }) => {
  const [hovered, setHovered] = useState(false);
  const color = p.color || gc(p.cat).color;
  const [frameRef, frameStyle] = useClipReveal(index * 60);
  const rowRef = useRef(null);

  useEffect(() => {
    if (!onAccentChange) return;
    const el = rowRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) onAccentChange(color);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [color, onAccentChange]);

  return (
    <a href={p.link} target="_blank" rel="noopener noreferrer"
      ref={rowRef}
      onMouseEnter={() => { setHovered(true);  onEnter({ title:p.title, color, sub:p.sub, year:p.year }); }}
      onMouseLeave={() => { setHovered(false); onLeave(); }}
      style={{ display:"block", textDecoration:"none", color:t.fg, cursor:"none" }}
    >
      <div style={{ padding: mob?"32px 20px 40px":"52px 44px 60px" }}>
        <div ref={frameRef} style={{ ...frameStyle, position:"relative", maxWidth: mob ? (p.frame==="phone"?"260px": p.frame==="circle"?"300px": p.frame==="triplePhone"?"100%": p.frame==="square"?"380px":"100%") : (p.frame==="phone"?"360px": p.frame==="circle"?"440px": p.frame==="triplePhone"?"780px": p.frame==="youtube"?"680px": p.frame==="square"?"520px":"680px"), margin:"0 auto" }}>
          <div style={{ position:"relative", transform: hovered ? "translateY(-6px)" : "translateY(0px)", transition:"transform .65s cubic-bezier(.4,0,.2,1)" }}>
            <DeviceFrame frame={p.frame} img={p.img} hovered={hovered} t={t} accent={color} screenId={p.id} url={p.link} />
          </div>
        </div>
      </div>
    </a>
  );
};

/* ══════════════════════════════════════════════════
   ABOUT TEASER
══════════════════════════════════════════════════ */
const AboutTeaser = ({ t, go, mob }) => {
  const [drawn, setDrawn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); io.unobserve(el); } }, { threshold:.2 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const W = 120, H = 40;
  const mapX = x => 4 + ((x + 3) / 6) * (W - 8);
  const mapY = y => 4 + ((1 - y) / 2) * (H - 8);
  const pathD = Array.from({length:81},(_,i) => { const x=-3+(6*i)/80; return `${i===0?"M":"L"}${mapX(x).toFixed(1)},${mapY(tanh(x)).toFixed(1)}`; }).join(" ");
  return (
    <Reveal>
      <div ref={ref} style={{ borderTop:`1px solid ${t.rule}`, padding: mob?"28px 20px 32px":"36px 44px 40px", display:"flex", flexDirection: mob?"column":"row", alignItems: mob?"flex-start":"center", justifyContent:"space-between", gap: mob?20:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width:60, height:20, flexShrink:0 }}>
            <path d={pathD} fill="none" stroke={t.accent} strokeWidth="1.5" opacity=".5"
              strokeDasharray="200" strokeDashoffset={drawn ? 0 : 200}
              style={{ transition:"stroke-dashoffset 2s cubic-bezier(.4,0,.2,1)" }} />
          </svg>
          <div>
            <div style={{ fontSize:14, fontFamily:"'EB Garamond',serif", fontStyle:"italic", color:t.fg, marginBottom:3 }}>tanh(x) = tanha</div>
          </div>
        </div>
        <button onClick={() => go("about")} style={{ background:"none", border:`1px solid ${t.rule}`, cursor:"none", borderRadius:99, padding:"8px 20px", fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:t.fgMuted, letterSpacing:2, transition:"all .25s", whiteSpace:"nowrap", flexShrink:0 }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = t.rule; e.currentTarget.style.color = t.fgMuted; }}
        >about →</button>
      </div>
    </Reveal>
  );
};

/* ══════════════════════════════════════════════════
   HOME
══════════════════════════════════════════════════ */
const HomePage = ({ t, mob, setCursorHovered, go, onAccentChange }) => (
  <div style={{ position:"relative", zIndex:1 }}>
    <div style={{ padding: mob?"110px 20px 36px":"130px 44px 44px", position:"relative", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`radial-gradient(circle, ${t.fg}11 1px, transparent 1px)`, backgroundSize:"28px 28px", WebkitMaskImage:"radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)", maskImage:"radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)", animation:"particleDrift 18s ease-in-out infinite" }} />
      <h1 style={{ fontSize: mob?"clamp(34px,9vw,52px)":"clamp(44px,5.2vw,80px)", fontFamily:"'DM Sans',sans-serif", fontWeight:800, letterSpacing:"-.05em", lineHeight:1.05, color:t.fg, position:"relative", zIndex:1 }}>
        <span style={{ display:"inline-block", animation:"charReveal .6s cubic-bezier(.4,0,.2,1) .05s both", opacity:0 }}>
          <TanhaFlip t={t} />
        </span>
        {" "}
        <span style={{ display:"inline-block", animation:"charReveal .6s cubic-bezier(.4,0,.2,1) .18s both", opacity:0 }}>turns</span>
        {" "}
        <span style={{ display:"inline-block", animation:"charReveal .6s cubic-bezier(.4,0,.2,1) .28s both", opacity:0 }}>
          <CyclingPhrase t={t} interval={3200} phrases={[
            "model weights",
            "training data",
            "raw outputs",
            "latent space",
            "evaluation scores",
          ]} />
        </span>
        {" "}
        <span style={{ display:"inline-block", animation:"charReveal .6s cubic-bezier(.4,0,.2,1) .38s both", opacity:0 }}>into</span>
        {" "}
        <span style={{ display:"inline-block", animation:"charReveal .6s cubic-bezier(.4,0,.2,1) .48s both", opacity:0 }}>
          <CyclingPhrase t={t} interval={4100} phrases={[
            "things people actually want to use",
            "products people trust",
            "interfaces that make sense",
          ]} />
        </span>
      </h1>
    </div>
    <div>
      {FEATURED.map((p, i) => (
        <ProjectRow key={p.id} p={p} index={i} t={t} mob={mob} onEnter={setCursorHovered} onLeave={() => setCursorHovered(null)} onAccentChange={onAccentChange} />
      ))}
    </div>
    <AboutTeaser t={t} go={go} mob={mob} />
    <div style={{ borderTop:`1px solid ${t.rule}`, padding: mob?"20px 20px":"24px 44px", display:"flex", flexDirection: mob?"column":"row", justifyContent:"space-between", alignItems: mob?"flex-start":"center", gap: mob?10:0 }}>
      <span style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:t.fgMuted, letterSpacing:1.5, opacity:.5 }}>© Tanha Alsheikhdallah 2026</span>
      <div style={{ display:"flex", gap:24 }}>
        {[{ href:"mailto:tanharchitecture@gmail.com", label:"Email" }, { href:"https://linkedin.com/in/tanhata", label:"LinkedIn", ext:true }].map(l => (
          <a key={l.label} href={l.href} target={l.ext?"_blank":undefined} rel={l.ext?"noopener noreferrer":undefined}
            style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:t.fgMuted, textDecoration:"none", letterSpacing:1.5, transition:"color .2s", opacity:.65 }}
            onMouseEnter={e=>e.target.style.color=t.accent}
            onMouseLeave={e=>e.target.style.color=t.fgMuted}
          >{l.label}</a>
        ))}
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════
   WORK PAGE
══════════════════════════════════════════════════ */
const FILTER_OPTIONS = [
  { id:"all",               label:"All"       },
  { id:"product-design",    label:"Product"   },
  { id:"ai-ml",             label:"AI / ML"   },
  { id:"data-visualization",label:"Data Viz"  },
  { id:"writing",           label:"Research"  },
  { id:"data-analysis",     label:"Analysis"  },
  { id:"mobile-design",     label:"Mobile"    },
];

const WorkPage = ({ t, mob, setCursorHovered }) => {
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);
  return (
    <div style={{ paddingTop:80, position:"relative", zIndex:1 }}>
      <div style={{ padding: mob?"4vh 20px 3vh":"5vh 44px 3vh" }}>
        <Reveal>
          <div style={{ display:"flex", flexWrap:"wrap", gap: mob?6:4, paddingTop:0 }}>
            {FILTER_OPTIONS.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{ background: filter===f.id ? `${t.accent}0e` : "transparent", border: filter===f.id ? `1px solid ${t.accent}30` : `1px solid ${t.rule}`, borderRadius:4, cursor:"none", padding: mob?"7px 14px":"5px 13px", fontSize: mob?12:10, fontFamily:"'JetBrains Mono',monospace", letterSpacing:1.5, color: filter===f.id ? t.accent : t.fgMuted, transition:"all .2s" }}>{f.label}</button>
            ))}
          </div>
        </Reveal>
      </div>
      <div>
        {list.map((p, i) => (
          <ProjectRow key={p.id} p={p} index={i} t={t} mob={mob} onEnter={setCursorHovered} onLeave={() => setCursorHovered(null)} />
        ))}
      </div>
      <div style={{ padding: mob?"18px 20px":"22px 44px", fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:t.fgMuted, letterSpacing:1.5, opacity:.5, borderTop:`1px solid ${t.rule}` }}>
        © Tanha Alsheikhdallah 2026
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   TANH TIMELINE
══════════════════════════════════════════════════ */
const TanhTimeline = ({ t }) => {
  const [active, setActive] = useState(null);
  const [drawn, setDrawn]   = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); io.unobserve(el); } }, { threshold:.1 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const W=900,H=380,pad={l:60,r:60,t:80,b:120};
  const pw=W-pad.l-pad.r, ph=H-pad.t-pad.b;
  const mapX=x=>pad.l+((x+3)/6)*pw, mapY=y=>pad.t+((1-y)/2)*ph;
  const pathD = Array.from({length:201},(_,i)=>{ const x=-3+(6*i)/200; return `${i===0?"M":"L"}${mapX(x).toFixed(1)},${mapY(tanh(x)).toFixed(1)}`; }).join(" ");
  const pts = LIFE.map(ch => ({ cx:mapX(ch.x), cy:mapY(tanh(ch.x)), ...ch }));
  return (
    <div ref={ref} style={{ maxWidth:940, margin:"0 auto", padding:"4vh 3vw 2vh" }}>
      <Reveal><div style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:t.fgMuted, letterSpacing:3, marginBottom:16, opacity:.65 }}>life as tanh(x)</div></Reveal>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:"auto", overflow:"visible", cursor:"none" }}>
        <defs><filter id="sg"><feGaussianBlur stdDeviation="5"/></filter></defs>
        <line x1={pad.l} y1={mapY(0)} x2={W-pad.r} y2={mapY(0)} stroke={t.rule} strokeWidth="1" strokeDasharray="3 7"/>
        <text x={pad.l-10} y={mapY(1)}  textAnchor="end" fill={t.fgGhost} fontSize="8" fontFamily="monospace" dominantBaseline="middle">+1</text>
        <text x={pad.l-10} y={mapY(-1)} textAnchor="end" fill={t.fgGhost} fontSize="8" fontFamily="monospace" dominantBaseline="middle">−1</text>
        <path d={pathD} fill="none" stroke={t.accent} strokeWidth="7" opacity=".04" filter="url(#sg)"/>
        <path d={pathD} fill="none" stroke={t.rule} strokeWidth="1.5"/>
        <path d={pathD} fill="none" stroke={t.accent} strokeWidth="1.5" opacity=".55"
          strokeDasharray="2000" strokeDashoffset={drawn?0:2000}
          style={{ transition:"stroke-dashoffset 2.8s cubic-bezier(.4,0,.2,1)" }}/>
        {pts.map((p,i) => {
          const isA=active===i, delay=`${.8+i*.28}s`;
          return (
            <g key={i} style={{ cursor:"none" }} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
              {isA&&!p.inflection&&(
                <circle cx={p.cx} cy={p.cy} r={p.r+8} fill="none" stroke={t.accent} strokeWidth="1" opacity=".12">
                  <animate attributeName="r" values={`${p.r};${p.r+16}`} dur="1.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values=".18;0" dur="1.5s" repeatCount="indefinite"/>
                </circle>
              )}
              <circle cx={p.cx} cy={p.cy} r={drawn?(isA?p.r+3:p.r):0}
                fill={p.inflection?"transparent":`${t.accent}${isA?"12":"05"}`}
                stroke={p.inflection?(isA?t.fg:t.rule):(isA?t.accent:`${t.accent}30`)}
                strokeWidth={p.inflection?1.5:1}
                style={{ transition:`all .55s cubic-bezier(.4,0,.2,1) ${drawn?delay:"0s"}` }}/>
              <circle cx={p.cx} cy={p.cy} r={drawn?(isA?5:3):0}
                fill={p.inflection?(isA?t.fg:t.fgMuted):t.accent}
                style={{ transition:`all .5s cubic-bezier(.4,0,.2,1) ${drawn?delay:"0s"}` }}/>
              <text x={p.cx} y={p.cy-p.r-10} textAnchor="middle"
                fill={isA?t.fg:t.fgMuted} fontSize={isA?"12":"10"} fontWeight={isA?"600":"400"}
                fontFamily="'JetBrains Mono',monospace" style={{ transition:"all .3s" }}>{p.title}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ minHeight:90, padding:"4px 0 10px" }}>
        {active!==null ? (
          <div style={{ maxWidth:460, margin:active<=2?"0":active===4?"0 auto":"0 0 0 auto", animation:"fadeUp .4s ease both" }}>
            <div style={{ display:"flex", gap:10, marginBottom:6, alignItems:"baseline", justifyContent:LIFE[active].inflection?"center":"flex-start" }}>
              <span style={{ fontSize:9, fontFamily:"monospace", color:t.accent, letterSpacing:2.5 }}>{String(active+1).padStart(2,"0")}</span>
              <span style={{ fontSize:16, fontFamily:"'EB Garamond',serif", fontStyle:"italic", color:t.fgMuted }}>{LIFE[active].kicker}</span>
            </div>
            <p style={{ fontSize:14, lineHeight:1.75, color:t.fgMuted, textAlign:LIFE[active].inflection?"center":"left" }}>{LIFE[active].body}</p>
          </div>
        ) : (
          <p style={{ textAlign:"center", fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:t.fgMuted, letterSpacing:2.5, opacity:.5 }}>hover a moment</p>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════════ */
const AboutPage = ({ t, mob }) => {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState(null);
  const curveRef = useRef(null);

  useEffect(() => {
    const el = curveRef.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); io.unobserve(el); } }, { threshold:.15 });
    io.observe(el); return () => io.disconnect();
  }, []);

  const W=900,H=340,pad={l:60,r:60,t:70,b:100};
  const pw=W-pad.l-pad.r, ph=H-pad.t-pad.b;
  const mapX=x=>pad.l+((x+3)/6)*pw;
  const mapY=y=>pad.t+((1-y)/2)*ph;
  const pathD = Array.from({length:201},(_,i)=>{ const x=-3+(6*i)/200; return `${i===0?"M":"L"}${mapX(x).toFixed(1)},${mapY(tanh(x)).toFixed(1)}`; }).join(" ");
  const pts = LIFE.map(ch => ({ cx:mapX(ch.x), cy:mapY(tanh(ch.x)), ...ch }));

  return (
    <div style={{ paddingTop:0, position:"relative", zIndex:1 }}>

      {/* ── SECTION 1: Hero — name, full viewport ── */}
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding: mob?"0 20px":"0 44px", textAlign:"center", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle, ${t.fg}08 1px, transparent 1px)`, backgroundSize:"28px 28px", WebkitMaskImage:"radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)", maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)", pointerEvents:"none" }} />
        <Reveal y={24}>
          <p style={{ fontSize: mob?"clamp(72px,18vw,120px)":"clamp(80px,10vw,140px)", fontFamily:"'DM Sans',sans-serif", fontWeight:800, letterSpacing:"-.06em", lineHeight:.9, color:t.fg, marginBottom:16 }}>
            <TanhaFlip t={t} interval={1800} />
          </p>
          <div style={{ fontSize: mob?13:16, fontFamily:"'EB Garamond',serif", fontStyle:"italic", color:t.fgMuted, marginBottom:32 }}>/taan·haa/</div>
          <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap" }}>
            {[["Arabic","carving, etching — to shape by removing"],["Math","tanh(x) — maps any input to −1 and 1"]].map(([tag, def]) => (
              <div key={tag} style={{ textAlign:"left" }}>
                <div style={{ fontSize:7.5, fontFamily:"'JetBrains Mono',monospace", color:t.accent, letterSpacing:2, marginBottom:4 }}>{tag.toUpperCase()}</div>
                <div style={{ fontSize: mob?11:12, color:t.fgMuted, fontFamily:"'EB Garamond',serif", fontStyle:"italic", maxWidth:220 }}>{def}</div>
              </div>
            ))}
          </div>
        </Reveal>
        {/* scroll cue */}
        <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, animation:"fadeUp 1s ease 1.2s both" }}>
          <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:t.fgMuted, letterSpacing:3, opacity:.5 }}>SCROLL</span>
          <div style={{ width:1, height:32, background:`linear-gradient(to bottom, ${t.fgMuted}, transparent)`, opacity:.4 }} />
        </div>
      </div>

      {/* ── SECTION 2: Photo + bio ── */}
      <div style={{ minHeight: mob?"auto":"80vh", display:"flex", alignItems:"center", padding: mob?"12vh 20px":"10vh 44px", maxWidth:1000, margin:"0 auto" }}>
        <Reveal y={32}>
          <div style={{ display:"grid", gridTemplateColumns: mob?"1fr":"1fr 1fr", gap: mob?32:64, alignItems:"center" }}>
            {/* photo */}
            <div style={{ aspectRatio:"4/5", borderRadius:4, overflow:"hidden", border:`1px solid ${t.rule}`, maxWidth: mob?280:420 }}>
              <img src="/images/tanha.jpg" alt="tanha" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                onError={e=>{ e.target.style.display="none"; e.target.parentNode.style.background=`${t.accent}10`; }}/>
            </div>
            {/* text */}
            <div>
              <p style={{ fontSize: mob?20:26, fontFamily:"'EB Garamond',serif", fontWeight:400, lineHeight:1.45, color:t.fg, marginBottom:24 }}>
                Designer and builder working at the intersection of machine learning and the people who depend on it.
              </p>
              <p style={{ fontSize: mob?13:14, lineHeight:1.85, color:t.fgMuted, marginBottom:18 }}>
                She's spent time at Google, JPMorgan Chase, CUNY, and Flad — always at the intersection of research, DS/ML and design.
              </p>
              <p style={{ fontSize: mob?13:14, lineHeight:1.85, color:t.fgMuted, marginBottom:24 }}>
                She's drawn to the hard problems in human-AI collaboration — how people come to trust (or distrust) model outputs, what interpretability actually looks like as a product surface, and whether it's possible to design interfaces that make AI behavior genuinely legible without making them feel clinical.
              </p>
              <p style={{ fontSize: mob?12:13, fontFamily:"'EB Garamond',serif", fontStyle:"italic", color:t.fgMuted, opacity:.7, lineHeight:1.6 }}>
                She also loves fashion, traveling, photography, and has strong opinions about coffee.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── SECTION 3: tanh curve — full width ── */}
      <div ref={curveRef} style={{ padding: mob?"8vh 0 4vh":"10vh 0 6vh", borderTop:`1px solid ${t.rule}`, borderBottom:`1px solid ${t.rule}` }}>
        <div style={{ maxWidth:960, margin:"0 auto", padding: mob?"0 20px":"0 44px" }}>
          <Reveal>
            <div style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:t.fgMuted, letterSpacing:3, marginBottom:20, opacity:.6 }}>life as tanh(x)</div>
          </Reveal>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:"auto", overflow:"visible", cursor:"none" }}>
            <defs><filter id="sg2"><feGaussianBlur stdDeviation="5"/></filter></defs>
            <line x1={pad.l} y1={mapY(0)} x2={W-pad.r} y2={mapY(0)} stroke={t.rule} strokeWidth="1" strokeDasharray="3 7"/>
            <text x={pad.l-10} y={mapY(1)}  textAnchor="end" fill={t.fgGhost} fontSize="8" fontFamily="monospace" dominantBaseline="middle">+1</text>
            <text x={pad.l-10} y={mapY(-1)} textAnchor="end" fill={t.fgGhost} fontSize="8" fontFamily="monospace" dominantBaseline="middle">−1</text>
            <path d={pathD} fill="none" stroke={t.accent} strokeWidth="7" opacity=".04" filter="url(#sg2)"/>
            <path d={pathD} fill="none" stroke={t.rule} strokeWidth="1.5"/>
            <path d={pathD} fill="none" stroke={t.accent} strokeWidth="1.5" opacity=".55"
              strokeDasharray="2000" strokeDashoffset={drawn?0:2000}
              style={{ transition:"stroke-dashoffset 2.8s cubic-bezier(.4,0,.2,1)" }}/>
            {pts.map((p,i) => {
              const isA=active===i, delay=`${.8+i*.28}s`;
              return (
                <g key={i} style={{ cursor:"none" }} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
                  {isA&&!p.inflection&&(
                    <circle cx={p.cx} cy={p.cy} r={p.r+8} fill="none" stroke={t.accent} strokeWidth="1" opacity=".12">
                      <animate attributeName="r" values={`${p.r};${p.r+16}`} dur="1.5s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values=".18;0" dur="1.5s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  <circle cx={p.cx} cy={p.cy} r={drawn?(isA?p.r+3:p.r):0}
                    fill={p.inflection?"transparent":`${t.accent}${isA?"12":"05"}`}
                    stroke={p.inflection?(isA?t.fg:t.rule):(isA?t.accent:`${t.accent}30`)}
                    strokeWidth={p.inflection?1.5:1}
                    style={{ transition:`all .55s cubic-bezier(.4,0,.2,1) ${drawn?delay:"0s"}` }}/>
                  <circle cx={p.cx} cy={p.cy} r={drawn?(isA?5:3):0}
                    fill={p.inflection?(isA?t.fg:t.fgMuted):t.accent}
                    style={{ transition:`all .5s cubic-bezier(.4,0,.2,1) ${drawn?delay:"0s"}` }}/>
                  <text x={p.cx} y={p.cy-p.r-10} textAnchor="middle"
                    fill={isA?t.fg:t.fgMuted} fontSize={isA?"12":"10"} fontWeight={isA?"600":"400"}
                    fontFamily="'JetBrains Mono',monospace" style={{ transition:"all .3s" }}>{p.title}</text>
                </g>
              );
            })}
          </svg>
          {/* chapter text */}
          <div style={{ minHeight:80, padding:"8px 0 4px" }}>
            {active!==null ? (
              <Reveal>
                <div style={{ maxWidth:500, margin:active<=2?"0":active===4?"0 auto":"0 0 0 auto", animation:"fadeUp .35s ease both" }}>
                  <div style={{ display:"flex", gap:10, marginBottom:6, alignItems:"baseline", justifyContent:LIFE[active].inflection?"center":"flex-start" }}>
                    <span style={{ fontSize:9, fontFamily:"monospace", color:t.accent, letterSpacing:2.5 }}>{String(active+1).padStart(2,"0")}</span>
                    <span style={{ fontSize:18, fontFamily:"'EB Garamond',serif", fontStyle:"italic", color:t.fgMuted }}>{LIFE[active].kicker}</span>
                  </div>
                  <p style={{ fontSize:14, lineHeight:1.8, color:t.fgMuted, textAlign:LIFE[active].inflection?"center":"left" }}>{LIFE[active].body}</p>
                </div>
              </Reveal>
            ) : (
              <p style={{ textAlign:"center", fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:t.fgMuted, letterSpacing:2.5, opacity:.4 }}>hover a moment</p>
            )}
          </div>
        </div>
      </div>

      {/* ── SECTION 4: Currently thinking about ── */}
      <div style={{ padding: mob?"10vh 20px":"14vh 44px", maxWidth:900, margin:"0 auto" }}>
        <Reveal y={24}>
          <div style={{ fontSize:7.5, fontFamily:"'JetBrains Mono',monospace", color:t.fgMuted, letterSpacing:3, marginBottom:28, opacity:.6 }}>CURRENTLY THINKING ABOUT</div>
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {[
              { tag:"human-AI collaboration",  desc:"Who moves first — the model or the person? And what does it mean to design for that uncertainty?" },
              { tag:"interpretability as UX",  desc:"Interpretability research tells us what models do. Product design figures out how humans can act on it." },
              { tag:"AI trust + legibility",   desc:"Trust isn't binary. The design question is how to show enough of the system that people can calibrate." },
              { tag:"when to show uncertainty",desc:"A confident wrong answer is worse than a hedged right one. Most interfaces still haven't figured this out." },
            ].map(({tag, desc}, i) => (
              <Reveal key={tag} delay={i * 80}>
                <div style={{ padding:"20px 0", borderBottom:`1px solid ${t.rule}`, display:"grid", gridTemplateColumns: mob?"1fr":"1fr 2fr", gap: mob?8:40, alignItems:"baseline" }}>
                  <span style={{ fontSize: mob?10:11, fontFamily:"'JetBrains Mono',monospace", color:t.accent, letterSpacing:.5 }}>{tag}</span>
                  <span style={{ fontSize: mob?13:14, fontFamily:"'EB Garamond',serif", fontStyle:"italic", color:t.fgMuted, lineHeight:1.6 }}>{desc}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ── SECTION 5: Connect ── */}
      <div style={{ padding: mob?"6vh 20px 14vh":"8vh 44px 16vh", maxWidth:900, margin:"0 auto" }}>
        <Reveal y={20}>
          <div style={{ height:1, background:t.rule, marginBottom:32 }}/>
          <div style={{ display:"flex", justifyContent:"flex-end", alignItems:"center", flexWrap:"wrap", gap:16 }}>
            <div style={{ display:"flex", gap:24 }}>
              {[{ href:"mailto:tanharchitecture@gmail.com", label:"Email" }, { href:"https://linkedin.com/in/tanhata", label:"LinkedIn", ext:true }].map(l => (
                <a key={l.label} href={l.href} target={l.ext?"_blank":undefined} rel={l.ext?"noopener noreferrer":undefined}
                  style={{ fontSize:10, fontFamily:"monospace", color:t.fgMuted, textDecoration:"none", letterSpacing:1.5, transition:"color .2s" }}
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

/* ══════════════════════════════════════════════════
   VISUAL PAGE
══════════════════════════════════════════════════ */
const VisualPage = ({ t, mob }) => {
  const [hoveredId, setHoveredId] = useState(null);
  return (
    <div style={{ paddingTop:80, position:"relative", zIndex:1, minHeight:"100vh" }}>

      {/* personal intro — sketchbook tone */}
      <div style={{ padding: mob?"5vh 20px 3vh":"6vh 44px 4vh", maxWidth:900, margin:"0 auto" }}>
        <Reveal>
          <div style={{ display:"flex", flexDirection: mob?"column":"row", alignItems: mob?"flex-start":"flex-end", justifyContent:"space-between", gap:20 }}>
            <div>
              <p style={{ fontSize: mob?28:36, fontFamily:"'EB Garamond',serif", fontStyle:"italic", fontWeight:400, color:t.fg, lineHeight:1.1, letterSpacing:"-.01em", marginBottom:8 }}>
                things Tanha makes for the love of it
              </p>
              <p style={{ fontSize:11, color:t.fgMuted, lineHeight:1.6, maxWidth:380 }}>
                Illustration, branding, event stationery, album art — commissions welcome.
              </p>
            </div>

          </div>
        </Reveal>
      </div>

      {/* masonry-style grid */}
      <div style={{ padding: mob?"0 16px":"0 44px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ columns: mob?2:3, columnGap: mob?12:20, columnFill:"balance" }}>
          {VISUALS.map((v, i) => {
            const isHovered = hoveredId === v.id;
            const [ok, setOk] = useState(true);
            return (
              <Reveal key={v.id} delay={i * 55}>
                <div
                  style={{ breakInside:"avoid", marginBottom: mob?12:20, position:"relative", cursor:"pointer" }}
                  onMouseEnter={() => setHoveredId(v.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* image */}
                  <div style={{ borderRadius:6, overflow:"hidden", background:t.frameBg, aspectRatio: v.ratio || "3/4", position:"relative" }}>
                    {ok
                      ? <img
                          src={v.img} alt={v.title}
                          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
                            transform: isHovered ? "scale(1.03)" : "scale(1)",
                            transition:"transform .55s cubic-bezier(.4,0,.2,1)",
                          }}
                          onError={() => setOk(false)}
                        />
                      : <div style={{ width:"100%", height:"100%", background:`linear-gradient(145deg,${t.fg}08,${t.fg}03)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <span style={{ fontSize:8, fontFamily:"'JetBrains Mono',monospace", color:t.fgMuted, letterSpacing:1.5 }}>{v.title}</span>
                        </div>
                    }
                    {/* hover overlay */}
                    <div style={{
                      position:"absolute", inset:0,
                      background:"rgba(0,0,0,.45)",
                      opacity: isHovered ? 1 : 0,
                      transition:"opacity .3s ease",
                      display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"14px 12px",
                    }}>
                      <div style={{ fontSize:11, fontWeight:600, color:"#fff", letterSpacing:"-.01em", lineHeight:1.2, marginBottom:3 }}>{v.title}</div>
                      <div style={{ fontSize:8, color:"rgba(255,255,255,.55)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:1 }}>{v.type}</div>
                    </div>
                  </div>
                  {/* caption below — visible always on mobile, hidden on hover desktop */}
                  {mob && (
                    <div style={{ padding:"6px 2px 0" }}>
                      <div style={{ fontSize:9, color:t.fg, fontWeight:500, lineHeight:1.2 }}>{v.title}</div>
                      <div style={{ fontSize:7.5, color:t.fgMuted, fontFamily:"'JetBrains Mono',monospace", letterSpacing:.5, marginTop:1 }}>{v.type}</div>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* bottom commission strip */}
      <Reveal>
        <div style={{ margin: mob?"4vh 16px 6vh":"5vh 44px 8vh", maxWidth:1100, marginLeft:"auto", marginRight:"auto", padding:"24px 28px", border:`1px solid ${t.rule}`, borderRadius:8, display:"flex", flexDirection: mob?"column":"row", alignItems: mob?"flex-start":"center", justifyContent:"space-between", gap:16 }}>
          <div>
            <div style={{ fontSize: mob?18:22, fontFamily:"'EB Garamond',serif", fontStyle:"italic", color:t.fg, marginBottom:5 }}>Want something made?</div>
            <div style={{ fontSize:11, color:t.fgMuted, lineHeight:1.5 }}>I take on illustration, branding, event stationery, and album art commissions. Let's talk.</div>
          </div>
          <a href="mailto:tanharchitecture@gmail.com" style={{ textDecoration:"none", flexShrink:0 }}>
            <div style={{ padding:"10px 22px", background:t.accent, borderRadius:5, fontSize:10, fontWeight:600, color:"#fff", fontFamily:"'JetBrains Mono',monospace", letterSpacing:1.5, transition:"opacity .2s", whiteSpace:"nowrap" }}
              onMouseEnter={e=>e.currentTarget.style.opacity=".85"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              GET IN TOUCH
            </div>
          </a>
        </div>
      </Reveal>

    </div>
  );
};
/* ══════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════ */
export default function App() {
  const [page,          setPage]          = useState("home");
  const [dark,          setDark]          = useState(false);
  const [cursorHovered, setCursorHovered] = useState(null);
  const [bgAccent,      setBgAccent]      = useState(null);
  const mob = useMobile();
  const t   = dark ? THEMES.dark : THEMES.light;
  const go  = useCallback(p => { setPage(p); window.scrollTo({ top:0, behavior:"smooth" }); setBgAccent(null); }, []);

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.cursor = "none";
    return () => { document.body.style.cursor = "auto"; };
  }, [t.bg]);

  const bgStyle = bgAccent && page === "home"
    ? { background: `linear-gradient(to bottom, ${t.bg} 0%, ${bgAccent}18 30%, ${bgAccent}22 60%, ${bgAccent}12 100%)` }
    : {};

  return (
    <div style={{ minHeight:"100vh", background:t.bg, color:t.fg, fontFamily:"'DM Sans','Helvetica Neue',sans-serif", transition:"background .8s ease, color .4s", ...bgStyle }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes dotPulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
        @keyframes charReveal{from{opacity:0;transform:translateY(12px) skewY(2deg)}to{opacity:1;transform:translateY(0) skewY(0)}}
        @keyframes underlineDraw{from{transform:scaleX(0) translateX(0)}to{transform:scaleX(1) translateX(0)}}
        @keyframes countUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes particleDrift{0%{transform:translate(0,0)}25%{transform:translate(3px,-4px)}50%{transform:translate(-2px,-7px)}75%{transform:translate(4px,-3px)}100%{transform:translate(0,0)}}
        a{cursor:none!important;}
        .char-reveal span{display:inline-block;animation:charReveal .5s cubic-bezier(.4,0,.2,1) both;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:${t.accent}28;border-radius:99px;}
      `}</style>

      <CustomCursor hovered={cursorHovered} t={t} />
      <Nav page={page} go={go} dark={dark} setDark={setDark} t={t} mob={mob} />

      {page==="home"   && <HomePage   t={t} mob={mob} setCursorHovered={setCursorHovered} go={go} onAccentChange={setBgAccent} />}
      {page==="work"   && <WorkPage   t={t} mob={mob} setCursorHovered={setCursorHovered} />}
      {page==="about"  && <AboutPage  t={t} mob={mob} />}
      {page==="play" && <VisualPage t={t} mob={mob} />}
    </div>
  );
}