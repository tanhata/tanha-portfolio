import { useState, useEffect, useRef, useCallback, Fragment } from "react";

const useMobile = (bp = 768) => {
  const [m, setM] = useState(typeof window !== "undefined" ? window.innerWidth < bp : false);
  useEffect(() => { const h = () => setM(window.innerWidth < bp); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, [bp]);
  return m;
};

const useClipReveal = (_delay = 0) => {
  return [useRef(null), {}];
};

const CAT = {
  "product-design":             { label:"Product Design", color:"#475569" },
  "ai-ml":                      { label:"AI / ML",        color:"#d97706" },
  "ai-interaction":             { label:"Interactions",   color:"#db2777" },
  "data-visualization":         { label:"Data Viz",       color:"#7c3aed" },
  "data-analysis":              { label:"Data Analysis",  color:"#0369a1" },
  "mobile-design":              { label:"Mobile",         color:"#059669" },
  "writing":                    { label:"Research",       color:"#db2777" },
  "human-computer-interaction": { label:"HCI",            color:"#0891b2" },
};
const gc = id => CAT[id] || CAT["product-design"];

const PROJECTS = [
  { id:"legibility-interaction", title:"Legibility: Interaction in AI Interfaces", sub:"Research & Writing", desc:"Studying how legibility shapes user interaction with AI interfaces.", cat:"ai-interaction", color:"#db2777", img:"/images/legibility.gif", link:"https://tanhata.github.io/legibility-interaction/", year:"2026", frame:"raw", aspectRatio:"800/287", headline:{ before:"I explore ", keyword:"legibility and trust", after:" in AI interfaces." }, featured:true },
  { id:"model-pulse",    title:"ModelPulse",       sub:"AI Performance Platform",      desc:"Enterprise observability — detect drift, monitor accuracy, manage compliance.",      cat:"product-design",            color:"#0369a1", img:"/images/modelpulse2.gif",      link:"https://tanhata.github.io/modelpulse-case-study/", year:"2025", frame:"raw",          aspectRatio:"1956/1054", headline:{ before:"I turn model weights into ", keyword:"observable tools", after:"." }, featured:true },
  { id:"plotmind",       title:"Plotmind",         sub:"No-Code Data Intelligence",    desc:"Low-code environment for advanced data visualizations in enterprise pipelines.",    cat:"product-design",            color:"#7c3aed", img:"/images/plotmind.png",        link:"https://tanhata.github.io/plotmind-case-study/",   year:"2025", frame:"raw",          aspectRatio:"2056/1437", headline:{ before:"I bridge the gap between ", keyword:"code and intuition", after:" for data teams." } },
  { id:"lattice",        title:"Lattice",         sub:"Next Gen Experiment Tracking", desc:"ML experiment tracker connecting experiments, papers, and evaluations.",             cat:"product-design",            color:"#0891b2", img:"/images/lattice.png",         link:"https://tanhata.github.io/lattice-case-study/",    year:"2026", frame:"raw",          aspectRatio:"1832/845", headline:{ before:"I prototype ", keyword:"the next gen of experiment tracking", after:"." } },
  { id:"mcp",            title:"Multi-Agent",      sub:"MCP Interface",                desc:"Conversation UIs enabling distributed AI agents to coordinate and refine outputs.", cat:"product-design",            color:"#d97706", img:"/images/mcp.png",             link:"https://tanhata.github.io/mcp-case-study/",        year:"2024", frame:"laptop",       headline:{ before:"I design ", keyword:"conversation", after:" for multi-agent systems." }, featured:true, darkText:true },
  { id:"aura",           title:"AURA",             sub:"AR Museum Guide",              desc:"AR museum guide — spatial storytelling through layered narratives.",                cat:"mobile-design",             color:"#059669", img:"/images/aura.gif",            link:"https://tanhata.github.io/aura-case-study/",       year:"2022", frame:"triplePhone",        headline:{ before:"I design ", keyword:"storytelling", after:" for spaces." }, featured:true },
  { id:"tangent",        title:"Tangent",          sub:"Parametric Geometry",          desc:"Real-time parametric geometry with natural language input and live 3D.",            cat:"product-design",            color:"#b4e000", img:"/images/tangent.png",         link:"https://docs.google.com/presentation/d/e/2PACX-1vRjNEWLMh6TRxoEeeHaeL_ePIp357aN6xCbF96EgSPOmyIOAjsyWw7KoLbwnlk5QlhleyfO8OZxrGbA/pub", year:"2024", frame:"raw"},
  { id:"recursive-orbit",title:"Recursive Orbit",  sub:"Grief & Memory",              desc:"Interactive visualization exploring grief via generative data.",                    cat:"data-visualization",        color:"#7c3aed", img:"/images/recursive.gif", link:"https://tanhata.github.io/recursive-orbit/",       year:"2024", frame:"raw" },
  { id:"green-spaces",   title:"The Green Divide", sub:"NYC Park Access",              desc:"Mapping disparities in park access across NYC neighborhoods.",                     cat:"data-analysis",             color:"#059669", img:"/images/greendivide.png",    link:"/green_divide_story.html",                         year:"2021", frame:"raw", aspectRatio:"1315/879"  },
  { id:"living",         title:"Living Computing", sub:"Adaptive Interfaces",          desc:"Interfaces that respond to human behavior and context.",                          cat:"human-computer-interaction",color:"#db2777", img:"/images/pic06.gif",link:"https://www.youtube.com/watch?v=Geo17VbvWtU",       year:"2021", frame:"raw", aspectRatio:"1920/1247", featured:true },
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
    bg:"#ffffff", fg:"#111111", fgMuted:"rgba(17,17,17,.45)", fgGhost:"rgba(17,17,17,.07)",
    rule:"rgba(17,17,17,.1)", accent:"#b4e000", navBg:"rgba(255,255,255,.55)",
    frameBg:"rgba(245,247,250,.55)", frameBorder:"rgba(17,17,17,.14)", shadow:"rgba(17,17,17,.08)",
    laptopKey:"rgba(17,17,17,.06)", screenBg:"#ececec",
  },
  dark: {
    bg:"#000000", fg:"#ffffff", fgMuted:"rgba(255,255,255,.42)", fgGhost:"rgba(255,255,255,.06)",
    rule:"rgba(255,255,255,.1)", accent:"#c4f000", navBg:"rgba(0,0,0,.55)",
    frameBg:"rgba(255,255,255,.04)", frameBorder:"rgba(255,255,255,.11)", shadow:"rgba(0,0,0,.5)",
    laptopKey:"rgba(255,255,255,.055)", screenBg:"#000000",
  },
};


