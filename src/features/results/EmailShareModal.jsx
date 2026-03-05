import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EmailShareModal = ({ isOpen, onClose, currentData, allResults }) => {
  const [targetEmail, setTargetEmail] = useState(""); 
  const [includeAll, setIncludeAll] = useState(false); 

  if (!isOpen) return null;

  const handleSendEmail = () => {
    // 1. Subject aur Body taiyar karna (Full Data ke saath)
    const subject = includeAll ? "Full Business Cards Report" : `Contact Info: ${currentData.name}`;
    
    let bodyText = "";
    if (includeAll) {
      bodyText = "Here is the complete list of scanned contacts with all available details:\n\n";
      
      allResults.forEach((item, index) => {
        // Data extraction (Normalization taaki koi field miss na ho)
        const c = item.savedCard || item.data || item;
        
        bodyText += `--- Contact #${index + 1} ---\n`;
        bodyText += `Name: ${c.name || "N/A"}\n`;
        bodyText += `Designation: ${c.designation || "N/A"}\n`;
        bodyText += `Phone: ${c.phone || "N/A"}\n`;
        bodyText += `Email: ${c.email || "N/A"}\n`;
        bodyText += `Company: ${c.company || "N/A"}\n`;
        bodyText += `Website: ${c.website || "N/A"}\n`;
        bodyText += `Address: ${c.address || "N/A"}\n\n`;
      });
    } else {
      // Single card ke liye poora data
      bodyText = `Hi,\n\nHere are the complete contact details:\n\n` +
                 `Name: ${currentData.name || "N/A"}\n` +
                 `Designation: ${currentData.designation || "N/A"}\n` +
                 `Phone: ${currentData.phone || "N/A"}\n` +
                 `Email: ${currentData.email || "N/A"}\n` +
                 `Company: ${currentData.company || "N/A"}\n` +
                 `Website: ${currentData.website || "N/A"}\n` +
                 `Address: ${currentData.address || "N/A"}\n\n` +
                 `Sent via Business Card Scanner.`;
    }

    // 2. Direct Gmail Link (Chrome Profiles issue fix karne ke liye)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    
    window.open(gmailUrl, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="absolute inset-0" onClick={onClose}></div>

        <motion.div 
          initial={{ y: "100%", opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          exit={{ y: "100%", opacity: 0 }}
          className="relative bg-white w-full max-w-md rounded-t-[40px] sm:rounded-[40px] overflow-hidden shadow-2xl p-8"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">📧</div>
            <h3 className="text-2xl font-black text-gray-800">Direct Email</h3>
            <p className="text-sm text-gray-500 font-medium px-4">Enter recipient email and share full details</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 tracking-widest">Recipient Email</label>
              <input 
                type="email"
                placeholder="sandeepdubliya64@gmail.com"
                value={targetEmail}
                onChange={(e) => setTargetEmail(e.target.value)}
                className="w-full p-4 mt-1 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-red-400 transition-all font-bold text-gray-700"
              />
            </div>

            <div 
              onClick={() => setIncludeAll(!includeAll)}
              className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all duration-300 ${includeAll ? "border-red-500 bg-red-50/50 shadow-sm" : "border-gray-100 bg-white"}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${includeAll ? "bg-red-500 border-red-500" : "border-gray-300 bg-white"}`}>
                  {includeAll && <span className="text-white text-[10px]">✓</span>}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Include All Scanned Cards</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                    {allResults.length} records with full information
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSendEmail}
              className="w-full py-5 bg-[#f34a4a] text-white rounded-2xl font-black text-lg shadow-lg shadow-red-100 hover:bg-red-600 transition-all active:scale-95 mt-2"
            >
              Send Now
            </button>

            <button onClick={onClose} className="w-full py-2 text-gray-400 font-bold hover:text-gray-600 transition-all text-sm">
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EmailShareModal;