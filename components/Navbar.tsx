"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Ydelser", href: "#ydelser" },
  { label: "Om Os", href: "#om-os" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#" className="text-2xl font-bold tracking-tight text-[#1A1A1A]">
          DANIA
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#4B5563] hover:text-[#C41E3A] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="text-sm font-semibold bg-[#C41E3A] text-white px-4 py-2 rounded hover:bg-[#A01830] transition-colors"
          >
            Kom i gang
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#1A1A1A]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-[#4B5563] hover:text-[#C41E3A] border-b border-gray-100 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setOpen(false)}
            className="mt-3 block text-center text-sm font-semibold bg-[#C41E3A] text-white px-4 py-2 rounded hover:bg-[#A01830] transition-colors"
          >
            Kom i gang
          </a>
        </div>
      )}
    </header>
  );
}
