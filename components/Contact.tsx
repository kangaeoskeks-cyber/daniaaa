"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="kontakt" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-[#C41E3A] text-sm font-semibold uppercase tracking-widest mb-3">
            Kontakt
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
            Lad os tale om din virksomhed
          </h2>
          <p className="text-[#4B5563] max-w-lg mx-auto">
            Udfyld formularen, og vi vender tilbage inden for én hverdag med et
            uforpligtende tilbud.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <form className="lg:col-span-2 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#1A1A1A] mb-1.5"
                >
                  Navn
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Dit fulde navn"
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A] transition"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#1A1A1A] mb-1.5"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="din@email.dk"
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A] transition"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-[#1A1A1A] mb-1.5"
              >
                Virksomhed
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Din virksomheds navn"
                className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A] transition"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[#1A1A1A] mb-1.5"
              >
                Besked
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Beskriv din virksomhed og hvad du har brug for hjælp til..."
                className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A] transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-[#C41E3A] text-white font-semibold text-sm rounded hover:bg-[#A01830] transition-colors"
            >
              Send besked
            </button>
          </form>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#F3F4F6] rounded-lg p-6 border-l-4 border-[#C41E3A]">
              <h3 className="font-bold text-[#1A1A1A] mb-4">Kontaktoplysninger</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                  <MapPin size={16} className="text-[#C41E3A] flex-shrink-0 mt-0.5" />
                  <span>Vesterbrogade 123, 1. sal<br />1620 København V</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-[#4B5563]">
                  <Phone size={16} className="text-[#C41E3A] flex-shrink-0" />
                  <span>+45 33 00 00 00</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-[#4B5563]">
                  <Mail size={16} className="text-[#C41E3A] flex-shrink-0" />
                  <span>info@daniaregnskab.dk</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                  <Clock size={16} className="text-[#C41E3A] flex-shrink-0 mt-0.5" />
                  <span>Mandag–fredag<br />08:00–17:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