/* ── AURA Scene 1: Floating paintings in museum space ── */
const AuraScene1 = () => (
  <div style={{ width:"100%", height:"100%", background:"#080808", position:"relative", overflow:"hidden" }}>
    <style>{`
      @keyframes paintingFloat { 0%,100%{transform:translate(-50%,-54%) translateY(0)} 50%{transform:translate(-50%,-54%) translateY(-6px)} }
      @keyframes sideFloat { 0%,100%{transform:translateY(-50%) translateY(0)} 50%{transform:translateY(-50%) translateY(-4px)} }
      @keyframes fadeInUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    `}</style>
    <div style={{ position:"absolute", top:14, left:16, fontSize:10, fontWeight:600, color:"rgba(255,255,255,.5)", letterSpacing:4, fontFamily:"'Space Grotesk',sans-serif", animation:"fadeInUp .8s ease both" }}>AURA</div>
    <div style={{ position:"absolute", top:14, right:16, display:"flex", gap:12 }}>
      {["EXPLORE","TIMELINE","VISION"].map((l,i) => (
        <span key={l} style={{ fontSize:5.5, color:"rgba(255,255,255,.2)", letterSpacing:1.5, fontFamily:"'JetBrains Mono',monospace", animation:`fadeInUp .8s ease ${.1+i*.08}s both` }}>{l}</span>
      ))}
    </div>
    <div style={{ position:"absolute", top:"50%", left:"50%", width:"38%", aspectRatio:"3/4", animation:"paintingFloat 4s ease-in-out infinite" }}>
      <div style={{ width:"100%", height:"100%", background:"linear-gradient(165deg,#4a7c72 0%,#3d6b61 55%,#2e5249 100%)", border:"2.5px solid #8b6f3a", borderRadius:2, overflow:"hidden", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:"0 24px 60px rgba(0,0,0,.7)" }}>
        <div style={{ width:"38%", aspectRatio:"1/1", background:"#c8a882", borderRadius:"50%", marginBottom:5 }} />
        <div style={{ width:"26%", height:"5%", background:"#e8d5b8", borderRadius:99, marginBottom:3 }} />
        <div style={{ width:"50%", height:"24%", background:"#5c3d1e", borderRadius:"6px 6px 0 0", marginTop:3 }} />
      </div>
    </div>
    <div style={{ position:"absolute", top:"46%", left:"7%", width:"24%", aspectRatio:"4/3", animation:"sideFloat 4.6s ease-in-out .4s infinite", opacity:.65 }}>
      <div style={{ width:"100%", height:"100%", background:"linear-gradient(135deg,#1a2535,#2d3f56)", border:"2px solid #6b5228", borderRadius:1, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 12px 32px rgba(0,0,0,.5)" }}>
        <div style={{ width:"28%", aspectRatio:"1/1", background:"rgba(200,180,140,.45)", borderRadius:"50%", marginRight:4 }} />
        <div style={{ width:"18%", height:"55%", background:"rgba(200,190,170,.25)", borderRadius:2 }} />
      </div>
    </div>
    <div style={{ position:"absolute", top:"46%", right:"7%", width:"24%", aspectRatio:"4/3", animation:"sideFloat 5.2s ease-in-out .8s infinite", opacity:.65 }}>
      <div style={{ width:"100%", height:"100%", background:"linear-gradient(135deg,#0e1a28,#162338)", border:"2px solid #6b5228", borderRadius:1, overflow:"hidden", position:"relative", boxShadow:"0 12px 32px rgba(0,0,0,.5)" }}>
        {[[15,25],[62,18],[80,34],[42,44]].map(([x,y],i) => (
          <div key={i} style={{ position:"absolute", left:`${x}%`, top:`${y}%`, width:i===2?5:3, height:i===2?5:3, borderRadius:"50%", background:"rgba(220,210,180,.75)" }} />
        ))}
        <div style={{ position:"absolute", bottom:"22%", left:0, right:0, height:1, background:"rgba(100,140,100,.25)" }} />
      </div>
    </div>
    <div style={{ position:"absolute", bottom:12, left:0, right:0, textAlign:"center", animation:"fadeInUp 1s ease .6s both" }}>
      <div style={{ fontSize:6.5, color:"rgba(255,255,255,.18)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:3 }}>SPATIAL STORYTELLING</div>
    </div>
  </div>
);

/* ── AURA Scene 2: AR identification on phone camera ── */
const AuraScene2 = () => (
  <div style={{ width:"100%", height:"100%", background:"#0d0e0c", fontFamily:"'Space Grotesk',sans-serif", position:"relative", overflow:"hidden" }}>
    <style>{`
      @keyframes scanDown { 0%{top:12%} 100%{top:68%} }
      @keyframes cardUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      @keyframes cornerPulse { 0%,100%{opacity:.4} 50%{opacity:1} }
    `}</style>
    <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#181410 0%,#221d13 55%,#181410 100%)" }} />
    <div style={{ position:"absolute", top:"15%", left:"50%", transform:"translateX(-50%)", width:"52%", aspectRatio:"3/4", background:"linear-gradient(165deg,#4a7c72,#2e5249)", border:"2.5px solid #7a5f30", borderRadius:1, boxShadow:"0 8px 40px rgba(0,0,0,.6)" }}>
      <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translateX(-50%)", width:"44%", aspectRatio:"1/1", background:"#c8a882", borderRadius:"50%" }} />
    </div>
    <div style={{ position:"absolute", top:"15%", left:"24%", width:"52%", aspectRatio:"3/4", animation:"cornerPulse 2s ease-in-out infinite" }}>
      {[{t:0,l:0,bt:"borderTop",bl:"borderLeft"},{t:0,r:0,bt:"borderTop",bl:"borderRight"},{b:0,l:0,bt:"borderBottom",bl:"borderLeft"},{b:0,r:0,bt:"borderBottom",bl:"borderRight"}].map((pos,i)=>(
        <div key={i} style={{ position:"absolute", top:pos.t, bottom:pos.b, left:pos.l, right:pos.r, width:10, height:10, [pos.bt]:"1.5px solid rgba(200,230,0,.7)", [pos.bl]:"1.5px solid rgba(200,230,0,.7)" }} />
      ))}
    </div>
    <div style={{ position:"absolute", left:"24%", width:"52%", height:1, background:"linear-gradient(to right, transparent, rgba(200,230,0,.5), transparent)", animation:"scanDown 2.4s ease-in-out infinite alternate" }} />
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

/* ── AURA Scene 3: Wayfinding floor plan ── */
const AuraScene3 = () => (
  <div style={{ width:"100%", height:"100%", background:"#0a0b0a", fontFamily:"'Space Grotesk',sans-serif", display:"flex", flexDirection:"column", overflow:"hidden" }}>
    <style>{`
      @keyframes youAreHere { 0%,100%{transform:scale(1);opacity:.9} 50%{transform:scale(1.35);opacity:.4} }
      @keyframes routeLine { from{stroke-dashoffset:120} to{stroke-dashoffset:0} }
    `}</style>
    <div style={{ padding:"10px 12px 7px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span style={{ fontSize:9, fontWeight:600, color:"rgba(255,255,255,.5)", letterSpacing:3 }}>AURA</span>
      <span style={{ fontSize:7, color:"rgba(255,255,255,.28)", fontFamily:"'JetBrains Mono',monospace" }}>Gallery 3 · East Wing</span>
    </div>
    <div style={{ flex:1, padding:"8px 14px 6px", position:"relative" }}>
      <svg width="100%" height="100%" viewBox="0 0 180 130" style={{ overflow:"visible" }}>
        <rect x="8"  y="8"  width="50" height="38" rx="3" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
        <rect x="65" y="8"  width="50" height="38" rx="3" fill="rgba(200,230,0,.05)"   stroke="rgba(200,230,0,.3)"   strokeWidth="1.2"/>
        <rect x="122"y="8"  width="50" height="38" rx="3" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
        <rect x="8"  y="54" width="50" height="38" rx="3" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
        <rect x="65" y="54" width="107"height="38" rx="3" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
        <rect x="8" y="100" width="164" height="22" rx="3" fill="rgba(255,255,255,.015)" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
        <text x="33"  y="30" textAnchor="middle" fill="rgba(255,255,255,.22)" fontSize="5.5" fontFamily="JetBrains Mono">GALLERY 1</text>
        <text x="90"  y="25" textAnchor="middle" fill="rgba(200,230,0,.7)"    fontSize="5.5" fontFamily="JetBrains Mono">GALLERY 3</text>
        <text x="90"  y="33" textAnchor="middle" fill="rgba(200,230,0,.45)"   fontSize="4.5" fontFamily="JetBrains Mono">Early Netherlandish</text>
        <text x="147" y="30" textAnchor="middle" fill="rgba(255,255,255,.22)" fontSize="5.5" fontFamily="JetBrains Mono">GALLERY 5</text>
        <text x="33"  y="76" textAnchor="middle" fill="rgba(255,255,255,.22)" fontSize="5.5" fontFamily="JetBrains Mono">GALLERY 2</text>
        <text x="118" y="76" textAnchor="middle" fill="rgba(255,255,255,.18)" fontSize="5.5" fontFamily="JetBrains Mono">CONTEMPORARY</text>
        <text x="90"  y="113"textAnchor="middle" fill="rgba(255,255,255,.15)" fontSize="5"   fontFamily="JetBrains Mono">MAIN CORRIDOR</text>
        <polyline points="90,111 90,92" fill="none" stroke="rgba(200,230,0,.5)" strokeWidth="1.5" strokeDasharray="120" strokeDashoffset="0" style={{ animation:"routeLine 1.5s ease .3s both" }}/>
        <polyline points="90,92 90,54" fill="none" stroke="rgba(200,230,0,.5)" strokeWidth="1.5" strokeDasharray="120" strokeDashoffset="0" style={{ animation:"routeLine 1.5s ease .7s both" }}/>
        <circle cx="90" cy="27" r="5" fill="rgba(200,230,0,.15)" stroke="#c8e600" strokeWidth="1.2"/>
        <circle cx="90" cy="27" r="2" fill="#c8e600"/>
        <circle cx="90" cy="111" r="5" fill="rgba(255,255,255,.08)" style={{ animation:"youAreHere 1.8s ease-in-out infinite", transformOrigin:"90px 111px" }}/>
        <circle cx="90" cy="111" r="2.5" fill="#fff" opacity=".8"/>
        <text x="100" y="114" fill="rgba(255,255,255,.35)" fontSize="4.5" fontFamily="JetBrains Mono">YOU</text>
      </svg>
    </div>
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

/* ── MCP: Multi-agent conversation refinement mockup ── */
const MCPScreen = () => (
  <div style={{ width:"100%", height:"100%", background:"#f9f8f5", fontFamily:"'Space Grotesk',sans-serif", display:"flex", flexDirection:"column", overflow:"hidden" }}>
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
    <div style={{ padding:"8px 13px 7px", borderBottom:"1px solid rgba(26,23,20,.06)", background:"rgba(26,23,20,.02)" }}>
      <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.3)", letterSpacing:2, marginBottom:4 }}>USER PROMPT</div>
      <div style={{ fontSize:8.5, color:"rgba(26,23,20,.65)", lineHeight:1.55, fontStyle:"italic", fontFamily:"'Space Grotesk',sans-serif" }}>
        "we're onboarding 3 engineers next week — two are ml, one is infra. what should each of them read first?"
      </div>
    </div>
    <div style={{ padding:"6px 13px 4px", display:"flex", gap:5 }}>
      {[["Claude 3.7","#4285f4","author"],["Mixtral","#d97706","critic"],["GPT-4o","#16a34a","synthesizer"]].map(([name,c,role])=>(
        <div key={name} style={{ display:"flex", alignItems:"center", gap:4, padding:"3px 7px", borderRadius:4, background:`${c}0a`, border:`1px solid ${c}30` }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:c }} />
          <span style={{ fontSize:7.5, fontWeight:600, color:c }}>{name}</span>
          <span style={{ fontSize:6, color:"rgba(26,23,20,.3)", fontFamily:"'JetBrains Mono',monospace" }}>/{role}</span>
        </div>
      ))}
    </div>
    <div style={{ flex:1, padding:"5px 13px", display:"flex", flexDirection:"column", gap:4, overflow:"hidden" }}>
      <div style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.28)", letterSpacing:2 }}>OUTPUT EVOLUTION</div>
      <div style={{ background:"rgba(26,23,20,.03)", border:"1px solid rgba(26,23,20,.08)", borderRadius:5, padding:"5px 8px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"#4285f4", letterSpacing:1 }}>R1 · Claude draft</span>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.25)" }}>clarity 38</span>
        </div>
        <div style={{ fontSize:7.5, lineHeight:1.5, color:"rgba(26,23,20,.35)" }}>
          Share the <span style={{ background:"rgba(220,38,38,.08)", color:"#dc2626", borderRadius:2, padding:"0 2px" }}>onboarding docs</span> and have them <span style={{ background:"rgba(220,38,38,.08)", color:"#dc2626", borderRadius:2, padding:"0 2px" }}>read the codebase</span> before the first week.
        </div>
      </div>
      <div style={{ background:"rgba(26,23,20,.03)", border:"1px solid rgba(26,23,20,.07)", borderRadius:5, padding:"5px 8px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"#d97706", letterSpacing:1 }}>R2 · after critique</span>
          <span style={{ fontSize:6.5, fontFamily:"'JetBrains Mono',monospace", color:"rgba(26,23,20,.25)" }}>clarity 67</span>
        </div>
        <div style={{ fontSize:7.5, lineHeight:1.5, color:"rgba(26,23,20,.52)" }}>
          Route by role: <span style={{ background:"rgba(22,163,74,.1)", color:"#15803d", borderRadius:2, padding:"0 2px" }}>ML engineers → model cards + training pipeline</span>; infra → deployment runbooks.
        </div>
      </div>
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

const SCREEN_COMPONENTS = {
  "aura": AuraScreen,
  "mcp":  MCPScreen,
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
    <div style={{ width:"100%", borderRadius:10, overflow:"hidden", border:`1px solid ${accent}60`, background:t.frameBg, backdropFilter:"blur(24px) saturate(160%)", WebkitBackdropFilter:"blur(24px) saturate(160%)" }}>
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
    <div style={{ width:"90%", borderRadius:"10px 10px 0 0", border:`1px solid ${accent}60`, borderBottom:"none", background:t.frameBg, backdropFilter:"blur(24px) saturate(160%)", WebkitBackdropFilter:"blur(24px) saturate(160%)", padding:"7px 7px 0" }}>
      <div style={{ display:"flex", justifyContent:"center", marginBottom:5 }}>
        <div style={{ width:5, height:5, borderRadius:"50%", background: accent, opacity: hovered ? 1 : 0.4, transition:"opacity .4s" }} />
      </div>
      <div style={{ width:"100%", aspectRatio:"16/10", borderRadius:"4px 4px 0 0", background:t.screenBg, overflow:"hidden" }}>
        <ScreenContent img={img} hovered={hovered} accent={accent} screenId={screenId} style={{ aspectRatio:"16/10" }} />
      </div>
    </div>
    <div style={{ width:"100%", height:13, borderRadius:"0 0 8px 8px", background:t.frameBg, backdropFilter:"blur(24px) saturate(160%)", WebkitBackdropFilter:"blur(24px) saturate(160%)", border:`1px solid ${accent}60`, borderTop:`1px solid ${t.frameBorder}`, display:"flex", justifyContent:"center", alignItems:"center" }}>
      <div style={{ width:"26%", height:3, borderRadius:99, background:`${accent}30` }} />
    </div>
  </div>
);

const PhoneFrame = ({ img, hovered, t, accent, screenId }) => (
  <div style={{ display:"flex", justifyContent:"center", width:"100%" }}>
    <div style={{ width:"50%", maxWidth:210, borderRadius:30, background:t.frameBg, backdropFilter:"blur(24px) saturate(160%)", WebkitBackdropFilter:"blur(24px) saturate(160%)", padding:"10px 6px", position:"relative" }}>
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

const TriplePhoneFrame = ({ t, accent }) => (
  <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-start", gap:14, width:"100%" }}>
    {AURA_SCENES.map((Scene, i) => (
      <div key={i} style={{ flex:"1 1 0", maxWidth:240, borderRadius:30, background:t.frameBg, backdropFilter:"blur(24px) saturate(160%)", WebkitBackdropFilter:"blur(24px) saturate(160%)", padding:"10px 6px", position:"relative" }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:7 }}>
          <div style={{ width:28, height:3, borderRadius:99, background:t.fgGhost }} />
        </div>
        <div style={{ borderRadius:20, overflow:"hidden", aspectRatio:"9/19.5", background:t.screenBg }}>
          <Scene />
        </div>
        <div style={{ display:"flex", justifyContent:"center", marginTop:7 }}>
          <div style={{ width:22, height:3, borderRadius:99, background:t.fgGhost }} />
        </div>
      </div>
    ))}
  </div>
);

const CircleFrame = ({ img, hovered, t, accent, screenId }) => (
  <div style={{ display:"flex", justifyContent:"center", width:"100%" }}>
    <div style={{ width:"60%", maxWidth:260, aspectRatio:"1/1", borderRadius:"50%", overflow:"hidden" }}>
      <ScreenContent img={img} hovered={hovered} accent={accent} screenId={screenId} style={{ width:"100%", height:"100%" }} />
    </div>
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
  <div style={{ width:"100%", borderRadius:10, overflow:"hidden", border:`1px solid ${accent}60`, background:t.frameBg, backdropFilter:"blur(24px) saturate(160%)", WebkitBackdropFilter:"blur(24px) saturate(160%)" }}>
    <div style={{ width:"100%", aspectRatio:"16/9", background:t.screenBg }}>
      <ScreenContent img={img} hovered={hovered} accent={accent} screenId={screenId} style={{ aspectRatio:"16/9" }} />
    </div>
  </div>
);

const RawFrame = ({ img, hovered, t, accent, screenId, aspectRatio }) => {
  const CustomScreen = screenId && SCREEN_COMPONENTS[screenId];
  return (
    <div style={{ width:"100%", borderRadius:10, overflow:"hidden", border:`1px solid ${accent}40`, boxShadow:`0 8px 40px rgba(0,0,0,.12)`, position:"relative" }}>
      {CustomScreen
        ? <div style={{ width:"100%", aspectRatio: aspectRatio || "16/9" }}><CustomScreen /></div>
        : <img src={img} alt="" draggable={false}
            style={{ width:"100%", height:"auto", display:"block" }}
            onError={e => e.target.style.display="none"} />
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

const DeviceFrame = ({ frame, img, hovered, t, accent, screenId, url, aspectRatio }) => {
  if (frame === "raw")         return <RawFrame       img={img} hovered={hovered} t={t} accent={accent} screenId={screenId} aspectRatio={aspectRatio} />;
  if (frame === "youtube")     return <YouTubeFrame   img={img} hovered={hovered} t={t} accent={accent} screenId={screenId} />;
  if (frame === "square")      return <SquareFrame    img={img} hovered={hovered} t={t} accent={accent} screenId={screenId} />;
  if (frame === "laptop")      return <LaptopFrame img={img} hovered={hovered} t={t} accent={accent} screenId={screenId} />;
  if (frame === "phone")       return <PhoneFrame  img={img} hovered={hovered} t={t} accent={accent} screenId={screenId} />;
  if (frame === "triplePhone") return <TriplePhoneFrame t={t} accent={accent} />;
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
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ display:"block" }}>
        <path d="M3 3L19.5 10.5L12.5 12.5L10.5 19.5L3 3Z" fill="#111" stroke={hovered ? hovered.color : t.accent} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" paintOrder="stroke" style={{ transition:"stroke .25s ease" }}/>
      </svg>
      {hovered && (
        <div style={{
          position:"absolute", top:28, left:20,
          background:hovered.color, color:"#fff",
          padding:"10px 18px", borderRadius:99,
          fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Inter,sans-serif",
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

const AnnotatedLink = ({ href, children, note, t }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  return (
    <span ref={ref} style={{ position:"relative", display:"inline" }}>
      <a
        href={href} target="_blank" rel="noopener noreferrer"
        style={{ color:t.accent, textDecoration:"none", fontWeight:700, cursor:"none", borderBottom:`1.5px solid ${t.accent}40`, paddingBottom:1 }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </a>
      {open && (
        <span style={{
          position:"absolute", bottom:"calc(100% + 10px)", left:"50%", transform:"translateX(-50%)",
          background:t.fg, color:t.bg,
          fontSize:11, fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Inter,sans-serif", fontWeight:400,
          lineHeight:1.55, padding:"8px 12px", borderRadius:6,
          whiteSpace:"normal", width:220, zIndex:9999,
          animation:"fadeUp .15s ease both",
          pointerEvents:"none", textAlign:"left",
          boxShadow:"0 4px 20px rgba(0,0,0,.15)",
        }}>
          {note}
          <span style={{ position:"absolute", bottom:-4, left:"50%", transform:"translateX(-50%)", width:0, height:0, borderLeft:"4px solid transparent", borderRight:"4px solid transparent", borderTop:`4px solid ${t.fg}` }} />
        </span>
      )}
    </span>
  );
};

const TanhaGreetFlip = ({ t }) => {
  const [showArabic, setShowArabic] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setShowArabic(s => !s), 3600);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ position:"relative", display:"inline-block" }}>
      <span style={{ display:"inline-block", opacity: showArabic ? 0 : 1, transition:"opacity .25s ease" }}>Hi, I'm Tanha</span>
      <span style={{ position:"absolute", right:0, top:0, whiteSpace:"nowrap", opacity: showArabic ? 1 : 0, transition: showArabic ? "opacity .3s ease .28s" : "opacity .2s ease", fontFamily:"'Amiri',serif", fontWeight:400, letterSpacing:"0em" }}>مرحباً، أنا تنحى</span>
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
      <span style={{ display:"inline-block", opacity: showArabic ? 0 : 1, transition:"opacity .25s ease", fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Inter,sans-serif", fontWeight:500, letterSpacing:"-.03em" }}>Tanha</span>
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
const Nav = ({ page, go, dark, setDark, t, mob, navHidden }) => (
  <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", justifyContent:"space-between", alignItems:"center", padding: mob?"16px 20px":"20px 44px", background:t.navBg, backdropFilter:"blur(28px) saturate(140%)", WebkitBackdropFilter:"blur(28px) saturate(140%)", transition:"background .4s, transform .35s cubic-bezier(.4,0,.2,1)", transform: navHidden ? "translateY(-100%)" : "translateY(0)" }}>
    <button onClick={() => go("home")} style={{ background:"#f7f4ee", border:"1.5px solid rgba(26,23,20,.12)", cursor:"none", padding:0, borderRadius:"50%", overflow:"hidden", width:32, height:32, flexShrink:0, transition:"border-color .2s", position:"relative" }}>
      <img src="/images/profilepic.png" alt="tanha" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
        onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
      <div style={{ display:"none", width:"100%", height:"100%", background:`${t.accent}18`, alignItems:"center", justifyContent:"center", position:"absolute", inset:0 }}>
        <span style={{ fontSize:12, fontWeight:600, color:t.accent, fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Inter,sans-serif" }}>T</span>
      </div>
    </button>
    <div style={{ display:"flex", alignItems:"center", gap: mob?6:8 }}>
      <div style={{
        display:"flex", alignItems:"center", gap:2, padding:3,
        background: t.frameBg,
        backdropFilter:"blur(20px) saturate(160%)",
        WebkitBackdropFilter:"blur(20px) saturate(160%)",
        border:`1px solid ${t.frameBorder}`,
        borderRadius:99,
      }}>
        {["about","work","writing"].map(id => {
          const active = page===id;
          const label = id.charAt(0).toUpperCase() + id.slice(1);
          return (
            <button key={id} onClick={() => go(id)}
              style={{
                background: active ? (dark ? "rgba(255,255,255,.1)" : "rgba(17,17,17,.07)") : "transparent",
                border:"none", cursor:"none",
                padding: mob?"5px 11px":"6px 14px",
                fontSize: mob?12:13,
                fontWeight: active ? 500 : 400,
                fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Inter,sans-serif",
                letterSpacing: 0,
                color: active ? t.fg : t.fgMuted,
                borderRadius: 99,
                transition:"all .25s cubic-bezier(.4,0,.2,1)",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = t.fg; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = t.fgMuted; }}
            >{label}</button>
          );
        })}
      </div>
      <button onClick={() => setDark(d => !d)} style={{ width:30, height:30, borderRadius:"50%", background:"transparent", border:`1px solid ${t.rule}`, cursor:"none", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .25s" }} aria-label="toggle">
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
      <div style={{ padding: mob?"4vh 20px 5vh":"6vh 44px 7vh" }}>
        <div ref={frameRef} style={{ ...frameStyle, position:"relative", maxWidth: mob ? (p.frame==="phone"?"260px": p.frame==="circle"?"300px": p.frame==="triplePhone"?"100%": p.frame==="square"?"380px":"100%") : (p.frame==="phone"?"360px": p.frame==="circle"?"440px": p.frame==="triplePhone"?"780px": p.frame==="youtube"?"680px": p.frame==="square"?"520px":"680px"), margin:"0 auto" }}>
          <div style={{ position:"relative", transform: hovered ? "translateY(-6px)" : "translateY(0px)", transition:"transform .65s cubic-bezier(.4,0,.2,1)" }}>
            <DeviceFrame frame={p.frame} img={p.img} hovered={hovered} t={t} accent={color} screenId={p.id} url={p.link} aspectRatio={p.aspectRatio} />
          </div>
          {/* title + year — always visible, minimal */}
          <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", padding:"16px 2px 0" }}>
            <span style={{ fontSize: mob?15:17, fontWeight:500, color:t.fg, letterSpacing:"-.02em", fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Inter,sans-serif" }}>{p.title}</span>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
              <span style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:t.fgMuted, opacity:.55 }}>{p.year}</span>
              <div style={{ width:5, height:5, borderRadius:"50%", background:color }} />
            </div>
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
            <div style={{ fontSize:14, fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Inter,sans-serif", fontStyle:"italic", color:t.fg, marginBottom:3 }}>tanh(x) = tanha</div>
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
   PROJECT TILE — grid-style filled tile, no chrome
══════════════════════════════════════════════════ */
const contrastText = (hex) => {
  if (!hex || !hex.startsWith("#") || hex.length < 7) return "#fff";
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.55 ? "#111" : "#fff";
};

const ProjectTile = ({ p, t, mob, setCursorHovered, wide, hideCategory, minimal, style: extraStyle }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const color = p.color || gc(p.cat).color;
  // Use project's natural image aspect when present; fall back to wide/default
  const aspect = p.aspectRatio || (wide ? "16 / 9" : "4 / 3");

  return (
    <a href={p.link} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => { setHovered(true); setCursorHovered({ title: p.title, color, sub: p.sub, year: p.year }); }}
      onMouseLeave={() => { setHovered(false); setCursorHovered(null); }}
      style={{
        position: "relative",
        aspectRatio: aspect,
        gridColumn: wide ? "1 / -1" : "auto",
        overflow: "hidden",
        borderRadius: 18,
        textDecoration: "none",
        cursor: "none",
        display: "block",
        background: t.frameBg,
        ...(extraStyle || {}),
      }}
    >
      {!imgError ? (
        <img src={p.img} alt=""
          onError={() => setImgError(true)}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform .8s cubic-bezier(.4,0,.2,1)",
          }}
        />
      ) : (
        <div style={{
          width: "100%", height: "100%",
          background: `linear-gradient(145deg, ${color}55, ${color}22)`,
        }} />
      )}

      {/* Top info strip — bg matches theme negative space, blends with page bg */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        background: t.bg,
        padding: mob ? "10px 14px" : (wide ? "13px 18px" : "11px 14px"),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: mob ? 15 : (wide ? 20 : 17),
            fontWeight: 600,
            color: t.fg,
            letterSpacing: "-.015em",
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>{p.title}</div>
          {p.sub && (
            <div style={{
              fontSize: mob ? 12 : (wide ? 14 : 13),
              fontWeight: 500,
              color: t.fgMuted,
              letterSpacing: "-.005em",
              lineHeight: 1.3,
              marginTop: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>{p.sub}</div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {!minimal && !hideCategory && (
            <span style={{
              fontSize: 10,
              fontFamily: "'JetBrains Mono', monospace",
              color: t.fgMuted,
              letterSpacing: 1,
            }}>{p.year}</span>
          )}
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
        </div>
      </div>

      {/* Hover accent strip */}
      <div style={{
        position: "absolute", top: 0, left: 0, height: 2,
        background: color,
        width: hovered ? "100%" : "0%",
        transition: "width .8s cubic-bezier(.4,0,.2,1)",
      }} />
    </a>
  );
};

/* ══════════════════════════════════════════════════
   HOME — single continuous grid (works · writing · before · side)
══════════════════════════════════════════════════ */
const HomePage = ({ t, mob, setCursorHovered, go }) => {
  // ── Source projects (single items each, no longer grouped pairs)
  const byId = id => PROJECTS.find(p => p.id === id);
  const works  = ["model-pulse", "mcp"].map(byId);
  const aura   = byId("aura");
  const living = byId("living");
  const legibilityProject = byId("legibility-interaction");
  const legibilityWriting = WRITINGS[0]; // Legibility article

  // ── ProjectCard: text annotation for its paired tile
  const ProjectCard = ({ p, style }) => {
    const cat = gc(p.cat).label.toUpperCase();

    return (
      <a href={p.link} target="_blank" rel="noopener noreferrer"
        style={{
          background: t.frameBg,
          border: `1px solid ${t.rule}`,
          borderRadius: 18,
          padding: "clamp(24px, 2.6vw, 38px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textDecoration: "none",
          cursor: "none",
          transition: "background .2s",
          ...style,
        }}>
        <div style={{
          fontSize: 10,
          fontFamily: "'JetBrains Mono', monospace",
          color: p.color,
          letterSpacing: 2,
          marginBottom: 20,
        }}>{p.year} · {cat}</div>

        <div>
          {p.headline ? (
            <>
              <p style={{
                fontSize: mob ? 18 : 22,
                fontWeight: 500,
                lineHeight: 1.3,
                color: t.fg,
                letterSpacing: "-.015em",
                margin: "0 0 14px 0",
              }}>
                {p.headline.before}
                <span style={{ color: p.color }}>{p.headline.keyword}</span>
                {p.headline.after}
              </p>
              <p style={{ fontSize: mob ? 13 : 14, lineHeight: 1.65, color: t.fgMuted, margin: 0 }}>
                {p.desc}
              </p>
            </>
          ) : (
            <p style={{
              fontSize: mob ? 17 : 20,
              fontWeight: 500,
              lineHeight: 1.4,
              color: t.fg,
              letterSpacing: "-.015em",
              margin: 0,
            }}>{p.desc}</p>
          )}
        </div>
      </a>
    );
  };

  // ── WritingTile: rounded color block with title (no image, since Legibility lives in writing)
  const WritingTile = ({ w, color, style }) => (
    <a href={w.url} target="_blank" rel="noopener noreferrer"
      style={{
        position: "relative",
        background: color,
        borderRadius: 18,
        overflow: "hidden",
        textDecoration: "none",
        cursor: "none",
        display: "block",
        aspectRatio: "1956/1054",
        ...style,
      }}>
      {/* Subtle bottom vignette so text reads */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(165deg, transparent 40%, rgba(0,0,0,.22) 100%)",
        pointerEvents: "none",
      }} />

      {/* Tag — top right */}
      <div style={{
        position: "absolute",
        top: mob ? 14 : 20, right: mob ? 14 : 22,
        fontSize: 9,
        fontFamily: "'JetBrains Mono', monospace",
        color: "rgba(255,255,255,.9)",
        letterSpacing: 1.8,
        textShadow: "0 1px 6px rgba(0,0,0,.35)",
      }}>{w.tag.toUpperCase()}</div>

      {/* Title — bottom left */}
      <div style={{
        position: "absolute",
        bottom: mob ? 18 : 28, left: mob ? 18 : 28, right: mob ? 14 : 28,
      }}>
        <div style={{
          fontSize: mob ? 20 : "clamp(22px, 2.4vw, 32px)",
          fontWeight: 500,
          color: "white",
          letterSpacing: "-.02em",
          lineHeight: 1.15,
          textShadow: "0 1px 14px rgba(0,0,0,.35)",
        }}>{w.title.trim()}</div>
      </div>

      {/* Date + dot — bottom right */}
      <div style={{
        position: "absolute",
        bottom: mob ? 12 : 16, right: mob ? 14 : 22,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{
          fontSize: 10,
          fontFamily: "'JetBrains Mono', monospace",
          color: "rgba(255,255,255,.85)",
          letterSpacing: 1,
          textShadow: "0 1px 6px rgba(0,0,0,.4)",
        }}>{w.date.toUpperCase()}</span>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,.85)" }} />
      </div>
    </a>
  );

  // ── WritingCard: rounded text card with title + date · tag + description
  const WritingCard = ({ w, color, style }) => (
    <a href={w.url} target="_blank" rel="noopener noreferrer"
      style={{
        background: t.frameBg,
        border: `1px solid ${t.rule}`,
        borderRadius: 18,
        padding: "clamp(28px, 3vw, 44px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "clamp(14px, 1.4vw, 20px)",
        textDecoration: "none",
        cursor: "none",
        transition: "background .2s",
        ...style,
      }}>
      <div style={{
        fontSize: 10,
        fontFamily: "'JetBrains Mono', monospace",
        color: color,
        letterSpacing: 2,
      }}>{w.date.toUpperCase()} · {w.tag.toUpperCase()}</div>

      <h2 style={{
        fontSize: mob ? 22 : "clamp(24px, 2.4vw, 32px)",
        fontWeight: 500,
        lineHeight: 1.2,
        color: t.fg,
        letterSpacing: "-.02em",
        margin: 0,
      }}>{w.title.trim()}</h2>

      <p style={{
        fontSize: mob ? 14 : 15,
        fontWeight: 400,
        lineHeight: 1.55,
        color: t.fgMuted,
        letterSpacing: "-.005em",
        margin: 0,
      }}>{w.desc}</p>
    </a>
  );

  // ── Big intro (single line)
  const intro = (
    <h1 style={{
      fontSize: mob ? "clamp(28px, 7.4vw, 36px)" : "clamp(36px, 4.6vw, 52px)",
      fontWeight: 500,
      lineHeight: 1.15,
      letterSpacing: "-.025em",
      margin: 0,
      color: t.fg,
    }}>
      <TanhaGreetFlip t={t} />
      <span style={{ color: t.fgMuted, fontWeight: 400 }}> — a designer at the intersection of </span>
      <span style={{ color: t.accent }}>ML and interaction</span>
      <span style={{ color: t.fgMuted, fontWeight: 400 }}>.</span>
    </h1>
  );

  // ── Footer
  const footer = (
    <div style={{
      padding: mob ? "24px 16px" : "24px clamp(32px, 4vw, 72px)",
      borderTop: `1px solid ${t.rule}`,
      marginTop: mob ? 32 : 56,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <span style={{
        fontSize: 9, fontFamily: "'JetBrains Mono',monospace",
        color: t.fgMuted, letterSpacing: 1.5, opacity: 0.5,
      }}>© Tanha Alsheikhdallah 2026</span>
      <div style={{ display: "flex", gap: 18 }}>
        {[
          { href:"mailto:tanharchitecture@gmail.com", label:"Email", icon:(
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>
          )},
          { href:"https://linkedin.com/in/tanhata", label:"LinkedIn", ext:true, icon:(
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          )},
        ].map(l => (
          <a key={l.label} href={l.href} target={l.ext?"_blank":undefined} rel={l.ext?"noopener noreferrer":undefined}
            aria-label={l.label}
            style={{
              display: "flex", alignItems: "center",
              color: t.fgMuted, textDecoration: "none",
              opacity: 0.7, transition: "color .2s, opacity .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.opacity = "1"; }}
            onMouseLeave={e => { e.currentTarget.style.color = t.fgMuted; e.currentTarget.style.opacity = "0.7"; }}
          >{l.icon}</a>
        ))}
      </div>
    </div>
  );

  // ── Mobile: stack everything (no sections)
  if (mob) {
    return (
      <div style={{ paddingTop: 72, minHeight: "100vh", position: "relative", zIndex: 1 }}>
        <div style={{ padding: "24px 16px 28px" }}>{intro}</div>

        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 1 }}>
          {/* ModelPulse — tile only */}
          <ProjectTile p={works[0]} wide minimal t={t} mob={mob} setCursorHovered={setCursorHovered} />

          {/* Writing — Legibility as text-only card */}
          <WritingCard w={legibilityWriting} color={legibilityProject.color} />

          {/* MCP — tile only */}
          <ProjectTile p={works[1]} wide minimal t={t} mob={mob} setCursorHovered={setCursorHovered}
            style={{ aspectRatio: "1956/1054" }} />

          {/* AURA — tile only */}
          <ProjectTile p={aura} wide minimal t={t} mob={mob} setCursorHovered={setCursorHovered} />

          {/* Living — tile only */}
          <ProjectTile p={living} wide minimal t={t} mob={mob} setCursorHovered={setCursorHovered} />
        </div>

        {footer}
      </div>
    );
  }

  // ── Desktop: sticky intro sidebar + 2-column rounded-box grid
  return (
    <div style={{ paddingTop: 80, minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr minmax(260px, 32%)",
        gap: "clamp(40px, 5vw, 80px)",
        padding: "48px clamp(32px, 4vw, 72px) 16px",
        alignItems: "start",
      }}>
        {/* Grid — 2-col rounded boxes */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
        }}>
          {/* ModelPulse — full-width tile */}
          <ProjectTile p={works[0]} wide minimal t={t} mob={mob}
            setCursorHovered={setCursorHovered}
            style={{ gridColumn: "1 / -1" }} />

          {/* Writing — Legibility as a text-only rounded card (no visual) */}
          <WritingCard w={legibilityWriting} color={legibilityProject.color}
            style={{ gridColumn: "1 / -1" }} />

          {/* MCP + AURA — paired half-width tiles, taller for more presence */}
          <ProjectTile p={works[1]} wide minimal t={t} mob={mob}
            setCursorHovered={setCursorHovered}
            style={{ aspectRatio: "4/3", gridColumn: "auto" }} />
          <ProjectTile p={aura} wide minimal t={t} mob={mob}
            setCursorHovered={setCursorHovered}
            style={{ aspectRatio: "4/3", gridColumn: "auto" }} />

          {/* Living — full-width tile */}
          <ProjectTile p={living} wide minimal t={t} mob={mob}
            setCursorHovered={setCursorHovered}
            style={{ gridColumn: "1 / -1" }} />
        </div>

        {/* Sidebar — sticky intro on the right */}
        <aside style={{
          position: "sticky",
          top: 104,
          alignSelf: "start",
        }}>
          <h1 style={{
            fontSize: "clamp(32px, 3.4vw, 46px)",
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-.025em",
            margin: 0,
            color: t.fg,
          }}>
            <TanhaGreetFlip t={t} />
          </h1>

          {/* Blurb */}
          <p style={{
            fontSize: 30,
            color: t.fg,
            lineHeight: 1.4,
            margin: "28px 0 18px",
            letterSpacing: "-.015em",
          }}>
            I design AI tools — turn model weights into <span style={{ color: t.accent }}>observability</span>, explore <span style={{ color: t.accent }}>legibility</span> and <span style={{ color: t.accent }}>trust</span>, and help track <span style={{ color: t.accent }}>research</span>.
          </p>

          {/* Side projects line */}
          <p style={{
            fontSize: 28,
            color: t.fg,
            lineHeight: 1.4,
            margin: "0 0 18px",
            letterSpacing: "-.015em",
          }}>
            I love side projects and tinkering with data, visualizations, and physical computing.
          </p>

          {/* Contact paragraph with inline button */}
          <p style={{
            fontSize: 28,
            color: t.fg,
            lineHeight: 1.4,
            margin: 0,
            letterSpacing: "-.015em",
          }}>
            Always open to chat and explore new ideas :){" "}
            <a href="mailto:tanharchitecture@gmail.com"
              style={{
                display: "inline-block",
                padding: "4px 18px",
                background: "transparent",
                color: t.fg,
                border: `1.5px solid ${t.fg}`,
                borderRadius: 999,
                fontFamily: "inherit",
                fontSize: 24,
                fontWeight: 500,
                letterSpacing: 0,
                textDecoration: "none",
                cursor: "none",
                whiteSpace: "nowrap",
                verticalAlign: "baseline",
                marginLeft: 4,
                transition: "background .25s, color .25s, transform .25s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = t.fg;
                e.currentTarget.style.color = t.bg;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = t.fg;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >Get in Touch</a>
          </p>
        </aside>
      </div>

      {footer}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   WORK PAGE
══════════════════════════════════════════════════ */
const FILTER_OPTIONS = [
  { id:"all",               label:"All"       },
  { id:"product-design",    label:"Product"   },
  { id:"data-visualization",label:"Data Viz"  },
  { id:"writing",           label:"Research"  },
  { id:"data-analysis",     label:"Analysis"  },
  { id:"mobile-design",     label:"Mobile"    },
];

const WorkPage = ({ t, mob, setCursorHovered }) => {
  // Lookup helpers + exclude Legibility (lives in /writing) and Plotmind (cut)
  const byId = id => PROJECTS.find(p => p.id === id);
  const workProjects = PROJECTS.filter(p =>
    p.id !== "legibility-interaction" && p.id !== "plotmind"
  );

  const lattice         = byId("lattice");
  const modelpulse      = byId("model-pulse");
  const mcp             = byId("mcp");
  const aura            = byId("aura");
  const tangent         = byId("tangent");
  const recursiveOrbit  = byId("recursive-orbit");
  const living          = byId("living");
  const greenSpaces     = byId("green-spaces");

  return (
    <div style={{ paddingTop: mob ? 72 : 80, minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: mob ? "1fr 1fr" : "repeat(6, 1fr)",
        gap: 1,
        padding: mob ? "16px 16px 56px" : "32px clamp(32px, 4vw, 72px) 72px",
      }}>
        {mob ? (
          workProjects.map((p, i) => (
            <ProjectTile key={p.id} p={p} t={t} mob={mob}
              setCursorHovered={setCursorHovered}
              wide={i % 3 === 0}
            />
          ))
        ) : (
          <>
            {/* Row 1: ModelPulse (3 cols, 1.856) + MCP (3 cols, locked to ModelPulse) */}
            <ProjectTile p={modelpulse} wide t={t} mob={mob}
              setCursorHovered={setCursorHovered}
              style={{ gridColumn: "1 / 4" }} />
            <ProjectTile p={mcp} wide t={t} mob={mob}
              setCursorHovered={setCursorHovered}
              style={{ gridColumn: "4 / 7", aspectRatio: "1956/1054" }} />

            {/* Row 2: Lattice (4 cols, panorama 2.168) + AURA (2 cols, aspect forced to match Lattice's row height) */}
            <ProjectTile p={lattice} wide t={t} mob={mob}
              setCursorHovered={setCursorHovered}
              style={{ gridColumn: "1 / 5" }} />
            <ProjectTile p={aura} wide t={t} mob={mob}
              setCursorHovered={setCursorHovered}
              style={{ gridColumn: "5 / 7", aspectRatio: "1083/1000" }} />

            {/* Row 3: Tangent + Green Spaces (3 cols each, Tangent forced to Green Spaces' aspect) */}
            <ProjectTile p={tangent} wide t={t} mob={mob}
              setCursorHovered={setCursorHovered}
              style={{ gridColumn: "1 / 4", aspectRatio: "1315/879" }} />
            <ProjectTile p={greenSpaces} wide t={t} mob={mob}
              setCursorHovered={setCursorHovered}
              style={{ gridColumn: "4 / 7" }} />

            {/* Row 4: Living + Recursive Orbit (3 cols each, Recursive Orbit locked to Living) */}
            <ProjectTile p={living} wide t={t} mob={mob}
              setCursorHovered={setCursorHovered}
              style={{ gridColumn: "1 / 4" }} />
            <ProjectTile p={recursiveOrbit} wide t={t} mob={mob}
              setCursorHovered={setCursorHovered}
              style={{ gridColumn: "4 / 7", aspectRatio: "1920/1247" }} />
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: mob ? "20px 16px" : "24px clamp(32px, 4vw, 72px)",
        borderTop: `1px solid ${t.rule}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{
          fontSize: 9, fontFamily: "'JetBrains Mono',monospace",
          color: t.fgMuted, letterSpacing: 1.5, opacity: 0.5,
        }}>© Tanha Alsheikhdallah 2026</span>

        <div style={{ display: "flex", gap: 18 }}>
          {[
            { href:"mailto:tanharchitecture@gmail.com", label:"Email", icon:(
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>
            )},
            { href:"https://linkedin.com/in/tanhata", label:"LinkedIn", ext:true, icon:(
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            )},
          ].map(l => (
            <a key={l.label} href={l.href} target={l.ext?"_blank":undefined} rel={l.ext?"noopener noreferrer":undefined}
              aria-label={l.label}
              style={{
                display: "flex", alignItems: "center",
                color: t.fgMuted, textDecoration: "none",
                opacity: 0.7, transition: "color .2s, opacity .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={e => { e.currentTarget.style.color = t.fgMuted; e.currentTarget.style.opacity = "0.7"; }}
            >{l.icon}</a>
          ))}
        </div>
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
              <span style={{ fontSize:16, fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Inter,sans-serif", fontStyle:"italic", color:t.fgMuted }}>{LIFE[active].kicker}</span>
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
const DeskScene = ({ t }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const sceneW = 3200;
  const sceneH = 480;

  const items = [
    { id:'espresso', x:160, y:200, label:'6am ritual', sublabel:'la marzocco', w:90, h:160 },
    { id:'sketchbook', x:360, y:260, label:'always open', sublabel:'sketchbook', w:160, h:120 },
    { id:'books', x:620, y:220, label:'currently reading', sublabel:null, w:140, h:200 },
    { id:'arch', x:820, y:250, label:'where I started', sublabel:'architecture', w:120, h:180 },
    { id:'prints', x:1060, y:280, label:'from somewhere', sublabel:'photo prints', w:200, h:140 },
    { id:'mom', x:1340, y:230, label:'مبشرة', sublabel:'1957 — 2023', w:100, h:130 },
    { id:'math', x:1560, y:260, label:'the other language', sublabel:'probability', w:160, h:120 },
    { id:'arabic', x:1820, y:245, label:'من ديوان المتنبي', sublabel:'arabic poetry', w:150, h:170 },
  ];

  return (
    <div style={{ position:'relative', width:'100%', overflow:'hidden' }}>
      <svg
        viewBox={`0 0 ${sceneW} ${sceneH}`}
        style={{ width:'100%', height:'auto', display:'block', cursor:'none' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="warmLight" cx="35%" cy="0%" r="70%">
            <stop offset="0%" stopColor="#c8822a" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#1a0f05" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="warmLight2" cx="75%" cy="0%" r="50%">
            <stop offset="0%" stopColor="#c8822a" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#1a0f05" stopOpacity="0"/>
          </radialGradient>
          <filter id="softShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.4"/>
          </filter>
          <filter id="pageShadow">
            <feDropShadow dx="2" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.3"/>
          </filter>
          <pattern id="woodGrain" patternUnits="userSpaceOnUse" width="200" height="200">
            <rect width="200" height="200" fill="#3d2410"/>
            {[0,20,40,60,80,100,120,140,160,180].map(y=>(
              <line key={y} x1="0" y1={y+Math.sin(y)*5} x2="200" y2={y+Math.cos(y*0.5)*3} stroke="#2d1a0a" strokeWidth="0.8" opacity="0.4"/>
            ))}
          </pattern>
        </defs>

        {/* desk surface */}
        <rect width={sceneW} height={sceneH} fill="url(#woodGrain)"/>
        <rect width={sceneW} height={sceneH} fill="url(#warmLight)"/>
        <rect width={sceneW} height={sceneH} fill="url(#warmLight2)"/>
        {/* desk edge highlight */}
        <rect x="0" y={sceneH-40} width={sceneW} height="40" fill="#2a1608" opacity="0.6"/>
        <line x1="0" y1={sceneH-40} x2={sceneW} y2={sceneH-40} stroke="#6b3d1a" strokeWidth="1" opacity="0.4"/>

        {/* ── ESPRESSO MACHINE ── */}
        <g filter="url(#softShadow)"
          onMouseEnter={()=>setHoveredItem('espresso')} onMouseLeave={()=>setHoveredItem(null)}>
          {/* body */}
          <rect x="115" y="220" width="90" height="140" rx="8" fill="#1a1a1a"/>
          <rect x="118" y="223" width="84" height="134" rx="6" fill="#222"/>
          {/* chrome front panel */}
          <rect x="125" y="235" width="70" height="80" rx="4" fill="#2a2a2a"/>
          <rect x="128" y="238" width="64" height="74" rx="3" fill="#333" opacity="0.8"/>
          {/* group head */}
          <ellipse cx="160" cy="295" rx="18" ry="8" fill="#111"/>
          <ellipse cx="160" cy="293" rx="16" ry="6" fill="#1a1a1a"/>
          {/* portafilter */}
          <rect x="150" y="293" width="20" height="30" rx="2" fill="#111"/>
          <path d="M150,320 Q160,335 170,320" fill="none" stroke="#0a0a0a" strokeWidth="3"/>
          {/* steam wand */}
          <line x1="195" y1="240" x2="195" y2="310" stroke="#888" strokeWidth="3"/>
          <ellipse cx="195" cy="313" rx="4" ry="3" fill="#666"/>
          {/* buttons */}
          {[0,1,2].map(i=>(
            <circle key={i} cx={136+i*14} cy="255" r="4" fill="#c8822a" opacity={0.6+i*0.15}/>
          ))}
          {/* cup */}
          <rect x="143" y="320" width="34" height="28" rx="3" fill="#f5f0e8"/>
          <ellipse cx="160" cy="320" rx="17" ry="4" fill="#ede8df"/>
          <path d="M177,328 Q185,332 177,336" fill="none" stroke="#e0d8cc" strokeWidth="2"/>
          {/* steam */}
          {[0,1,2].map(i=>(
            <path key={i} d={`M${152+i*8},318 Q${150+i*8},308 ${154+i*8},298`} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
          ))}
          {/* brand label */}
          <text x="160" y="278" textAnchor="middle" fill="#666" fontSize="7" fontFamily="JetBrains Mono" letterSpacing="2">LA MARZOCCO</text>
        </g>

        {/* ── SKETCHBOOK ── */}
        <g filter="url(#pageShadow)"
          onMouseEnter={()=>setHoveredItem('sketchbook')} onMouseLeave={()=>setHoveredItem(null)}>
          {/* cover */}
          <rect x="340" y="265" width="170" height="130" rx="3" fill="#8b6914" transform="rotate(-2,425,330)"/>
          {/* pages */}
          <rect x="342" y="267" width="166" height="126" rx="2" fill="#f5f0e6" transform="rotate(-2,425,330)"/>
          {/* binding */}
          <rect x="340" y="265" width="10" height="130" rx="2" fill="#6b500f" transform="rotate(-2,425,330)"/>
          {/* sketch lines — loose gesture drawings */}
          {[
            "M390,290 Q410,275 430,285 Q445,295 440,310",
            "M395,310 Q420,295 445,305",
            "M385,325 L445,320",
            "M390,335 Q415,328 440,332",
            "M408,278 L412,345",
          ].map((d,i)=>(
            <path key={i} d={d} fill="none" stroke="#2a1f0e" strokeWidth="1" opacity="0.5" transform="rotate(-2,425,330)"/>
          ))}
          {/* small figure sketch */}
          <circle cx="422" cy="283" r="6" fill="none" stroke="#2a1f0e" strokeWidth="0.8" opacity="0.4" transform="rotate(-2,425,330)"/>
          <line x1="422" y1="289" x2="422" y2="305" stroke="#2a1f0e" strokeWidth="0.8" opacity="0.4" transform="rotate(-2,425,330)"/>
          {/* pencil */}
          <rect x="495" y="278" width="8" height="90" rx="2" fill="#f5c842" transform="rotate(15,499,323)"/>
          <polygon points="499,368 495,380 503,380" fill="#e8b820" transform="rotate(15,499,323)"/>
          <rect x="495" y="275" width="8" height="6" fill="#ddd" transform="rotate(15,499,323)"/>
        </g>

        {/* ── BOOK STACK ── */}
        <g filter="url(#softShadow)"
          onMouseEnter={()=>setHoveredItem('books')} onMouseLeave={()=>setHoveredItem(null)}>
          {[
            { color:"#c4523a", title:"INVISIBLE WOMEN", h:38, y:340 },
            { color:"#2d6e9e", title:"CRYING IN H MART", h:38, y:302 },
            { color:"#8b5e3c", title:"THE ARTIST'S WAY", h:38, y:264 },
            { color:"#4a7c59", title:"SECRETS OF THE DIVINE", h:44, y:220 },
          ].map((b,i)=>(
            <g key={i}>
              <rect x={595+i*1.5} y={b.y} width="130" height={b.h} rx="2" fill={b.color} transform={`rotate(${i*0.5-0.5},660,${b.y+b.h/2})`}/>
              <rect x={597+i*1.5} y={b.y+2} width="126" height={b.h-4} rx="1" fill={b.color} opacity="0.7" transform={`rotate(${i*0.5-0.5},660,${b.y+b.h/2})`}/>
              <text x={660+i} y={b.y+b.h/2+4} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="6" fontFamily="JetBrains Mono" letterSpacing="1" transform={`rotate(${i*0.5-0.5},660,${b.y+b.h/2})`}>{b.title}</text>
              {/* page edges */}
              <rect x={724+i*1.5} y={b.y+1} width="4" height={b.h-2} fill="#f0ece0" opacity="0.6" transform={`rotate(${i*0.5-0.5},660,${b.y+b.h/2})`}/>
            </g>
          ))}
        </g>

        {/* ── ARCHITECTURE BOOK ── */}
        <g filter="url(#pageShadow)"
          onMouseEnter={()=>setHoveredItem('arch')} onMouseLeave={()=>setHoveredItem(null)}>
          {/* large format book lying flat */}
          <rect x="800" y="255" width="160" height="210" rx="3" fill="#1a1a2e" transform="rotate(3,880,360)"/>
          <rect x="803" y="258" width="154" height="204" rx="2" fill="#f0ede5" transform="rotate(3,880,360)"/>
          {/* architectural drawing on cover */}
          {/* grid lines */}
          {[0,1,2,3].map(i=>(
            <line key={`h${i}`} x1="808" y1={275+i*35} x2="955" y2={275+i*35} stroke="#1a1a2e" strokeWidth="0.5" opacity="0.3" transform="rotate(3,880,360)"/>
          ))}
          {[0,1,2,3].map(i=>(
            <line key={`v${i}`} x1={830+i*35} y1="262" x2={830+i*35} y2="455" stroke="#1a1a2e" strokeWidth="0.5" opacity="0.3" transform="rotate(3,880,360)"/>
          ))}
          {/* floor plan outline */}
          <path d="M830,300 L930,300 L930,400 L880,400 L880,370 L830,370 Z" fill="none" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.6" transform="rotate(3,880,360)"/>
          <path d="M880,300 L880,340" fill="none" stroke="#1a1a2e" strokeWidth="1" opacity="0.4" transform="rotate(3,880,360)"/>
          {/* title */}
          <text x="880" y="418" textAnchor="middle" fill="#1a1a2e" fontSize="7" fontFamily="JetBrains Mono" letterSpacing="1.5" opacity="0.6" transform="rotate(3,880,360)">ARCHITECTURE</text>
          <text x="880" y="428" textAnchor="middle" fill="#1a1a2e" fontSize="5.5" fontFamily="JetBrains Mono" letterSpacing="1" opacity="0.4" transform="rotate(3,880,360)">FORM & SPACE</text>
          {/* spine */}
          <rect x="800" y="255" width="12" height="210" rx="2" fill="#111122" transform="rotate(3,880,360)"/>
        </g>

        {/* ── PHOTO PRINTS ── */}
        <g onMouseEnter={()=>setHoveredItem('prints')} onMouseLeave={()=>setHoveredItem(null)}>
          {[
            { x:1040, y:275, r:-5, shade:"#8b9e8c", label:"istanbul" },
            { x:1090, y:260, r:3, shade:"#9e8b7a", label:"marrakech" },
            { x:1150, y:280, r:-2, shade:"#7a8b9e", label:"new york" },
            { x:1200, y:268, r:6, shade:"#9e9a7a", label:"cairo" },
          ].map((p,i)=>(
            <g key={i} filter="url(#pageShadow)">
              <rect x={p.x} y={p.y} width="110" height="85" rx="2" fill="#f5f0e8" transform={`rotate(${p.r},${p.x+55},${p.y+42})`}/>
              <rect x={p.x+5} y={p.y+5} width="100" height="68" fill={p.shade} opacity="0.7" transform={`rotate(${p.r},${p.x+55},${p.y+42})`}/>
              {/* grain overlay */}
              <rect x={p.x+5} y={p.y+5} width="100" height="68" fill="url(#woodGrain)" opacity="0.05" transform={`rotate(${p.r},${p.x+55},${p.y+42})`}/>
              <text x={p.x+55} y={p.y+82} textAnchor="middle" fill="#8b7355" fontSize="6" fontFamily="JetBrains Mono" transform={`rotate(${p.r},${p.x+55},${p.y+42})`}>{p.label}</text>
            </g>
          ))}
        </g>

        {/* ── MOM'S PHOTO — مبشرة ── */}
        <g filter="url(#softShadow)"
          onMouseEnter={()=>setHoveredItem('mom')} onMouseLeave={()=>setHoveredItem(null)}>
          {/* frame */}
          <rect x="1330" y="225" width="110" height="140" rx="3" fill="#c8a87a"/>
          <rect x="1335" y="230" width="100" height="130" rx="2" fill="#f5f0e8"/>
          {/* photo area — warm sepia */}
          <rect x="1340" y="235" width="90" height="100" fill="#d4b896" opacity="0.6"/>
          {/* Arabic name — مبشرة — centered, large */}
          <text x="1385" y="292" textAnchor="middle" fill="#2a1508" fontSize="22" fontFamily="Amiri" fontWeight="700" opacity="0.85">مبشرة</text>
          {/* small date below */}
          <text x="1385" y="320" textAnchor="middle" fill="#6b4a2a" fontSize="6.5" fontFamily="JetBrains Mono" opacity="0.6">1957 — 2023</text>
          {/* frame shadow line */}
          <rect x="1333" y="228" width="104" height="134" rx="3" fill="none" stroke="#a07840" strokeWidth="1.5" opacity="0.5"/>
        </g>

        {/* ── MATH BOOK ── */}
        <g filter="url(#pageShadow)"
          onMouseEnter={()=>setHoveredItem('math')} onMouseLeave={()=>setHoveredItem(null)}>
          {/* open book */}
          <path d="M1530,265 Q1620,258 1710,265 L1710,385 Q1620,378 1530,385 Z" fill="#f5f0e6"/>
          {/* spine crease */}
          <line x1="1620" y1="258" x2="1620" y2="385" stroke="#d4c9b0" strokeWidth="2"/>
          {/* left page — equations */}
          {["P(A|B) = P(B|A)·P(A)", "          P(B)", "E[X] = Σ xᵢ·P(xᵢ)", "σ² = E[(X-μ)²]", "f(x) = 1/σ√2π · e^..."].map((eq,i)=>(
            <text key={i} x={1545} y={285+i*18} fill="#2a1f0e" fontSize="7.5" fontFamily="JetBrains Mono" opacity="0.55">{eq}</text>
          ))}
          {/* right page — handwritten notes */}
          {["→ relates to model", "   uncertainty!", "connect w/ KL div?", "see Ch.7", "★ important"].map((note,i)=>(
            <text key={i} x={1635} y={285+i*18} fill="#c8822a" fontSize="7" fontFamily="JetBrains Mono" opacity="0.65" fontStyle="italic">{note}</text>
          ))}
          {/* page lines */}
          {[0,1,2,3,4,5,6].map(i=>(
            <line key={i} x1="1532" y1={282+i*16} x2="1618" y2={280+i*16} stroke="#d4c9b0" strokeWidth="0.5" opacity="0.4"/>
          ))}
          {[0,1,2,3,4,5,6].map(i=>(
            <line key={i} x1="1625" y1={282+i*16} x2="1708" y2={280+i*16} stroke="#d4c9b0" strokeWidth="0.5" opacity="0.4"/>
          ))}
        </g>

        {/* ── ARABIC POETRY BOOK ── */}
        <g filter="url(#softShadow)"
          onMouseEnter={()=>setHoveredItem('arabic')} onMouseLeave={()=>setHoveredItem(null)}>
          {/* open book */}
          <path d="M1790,248 Q1880,240 1970,248 L1970,390 Q1880,382 1790,390 Z" fill="#f0ebe0"/>
          <line x1="1880" y1="240" x2="1880" y2="390" stroke="#c9b99a" strokeWidth="2.5"/>
          {/* right-to-left Arabic text on right page */}
          {[
            "وَما نَيلُ المَطالِبِ بِالتَّمَنّي",
            "وَلكِن تُؤخَذُ الدُّنيا غِلابا",
            "وَما استَعصى عَلى قَومٍ مَنالُهُ",
            "إِذا الإِقدامُ كانَ لَهُم رِكابا",
            "يَقولُ الجاهِلونَ لِما جَهِلناهُ",
          ].map((line,i)=>(
            <text key={i} x={1960} y={268+i*22} textAnchor="end" fill="#2a1f0e" fontSize="9.5" fontFamily="Amiri" opacity="0.7" direction="rtl">{line}</text>
          ))}
          {/* left page — title */}
          <text x="1835" y="275" textAnchor="middle" fill="#6b4a2a" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="1" opacity="0.5">AL-MUTANABBI</text>
          <line x1="1800" y1="280" x2="1870" y2="280" stroke="#c9b99a" strokeWidth="0.5" opacity="0.5"/>
          {[0,1,2,3,4,5].map(i=>(
            <line key={i} x1="1795" y1={290+i*16} x2="1875" y2={290+i*16} stroke="#d4c9b0" strokeWidth="0.5" opacity="0.3"/>
          ))}
          {/* cover partially visible */}
          <rect x="1786" y="245" width="12" height="148" rx="2" fill="#8b3a1a"/>
        </g>

        {/* ambient light pools */}
        <ellipse cx="200" cy="200" rx="120" ry="80" fill="#c8822a" opacity="0.08"/>
        <ellipse cx="1380" cy="230" rx="100" ry="70" fill="#c8822a" opacity="0.06"/>
        <ellipse cx="900" cy="260" rx="90" ry="60" fill="#c8822a" opacity="0.05"/>

        {/* hover labels */}
        {hoveredItem && (() => {
          const item = items.find(it => it.id === hoveredItem);
          if (!item) return null;
          return (
            <g>
              <rect x={item.x + item.w/2 - 60} y={item.y - 52} width="120" height="40" rx="5" fill="rgba(0,0,0,0.8)"/>
              <text x={item.x + item.w/2} y={item.y - 34} textAnchor="middle" fill="#f5f0e8" fontSize="10" fontFamily="Space Grotesk" fontWeight="600">{item.label}</text>
              {item.sublabel && <text x={item.x + item.w/2} y={item.y - 20} textAnchor="middle" fill="rgba(245,240,232,0.5)" fontSize="7.5" fontFamily="JetBrains Mono" letterSpacing="1">{item.sublabel}</text>}
              <polygon points={`${item.x+item.w/2-5},${item.y-14} ${item.x+item.w/2+5},${item.y-14} ${item.x+item.w/2},${item.y-8}`} fill="rgba(0,0,0,0.8)"/>
            </g>
          );
        })()}
      </svg>
    </div>
  );
};

const th2 = x => (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
const BW2 = 520, BH2 = 60;
const bx2 = x => 16 + ((x + 2.8) / 5.6) * (BW2 - 32);
const by2 = y => 20 + ((1 - y) / 2) * (BH2 - 40);
const BAR_CURVE2 = (() => {
  const pts = [];
  for (let x = -2.8; x <= 2.81; x += 0.04)
    pts.push(`${bx2(x).toFixed(1)},${by2(th2(x)).toFixed(1)}`);
  return `M ${pts.join(' L ')}`;
})();

const ILLOS = {
  laptop: (
    <svg viewBox="0 0 200 160" style={{ width:'100%', height:'100%' }}>
      <g stroke="currentColor" fill="none" opacity="0.75" strokeLinecap="round" strokeLinejoin="round">
        {/* screen */}
        <rect x="58" y="44" width="84" height="60" rx="2" strokeWidth="1.4"/>
        {/* code lines on screen */}
        <line x1="68" y1="58" x2="104" y2="58" strokeWidth="1" opacity="0.55"/>
        <line x1="68" y1="66" x2="116" y2="66" strokeWidth="1" opacity="0.35"/>
        <line x1="68" y1="74" x2="98"  y2="74" strokeWidth="1" opacity="0.45"/>
        <line x1="68" y1="82" x2="112" y2="82" strokeWidth="1" opacity="0.3"/>
        <line x1="68" y1="90" x2="94"  y2="90" strokeWidth="1" opacity="0.4"/>
        {/* cursor */}
        <rect x="68" y="95" width="5" height="1.5" strokeWidth="0" fill="currentColor" opacity="0.5"/>
        {/* base — drawn separately so no overlap with screen */}
        <path d="M58,104 L48,120 L152,120 L142,104 Z" strokeWidth="1.4"/>
        {/* trackpad */}
        <rect x="88" y="110" width="24" height="6" rx="1" strokeWidth="0.8" opacity="0.4"/>
      </g>
    </svg>
  ),
  arch: (
    <svg viewBox="0 0 200 160" style={{ width:'100%', height:'100%' }}>
      <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 50,148 L 50,82 Q 50,28 100,28 Q 150,28 150,82 L 150,148"/>
        <line x1="28" y1="148" x2="172" y2="148"/>
        <path d="M 72,148 L 72,92 Q 72,54 100,54 Q 128,54 128,92 L 128,148" opacity="0.45"/>
        <rect x="42" y="142" width="14" height="6" opacity="0.35"/>
        <rect x="144" y="142" width="14" height="6" opacity="0.35"/>
        <line x1="100" y1="28" x2="12" y2="8" strokeDasharray="3 4" opacity="0.18"/>
        <line x1="100" y1="28" x2="188" y2="8" strokeDasharray="3 4" opacity="0.18"/>
      </g>
    </svg>
  ),
  network: (
    <svg viewBox="0 0 200 160" style={{ width:'100%', height:'100%' }}>
      <g stroke="currentColor" fill="none" strokeLinecap="round">
        {/* edges — drawn first so nodes sit cleanly on top */}
        <line x1="100" y1="80" x2="100" y2="28" strokeWidth="0.8" opacity="0.3"/>
        <line x1="100" y1="80" x2="52"  y2="50" strokeWidth="0.8" opacity="0.3"/>
        <line x1="100" y1="80" x2="148" y2="50" strokeWidth="0.8" opacity="0.3"/>
        <line x1="100" y1="80" x2="52"  y2="110" strokeWidth="0.8" opacity="0.3"/>
        <line x1="100" y1="80" x2="148" y2="110" strokeWidth="0.8" opacity="0.3"/>
        <line x1="100" y1="80" x2="100" y2="132" strokeWidth="0.8" opacity="0.3"/>
        {/* outer ring connections */}
        <line x1="100" y1="28" x2="52"  y2="50"  strokeWidth="0.6" opacity="0.18"/>
        <line x1="100" y1="28" x2="148" y2="50"  strokeWidth="0.6" opacity="0.18"/>
        <line x1="52"  y1="50" x2="52"  y2="110" strokeWidth="0.6" opacity="0.18"/>
        <line x1="148" y1="50" x2="148" y2="110" strokeWidth="0.6" opacity="0.18"/>
        <line x1="52"  y1="110" x2="100" y2="132" strokeWidth="0.6" opacity="0.18"/>
        <line x1="148" y1="110" x2="100" y2="132" strokeWidth="0.6" opacity="0.18"/>
        {/* outer nodes */}
        {[[100,28],[52,50],[148,50],[52,110],[148,110],[100,132]].map(([cx,cy],i)=>(
          <circle key={i} cx={cx} cy={cy} r="5" strokeWidth="1.2" opacity="0.55" fill="currentColor" fillOpacity="0.08"/>
        ))}
        {/* center node */}
        <circle cx="100" cy="80" r="10" strokeWidth="1.4" opacity="0.8" fill="currentColor" fillOpacity="0.06"/>
        <circle cx="100" cy="80" r="3.5" fill="currentColor" stroke="none" opacity="0.6"/>
      </g>
    </svg>
  ),
  flower: (
    <svg viewBox="0 0 200 160" style={{ width:'100%', height:'100%' }}>
      <g stroke="currentColor" fill="none" opacity="0.75" strokeLinecap="round" strokeLinejoin="round">
        {/* stem */}
        <path d="M100,148 Q97,126 100,96" strokeWidth="1.2"/>
        {/* leaves */}
        <path d="M100,130 Q84,120 80,108 Q94,110 100,130Z" strokeWidth="1" opacity="0.45"/>
        <path d="M100,118 Q116,108 120,96 Q106,98 100,118Z" strokeWidth="1" opacity="0.38"/>
        {/* 5 petals — each offset from center and rotated around its own axis */}
        {[0,72,144,216,288].map((deg, i) => {
          const r = deg * Math.PI / 180;
          const px = +(100 + 20 * Math.sin(r)).toFixed(1);
          const py = +(78  - 20 * Math.cos(r)).toFixed(1);
          return <ellipse key={i} cx={px} cy={py} rx="9" ry="15"
            transform={`rotate(${deg},${px},${py})`}
            strokeWidth="1.1" fill="currentColor" fillOpacity="0.05" opacity="0.7"/>;
        })}
        {/* center */}
        <circle cx="100" cy="78" r="7" strokeWidth="1.3" opacity="0.9" fill="currentColor" fillOpacity="0.1"/>
        <circle cx="100" cy="78" r="2.5" fill="currentColor" stroke="none" opacity="0.5"/>
      </g>
    </svg>
  ),
  tanh_graph: (
    <svg viewBox="0 0 200 160" style={{width:'100%',height:'100%'}}>
      <g opacity="0.85">
        <line x1={20} y1={80} x2={184} y2={80} stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
        <line x1={100} y1={8} x2={100} y2={152} stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
        {(()=>{
          const pts=[];
          for(let x=-3;x<=3.01;x+=0.06){ const sx=100+x*26.7; const sy=80-(th2(x)*60); pts.push(`${sx.toFixed(1)},${sy.toFixed(1)}`); }
          return <path d={`M ${pts.join(' L ')}`} fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round"/>;
        })()}
        <circle cx={100} cy={80} r="3" fill="#c0392b" opacity="0.9"/>
        <line x1={24} y1={20} x2={176} y2={20} stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.2"/>
        <line x1={24} y1={140} x2={176} y2={140} stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.2"/>
      </g>
    </svg>
  ),
};

const CHAPTERS2 = [
  {
    id:"early-life", label:"New York City", cx:-1.47, illo:"laptop",
    heading:"A Math Kid",
    teaser:"I used to stay up late doing math problems and coding Tumblr themes. Those were my favorite pastimes. Looking back, they were both the same impulse — find a system, understand it, then make it yours. That instinct never really left.",
    cells:[{t:"photo",s:"#202020",n:3},{t:"photo",s:"#1d1d1b",n:4},{t:"card"}],
  },
  {
    id:"education", label:"Education", cx:-0.5, illo:"arch",
    heading:"Education",
    teaser:"Architecture school taught me to think across disciplines — physics, math, form, all in conversation. When transformers dropped mid-degree, it felt like a natural extension: AI as the new integrative layer. Berkeley allowed me to get rigorous about the ML side of things, and fellowships in Europe allowed me to really build at the intersection of spatial design and technology.",
    cells:[{t:"card"},{t:"photo",s:"#1c1c1a",n:5},{t:"photo",s:"#222220",n:6,ext:"gif"}],
  },
  {
    id:"work", label:"Work", cx:0.3, illo:"network",
    heading:"Work",
    teaser:"I've spent time at the Bond Center, CUNY, Flad, Google, and JPMorgan Chase — always at the intersection of ML, data, and design. Interdisciplinary AI teams working on problems that don't fit neatly into one discipline. I'm drawn to the hard ones: interpretability, trust, what it means to design for systems people can't fully see.",
    cells:[{t:"photo",s:"#1f1f1e",n:7,ext:"gif"},{t:"card"},{t:"photo",s:"#1b1b19",n:8}],
  },
  {
    id:"loss", label:"Loss", cx:0.9, illo:null,
    heading:"Loss",
    teaser:"A sudden cancer diagnosis and ultimately losing my mom shattered my entire world. I took some time off to heal.",
    cells:[],
  },
  {
    id:"now", label:"Now", cx:1.47, illo:"flower",
    heading:"Now",
    teaser:"I've fully leaned into what I do best — crafting intuitive ML systems for technical and non-technical people alike. Turning model weights into usable interfaces. My mother's intelligence, ambition, and kindness continue to inspire my work.",
    cells:[],
  },
];

const aboutGridCSS = t => `
.tanha-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
}
.tanha-card {
  aspect-ratio: 3/4;
  border-radius: 18px;
  overflow: hidden;
}
.tanha-photo {
  aspect-ratio: 3/4;
  border-radius: 18px;
  overflow: hidden;
}
.tanha-illo {
  display: flex;
}
@media (max-width: 640px) {
  .tanha-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .tanha-illo {
    display: none;
  }
}
`;

const AboutTopBar = ({ activeCh, navHidden, t }) => {
  const val = th2(activeCh?.cx ?? -2.5);
  const ax = bx2(activeCh?.cx ?? -2.5);
  const ay = by2(th2(activeCh?.cx ?? -2.5));
  return (
    <div style={{ position:'sticky', top: navHidden ? 0 : 60, zIndex:50, background:t.bg, borderBottom:`1px solid ${t.rule}`, display:'flex', alignItems:'center', height:60, padding:'0 20px', gap:16, transition:'top .35s cubic-bezier(.4,0,.2,1)' }}>
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', minWidth:0 }}>
        <svg viewBox={`0 0 ${BW2} ${BH2}`} style={{ width:'100%', maxWidth:520, height:BH2 }}>
          <path d={BAR_CURVE2} fill="none" stroke={t.fg} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
          <circle cx={ax} cy={ay} r={5} fill={t.accent}
            style={{transition:'cx 0.5s cubic-bezier(.4,0,.2,1), cy 0.5s cubic-bezier(.4,0,.2,1)'}}/>
        </svg>
      </div>
      <div style={{ flexShrink:0, textAlign:'right' }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:15, fontWeight:500, color:t.fg, lineHeight:1, transition:'all 0.3s' }}>{val.toFixed(3)}</div>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, color:t.fgMuted, marginTop:3, letterSpacing:0.5 }}>toward 1.000</div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────
   PHOTO CELL — image with on-error fallback icon
────────────────────────────────────────────────── */
const PhotoCell = ({ src, bg, t }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div className="tanha-photo" style={{ background:bg, aspectRatio:"3/4", overflow:"hidden", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      {!failed ? (
        <img src={src} alt="" onError={() => setFailed(true)}
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block", filter:"grayscale(100%)" }} />
      ) : (
        <svg style={{ opacity:.2, pointerEvents:"none" }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={t.fg} strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
        </svg>
      )}
    </div>
  );
};

const AboutGridCell = ({ cell, ch, cardRef, t, mob }) => {
  if (cell.t === "fill") {
    return <div className="tanha-fill" />;
  }
  if (cell.t === "card") {
    return (
      <div className="tanha-card" ref={cardRef} data-id={ch.id} style={{
        background:t.frameBg, display:"flex", flexDirection:"column",
        padding:"clamp(10px,1.6vw,22px)", overflow:"hidden", border:`1px solid ${t.rule}`,
        aspectRatio: "3/4",
      }}>
        <div style={{ display:"inline-block", background:t.fg, padding:"2px 7px", marginBottom:"clamp(6px,1vw,14px)", flexShrink:0, alignSelf:"flex-start" }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(8px,0.85vw,11px)", fontWeight:600, color:t.bg, letterSpacing:1.5 }}>
            {ch.heading.toUpperCase()}
          </span>
        </div>
        <p style={{ fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Inter,sans-serif", fontSize:"clamp(11px,1.25vw,17px)", fontWeight:400, color:t.fg, lineHeight:1.55, overflow:"hidden", flex:ch.illo ? 1 : undefined }}>
          {ch.teaser}
        </p>
        {ch.illo && (
          <div className="tanha-illo" style={{ flexShrink:0, alignItems:"flex-end", justifyContent:"center", flex:"0 0 40%", paddingTop:8, color:t.fgMuted }}>
            <div style={{ width:"80%", height:"100%" }}>{ILLOS[ch.illo]}</div>
          </div>
        )}
      </div>
    );
  }
  const pad = String(cell.n).padStart(2, "0");
  const ext = cell.ext || "jpg";
  return <PhotoCell src={`/images/pic${pad}.${ext}`} bg={cell.s} t={t} />;
};

const AboutPage = ({ t, mob, navHidden }) => {
  const [activeCh, setActiveCh] = useState(CHAPTERS2[0]);
  const cardRefs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const ch = CHAPTERS2.find(c => c.id === e.target.dataset.id);
          if (ch) setActiveCh(ch);
        }
      });
    }, { threshold: 0.2 });
    Object.values(cardRefs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ paddingTop:60, position:"relative", zIndex:1, background:t.bg, minHeight:"100vh" }}>
      <style>{aboutGridCSS(t)}</style>
      <AboutTopBar activeCh={activeCh} navHidden={navHidden} t={t} />

      <div className="tanha-grid">

        {/* photo01 — left of def card */}
        <PhotoCell src="/images/pic01.jpg" bg="#1c1c1a" t={t} />

        {/* definition card */}
        <div className="tanha-card" style={{ background:t.frameBg, display:"flex", flexDirection:"column", padding:"clamp(12px,2vw,22px)", overflow:"hidden", border:`1px solid ${t.rule}` }}>
          <div style={{ display:"inline-block", background:t.fg, padding:"3px 9px", marginBottom:6, alignSelf:"flex-start", flexShrink:0 }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(9px,1vw,12px)", fontWeight:600, color:t.bg, letterSpacing:1.5 }}>TANHA</span>
          </div>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(8px,0.85vw,10px)", color:t.fgMuted, letterSpacing:0.5, marginBottom:"clamp(10px,1.4vw,16px)" }}>
            /taan·haa/
          </p>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:"clamp(6px,0.9vw,10px)", overflow:"hidden" }}>
            <div>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(7px,0.75vw,9px)", color:t.fgMuted, letterSpacing:1.5, marginBottom:3 }}>ARABIC · V.</p>
              <p style={{ fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Inter,sans-serif", fontStyle:"italic", fontSize:"clamp(12px,1.2vw,14px)", color:t.fg, lineHeight:1.5 }}>To carve or etch.</p>
              <p style={{ fontFamily:"'Amiri',serif", fontSize:"clamp(16px,1.8vw,22px)", color:t.fgMuted, marginTop:4, direction:"rtl", textAlign:"left" }}>تنحى</p>
            </div>
            <div style={{ height:1, background:t.rule, flexShrink:0 }}/>
            <div>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(7px,0.75vw,9px)", color:t.fgMuted, letterSpacing:1.5, marginBottom:3 }}>MATHEMATICS · F.</p>
              <p style={{ fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Inter,sans-serif", fontStyle:"italic", fontSize:"clamp(12px,1.2vw,14px)", color:t.fg, lineHeight:1.5 }}>The hyperbolic tangent. Maps any input to (−1,&nbsp;1). Smooth, bounded, always converging.</p>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(8px,0.85vw,10px)", color:t.fgMuted, marginTop:4 }}>tanh(x) = eˣ−e⁻ˣ / eˣ+e⁻ˣ</p>
            </div>
          </div>
        </div>

        {/* photo02 — right of def card */}
        <PhotoCell src="/images/pic02.jpg" bg="#1e1e1c" t={t} />

        {/* chapters 1–3 */}
        {CHAPTERS2.slice(0, 3).map(ch => (
          <Fragment key={ch.id}>
            {ch.cells.map((cell, i) => (
              <AboutGridCell
                key={i} cell={cell} ch={ch} t={t} mob={mob}
                cardRef={cell.t === "card" ? el => { cardRefs.current[ch.id] = el; } : undefined}
              />
            ))}
          </Fragment>
        ))}

        {(() => {
          const lossCh = CHAPTERS2[3];
          const nowCh  = CHAPTERS2[4];
          const P = (n, s, ch, ext) => (
            <AboutGridCell key={n} cell={{ t:"photo", s, n, ...(ext ? { ext } : {}) }} ch={ch} t={t} mob={mob} />
          );
          return (
            <Fragment>
              <AboutGridCell cell={{ t:"card" }} ch={lossCh} t={t} mob={mob} cardRef={el => { cardRefs.current["loss"] = el; }} />
              {P(9,  "#141412", lossCh)}
              {P(10, "#161614", lossCh)}
              {P(11, "#141412", lossCh)}
              {P(12, "#161614", lossCh)}
              <AboutGridCell cell={{ t:"card" }} ch={nowCh} t={t} mob={mob} cardRef={el => { cardRefs.current["now"] = el; }} />
              {P(13, "#1a1a18", nowCh)}
              {P(14, "#1e1e1c", nowCh)}
              {P(15, "#1e1e1c", nowCh)}
            </Fragment>
          );
        })()}

      </div>

      <div style={{ padding:"32px 24px 48px", display:"flex", justifyContent:"center", gap:22 }}>
        {[
          { href:"mailto:tanharchitecture@gmail.com", label:"Email", icon:(
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>
          )},
          { href:"https://linkedin.com/in/tanhata", label:"LinkedIn", ext:true, icon:(
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          )},
        ].map(l=>(
          <a key={l.label} href={l.href} target={l.ext?"_blank":undefined} rel={l.ext?"noopener noreferrer":undefined}
            aria-label={l.label}
            style={{ display:"flex", alignItems:"center", color:t.fgMuted, textDecoration:"none", transition:"color .2s", opacity:.7 }}
            onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.opacity = "1"; }}
            onMouseLeave={e => { e.currentTarget.style.color = t.fgMuted; e.currentTarget.style.opacity = ".7"; }}
          >{l.icon}</a>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   VISUAL PAGE
══════════════════════════════════════════════════ */
const WRITINGS = [
    {
    title: "Legibility: Interactions in AI interfaces ",
    date: "Apr 2026",
    desc: "As software moves from deterministic execution to probabilistic processes, motion becomes the primary mechanism for making work visible.",
    url: "https://tanhata.github.io/legibility-interaction/",
    tag: "writing",
  },
  {
    title: "Interface vs Inference ",
    date: "Apr 2026",
    desc: "When your design system becomes a model input",
    url: "https://open.substack.com/pub/talshe/p/interface-vs-inference?r=2iqmd4&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
    tag: "thoughts",
  },
  {
    title: "Clear Expression",
    date: "Feb 2026",
    desc: "I encoded reading instructions into AI typography.",
    url: "https://tanhata.github.io/clear-expression/",
    tag: "exploration",
  },
  {
    title: "From \"Hand Me That Thing\" to Trust: Why Intention Grounding Changes Everything",
    date: "Aug 2025",
    desc: "Reflections on Visual Intention Grounding for Egocentric Assistants (ICCV 2025) — and what it means for designing trustworthy AI interfaces.",
    url: "https://talshe.substack.com/p/from-hand-me-that-thing-to-trust",
    tag: "thoughts",
  },
  {
    title: "Thermodynamic Considerations in Heating Load Analysis Using Machine Learning",
    date: "Feb 2022",
    desc: "Random Forest, entropy generation, and CFD simulation for building energy optimization. R² = 0.997.",
    url: "https://drive.google.com/file/d/1FHQsm3s1dJWWMKKBy-QRjClEO3rS2OZ8/view",
    tag: "paper",
  },
  {
    title: "Leveraging Air Rights for Reparative Development in Harlem",
    date: "May 2021",
    desc: "A policy proposal combining parametric design and community finance to unlock 70M sq ft of unused air rights for affordable housing.",
    url: "https://drive.google.com/file/d/1tAwTFKHjWch9u-SEe0oKMHvTClIR3FT8/view",
    tag: "paper",
  },
];

const WritingPage = ({ t, mob }) => (
  <div style={{ paddingTop:80, position:"relative", zIndex:1, minHeight:"100vh" }}>
    <div style={{ padding: mob ? "6vh 16px 12vh" : "10vh clamp(32px, 4vw, 72px) 16vh" }}>

      {/* grid of rounded cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
        gap: 1,
      }}>
        {WRITINGS.map((w, i) => (
          <Reveal key={i} delay={i * 60}>
            <a href={w.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(14px, 1.4vw, 20px)",
                height: "100%",
                background: t.frameBg,
                border: `1px solid ${t.rule}`,
                borderRadius: 18,
                padding: "clamp(24px, 2.6vw, 38px)",
                textDecoration: "none",
                cursor: "none",
                transition: "background .2s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = ".75"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              {/* tag + date */}
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{
                  fontSize: 9, fontFamily: "'JetBrains Mono',monospace",
                  color: t.accent, letterSpacing: 2,
                }}>{w.tag.toUpperCase()}</span>
                <span style={{
                  fontSize: 9, fontFamily: "'JetBrains Mono',monospace",
                  color: t.fgMuted, opacity: .5, letterSpacing: 1,
                }}>{w.date.toUpperCase()}</span>
              </div>

              {/* title */}
              <h2 style={{
                fontSize: mob ? 18 : 22,
                fontFamily: "-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Inter,sans-serif",
                fontWeight: 600,
                color: t.fg,
                lineHeight: 1.2,
                letterSpacing: "-.02em",
                margin: 0,
              }}>{w.title.trim()}</h2>

              {/* desc */}
              <p style={{
                fontSize: mob ? 13 : 14,
                color: t.fgMuted,
                lineHeight: 1.65,
                margin: 0,
                flex: 1,
              }}>{w.desc}</p>

              {/* arrow at bottom */}
              <span style={{
                fontSize: 16, color: t.fgMuted, opacity: .35,
                alignSelf: "flex-end",
              }}>↗</span>
            </a>
          </Reveal>
        ))}
      </div>

      {/* substack cta */}
      <Reveal delay={200}>
        <div style={{ marginTop: 44, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: t.fgMuted, fontFamily: "-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Inter,sans-serif" }}>More on Substack</span>
          <a href="https://talshe.substack.com" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 9, fontFamily: "'JetBrains Mono',monospace", color: t.accent, letterSpacing: 2, textDecoration: "none", cursor: "none" }}
            onMouseEnter={e=>e.target.style.opacity=".6"}
            onMouseLeave={e=>e.target.style.opacity="1"}>
            FOLLOW →
          </a>
        </div>
      </Reveal>

    </div>
  </div>
);

const VisualItem = ({ v, mob, t, i }) => {
  const [ok, setOk] = useState(true);
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal key={v.id} delay={i * 55}>
      <div
        style={{ breakInside:"avoid", marginBottom: mob?12:20, position:"relative", cursor:"none",
          transform: hovered ? "scale(1.02)" : "scale(1)",
          transition:"transform .5s cubic-bezier(.4,0,.2,1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ borderRadius:6, overflow:"hidden", background:t.frameBg, aspectRatio: v.ratio || "3/4", position:"relative",
          boxShadow: hovered ? `0 12px 40px rgba(0,0,0,.18)` : "none",
          transition:"box-shadow .5s cubic-bezier(.4,0,.2,1)",
        }}>
          {ok
            ? <img src={v.img} alt={v.title}
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
                  transform: hovered ? "scale(1.03)" : "scale(1)",
                  transition:"transform .55s cubic-bezier(.4,0,.2,1)",
                }}
                onError={() => setOk(false)}
              />
            : <div style={{ width:"100%", height:"100%", background:`linear-gradient(145deg,${t.fg}08,${t.fg}03)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:8, fontFamily:"'JetBrains Mono',monospace", color:t.fgMuted, letterSpacing:1.5 }}>{v.title}</span>
              </div>
          }
        </div>
        <div style={{ padding:"6px 2px 0", display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
          <span style={{ fontSize: mob?9:10, fontWeight:500, color:t.fg, letterSpacing:"-.01em", lineHeight:1.3 }}>{v.title}</span>
          <span style={{ fontSize: mob?7:7.5, color:t.fgMuted, fontFamily:"'JetBrains Mono',monospace", letterSpacing:.5, flexShrink:0, marginLeft:8 }}>{v.type}</span>
        </div>
      </div>
    </Reveal>
  );
};

const VisualPage = ({ t, mob }) => {
  return (
    <div style={{ paddingTop:80, position:"relative", zIndex:1, minHeight:"100vh" }}>
      <div style={{ padding: mob?"16px 16px":"24px 44px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ columns: mob?2:3, columnGap: mob?12:20, columnFill:"balance" }}>
          {VISUALS.map((v, i) => (
            <VisualItem key={v.id} v={v} mob={mob} t={t} i={i} />
          ))}
        </div>
      </div>

      {/* commission strip */}
      <Reveal>
        <div style={{ margin: mob?"4vh 16px 6vh":"5vh 44px 8vh", maxWidth:1100, marginLeft:"auto", marginRight:"auto", padding:"24px 28px", border:`1px solid ${t.rule}`, borderRadius:8, display:"flex", flexDirection: mob?"column":"row", alignItems: mob?"flex-start":"center", justifyContent:"space-between", gap:16 }}>
          <div>
            <div style={{ fontSize: mob?18:22, fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Inter,sans-serif", fontWeight:600, color:t.fg, marginBottom:5, letterSpacing:"-.02em" }}>Want something made?</div>
            <div style={{ fontSize:11, color:t.fgMuted, lineHeight:1.5 }}>I take on illustration, branding, event stationery, and album art commissions. Let's talk.</div>
          </div>
          <a href="mailto:tanharchitecture@gmail.com" style={{ textDecoration:"none", flexShrink:0 }}>
            <div style={{ padding:"10px 22px", background:t.accent, borderRadius:5, fontSize:10, fontWeight:600, color:"#fff", fontFamily:"'JetBrains Mono',monospace", letterSpacing:1.5, whiteSpace:"nowrap" }}
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
  const [dark,          setDark]          = useState(true);
  const [cursorHovered, setCursorHovered] = useState(null);
  const [bgAccent,      setBgAccent]      = useState(null);
  const [navHidden,     setNavHidden]     = useState(false);
  const mob = useMobile();
  const t   = dark ? THEMES.dark : THEMES.light;
  const go  = useCallback(p => { setPage(p); setBgAccent(null); setNavHidden(false); setTimeout(() => window.scrollTo({ top:0, behavior:"instant" }), 0); }, []);

  useEffect(() => {
    if (page !== "about") { setNavHidden(false); return; }
    const onScroll = () => setNavHidden(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.cursor = "none";
    return () => { document.body.style.cursor = "auto"; };
  }, [t.bg]);

  // colored per-project backgrounds removed — clean canvas on all pages
  const bgStyle = {};

  return (
    <div style={{ minHeight:"100vh", background:t.bg, color:t.fg, fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text',Inter,'Helvetica Neue',sans-serif", transition:"background .8s ease, color .4s", ...bgStyle }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Amiri:ital,wght@0,400;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap');
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
        button{cursor:none!important;}
        *{cursor:none!important;}
        a:hover,a:focus,button:hover,button:focus,[role="button"]{cursor:none!important;}
        .char-reveal span{display:inline-block;animation:charReveal .5s cubic-bezier(.4,0,.2,1) both;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:${t.accent}28;border-radius:99px;}
      `}</style>

      <CustomCursor hovered={cursorHovered} t={t} />
      <Nav page={page} go={go} dark={dark} setDark={setDark} t={t} mob={mob} navHidden={navHidden} />

      {page==="home"   && <HomePage   t={t} mob={mob} setCursorHovered={setCursorHovered} go={go} onAccentChange={setBgAccent} />}
      {page==="work"   && <WorkPage   t={t} mob={mob} setCursorHovered={setCursorHovered} />}
      {page==="about"  && <AboutPage  t={t} mob={mob} navHidden={navHidden} />}
      {page==="writing" && <WritingPage t={t} mob={mob} />}
    </div>
  );
}