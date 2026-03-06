import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ onBack }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = ["Home", "Destinations", "Offers", "Contact"];

  return (
    <>
      {/* ── MAIN NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-[110] bg-white border-b border-gray-100 shadow-sm">
        <div className="w-full px-4 md:px-8 lg:px-12 h-14 md:h-16 flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <img
              src="/logo3.png"
              alt="trav platforms"
              className="h-7 md:h-8 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <button
                key={link}
                className="text-[13px] lg:text-[14px] font-semibold text-gray-600 hover:text-amber-500 transition-colors duration-150 tracking-wide"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

        {/* ── MOBILE DROPDOWN ── */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1 shadow-md">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => setMobileOpen(false)}
                className="text-left text-[13px] font-semibold text-gray-600 hover:text-amber-500 hover:bg-amber-50 px-3 py-2.5 rounded-lg transition-all"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Spacer so content doesn't hide behind fixed navbar */}
      <div className="h-14 md:h-16" />
    </>
  );
};

export default Navbar;