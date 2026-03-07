import React, { useState, useMemo, useEffect } from "react";
import QuickActions from "./QuickActions";
import ContactCard from "./ContactCard";
import ExcelEditorModal from "./ExcelEditorModal";
import {
  ArrowLeft,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Download,
  X
} from "lucide-react";
import * as XLSX from "xlsx";

export default function Results({ data, allResults, onRescan, onBack }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showRawData, setShowRawData] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);

  const [editedContact, setEditedContact] = useState(
    Array.isArray(data) ? data[0] : data
  );

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [editedContact]);

  const handleDownloadExcel = () => {
    if (!allResults || allResults.length === 0) return;

    const sheetData = allResults.map((item) => {
      const c = item.savedCard || item.data || item;
      return {
        Timestamp: new Date().toLocaleString(),
        Name: c.name || "-",
        Phone: c.phone || "-",
        Email: c.email || "-",
        Company: c.company || "-",
        Designation: c.designation || "-",
        Address: c.address || "-",
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Batch_Export");
    XLSX.writeFile(workbook, `Business_Cards_${Date.now()}.xlsx`);
  };

  if (!data) return null;

  const images = useMemo(() => {
    if (!editedContact) return [];
    const imgs = Array.isArray(editedContact.images) ? editedContact.images : [];
    const combined = [
      editedContact.imageUrl,
      editedContact.backImageUrl,
      ...imgs
    ].filter(Boolean);
    return combined;
  }, [editedContact]);

  const goPrev = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const goNext = () =>
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        
        .res-root, .res-root * {
          font-family: 'Poppins', sans-serif !important;
          -webkit-font-smoothing: antialiased;
        }

        .water-sweep {
          position: absolute;
          background: rgba(255,255,255,0.3);
          width: 100%;
          height: 100%;
          left: -100%;
          top: 0;
          transition: all 0.6s;
          animation: sweep 0.6s ease-out;
        }

        @keyframes sweep {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .tight-heading {
          letter-spacing: -0.02em;
        }
      `}</style>

      <div className="res-root h-full w-full flex flex-col bg-[#FAF9F6] overflow-y-auto">
        <main className="flex-1 w-full px-4 py-6 lg:px-10">
          <div className="max-w-[1100px] mx-auto space-y-6 pb-16">
            
            {/* BACK BUTTON */}
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-[0.2em] bg-[#eab308] hover:bg-black px-4 py-2 rounded-full shadow-sm transition-all active:scale-95"
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">
              <div className="flex flex-col gap-3">
                <div className="relative h-[400px] bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden flex items-center justify-center">
                  {images.length === 1 && (
                    <img
                      src={images[0]}
                      alt="card"
                      onClick={() => setZoomImage(images[0])}
                      className="max-h-[90%] max-w-[90%] object-contain cursor-zoom-in"
                    />
                  )}

                  {images.length === 2 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-3">
                      <img
                        src={images[0]}
                        alt="front"
                        onClick={() => setZoomImage(images[0])}
                        className="max-h-[45%] object-contain cursor-zoom-in"
                      />
                      <img
                        src={images[1]}
                        alt="back"
                        onClick={() => setZoomImage(images[1])}
                        className="max-h-[45%] object-contain cursor-zoom-in"
                      />
                    </div>
                  )}

                  {images.length > 2 && (
                    <>
                      <img
                        src={images[currentImageIndex]}
                        alt="card"
                        onClick={() => setZoomImage(images[currentImageIndex])}
                        className="max-h-[90%] max-w-[90%] object-contain cursor-zoom-in"
                      />
                      <div className="absolute inset-0 flex items-center justify-between px-3">
                        <button onClick={goPrev} className="p-1.5 bg-white rounded-full shadow hover:bg-gray-50">
                          <ChevronLeft size={18} />
                        </button>
                        <button onClick={goNext} className="p-1.5 bg-white rounded-full shadow hover:bg-gray-50">
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* SCAN NEW CARD BUTTON */}
                <button
                  onClick={(e) => {
                    const button = e.currentTarget;
                    const wave = document.createElement("span");
                    wave.className = "water-sweep";
                    button.appendChild(wave);
                    setTimeout(() => {
                      wave.remove();
                      onRescan();
                    }, 600);
                  }}
                  className="relative overflow-hidden w-full py-4 bg-[#eab308] hover:bg-yellow-400 text-white rounded-xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all duration-200 active:scale-[0.96]"
                >
                  <PlusCircle size={16} />
                  Scan New Card
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100">
                  <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="tight-heading text-[11px] font-black text-gray-400 uppercase tracking-widest">
                      Contact Details
                    </h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-[11px] font-black text-[#eab308] hover:text-yellow-600 transition-colors"
                    >
                      {isEditing ? "SAVE CHANGES" : "EDIT DETAILS"}
                    </button>
                  </div>

                  <div className="p-5">
                    <ContactCard
                      contact={editedContact}
                      isEditing={isEditing}
                      onUpdate={(c) => setEditedContact(c)}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <QuickActions
                    data={editedContact}
                    allResults={allResults}
                    variant="circular"
                  />
                </div>
              </div>
            </div>

            {/* EXCEL SECTION */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="tight-heading text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  Excel Repository
                </h2>
                <button
                  onClick={handleDownloadExcel}
                  className="px-4 py-2 flex items-center gap-2 rounded-lg bg-[#e8f5e9] hover:bg-[#c8e6c9] transition-colors"
                >
                  <span className="text-[10px] font-black text-[#107C41] uppercase tracking-wider">Export Excel</span>
                  <Download size={16} className="text-[#107C41]" />
                </button>
              </div>
              <div className="p-6">
                <ExcelEditorModal
                  data={allResults}
                  inline={true}
                  editedContact={editedContact}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ZOOM MODAL */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        >
          <button className="absolute top-6 right-6 text-white hover:rotate-90 transition-transform">
            <X size={32} />
          </button>
          <img
            src={zoomImage}
            alt="zoom"
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl rounded-sm"
          />
        </div>
      )}
    </>
  );
}