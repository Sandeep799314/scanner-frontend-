import React from "react";

export default function LandingUI({ onStart }) {
  return (
    /* Laptop: fixed height, no scroll
       Mobile: auto height with scroll
    */
    <div className="min-h-screen lg:h-screen w-full flex flex-col bg-[#FAF9F6] lg:overflow-hidden overflow-y-auto">
      
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 min-h-[320px] lg:h-full flex items-center justify-center relative bg-gradient-to-br from-white to-[#f3ede2] p-8">
          
          {/* Stars */}
          <div className="absolute top-[15%] right-[15%] text-2xl animate-bounce hidden sm:block">✨</div>
          <div className="absolute bottom-[15%] left-[10%] text-xl animate-float hidden sm:block">✨</div>

          {/* Demo Card */}
          <div className="relative w-full max-w-[380px] aspect-[1.7/1] bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] overflow-hidden border border-white">

            {/* Scan Line */}
            <div className="absolute left-0 w-full h-[3px] bg-yellow-400 shadow-[0_0_20px_rgba(255,200,0,0.8)] z-10 animate-scan-vertical"></div>

            <div className="p-6 md:p-8 h-full flex flex-col justify-between opacity-40">
              <div className="space-y-3">
                <div className="w-1/3 h-3 bg-yellow-300 rounded-full"></div>
                <div className="space-y-2">
                  <div className="w-2/3 h-2 bg-gray-200 rounded-full"></div>
                  <div className="w-1/2 h-2 bg-gray-200 rounded-full"></div>
                </div>
              </div>

              <div className="w-full h-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 lg:px-20 py-10 lg:py-0 bg-white lg:bg-transparent">
          
          <div className="max-w-[480px] w-full">

            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-[#1a1714] leading-[1.1] tracking-tight">
              Ready to Scan
              <br />
              <span className="text-yellow-500">Business Card?</span>
            </h1>

            <p className="text-gray-500 mt-6 text-base md:text-lg font-medium leading-relaxed">
              Upload or capture your business card and let our AI extract
              all contact details instantly. Save time and grow your
              professional network.
            </p>

            {/* FEATURES */}
            <div className="mt-8 space-y-4">
              {[
                { icon: "⚡", text: "High accuracy OCR extraction" },
                { icon: "🛡️", text: "Secure image processing" },
                { icon: "💬", text: "WhatsApp ready sharing" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-xl bg-yellow-50 flex items-center justify-center text-lg border border-yellow-100 group-hover:bg-yellow-100 transition-colors">
                    {item.icon}
                  </div>

                  <span className="text-gray-700 font-bold text-sm md:text-base">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <div className="mt-10 lg:mt-12">
              <button
                onClick={onStart}
                className="w-full sm:w-auto px-10 py-4 bg-[#121826] text-white text-lg font-bold rounded-2xl hover:bg-black hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
              >
                Start Scanning
                <span className="text-xl">→</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes scan-vertical {
          0% { top: 0%; }
          100% { top: 100%; }
        }

        .animate-scan-vertical {
          animation: scan-vertical 3s linear infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}