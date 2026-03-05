import React, { useState } from "react";
import ActionCard from "./ActionCard";
import useClipboard from "../../hooks/useClipboard";
import WhatsAppShareModal from "./WhatsAppShareModal";
import EmailShareModal from "./EmailShareModal";
import * as XLSX from "xlsx";

export default function QuickActions({ data, allResults }) {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const { copy, copied } = useClipboard();

  if (!data) return null;

  const contact = Array.isArray(data) ? data[0] : data;

  const handleSaveContact = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${contact.name || ""}`,
      `ORG:${contact.company || ""}`,
      `TITLE:${contact.designation || ""}`,
      `TEL;TYPE=CELL:${contact.phone || ""}`,
      `EMAIL:${contact.email || ""}`,
      `URL:${contact.website || ""}`,
      `ADR;TYPE=WORK:;;${contact.address || ""}`,
      "END:VCARD"
    ].join("\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${contact.name || "contact"}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const text = `Name: ${contact.name}\nPhone: ${contact.phone}\nEmail: ${contact.email}`;
    copy(text);
  };

  // ✅ Excel Download
  const handleDownloadExcel = () => {

    const rows = Array.isArray(allResults) ? allResults : [contact];

    const processedRows = rows.map((item) => {
      const rawContact = item.savedCard || item.data || item;

      const {
        _id,
        __v,
        imageUrl,
        backImageUrl,
        source,
        tags,
        isDeleted,
        createdAt,
        updatedAt,
        rawText,
        ...contact
      } = rawContact;

      return {
        Timestamp: new Date().toLocaleString(),
        Name: contact.name || contact.fullName || "",
        Phone: contact.phone || contact.mobile || "",
        Email: contact.email || "",
        Company: contact.company || "",
        Designation: contact.designation || "",
        Website: contact.website || "",
        Address: contact.address || ""
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(processedRows);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Scanned Data");

    XLSX.writeFile(workbook, `Batch_Scan_${Date.now()}.xlsx`);
  };

  return (
    <div className="w-full">

      <div className="grid grid-cols-5 gap-1 sm:gap-4 md:gap-8 items-start justify-items-center">

        {/* WhatsApp */}
        <ActionCard
          label="WhatsApp"
          icon={
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"/>
            </svg>
          }
          color="bg-[#dcfce7] text-[#22c55e]"
          onClick={() => setIsWhatsAppOpen(true)}
        />

        {/* Copy */}
        <ActionCard
          label="Copy"
          icon={
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          }
          color="bg-[#fff7ed] text-[#f97316]"
          onClick={handleCopy}
        />

        {/* Save Contact */}
        <ActionCard
          label="Save"
          icon={
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
            </svg>
          }
          color="bg-[#f5f3ff] text-[#8b5cf6]"
          onClick={handleSaveContact}
        />

        {/* Email */}
        <ActionCard
          label="Email"
          icon={
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          }
          color="bg-[#fef2f2] text-[#ef4444]"
          onClick={() => setIsEmailOpen(true)}
        />

        {/* Excel Download */}
        <ActionCard
          label="Excel"
          icon={
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          }
          color="bg-[#eff6ff] text-[#3b82f6]"
          onClick={handleDownloadExcel}
        />

      </div>

      {/* WhatsApp Modal */}
      <WhatsAppShareModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        currentData={contact}
        allResults={allResults}
      />

      {/* Email Modal */}
      <EmailShareModal
        isOpen={isEmailOpen}
        onClose={() => setIsEmailOpen(false)}
        currentData={contact}
        allResults={allResults}
      />

      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full text-xs font-bold shadow-2xl z-[60]">
          ✂️ Text Copied!
        </div>
      )}
    </div>
  );
}