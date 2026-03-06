import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EmailShareModal = ({ isOpen, onClose, currentData, allResults }) => {
  const [targetEmail, setTargetEmail] = useState(""); 
  const [includeAll, setIncludeAll] = useState(false); 

  if (!isOpen) return null;

  const handleSendEmail = () => {
    // 1. Data Validation
    if (!currentData && !allResults) return;

    // 2. Subject aur Body taiyar karna
    const subject = includeAll 
      ? `Full Business Cards Report (${allResults.length} Contacts)` 
      : `Contact Information: ${currentData?.name || "Business Card"}`;
    
    let bodyText = "";

    if (includeAll && allResults && allResults.length > 0) {
      bodyText = "Hi,\n\nHere is the complete list of scanned contacts:\n\n";
      
      allResults.forEach((item, index) => {
        // Data extraction (Ensuring consistency with your Results component logic)
        const c = item.savedCard || item.data || item;
        
        bodyText += `---------------- Contact #${index + 1} ----------------\n`;
        bodyText += `Name: ${c.name || c.fullName || "N/A"}\n`;
        bodyText += `Designation: ${c.designation || "N/A"}\n`;
        bodyText += `Company: ${c.company || "N/A"}\n`;
        bodyText += `Phone: ${c.phone || c.mobile || "N/A"}\n`;
        bodyText += `Email: ${c.email || "N/A"}\n`;
        bodyText += `Website: ${c.website || "N/A"}\n`;
        bodyText += `Address: ${c.address || "N/A"}\n\n`;
      });
      
      bodyText += "Sent via Business Card Scanner App.";
    } else {
      // Single card data (Normalized)
      const c = currentData;
      bodyText = `Hi,\n\nHere are the contact details for ${c.name || "the scanned card"}:\n\n` +
                 `Name: ${c.name || "N/A"}\n` +
                 `Designation: ${c.designation || "N/A"}\n` +
                 `Company: ${c.company || "N/A"}\n` +
                 `Phone: ${c.phone || "N/A"}\n` +
                 `Email: ${c.email || "N/A"}\n` +
                 `Website: ${c.website || "N/A"}\n` +
                 `Address: ${c.address || "N/A"}\n\n` +
                 `Sent via Business Card Scanner App.`;
    }

    // 3. Gmail Direct Compose Link (Best for Chrome/Android)
    // Isse bina kisi popup block ke seedha Gmail draft khulega
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    
    // Naya tab kholne ke liye
    window.open(gmailUrl, "_blank");
    
    // Modal band karne ke liye
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        {/* Background Overlay to close */}
        <div className="absolute inset-0" onClick={onClose}></div>

        <motion.div 
          initial={{ y: "100%", opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white w-full max-w-md rounded-t-[40px] sm:rounded-[40px] overflow-hidden shadow-2xl p-6 sm:p-8"
        >
          {/* Handle for mobile drag visual */}
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden" />

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-4 text-4xl shadow-sm transform rotate-3">
              📧
            </div>
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">Email Export</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Direct Draft to Gmail</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 tracking-widest">Recipient Email</label>
              <input 
                type="email"
                placeholder="example@gmail.com"
                value={targetEmail}
                onChange={(e) => setTargetEmail(e.target.value)}
                className="w-full p-4 mt-1 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-red-400 transition-all font-bold text-gray-700 placeholder:text-gray-300"
              />
            </div>

            {/* Selection Box */}
            <div 
              onClick={() => setIncludeAll(!includeAll)}
              className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all duration-300 ${includeAll ? "border-red-500 bg-red-50/50 shadow-md transform scale-[1.02]" : "border-gray-100 bg-white"}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${includeAll ? "bg-red-500 border-red-500 shadow-sm" : "border-gray-300 bg-white"}`}>
                  {includeAll && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm italic">Include All Records</p>
                  <p className="text-[10px] text-red-400 font-black uppercase tracking-tighter">
                    Batch Export: {allResults?.length || 0} Cards
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button 
                onClick={handleSendEmail}
                disabled={!targetEmail.includes("@")}
                className="w-full py-5 bg-[#f34a4a] disabled:bg-gray-200 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-100 hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Draft in Gmail
              </button>

              <button 
                onClick={onClose} 
                className="w-full py-2 text-gray-400 font-bold hover:text-red-500 transition-all text-[11px] uppercase tracking-[0.2em]"
              >
                Close Window
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EmailShareModal;