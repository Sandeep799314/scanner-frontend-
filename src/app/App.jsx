import { useState } from "react";
import useStep from "../hooks/useStep";

// Layout & UI
import Navbar from "../components/layout/Navbar";
import Loader from "../components/ui/Loader";

// Features imports
import Landing from "../features/landing/Landing";
import ScanMode from "../features/scan/ScanMode";
import SingleScan from "../features/scan/SingleScan";
import BulkScan from "../features/scan/BulkScan";
import Results from "../features/results/Results";

export default function App() {
  const { step, goTo } = useStep("landing");

  const [contactData, setContactData] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [captureMethod, setCaptureMethod] = useState("upload");

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
    if (step === "mode") return goTo("landing");
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

  return (
    <div className="min-h-screen w-full bg-white font-sans selection:bg-gray-200 flex flex-col">

      {/* GLOBAL NAVBAR */}
      <Navbar onBack={handleBack} />

      {/* LOADER OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[110] backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[32px] shadow-2xl flex flex-col items-center gap-4 border border-gray-200">
            <Loader />
            <p className="text-gray-600 font-black animate-pulse">
              Analyzing Card...
            </p>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full relative pt-[64px] md:pt-[70px] overflow-y-auto">
        {renderScreen()}
      </main>

    </div>
  );
}