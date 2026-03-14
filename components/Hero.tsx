export default function Hero() {
  return (
    <section className="bg-[#1A1A1A] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-[#C41E3A] text-sm font-semibold uppercase tracking-widest mb-4">
            Regnskabsassistance til danske virksomheder
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Fokus på din forretning.{" "}
            <span className="text-[#C41E3A]">Vi klarer regnskabet.</span>
          </h1>
          <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
            Dania Regnskab leverer professionel bogføring, lønadministration og
            finansiel rådgivning til virksomheder i hele Danmark. Vi sikrer
            overholdelse af dansk lovgivning — så du kan koncentrere dig om det,
            du er bedst til.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#C41E3A] text-white font-semibold rounded hover:bg-[#A01830] transition-colors text-sm"
            >
              Få en gratis konsultation
            </a>
            <a
              href="#ydelser"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-gray-500 text-gray-300 font-semibold rounded hover:border-white hover:text-white transition-colors text-sm"
            >
              Se vores ydelser
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
