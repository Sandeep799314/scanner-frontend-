import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import { Download, X, FileSpreadsheet } from "lucide-react";

const ExcelEditorModal = ({ isOpen, onClose, data, inline, editedContact }) => {

  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    if ((isOpen || inline) && data) {
      const initialArray = Array.isArray(data) ? data : [data];

      const processedRows = initialArray.map((item) => {
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

        const row = {
          Timestamp: new Date().toLocaleString(),
          Name: contact.name || contact.fullName || "",
          Phone: contact.phone || contact.mobile || "",
          Email: contact.email || "",
          Company: contact.company || "",
          Designation: contact.designation || "",
        };

        return row;
      });

      setGridData(processedRows);
    }
  }, [data, isOpen, inline]);



  /* 🔥 NEW: ContactCard edit hone par Excel table auto update */
  useEffect(() => {
    if (!editedContact) return;

    setGridData((prev) => {
      if (prev.length === 0) return prev;

      const updated = [...prev];

      updated[0] = {
        ...updated[0],
        Name: editedContact.name || "",
        Phone: editedContact.phone || "",
        Email: editedContact.email || "",
        Company: editedContact.company || "",
        Designation: editedContact.designation || "",
      };

      return updated;
    });

  }, [editedContact]);



  const handleCellChange = (rowIndex, field, value) => {
    const updated = [...gridData];
    updated[rowIndex][field] = value;
    setGridData(updated);
  };



  const downloadExcel = () => {
    if (gridData.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(gridData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Scanned Data");

    XLSX.writeFile(workbook, `Batch_Scan_${Date.now()}.xlsx`);
  };



  if (!inline && !isOpen) return null;



  const content = (
    <div
      className={`bg-white w-full flex flex-col overflow-hidden ${
        inline
          ? "rounded-3xl border border-gray-100 shadow-sm"
          : "rounded-[32px] max-w-6xl shadow-2xl"
      }`}
    >

      {/* HEADER */}
      <div className="p-4 md:p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30 shrink-0">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-[#1e293b] rounded-xl flex items-center justify-center shadow-lg shrink-0">
            <FileSpreadsheet className="text-white" size={20} />
          </div>

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <h2 className="text-sm md:text-lg font-black text-gray-800 uppercase tracking-tight truncate">
                Excel Repository
              </h2>

              <span className="bg-gray-100 text-gray-500 text-[9px] px-2 py-0.5 rounded-md font-bold border border-gray-200">
                {gridData.length}
              </span>

            </div>

            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              Batch Verification
            </p>

          </div>

        </div>

        {!inline && (
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        )}

      </div>



      {/* TABLE */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">

        <table className="w-full border-collapse text-left min-w-[700px]">

          <thead>

            <tr className="bg-[#1e293b] text-white">

              {gridData.length > 0 &&
                Object.keys(gridData[0]).map((key) => (

                  <th
                    key={key}
                    className="px-4 py-3 text-[10px] font-black uppercase tracking-widest border-r border-slate-700 last:border-0"
                  >
                    {key}
                  </th>

                ))}

            </tr>

          </thead>



          <tbody className="divide-y divide-gray-100">

            {gridData.map((row, rowIndex) => (

              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">

                {Object.keys(row).map((field) => (

                  <td
                    key={field}
                    className="p-0 border-r border-gray-100 last:border-0"
                  >

                    <input
                      type="text"
                      value={row[field] || ""}
                      onChange={(e) =>
                        handleCellChange(rowIndex, field, e.target.value)
                      }
                      className="w-full px-4 py-3 bg-transparent outline-none text-xs font-bold text-gray-600 focus:bg-white focus:ring-1 focus:ring-gray-200"
                    />

                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>



      {/* FOOTER */}
      <div className="p-4 md:p-6 bg-gray-50/30 border-t border-gray-50">

        <p className="text-center mt-3 text-[8px] font-black text-gray-300 uppercase tracking-widest lg:hidden">
          ← Swipe table to view details →
        </p>

      </div>

    </div>
  );



  if (inline) return content;



  return (
    <AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      >

        <motion.div
          initial={{ scale: 0.95, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 10 }}
          className="w-full max-w-6xl"
        >

          {content}

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );

};

export default ExcelEditorModal;