import React, { useRef } from "react";
import { X } from "lucide-react";

export default function UploadBox({
  label,
  subLabel,
  required = false,
  preview,
  onFileChange,
  onBoxClick,
  onRemove
}) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (onBoxClick) {
      onBoxClick();
    } else {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onRemove) onRemove();
  };

  return (
    <div className="flex flex-col w-full group/main">
      
      <label className="text-[10px] md:text-[11px] font-bold text-gray-400 mb-2 md:mb-3 flex items-center gap-1 uppercase tracking-[0.2em] ml-1">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>

      <div
        onClick={handleClick}
        /* Fixed height 'h-[280px]' add kiya hai taaki box ka size na badle */
        className={`
          relative cursor-pointer flex flex-col items-center justify-center
          w-full h-[280px] bg-white rounded-[2rem] border border-gray-100
          shadow-sm hover:shadow-xl transition-all duration-500
          text-center overflow-hidden
          ${preview ? "border-[#eab308]" : "hover:border-black"}
        `}
      >

        {preview ? (
          /* Preview state mein image poore box mein fit rahegi */
          <div className="absolute inset-0 w-full h-full">
            <img
              src={preview}
              alt="Preview"
              /* object-cover se image box ko poora bharegi bina shape bigade */
              className="w-full h-full object-cover"
            />

            {/* REMOVE BUTTON */}
            <button
              onClick={handleRemove}
              className="absolute top-4 right-4 z-20 bg-black/80 hover:bg-black text-white p-2 rounded-full shadow-lg transition-transform active:scale-90"
            >
              <X size={16} />
            </button>

            {/* Replace Overlay - Only shows on hover */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-black/40 opacity-0 group-hover/main:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <span className="bg-white text-[10px] font-black px-6 py-2.5 rounded-full text-black shadow-2xl uppercase tracking-widest translate-y-2 group-hover/main:translate-y-0 transition-transform">
                Replace Image
              </span>
            </div>
          </div>
        ) : (
          /* Placeholder state */
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-2 group-hover/main:bg-[#eab308] transition-colors">
              <svg
                className="w-7 h-7 text-gray-400 group-hover/main:text-white transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>

            <div>
              <span className="text-xl font-black text-gray-900 block">
                Upload Image
              </span>
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                Max size 10MB
              </span>
            </div>
          </div>
        )}

      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />
    </div>
  );
}