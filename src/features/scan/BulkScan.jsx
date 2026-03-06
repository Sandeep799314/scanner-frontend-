import React from "react";
import { ArrowLeft, Layers, Sparkles } from "lucide-react";

export default function BulkScan({ onBack, onSingle }) {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bs-wrap { animation: fadeUp 0.3s ease-out both; }

        @keyframes bs-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        .bs-icon { animation: bs-float 3s ease-in-out infinite; }

        @media (max-width: 540px) {
          .bs-page   { padding-top: 28px !important; padding-bottom: 48px !important; }
          .bs-h1     { font-size: 26px !important; }
          /* Hide back button on mobile */
          .bs-back   { display: none !important; }
          /* Center toggle pill on mobile */
          .bs-toprow { justify-content: center !important; }
        }
      `}</style>

      <div className="min-h-screen w-full bg-white relative overflow-hidden"
           style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

        <div className="pointer-events-none fixed top-0 right-0 w-72 h-72 rounded-full opacity-50"
             style={{ background: "#fffbeb", filter: "blur(80px)" }} />
        <div className="pointer-events-none fixed bottom-0 left-0 w-52 h-52 rounded-full opacity-25"
             style={{ background: "#eff6ff", filter: "blur(80px)" }} />

        <div className="bs-wrap bs-page max-w-[600px] mx-auto px-5 relative z-10"
             style={{ paddingTop: 52, paddingBottom: 64 }}>

          {/* TOP ROW */}
          <div className="bs-toprow flex items-center justify-between mb-10 gap-3 flex-wrap">

            {/* Back — hidden on mobile */}
            <button
              onClick={onBack}
              className="bs-back flex items-center gap-2 font-bold uppercase border-none bg-transparent cursor-pointer transition-colors"
              style={{ fontSize: 11, letterSpacing: "0.18em", color: "#9CA3AF" }}
              onMouseEnter={e => e.currentTarget.style.color = "#1A1A1A"}
              onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}
            >
              <ArrowLeft size={14} />
              Back
            </button>

            {/* Toggle pill — Bulk active */}
            <div className="flex items-center rounded-full shadow-sm"
                 style={{ background: "#fff", border: "1px solid #E5E7EB", padding: 5, gap: 3 }}>

              {/* Single — inactive */}
              <button
                onClick={onSingle}
                className="flex items-center gap-1.5 rounded-full font-bold whitespace-nowrap border-none cursor-pointer transition-all"
                style={{ padding: "7px 20px", fontSize: 12, background: "transparent", color: "#9CA3AF" }}
                onMouseEnter={e => e.currentTarget.style.color = "#1A1A1A"}
                onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}
              >
                Single Scan
              </button>

              {/* Bulk — active amber */}
              <button
                className="flex items-center gap-1.5 rounded-full font-bold whitespace-nowrap border-none"
                style={{
                  padding: "7px 20px", fontSize: 12, cursor: "default",
                  background: "#F5A623", color: "#fff",
                  boxShadow: "0 2px 8px rgba(245,166,35,0.35)",
                }}
              >
                <Layers size={12} />
                Bulk Scan
              </button>
            </div>
          </div>

          {/* HEADING */}
          <div className="mb-10">
            <h2 className="bs-h1 font-black text-gray-900 tracking-tight leading-tight m-0 mb-2"
                style={{ fontSize: 36 }}>
              Bulk Card{" "}
              <span style={{ color: "#F5A623" }}>Scanner</span>
            </h2>
            <p className="font-semibold text-gray-400 uppercase m-0"
               style={{ fontSize: 11, letterSpacing: "0.18em" }}>
              Scan multiple cards at once • Batch export
            </p>
          </div>

          {/* COMING SOON CARD */}
          <div className="w-full flex flex-col items-center text-center py-8 px-6"
               style={{ borderRadius: 20, background: "#F9FAFB", border: "1px solid #E5E7EB" }}>

            <div className="bs-icon w-12 h-12 rounded-[14px] flex items-center justify-center mb-4"
                 style={{ background: "#fff", border: "1px solid #E5E7EB",
                          boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}>
              <Layers size={22} style={{ color: "#F5A623" }} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4"
                 style={{ background: "#fffbeb", border: "1px solid #fef3c7" }}>
              <Sparkles size={10} style={{ color: "#d97706" }} />
              <span className="font-black uppercase"
                    style={{ fontSize: 9, letterSpacing: "0.15em", color: "#d97706" }}>
                Coming Soon
              </span>
            </div>

            <h3 className="font-black text-gray-900 tracking-tight m-0 mb-2"
                style={{ fontSize: 18 }}>
              Bulk Scan is Under Development
            </h3>

            <p className="font-medium text-gray-400 leading-relaxed m-0 mb-6"
               style={{ fontSize: 13, maxWidth: 340 }}>
              Soon you'll be able to scan{" "}
              <span className="text-gray-700 font-bold">multiple business cards</span>{" "}
              simultaneously and export all contacts to Excel instantly.
            </p>

            <div className="flex flex-col gap-2 w-full" style={{ maxWidth: 280 }}>
              {["Upload 10–100 cards at once", "AI batch OCR extraction", "One-click Excel export"].map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-left"
                     style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                       style={{ background: "#fffbeb" }}>
                    <span style={{ fontSize: 9, color: "#F5A623", fontWeight: 900 }}>✓</span>
                  </div>
                  <span className="font-semibold text-gray-700" style={{ fontSize: 12 }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <button disabled
            className="w-full flex items-center justify-center gap-2.5 border-none font-black uppercase mt-4"
            style={{ height: 48, borderRadius: 14, fontSize: 11, letterSpacing: "0.1em",
                     cursor: "not-allowed", background: "#E5E7EB", color: "#9CA3AF" }}>
            <Sparkles size={13} className="shrink-0" />
            Notify Me When Available
          </button>

          {/* FOOTER */}
          <div className="flex items-center justify-center gap-3 mt-12" style={{ opacity: 0.3 }}>
            <div className="h-px w-7 bg-gray-400" />
            <span className="font-black uppercase text-gray-500"
                  style={{ fontSize: 9, letterSpacing: "0.3em" }}>
              Secure AI Cloud Processing
            </span>
            <div className="h-px w-7 bg-gray-400" />
          </div>

        </div>
      </div>
    </>
  );
}