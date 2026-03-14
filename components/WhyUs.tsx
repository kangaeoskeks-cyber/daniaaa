import { ShieldCheck, Award, Building2 } from "lucide-react";

const stats = [
  {
    icon: Award,
    value: "15+",
    label: "Års erfaring",
    description:
      "Over 15 års erfaring med regnskab og rådgivning til danske virksomheder.",
  },
  {
    icon: Building2,
    value: "200+",
    label: "Tilfredse kunder",
    description:
      "Fra iværksættere til mellemstore virksomheder — vi kender alle størrelser.",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Lovmæssig compliance",
    description:
      "Fuld overholdelse af dansk skatte- og regnskabslovgivning — altid opdateret.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#C41E3A] text-sm font-semibold uppercase tracking-widest mb-3">
              Hvorfor Dania?
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-5 leading-tight">
              Din pålidelige partner i en kompleks lovgivningsmæssig virkelighed
            </h2>
            <p className="text-[#4B5563] leading-relaxed mb-6">
              Dansk regnskabslovgivning er i konstant forandring. Hos Dania
              Regnskab holder vi os løbende opdateret, så du altid er compliant
              — og aldrig overrasket. Vi fungerer som din outsourcede
              økonomipartner, der kender din forretning og taler dit sprog.
            </p>
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#C41E3A] text-white font-semibold text-sm rounded hover:bg-[#A01830] transition-colors"
            >
              Tal med en rådgiver
            </a>
          </div>

          <div className="grid gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-start gap-5 p-5 rounded-lg bg-[#F3F4F6] border-l-4 border-[#C41E3A]"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded bg-[#C41E3A] flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-extrabold text-[#1A1A1A]">
                        {stat.value}
                      </span>
                      <span className="text-sm font-semibold text-[#4B5563]">
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-sm text-[#4B5563] leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
