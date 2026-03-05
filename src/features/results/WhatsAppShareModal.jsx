import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppShareModal = ({ isOpen, onClose, currentData, allResults }) => {
  const [waNumber, setWaNumber] = useState("");
  const [sendType, setSendType] = useState("all");
  const [customMessage, setCustomMessage] = useState("");

  // Helper function to filter out missing or "N/A" data
  const isDataValid = (val) => {
    if (!val) return false;
    const checkVal = val.toString().toLowerCase().trim();
    return !["n/a", "not available", "none", "", "null", "undefined"].includes(checkVal);
  };

  const handleSend = () => {
    if (!waNumber.trim()) {
      alert("Please enter WhatsApp number");
      return;
    }

    const cleanedNumber = waNumber.replace(/\D/g, "");
    let message = "";

    if (sendType === "all") {
      // Professional Header
      message = `*BUSINESS CARD DETAILS* 📇\n`;
      message += `_Extracted via CardScan AI_\n`;
      message += `\n━━━━━━━━━━━━━━━━━━━━\n`;

      const dataToProcess = allResults && allResults.length > 0 ? allResults : [currentData];

      dataToProcess.forEach((card, index) => {
        // Numbering only if multiple cards exist
        if (dataToProcess.length > 1) {
          message += `\n*ENTRY #${index + 1}*\n`;
        }

        const fields = [
          { label: "👤 Name", value: card?.name },
          { label: "💼 Job", value: card?.designation || card?.jobTitle },
          { label: "📞 Phone", value: card?.phone },
          { label: "📧 Email", value: card?.email },
          { label: "🏢 Co.", value: card?.company },
          { label: "🌐 Web", value: card?.website },
          { label: "📍 Addr", value: card?.address },
        ];

        fields.forEach((field) => {
          if (isDataValid(field.value)) {
            message += `*${field.label}* : ${field.value}\n`;
          }
        });

        // Separator between cards
        if (dataToProcess.length > 1 && index !== dataToProcess.length - 1) {
          message += `\n--------------------\n`;
        }
      });

      message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
      message += `\nHope this helps! 😊\n_Sent via CardScan AI_`;
    } else {
      if (!customMessage.trim()) {
        alert("Please enter a custom message");
        return;
      }
      message = customMessage;
    }

    const whatsappURL = `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
    
    // Reset and Close
    setWaNumber("");
    setCustomMessage("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[100] bg-black/40 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-gray-800">WhatsApp Share</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 mb-1 block">
                  Recipient Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 919876543210"
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  className="w-full border border-gray-100 bg-gray-50 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 font-semibold text-gray-700"
                />
              </div>

              <div className="flex gap-6 py-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-gray-600">
                  <input
                    type="radio"
                    checked={sendType === "all"}
                    onChange={() => setSendType("all")}
                    className="w-4 h-4 accent-green-500"
                  />
                  Smart Format
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-gray-600">
                  <input
                    type="radio"
                    checked={sendType === "custom"}
                    onChange={() => setSendType("custom")}
                    className="w-4 h-4 accent-green-500"
                  />
                  Custom Text
                </label>
              </div>

              {sendType === "custom" && (
                <textarea
                  rows="4"
                  placeholder="Write something special..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full border border-gray-100 bg-gray-50 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium"
                />
              )}

              <button
                onClick={handleSend}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-green-100 transition-all active:scale-95 mt-2"
              >
                Send on WhatsApp 🚀
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppShareModal;