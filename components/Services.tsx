import { BookOpen, Users, FileText, BarChart2, TrendingUp } from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Bogføring",
    description:
      "Løbende bogføring og afstemning der sikrer et præcist og opdateret overblik over din virksomheds økonomi til enhver tid.",
  },
  {
    icon: Users,
    title: "Lønadministration",
    description:
      "Vi håndterer lønkørsel, indberetninger til SKAT og e-Boks samt al tilhørende administration for dine medarbejdere.",
  },
  {
    icon: FileText,
    title: "Selvangivelse",
    description:
      "Korrekt og rettidig indberetning af selskabsskat og personskat — vi sikrer, at du udnytter alle lovlige fradragsmuligheder.",
  },
  {
    icon: BarChart2,
    title: "Årsrapport",
    description:
      "Udarbejdelse af årsrapporter i overensstemmelse med årsregnskabsloven og indsendelse til Erhvervsstyrelsen.",
  },
  {
    icon: TrendingUp,
    title: "Finansiel rådgivning",
    description:
      "Strategisk sparring om budget, likviditet og vækst — vi hjælper dig med at træffe bedre beslutninger baseret på tal.",
  },
];

export default function Services() {
  return (
    <section id="ydelser" className="py-20 bg-[#F3F4F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-[#C41E3A] text-sm font-semibold uppercase tracking-widest mb-3">
            Vores ydelser
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
            Alt hvad din virksomhed har brug for
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto">
            Vi tilbyder et komplet spektrum af regnskabsydelser, der er skræddersyet til
            danske virksomheders behov og krav.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-lg p-7 border border-gray-200 hover:border-[#C41E3A] hover:shadow-md transition-all group"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded bg-[#F3F4F6] group-hover:bg-[#C41E3A] transition-colors mb-5">
                  <Icon
                    size={22}
                    className="text-[#C41E3A] group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}

          {/* Filler CTA card */}
          <div className="bg-[#C41E3A] rounded-lg p-7 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Har du spørgsmål?
              </h3>
              <p className="text-sm text-red-100 leading-relaxed">
                Vi tilbyder en gratis og uforpligtende konsultation, hvor vi
                afdækker dine behov.
              </p>
            </div>
            <a
              href="#kontakt"
              className="mt-6 inline-flex items-center justify-center px-5 py-2.5 bg-white text-[#C41E3A] font-semibold text-sm rounded hover:bg-gray-100 transition-colors"
            >
              Kontakt os
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
