import { useState, useEffect } from "react";
import useStep from "../hooks/useStep";

// Layout & UI
import Navbar from "../components/layout/Navbar";
import Loader from "../components/ui/Loader";

// Features imports
import Landing    from "../features/landing/Landing";
import ScanMode   from "../features/scan/ScanMode";
import SingleScan from "../features/scan/SingleScan";
import BulkScan   from "../features/scan/BulkScan";
import Results    from "../features/results/Results";

export default function App() {
  const { step, goTo } = useStep("landing");

  const [contactData,   setContactData]   = useState(null);
  const [allResults,    setAllResults]    = useState([]);
  const [loading,       setLoading]       = useState(false);
  const [captureMethod, setCaptureMethod] = useState("upload");

  // Har step change pe dono scroll reset karo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const main = document.getElementById("main-content");
    if (main) main.scrollTop = 0;
  }, [step]);

  const handleFullReset = () => {
    setContactData(null);
    setAllResults([]);
    goTo("landing");
  };

  const handleNewScan = (newData) => {
    setContactData(newData);
    setAllResults((prev) => [...prev, newData]);
    setLoading(false);
    goTo("results");
  };

  const handleSingleSelection = (method) => {
    setCaptureMethod(method);
    goTo("single");
  };

  const handleBack = () => {
    if (step === "landing") return;
    if (step === "results") return goTo("mode");
    if (step === "mode")    return goTo("landing");
    goTo("mode");
  };

  const renderScreen = () => {
    switch (step) {
      case "landing":
        return <Landing onStart={() => goTo("mode")} />;
      case "mode":
        return (
          <ScanMode
            onBack={handleFullReset}
            onSingle={handleSingleSelection}
            onBulk={() => goTo("bulk")}
          />
        );
      case "single":
        return (
          <SingleScan
            onBack={() => goTo("mode")}
            onBulk={() => goTo("bulk")}
            setStep={goTo}
            setContactData={handleNewScan}
            setLoading={setLoading}
            captureMethod={captureMethod}
          />
        );
      case "bulk":
        return (
          <BulkScan
            onBack={() => goTo("mode")}
            onSingle={() => handleSingleSelection("upload")}
            setStep={goTo}
            setContactData={handleNewScan}
            setLoading={setLoading}
          />
        );
      case "results":
        return (
          <Results
            data={contactData}
            allResults={allResults}
            onRescan={() => goTo("mode")}
            onBack={handleFullReset}
          />
        );
      default:
        return <Landing onStart={() => goTo("mode")} />;
    }
  };

  // Results page pe zyada content = scroll allow
  // Baaki sab pages laptop pe perfectly fit hote hain
  const isResultsPage = step === "results";

  return (
    <>
      <style>{`
        :root { --nav-h: 56px; }
        @media (max-width: 768px) { :root { --nav-h: 52px; } }

        /* ───── LAPTOP (1024px+) ───── */
        @media (min-width: 1024px) {
          /* Outer shell: viewport lock — bahar koi scroll nahi */
          .app-shell {
            height: 100dvh;
            overflow: hidden;
          }
          /* Main area height = viewport - navbar */
          #main-content {
            height: calc(100dvh - var(--nav-h));
          }
          /* Results: allow inner scroll */
          #main-content.can-scroll {
            overflow-y: auto;
          }
          /* All other pages: no scroll at all */
          #main-content.no-scroll {
            overflow: hidden;
          }
          /* Thin scrollbar only when needed */
          #main-content.can-scroll::-webkit-scrollbar       { width: 4px; }
          #main-content.can-scroll::-webkit-scrollbar-track { background: transparent; }
          #main-content.can-scroll::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 99px; }
        }

        /* ───── MOBILE (< 1024px) ───── */
        @media (max-width: 1023px) {
          /* Natural document scroll — no height lock */
          .app-shell {
            min-height: 100dvh;
          }
          #main-content {
            overflow: visible;
            height: auto;
          }
        }
      `}</style>

      <div className="app-shell w-full bg-white font-sans selection:bg-yellow-100 flex flex-col">

        {/* ── NAVBAR ── */}
        <header
          className="fixed top-0 left-0 w-full z-[100] flex items-center bg-white border-b border-gray-50"
          style={{ height: "var(--nav-h)" }}
        >
          <Navbar onBack={handleBack} />
        </header>

        {/* ── LOADER OVERLAY ── */}
        {loading && (
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center p-6"
            style={{ background: "rgba(26,26,26,0.65)", backdropFilter: "blur(4px)" }}
          >
            <div
              className="bg-white rounded-[24px] shadow-2xl flex flex-col items-center gap-5 w-full p-8"
              style={{ maxWidth: 340 }}
            >
              <Loader />
              <div className="text-center">
                <p className="font-black text-gray-900 animate-pulse"
                   style={{ fontSize: 18, letterSpacing: "-0.3px" }}>
                  Analyzing Card Details
                </p>
                <p className="text-gray-400 font-medium mt-1" style={{ fontSize: 13 }}>
                  AI is extracting data...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── MAIN CONTENT ──
            Laptop: fixed height = 100dvh - navbar
              - Results page  → overflow-y: auto  (content zyada hai)
              - Other pages   → overflow: hidden   (fit ho jaate hain, no scrollbar)
            Mobile: auto height, natural page scroll
        */}
        <main
          id="main-content"
          className={isResultsPage ? "can-scroll" : "no-scroll"}
          style={{ paddingTop: "var(--nav-h)", flex: 1 }}
        >
          {renderScreen()}
        </main>

      </div>
    </>
  );
}