import React from "react";

const Navbar = ({ onBack }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[110] bg-[#f4b400] md:h-[56px] h-16 flex items-center shadow-md">
      
      {/* Container */}
      <div className="w-full px-4 md:px-6 flex items-center justify-start">
        
        {/* Logo Box */}
        <div
          onClick={() => window.location.reload()}
          className="bg-white px-3 py-1.5 md:px-4 md:py-1.5 rounded-lg shadow-sm flex items-center justify-center hover:shadow-md transition-all cursor-pointer active:scale-95 border border-white/20"
        >
          <img
            src="/logo3.png"
            alt="atrav platforms"
            className="h-5 md:h-6 w-auto object-contain"
          />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;