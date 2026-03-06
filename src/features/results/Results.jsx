import React, { useState, useMemo, useEffect } from "react";
import QuickActions from "./QuickActions";
import ContactCard from "./ContactCard";
import ExcelEditorModal from "./ExcelEditorModal";
import { ArrowLeft, PlusCircle, ChevronLeft, ChevronRight, ChevronDown, Download } from "lucide-react";
import * as XLSX from "xlsx";

export default function Results({ data, allResults, onRescan, onBack }) {

  const [isEditing, setIsEditing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showRawData, setShowRawData] = useState(false);

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
        Name: c.name || c.fullName || "-",
        Phone: c.phone || c.mobile || "-",
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
    if (!editedContact) return [null];

    const imgs = Array.isArray(editedContact.images)
      ? editedContact.images
      : [];

    const combined = [
      editedContact.imageUrl,
      editedContact.backImageUrl,
      ...imgs
    ].filter(Boolean);

    return combined.length > 0 ? combined : [null];
  }, [editedContact]);

  const goPrev = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  const goNext = () =>
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );

  const raw = editedContact?.rawText || "";

  const phones = [
    editedContact?.phone,
    ...(raw.match(/(\+?\d[\d\s\-]{7,}\d)/g) || [])
  ].filter(Boolean);

  const uniquePhones = [...new Set(phones)];

  const emails = [
    editedContact?.email,
    ...(raw.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/ig) || [])
  ].filter(Boolean);

  const uniqueEmails = [...new Set(emails)];

  let address = "-";

  const addressMatch = raw.match(
    /(Mumbai.*|Delhi.*|India.*|Bangalore.*|Pune.*|Hyderabad.*)/i
  );

  if (addressMatch) {
    address = addressMatch[0];
  }

  const formattedRawData = `

Phones:
${uniquePhones.join("\n") || "-"}

Emails:
${uniqueEmails.join("\n") || "-"}

Address:
${address}

`;

  return (
    <>
      <style>{`
        @media (max-width: 540px) {
          .res-back { display: none !important; }
        }
      `}</style>

      <div className="h-full w-full flex flex-col bg-[#FAF9F6] font-sans overflow-y-auto">

        <main className="flex-1 w-full px-4 py-6 lg:px-10">

          <div className="max-w-[1100px] mx-auto space-y-6 pb-16">

            {/* BACK BUTTON — hidden on mobile */}
            <button
              onClick={onBack}
              className="res-back flex items-center gap-2 text-gray-400 hover:text-black font-bold text-[10px] uppercase tracking-[0.2em] bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm"
            >
              <ArrowLeft size={14} />
              Back
            </button>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 items-start">

              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-3">

                <div className="relative group aspect-[1.6/1] lg:aspect-auto lg:h-[400px] bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden flex items-center justify-center">

                  {images[currentImageIndex] ? (
                    <img
                      src={images[currentImageIndex]}
                      alt="Card"
                      className="w-full h-full object-contain p-3"
                    />
                  ) : (
                    <span className="text-gray-300 font-black uppercase text-[10px]">
                      No Card Asset Found
                    </span>
                  )}

                  {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-3">
                      <button onClick={goPrev} className="p-1.5 bg-white rounded-full shadow">
                        <ChevronLeft size={18} />
                      </button>
                      <button onClick={goNext} className="p-1.5 bg-white rounded-full shadow">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 bg-black text-white px-2 py-1 rounded-full text-[9px] font-bold">
                    {currentImageIndex + 1}/{images.length}
                  </div>

                </div>

                {/* SCAN NEW */}
                <button
                  onClick={onRescan}
                  className="w-full py-3 bg-[#eab308] hover:bg-black text-white rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <PlusCircle size={16} />
                  Scan New Card
                </button>

              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-4">

                {/* CONTACT DETAILS */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">

                  <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50">
                    <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Contact Details
                    </h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-[10px] font-bold text-[#eab308] uppercase tracking-widest"
                    >
                      {isEditing ? "Save" : "Edit"}
                    </button>
                  </div>

                  <div className="p-5">
                    {!showRawData ? (
                      <ContactCard
                        contact={editedContact}
                        isEditing={isEditing}
                        onUpdate={(newContact) => setEditedContact(newContact)}
                      />
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-xl text-[11px] font-mono text-gray-600 border border-gray-100 whitespace-pre-line">
                        {formattedRawData}
                      </div>
                    )}
                  </div>

                  <div className="px-6 py-3 border-t border-gray-50 flex justify-center">
                    <button
                      onClick={() => setShowRawData(!showRawData)}
                      className="text-[9px] font-bold text-gray-400 uppercase flex items-center gap-2 tracking-widest"
                    >
                      {showRawData ? "Form View" : "Show more"}
                      <ChevronDown size={14} className={showRawData ? "rotate-180 transition-transform" : "transition-transform"} />
                    </button>
                  </div>

                </div>

                {/* QUICK EXPORT */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Quick Export
                  </h2>
                  <div className="flex flex-wrap lg:flex-nowrap items-center gap-3">
                    <QuickActions
                      data={editedContact}
                      allResults={allResults}
                      variant="circular"
                    />
                  </div>
                </div>

              </div>

            </div>

            {/* EXCEL REPOSITORY */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">

              <div className="px-4 py-4 md:px-6 border-b border-gray-50 bg-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                    Excel Repository
                  </h2>
                  <span className="bg-gray-200 text-gray-600 text-[9px] px-2 py-0.5 rounded-full font-bold">
                    {allResults?.length || 0}
                  </span>
                </div>
              </div>

              <div className="p-2 md:p-6 space-y-6">

                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-inner">
                  <div className="min-w-[800px] md:min-w-[900px] bg-white">
                    <ExcelEditorModal
                      data={allResults}
                      inline={true}
                      editedContact={editedContact}
                    />
                  </div>
                </div>

                <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest text-center">
                  {allResults?.length > 0 ? "← Swipe Table to view/edit details →" : "No records to display"}
                </p>

                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleDownloadExcel}
                    className="w-full md:w-auto max-w-md flex items-center justify-center gap-3 bg-green-600 hover:bg-black text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 border-b-4 border-green-800 hover:border-black"
                  >
                    <Download size={18} />
                    Download Excel
                  </button>
                </div>

              </div>

            </div>

          </div>

        </main>

      </div>
    </>
  );
}