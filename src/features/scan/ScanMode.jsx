import React, { useState } from "react";
import { ArrowLeft, Camera, Upload, ChevronRight, Layers } from "lucide-react";

export default function ScanMode({ onBack, onSingle, onBulk }) {
  const [activeTab, setActiveTab] = useState("single");

  const handleSingleClick = (method) => {
    setActiveTab("single");
    onSingle(method);
  };

  const handleBulkClick = () => {
    setActiveTab("bulk");
    onBulk();
  };

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col bg-[#FAF9F6] font-sans selection:bg-yellow-100 overflow-y-auto lg:overflow-hidden">

      {/* MAIN CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col items-center pt-6 md:pt-10 px-6 pb-16">

        <div className="w-full max-w-[560px] flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">

          {/* BACK + TOGGLE ROW */}
          <div className="flex items-center gap-4 justify-center mb-8">

            {/* BACK BUTTON */}
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-black font-bold text-[11px] uppercase tracking-[0.2em] transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            {/* TOGGLE - Matched text-xs and padding from SingleScan */}
            <div className="inline-flex bg-white p-1 rounded-full border border-gray-200 shadow-sm">
              <button
                onClick={() => setActiveTab("single")}
                className={`px-6 py-2 rounded-full font-bold text-xs transition-all ${
                  activeTab === "single"
                    ? "bg-gray-100 text-gray-900 shadow-inner"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Single Scan
              </button>

              <button
                onClick={handleBulkClick}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs transition-all ${
                  activeTab === "bulk"
                    ? "bg-gray-100 text-gray-900 shadow-inner"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Layers
                  className={`w-3.5 h-3.5 ${
                    activeTab === "bulk" ? "text-gray-900" : "text-gray-400"
                  }`}
                />
                Bulk Scan
              </button>
            </div>
          </div>

          {/* HEADING - Matched md:text-4xl and leading-tight */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1714] tracking-tight leading-tight">
              Ready to <span className="text-[#eab308]">Extract?</span>
            </h2>

            <p className="text-gray-400 text-[10px] font-bold mt-3 uppercase tracking-[0.2em]">
              Select capture method for professional data
            </p>
          </div>

          {/* ACTION CARDS - Grid layout with better spacing */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-8">

            {/* CAMERA CARD */}
            <button
              onClick={() => handleSingleClick("camera")}
              className="group flex flex-col items-center p-8 bg-white rounded-[2rem] border border-gray-100 hover:border-black shadow-sm hover:shadow-xl transition-all duration-500 text-center"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#eab308] transition-colors">
                <Camera className="w-7 h-7 text-gray-400 group-hover:text-white" />
              </div>

              <div className="w-full flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-lg font-black text-gray-900">
                    Camera
                  </h3>
                  <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest mt-0.5">
                    Snap a photo
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="text-gray-200 group-hover:text-black group-hover:translate-x-1.5 transition-all"
                />
              </div>
            </button>

            {/* GALLERY CARD */}
            <button
              onClick={() => handleSingleClick("upload")}
              className="group flex flex-col items-center p-8 bg-white rounded-[2rem] border border-gray-100 hover:border-black shadow-sm hover:shadow-xl transition-all duration-500 text-center"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#eab308] transition-colors">
                <Upload className="w-7 h-7 text-gray-400 group-hover:text-white" />
              </div>

              <div className="w-full flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-lg font-black text-gray-900">
                    Gallery
                  </h3>
                  <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest mt-0.5">
                    Pick from files
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="text-gray-200 group-hover:text-black group-hover:translate-x-1.5 transition-all"
                />
              </div>
            </button>

          </div>

          {/* FOOTER - Matched SingleScan opacity and tracking */}
          <div className="flex items-center justify-center gap-4 opacity-30 mt-auto pt-6">
            <div className="h-[1px] w-6 bg-gray-400"></div>

            <span className="text-[8px] font-black uppercase tracking-[0.35em] text-gray-600">
              Secure AI Cloud Processing
            </span>

            <div className="h-[1px] w-6 bg-gray-400"></div>
          </div>

        </div>
      </div>
    </div>
  );
}