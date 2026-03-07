import React, { useState, useEffect, useRef } from "react";

const SCENES = [
  {
    label: "Scanning",
    caption: "Just click a photo — AI reads every detail in under 2 seconds.",
    render: () => (
      <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
        <div className="w-24 h-40 rounded-2xl bg-[#1a1a1e] border-2 border-black/15 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-1.5 rounded-xl overflow-hidden bg-[#0f0f12]">
            <div className="mx-2 mt-6 rounded-md bg-amber-500/[0.08] border border-amber-500/25 p-2 flex flex-col gap-1">
              {[{ w: "70%" }, { w: "55%" }, { w: "62%" }].map((l, i) => (
                <div key={i} className="h-1 rounded-full bg-amber-400 opacity-30" style={{ width: l.w }} />
              ))}
            </div>
            <div className="absolute left-1.5 right-1.5 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent" style={{ animation: "laserAnim 1.6s ease-in-out infinite", boxShadow: "0 0 8px #00e87a" }} />
            {["absolute top-4 left-1.5 border-t-2 border-l-2 border-amber-400 w-2.5 h-2.5", "absolute top-4 right-1.5 border-t-2 border-r-2 border-amber-400 w-2.5 h-2.5", "absolute bottom-7 left-1.5 border-b-2 border-l-2 border-amber-400 w-2.5 h-2.5", "absolute bottom-7 right-1.5 border-b-2 border-r-2 border-amber-400 w-2.5 h-2.5"].map((cls, i) => <div key={i} className={cls} />)}
            <div className="absolute bottom-2 left-0 right-0 text-center text-[7px] font-bold tracking-widest uppercase text-green-400" style={{ animation: "blinkAnim 1s infinite" }}>● Scanning…</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: "pulseAnim 1.5s infinite" }} />
          <span className="text-[10px] text-gray-500 font-semibold">AI Processing…</span>
        </div>
      </div>
    ),
  },
  {
    label: "Extracted",
    caption: "Name, phone, email, company, address — all pulled out perfectly.",
    render: () => (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 w-full relative">
        <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[8px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-full">✦ AI Extracted</div>
        {[
          { icon: "👤", label: "Name", value: "Rajesh Kumar", bg: "bg-amber-500/10" },
          { icon: "🏢", label: "Company", value: "TechCorp Pvt. Ltd.", bg: "bg-blue-400/10" },
          { icon: "📱", label: "Phone", value: "+91 98765 43210", bg: "bg-green-400/10" },
          { icon: "✉️", label: "Email", value: "rajesh@techcorp.in", bg: "bg-red-400/10" },
          { icon: "🌐", label: "Website", value: "www.techcorp.in", bg: "bg-purple-400/10" },
        ].map((r, i) => (
          <div key={i} className={`flex items-center gap-2 py-1.5 ${i < 4 ? "border-b border-gray-100" : ""}`} style={{ animation: "slideInAnim 0.4s ease both", animationDelay: `${i * 0.07}s` }}>
            <div className={`w-6 h-6 rounded-md ${r.bg} flex items-center justify-center text-[11px] shrink-0`}>{r.icon}</div>
            <div>
              <div className="text-[8px] text-gray-400 uppercase tracking-wide">{r.label}</div>
              <div className="text-[11px] font-semibold text-gray-900">{r.value}</div>
            </div>
          </div>
        ))}
        <div className="inline-flex items-center gap-1 mt-2 bg-green-500/[0.08] border border-green-500/20 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-green-700">✓ 99.9% Accuracy</div>
      </div>
    ),
  },
  {
    label: "Actions",
    caption: "WhatsApp, Email, Save VCF, Excel export — all in one tap.",
    render: () => (
      <div className="flex flex-col gap-2 w-full">
        <div className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Choose what to do next</div>
        <div className="grid grid-cols-3 gap-1.5 w-full">
          {[
            { icon: "💬", name: "WhatsApp", bg: "bg-green-400/10", border: "border-green-400/20" },
            { icon: "📋", name: "Copy", bg: "bg-amber-400/10", border: "border-amber-400/20" },
            { icon: "👤", name: "Save VCF", bg: "bg-purple-400/10", border: "border-purple-400/20" },
            { icon: "📧", name: "Email", bg: "bg-red-400/10", border: "border-red-400/20" },
            { icon: "📊", name: "Excel", bg: "bg-blue-400/10", border: "border-blue-400/20" },
            { icon: "🖼️", name: "Image", bg: "bg-black/[0.04]", border: "border-black/[0.08]" },
          ].map((a, i) => (
            <div key={i} className={`${a.bg} border ${a.border} rounded-xl py-3 px-1.5 flex flex-col items-center gap-1.5`} style={{ animation: "popInAnim 0.35s ease both", animationDelay: `${i * 0.07}s` }}>
              <div className="text-xl">{a.icon}</div>
              <div className="text-[9px] font-bold text-gray-900 text-center">{a.name}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const SCENE_DURATION = 4000;

function ExplainerScreen() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [fillPct, setFillPct] = useState(0);
  const timerRef = useRef(null);
  const fillRef = useRef(null);
  const startRef = useRef(null);

  const startFill = () => {
    clearInterval(fillRef.current);
    clearTimeout(timerRef.current);
    setFillPct(0);
    startRef.current = Date.now();
    fillRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      setFillPct(Math.min((elapsed / SCENE_DURATION) * 100, 100));
    }, 30);
    timerRef.current = setTimeout(() => {
      setCurrent(s => (s + 1) % SCENES.length);
    }, SCENE_DURATION);
  };

  useEffect(() => {
    if (playing) startFill();
    else { clearInterval(fillRef.current); clearTimeout(timerRef.current); }
    return () => { clearInterval(fillRef.current); clearTimeout(timerRef.current); };
  }, [current, playing]);

  return (
    <div style={{
      width: "100%", maxWidth: 300,
      background: "#fff",
      border: "1px solid #ebebeb",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", background: "#f9f9f9", borderBottom: "1px solid #ebebeb", flexShrink: 0 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ flex: 1, textAlign: "center", fontSize: 10, color: "#aaa", letterSpacing: "0.03em" }}>CardScan AI — Live Demo</div>
      </div>

      <div style={{ padding: "10px 14px 6px", flexShrink: 0 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fffbeb", border: "1px solid #fde68a", padding: "3px 10px", borderRadius: 99 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgb(247,190,57)", animation: "pulseAnim 2s infinite" }} />
          <span style={{ fontSize: 9, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Step {current + 1} of {SCENES.length} — {SCENES[current].label}
          </span>
        </div>
      </div>

      <div style={{ height: 260, minHeight: 260, maxHeight: 260, padding: "8px 14px", overflow: "hidden", display: "flex", alignItems: "flex-start", justifyHeight: "center", flexShrink: 0 }}>
        <div key={current} style={{ width: "100%", animation: "fadeIn 0.3s ease" }}>
          {SCENES[current].render()}
        </div>
      </div>

      <div style={{ height: 36, padding: "0 14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <p style={{ fontSize: 10, color: "#9ca3af", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
          {SCENES[current].caption}
        </p>
      </div>

      <div style={{ padding: "8px 14px 12px", background: "#f9f9f9", borderTop: "1px solid #ebebeb", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
          {SCENES.map((_, i) => (
            <div key={i} onClick={() => { setCurrent(i); setFillPct(0); }}
              style={{
                flex: 1, height: 3, borderRadius: 99, cursor: "pointer", overflow: "hidden", position: "relative",
                background: i < current ? "rgb(247,190,57)" : "#e5e7eb"
              }}>
              {i === current && (
                <div style={{
                  position: "absolute", inset: 0, background: "rgb(247,190,57)", transformOrigin: "left",
                  transform: `scaleX(${fillPct / 100})`, transition: "transform 0.03s linear"
                }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 9, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>{SCENES[current].label}</span>
          <button onClick={() => setPlaying(p => !p)}
            style={{
              background: "transparent", border: "1px solid #e5e7eb", color: "#6b7280",
              borderRadius: 6, padding: "2px 8px", cursor: "pointer", fontSize: 9, fontWeight: 700
            }}>
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LandingUI({ onStart }) {
  return (
    <div style={{
      height: "100vh", width: "100%",
      background: "#fff",
      display: "flex", flexDirection: "column",
      color: "#111", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        
        * { 
          box-sizing: border-box; 
          font-family: 'Poppins', sans-serif !important; 
        }

        @keyframes laserAnim   { 0%{top:18px} 50%{top:calc(100% - 28px)} 100%{top:18px} }
        @keyframes blinkAnim   { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes pulseAnim   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
        @keyframes slideInAnim { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
        @keyframes popInAnim   { from{opacity:0;transform:scale(.85)} to{opacity:1;transform:scale(1)} }
        @keyframes fadeIn      { from{opacity:0} to{opacity:1} }
        @keyframes floatAnim   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }

        .feat-card:hover {
          background:#fff !important;
          border-color:rgb(247,190,57) !important;
          transform:translateY(-2px);
          box-shadow:0 4px 16px rgba(247,190,57,0.15);
        }
        .cta-btn:hover {
          background:rgb(224,150,32) !important;
          transform:translateY(-1px);
          box-shadow:0 12px 28px -4px rgba(247,190,57,0.55) !important;
        }

        @media(min-width:1024px){
          .lp-grid {
            flex-direction: row !important;
            align-items: center !important;
            gap: 72px !important;
          }
          .lp-left  {
            flex: 0 0 auto;
            width: 340px !important;
            align-items: center !important;
          }
          .lp-right {
            flex: 1 1 0;
            align-items: flex-start !important;
            text-align: left !important;
            max-width: 520px;
          }
          .lp-right .lp-badge    { align-self: flex-start; }
          .lp-right .lp-divider  { align-self: flex-start !important; }
          .lp-right .lp-cta      { align-items: flex-start !important; }
          .lp-right .lp-feats    { max-width: 400px; }
          .lp-logo               { display: flex !important; }
        }
      `}</style>

      <main style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 24,
        paddingLeft: 40,
        paddingRight: 40,
        overflow: "hidden",
        background: "#fff",
      }}>
        <div className="lp-grid" style={{
          width: "100%", maxWidth: 1040,
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 40,
        }}>

          {/* LEFT — demo widget */}
          <div className="lp-left" style={{
            width: "100%", display: "flex",
            flexDirection: "column", alignItems: "center", gap: 10,
          }}>
            <div style={{ animation: "floatAnim 4s ease-in-out infinite", width: "100%", display: "flex", justifyContent: "center" }}>
              <ExplainerScreen />
            </div>
          </div>

          {/* RIGHT — content */}
          <div className="lp-right" style={{
            width: "100%", display: "flex",
            flexDirection: "column", alignItems: "center",
            textAlign: "center", gap: 24,
          }}>

            <div className="lp-logo" style={{ display: "none", alignItems: "center", marginBottom: 2 }}>
              <img src="/logo3.png" alt="trav platforms" style={{ height: 30, width: "auto", objectFit: "contain" }} />
            </div>

            <h1 style={{
              fontWeight: 900, color: "#111", lineHeight: 1.1,
              margin: 0, letterSpacing: "-0.02em",
              fontSize: "clamp(28px,3.4vw,52px)",
            }}>
              Scan Any{" "}
              <span style={{ color: "rgb(247,190,57)" }}>Business Card</span>
              {" "}With AI Precision
            </h1>

            <p style={{ color: "#6b7280", lineHeight: 1.8, margin: 0, fontSize: "clamp(14px,1.1vw,16px)", fontWeight: 400, maxWidth: 420 }}>
              Got a stack of business cards?{" "}
              <strong style={{ color: "#111", fontWeight: 700 }}>Scan any card in seconds</strong>
              {" "}— then WhatsApp, email, or export every contact instantly.
            </p>

            <div className="lp-cta" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%" }}>
              <button onClick={onStart} className="cta-btn" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                border: "none", cursor: "pointer",
                width: "100%", maxWidth: 260, height: 52,
                background: "rgb(247,190,57)", color: "#fff",
                fontWeight: 800, fontSize: 13, letterSpacing: "0.07em", textTransform: "uppercase",
                borderRadius: 12, boxShadow: "0 8px 24px -4px rgba(247,190,57,0.45)",
                transition: "all 0.15s",
              }}>
                Start Scanning
                <svg style={{ width: 14, height: 14, flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}