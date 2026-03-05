import React from "react";
import { ArrowLeft, Layers } from "lucide-react";

export default function BulkScan({ onBack, onSingle }) {

  return (
    <div className="h-full w-full flex flex-col bg-[#FAF9F6] font-sans">

      <div className="flex-1 flex flex-col items-center pt-10 px-6">

        <div className="w-full max-w-[520px]">

          {/* BACK + TOGGLE */}
          <div className="flex items-center justify-center gap-4 mb-10">

            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-black font-bold text-[11px] uppercase tracking-[0.2em]"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <div className="inline-flex bg-white p-1 rounded-full border border-gray-200 shadow-sm">

              <button
                onClick={onSingle}
                className="px-6 py-2 rounded-full font-bold text-sm text-gray-400 hover:text-gray-600"
              >
                Single Scan
              </button>

              <button className="flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm bg-gray-100 text-gray-900 shadow-inner">
                <Layers className="w-4 h-4" />
                Bulk Scan
              </button>

            </div>

          </div>


          {/* COMING SOON CARD */}
          <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 px-12 py-16 text-center">

            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
              Bulk Scan
            </h1>

            <p className="text-[#eab308] text-2xl font-black mb-6">
              Coming Soon
            </p>

            <p className="text-gray-400 font-bold text-sm leading-relaxed">
              Bulk card scanning is currently under development.
              <br />
              Soon you will be able to scan multiple business cards
              and extract contact data instantly.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}