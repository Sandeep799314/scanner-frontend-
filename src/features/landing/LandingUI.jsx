import React, { useState, useEffect, useRef } from "react";

const SCENES = [
  {
    label: "Exhibition",
    caption: "You collected 50 cards at an exhibition — no time to type each one!",
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
        <div style={{ width: "100%", background: "linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%)", border: "1px solid #fef3c7", borderRadius: 16, padding: "20px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245,166,35,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎪</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 13, color: "#1a1a1a" }}>Post-Exhibition Problem</div>
              <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600 }}>Sound familiar?</div>
            </div>
          </div>
          {[
            { icon: "📇", text: "50+ business cards collected", sub: "In just one event" },
            { icon: "⌨️", text: "Manually typing each one?", sub: "Takes hours of effort" },
            { icon: "😩", text: "Risk of typos & missing data", sub: "Errors are costly" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 2 ? "1px dashed #fde68a" : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(245,166,35,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 11.5, color: "#111827" }}>{item.text}</div>
                <div style={{ fontSize: 9.5, color: "#9ca3af", fontWeight: 600 }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "10px 16px", width: "100%", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontWeight: 900, fontSize: 28, color: "#F5A623", lineHeight: 1 }}>50+</div>
            <div style={{ fontSize: 8.5, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>Cards Collected</div>
          </div>
          <div style={{ width: 1, height: 36, background: "#e5e7eb" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontWeight: 900, fontSize: 28, color: "#ef4444", lineHeight: 1 }}>3h+</div>
            <div style={{ fontSize: 8.5, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>Manual Time</div>
          </div>
          <div style={{ width: 1, height: 36, background: "#e5e7eb" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontWeight: 900, fontSize: 28, color: "#10b981", lineHeight: 1 }}>0</div>
            <div style={{ fontSize: 8.5, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>With CardScan</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "Scanning",
    caption: "Just click a photo — AI reads every detail in under 2 seconds.",
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div style={{ width: 100, height: 164, borderRadius: 16, background: "#1a1a1e", border: "2px solid rgba(0,0,0,0.15)", position: "relative", overflow: "hidden", boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}>
          <div style={{ position: "absolute", inset: 6, borderRadius: 11, overflow: "hidden", background: "#0f0f12" }}>
            <div style={{ margin: "24px 8px 0", borderRadius: 6, background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.25)", padding: "8px 10px", display: "flex", flexDirection: "column", gap: 5 }}>
              {[{ w: "70%", bg: "rgba(245,166,35,0.45)" }, { w: "55%", bg: "rgba(0,0,0,0.12)" }, { w: "62%", bg: "rgba(0,0,0,0.10)" }].map((l, i) => (
                <div key={i} style={{ height: 5, borderRadius: 3, width: l.w, background: l.bg }} />
              ))}
            </div>
            <div style={{ position: "absolute", left: 6, right: 6, height: 2, background: "linear-gradient(90deg,transparent,#00e87a,transparent)", boxShadow: "0 0 8px #00e87a", animation: "laserAnim 1.6s ease-in-out infinite" }} />
            {[{ top: 18, left: 6, borderTop: "2px solid #F5A623", borderLeft: "2px solid #F5A623" }, { top: 18, right: 6, borderTop: "2px solid #F5A623", borderRight: "2px solid #F5A623" }, { bottom: 28, left: 6, borderBottom: "2px solid #F5A623", borderLeft: "2px solid #F5A623" }, { bottom: 28, right: 6, borderBottom: "2px solid #F5A623", borderRight: "2px solid #F5A623" }].map((s, i) => (
              <div key={i} style={{ position: "absolute", width: 10, height: 10, ...s }} />
            ))}
            <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, textAlign: "center", fontSize: 7, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#00e87a", animation: "blinkAnim 1s infinite" }}>● Scanning…</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00e87a", animation: "pulseAnim 1.5s infinite" }} />
          <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600 }}>AI Processing…</span>
        </div>
      </div>
    ),
  },
  {
    label: "Extracted",
    caption: "Name, phone, email, company, address — all pulled out perfectly.",
    render: () => (
      <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: "14px 16px", width: "100%", position: "relative" }}>
        <div style={{ position: "absolute", top: -9, right: 12, background: "linear-gradient(90deg,#F5A623,#f97316)", color: "#fff", fontSize: 8, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 100 }}>✦ AI Extracted</div>
        {[
          { icon: "👤", label: "Name", value: "Rajesh Kumar", bg: "rgba(245,166,35,0.1)", delay: "0.05s" },
          { icon: "🏢", label: "Company", value: "TechCorp Pvt. Ltd.", bg: "rgba(96,165,250,0.1)", delay: "0.15s" },
          { icon: "📱", label: "Phone", value: "+91 98765 43210", bg: "rgba(74,222,128,0.1)", delay: "0.25s" },
          { icon: "✉️", label: "Email", value: "rajesh@techcorp.in", bg: "rgba(239,68,68,0.1)", delay: "0.35s" },
          { icon: "🌐", label: "Website", value: "www.techcorp.in", bg: "rgba(168,85,247,0.1)", delay: "0.45s" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: i < 4 ? "1px solid #f3f4f6" : "none", animation: "slideInAnim 0.4s ease both", animationDelay: r.delay }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>{r.icon}</div>
            <div>
              <div style={{ fontSize: 8, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em" }}>{r.label}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#111827" }}>{r.value}</div>
            </div>
          </div>
        ))}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 10, background: "rgba(0,200,100,0.08)", border: "1px solid rgba(0,200,100,0.2)", padding: "3px 10px", borderRadius: 100, fontSize: 9, fontWeight: 700, color: "#16a34a" }}>✓ 99.9% Accuracy</div>
      </div>
    ),
  },
  {
    label: "Actions",
    caption: "WhatsApp, Email, Save VCF, Excel export — all in one tap.",
    render: () => (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, width: "100%" }}>
        {[
          { icon: "💬", name: "WhatsApp", color: "rgba(37,211,102,0.1)", border: "rgba(37,211,102,0.2)" },
          { icon: "📋", name: "Copy", color: "rgba(245,166,35,0.1)", border: "rgba(245,166,35,0.2)" },
          { icon: "👤", name: "Save VCF", color: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.2)" },
          { icon: "📧", name: "Email", color: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)" },
          { icon: "📊", name: "Excel", color: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
          { icon: "🖼️", name: "Image", color: "rgba(0,0,0,0.04)", border: "rgba(0,0,0,0.08)" },
        ].map((a, i) => (
          <div key={i} style={{ background: a.color, border: `1px solid ${a.border}`, borderRadius: 10, padding: "10px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, animation: "popInAnim 0.35s ease both", animationDelay: `${i * 0.08}s` }}>
            <div style={{ fontSize: 18 }}>{a.icon}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#111827", textAlign: "center" }}>{a.name}</div>
          </div>
        ))}
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
    <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.10)", width: "100%", maxWidth: 300, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (<div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />))}
        <div style={{ flex: 1, textAlign: "center", fontSize: 10, color: "#9ca3af", letterSpacing: "0.04em" }}>CardScan AI — Live Demo</div>
      </div>
      <div style={{ padding: "20px 16px 8px", minHeight: 260, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14, alignSelf: "flex-start", background: "#fffbeb", border: "1px solid #fef3c7", padding: "3px 10px", borderRadius: 100 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#F5A623", animation: "pulseAnim 2s infinite" }} />
          <span style={{ fontSize: 9, fontWeight: 700, color: "#d97706", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Step {current + 1} of {SCENES.length} — {SCENES[current].label}
          </span>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {SCENES[current].render()}
        </div>
        <p style={{ fontSize: 11, color: "#6b7280", textAlign: "center", margin: "12px 0 6px", lineHeight: 1.55 }}>
          {SCENES[current].caption}
        </p>
      </div>
      <div style={{ padding: "8px 14px 12px", background: "#f9fafb", borderTop: "1px solid #f3f4f6" }}>
        <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
          {SCENES.map((_, i) => (
            <div key={i} onClick={() => { setCurrent(i); setFillPct(0); }} style={{ flex: 1, height: 3, borderRadius: 2, background: i < current ? "#F5A623" : "#e5e7eb", cursor: "pointer", overflow: "hidden", position: "relative" }}>
              {i === current && <div style={{ position: "absolute", inset: 0, background: "#F5A623", transform: `scaleX(${fillPct / 100})`, transformOrigin: "left", transition: "transform 0.03s linear" }} />}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 9, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>{SCENES[current].label}</span>
          <button onClick={() => setPlaying(p => !p)} style={{ background: "none", border: "1px solid #e5e7eb", color: "#6b7280", borderRadius: 6, padding: "2px 8px", cursor: "pointer", fontSize: 9, fontWeight: 700 }}>
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes laserAnim { 0%{top:18px} 50%{top:calc(100% - 28px)} 100%{top:18px} }
        @keyframes blinkAnim { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes pulseAnim { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
        @keyframes slideInAnim { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes popInAnim { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:scale(1)} }
      `}</style>
    </div>
  );
}

export default function LandingUI({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#fff", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Background blobs */}
      <div style={{ pointerEvents: "none", position: "fixed", top: 0, right: 0, width: 288, height: 288, borderRadius: "50%", opacity: 0.6, background: "#fffbeb", filter: "blur(80px)" }} />
      <div style={{ pointerEvents: "none", position: "fixed", bottom: 0, left: 0, width: 224, height: 224, borderRadius: "50%", opacity: 0.3, background: "#eff6ff", filter: "blur(80px)" }} />

      <style>{`
        .landing-outer {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          position: relative;
          z-index: 1;
        }
        .landing-inner {
          width: 100%;
          max-width: 1100px;
        }
        .landing-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }
        .left-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }
        .right-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
          width: 100%;
        }
        .cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: none;
          cursor: pointer;
          width: 100%;
          max-width: 260px;
          height: 52px;
          background: #F5A623;
          color: #fff;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 14px;
          box-shadow: 0 10px 24px -8px rgba(245,166,35,0.55);
          transition: all 0.15s;
        }
        .cta-btn:hover {
          background: #e09620;
          box-shadow: 0 14px 28px -8px rgba(245,166,35,0.65);
          transform: translateY(-1px);
        }
        .feature-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 20px 12px;
          border-radius: 16px;
          border: 1px solid transparent;
          background: #F9FAFB;
          cursor: default;
          transition: all 0.2s;
        }
        .feature-card:hover {
          background: #fff;
          border-color: #e5e7eb;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }

        /* ── LAPTOP / DESKTOP ── */
        @media (min-width: 1024px) {
          .landing-outer {
            padding: 60px 60px;
          }
          .landing-grid {
            flex-direction: row;
            align-items: center;
            gap: 80px;
          }
          .left-col {
            width: 300px;
            flex-shrink: 0;
          }
          .right-col {
            flex: 1;
            align-items: flex-start;
            text-align: left;
          }
          .cta-btn {
            max-width: 260px;
          }
          .badge-wrap {
            align-self: flex-start;
          }
          .features-grid {
            width: 100%;
            max-width: 420px;
          }
          .cta-wrap {
            align-items: flex-start !important;
          }
        }
      `}</style>

      <main className="landing-outer">
        <div className="landing-inner">
          <div className="landing-grid">

            {/* ── LEFT: Video/Demo ── */}
            <div className="left-col">
              <ExplainerScreen />
              <p style={{ marginTop: 10, textAlign: "center", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", fontSize: 9, letterSpacing: "0.12em" }}>
                Interactive Product Demo
              </p>
            </div>

            {/* ── RIGHT: Copy + CTA ── */}
            <div className="right-col">

              {/* Badge */}
              <div className="badge-wrap" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#fffbeb", border: "1px solid #fef3c7", padding: "5px 14px", borderRadius: 100 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#F5A623", animation: "pulseAnim 2s infinite" }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: "#d97706", textTransform: "uppercase", letterSpacing: "0.15em" }}>✦ AI Powered Scanning</span>
              </div>

              {/* Headline */}
              <h1 style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 900, color: "#1A1A1A", lineHeight: 1.1, margin: 0, letterSpacing: "-0.02em" }}>
                Scan Your{" "}
                <span style={{ color: "#F5A623" }}>Business Cards</span>{" "}
                With AI Precision
              </h1>

              {/* Subtext */}
              <p style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "#6b7280", lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
                Came back from an exhibition with 50 cards?{" "}
                <span style={{ color: "#111827", fontWeight: 700 }}>Scan all of them in minutes</span>
                {" "}— then WhatsApp, email, or export every contact instantly.
              </p>

              {/* Feature cards */}
              <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, width: "100%" }}>
                {[
                  { icon: "⚡", title: "Instant", desc: "Under 2s" },
                  { icon: "🔒", title: "Secure", desc: "Encrypted" },
                  { icon: "📊", title: "Export", desc: "CSV / Excel" },
                ].map((item, i) => (
                  <div key={i} className="feature-card">
                    <div style={{ fontSize: 24, lineHeight: 1 }}>{item.icon}</div>
                    <p style={{ fontWeight: 700, color: "#111827", margin: 0, fontSize: 13 }}>{item.title}</p>
                    <p style={{ fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", margin: 0, fontSize: 9, letterSpacing: "0.12em" }}>{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="cta-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%" }}>
                <button className="cta-btn" onClick={onStart}>
                  Start Scanning
                  <svg style={{ width: 16, height: 16, flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <p style={{ color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", margin: 0, fontSize: 9, letterSpacing: "0.13em" }}>
                  No credit card required • v3.0 Stable
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ width: "100%", borderTop: "1px solid #f3f4f6", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", zIndex: 1 }}>
        <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>© 2026 Trav Platforms AI Scan</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulseAnim 2s infinite" }} />
          <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>System Active</span>
        </div>
      </footer>

      <style>{`
        @keyframes pulseAnim { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
      `}</style>
    </div>
  );
}