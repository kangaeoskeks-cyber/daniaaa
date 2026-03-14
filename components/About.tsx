import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Autoriserede revisorer og bogholdere",
  "Specialiseret i dansk skatte- og regnskabslovgivning",
  "Personlig kontakt og dedikeret sagsbehandler",
  "Hurtig responstid og proaktiv kommunikation",
  "Sikker digital dokumenthåndtering",
];

export default function About() {
  return (
    <section id="om-os" className="py-20 bg-[#F3F4F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[#C41E3A] text-sm font-semibold uppercase tracking-widest mb-3">
              Om os
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-5 leading-tight">
              Regnskabseksperter med rødder i København
            </h2>
            <p className="text-[#4B5563] leading-relaxed mb-4">
              Dania Regnskab blev grundlagt med én mission: at give danske
              virksomheder adgang til professionel regnskabsassistance uden den
              høje pris og kompleksitet, der typisk følger med.
            </p>
            <p className="text-[#4B5563] leading-relaxed mb-8">
              Vi tror på transparens, ærlighed og langsigtede relationer. Vores
              team af erfarne revisorer og bogholdere kender de danske regler
              indgående — og holder sig konstant opdateret, så du ikke behøver
              det.
            </p>
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-[#4B5563]">
                  <CheckCircle2 size={18} className="text-[#C41E3A] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Accent image placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg bg-[#E5E7EB] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E5E7EB] to-[#d1d5db]" />
              <div className="relative z-10 text-center px-8">
                <div className="w-16 h-16 rounded-full bg-[#C41E3A] flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-extrabold text-2xl">D</span>
                </div>
                <p className="text-[#1A1A1A] font-bold text-xl">Dania Regnskab</p>
                <p className="text-[#4B5563] text-sm mt-1">København, Danmark</p>
              </div>
            </div>
            {/* Decorative border */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-[#C41E3A] rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
