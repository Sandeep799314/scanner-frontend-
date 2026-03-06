import React, { useState } from "react";
import { ArrowLeft, Camera, Upload, ChevronRight, Layers } from "lucide-react";

export default function ScanMode({ onBack, onSingle, onBulk }) {
  const [activeTab, setActiveTab] = useState("single");

  const handleSingleClick = (method) => {
    setActiveTab("single");
    onSingle(method);
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sm-wrap { animation: fadeUp 0.3s ease-out both; }

        .sm-card:hover .sm-arrow { transform: translateX(3px); color: #1A1A1A !important; }
        .sm-card:hover .sm-icon  { background: #F5A623 !important; }
        .sm-card:hover .sm-icon svg { stroke: #fff !important; }

        @media (max-width: 540px) {
          .sm-grid  { grid-template-columns: 1fr !important; }
          .sm-card  { flex-direction: row !important; align-items: center !important; gap: 16px !important; padding: 20px !important; }
          .sm-icon  { margin-bottom: 0 !important; flex-shrink: 0; }
          .sm-text  { flex: 1; }
          .sm-h1    { font-size: 26px !important; }
          .sm-page  { padding-top: 28px !important; padding-bottom: 48px !important; }
          /* Hide back button on mobile */
          .sm-back  { display: none !important; }
          /* Center toggle pill on mobile */
          .sm-toprow { justify-content: center !important; }
        }
      `}</style>

      <div className="min-h-screen w-full bg-white relative overflow-hidden"
           style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

        <div className="pointer-events-none fixed top-0 right-0 w-72 h-72 rounded-full opacity-50"
             style={{ background: "#fffbeb", filter: "blur(80px)" }} />
        <div className="pointer-events-none fixed bottom-0 left-0 w-52 h-52 rounded-full opacity-25"
             style={{ background: "#eff6ff", filter: "blur(80px)" }} />

        <div className="sm-wrap sm-page max-w-[600px] mx-auto px-5 relative z-10"
             style={{ paddingTop: 52, paddingBottom: 64 }}>

          {/* TOP ROW */}
          <div className="sm-toprow flex items-center justify-between mb-10 gap-3 flex-wrap">

            {/* Back — hidden on mobile */}
            <button
              onClick={onBack}
              className="sm-back flex items-center gap-2 font-bold uppercase border-none bg-transparent cursor-pointer transition-colors"
              style={{ fontSize: 11, letterSpacing: "0.18em", color: "#9CA3AF" }}
              onMouseEnter={e => e.currentTarget.style.color = "#1A1A1A"}
              onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}
            >
              <ArrowLeft size={14} />
              Back
            </button>

            {/* Toggle pill */}
            <div className="flex items-center rounded-full shadow-sm"
                 style={{ background: "#fff", border: "1px solid #E5E7EB", padding: 5, gap: 3 }}>
              <button
                onClick={() => setActiveTab("single")}
                className="flex items-center gap-1.5 rounded-full font-bold whitespace-nowrap border-none cursor-pointer transition-all"
                style={{
                  padding: "7px 20px", fontSize: 12,
                  background: activeTab === "single" ? "#F5A623" : "transparent",
                  color:      activeTab === "single" ? "#fff"    : "#9CA3AF",
                  boxShadow:  activeTab === "single" ? "0 2px 8px rgba(245,166,35,0.35)" : "none",
                }}
              >
                Single Scan
              </button>
              <button
                onClick={() => { setActiveTab("bulk"); onBulk(); }}
                className="flex items-center gap-1.5 rounded-full font-bold whitespace-nowrap border-none cursor-pointer transition-all"
                style={{
                  padding: "7px 20px", fontSize: 12,
                  background: activeTab === "bulk" ? "#F5A623" : "transparent",
                  color:      activeTab === "bulk" ? "#fff"    : "#9CA3AF",
                  boxShadow:  activeTab === "bulk" ? "0 2px 8px rgba(245,166,35,0.35)" : "none",
                }}
                onMouseEnter={e => { if (activeTab !== "bulk") e.currentTarget.style.color = "#1A1A1A"; }}
                onMouseLeave={e => { if (activeTab !== "bulk") e.currentTarget.style.color = "#9CA3AF"; }}
              >
                <Layers size={12} />
                Bulk Scan
              </button>
            </div>
          </div>

          {/* HEADING */}
          <div className="mb-8">
            <h2 className="sm-h1 font-black text-gray-900 tracking-tight leading-tight m-0 mb-2"
                style={{ fontSize: 36 }}>
              Ready to{" "}
              <span style={{ color: "#F5A623" }}>Extract?</span>
            </h2>
            <p className="font-semibold text-gray-400 uppercase m-0"
               style={{ fontSize: 11, letterSpacing: "0.18em" }}>
              Select capture method to continue
            </p>
          </div>

          {/* CARDS */}
          <div className="sm-grid grid mb-12" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { key: "camera", Icon: Camera, title: "Camera",  sub: "Snap a live photo", method: "camera" },
              { key: "upload", Icon: Upload, title: "Gallery", sub: "Pick from files",   method: "upload" },
            ].map(({ key, Icon, title, sub, method }) => (
              <button
                key={key}
                onClick={() => handleSingleClick(method)}
                className="sm-card group flex flex-col items-start text-left border-none cursor-pointer transition-all duration-200"
                style={{
                  padding: 24,
                  borderRadius: 20,
                  background: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  boxShadow: "none",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                  e.currentTarget.style.borderColor = "#1A1A1A";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#F9FAFB";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#E5E7EB";
                }}
              >
                <div
                  className="sm-icon w-12 h-12 rounded-[13px] flex items-center justify-center transition-colors duration-200"
                  style={{ background: "#EFEFEF", marginBottom: 20 }}
                >
                  <Icon size={22} style={{ color: "#9CA3AF", transition: "color 0.2s" }} />
                </div>

                <div className="sm-text w-full flex items-end justify-between gap-2">
                  <div>
                    <p className="font-black text-gray-900 leading-tight m-0 mb-1" style={{ fontSize: 17 }}>
                      {title}
                    </p>
                    <p className="font-semibold text-gray-400 uppercase m-0"
                       style={{ fontSize: 10, letterSpacing: "0.14em" }}>
                      {sub}
                    </p>
                  </div>
                  <ChevronRight
                    size={17}
                    className="sm-arrow shrink-0 transition-all duration-200"
                    style={{ color: "#D1D5DB", marginBottom: 2 }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-center gap-3" style={{ opacity: 0.3 }}>
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