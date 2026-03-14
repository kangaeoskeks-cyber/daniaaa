const links = [
  { label: "Ydelser", href: "#ydelser" },
  { label: "Om Os", href: "#om-os" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <p className="text-white font-bold text-xl tracking-tight mb-3">DANIA</p>
            <p className="text-sm leading-relaxed">
              Professionel regnskabsassistance til danske virksomheder.
              Vi sikrer compliance og giver dig ro til at fokusere på din forretning.
            </p>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-4">Navigation</p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-[#C41E3A] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-4">Kontakt</p>
            <ul className="space-y-2 text-sm">
              <li>Vesterbrogade 123, 1. sal</li>
              <li>1620 København V</li>
              <li>+45 33 00 00 00</li>
              <li>info@daniaregnskab.dk</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} Dania Regnskab ApS. Alle rettigheder forbeholdes.</p>
          <p>CVR: 12 34 56 78</p>
        </div>
      </div>
    </footer>
  );
}
