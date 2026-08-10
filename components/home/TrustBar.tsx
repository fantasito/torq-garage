"use client";

import { useTranslations } from "next-intl";

// Логотипы брендов — товарные знаки, AI их генерировать нельзя (риск нарушения прав).
// Скачай официальные SVG с Wikimedia Commons / worldvectorlogo.com и положи в
// /public/logos/<file> с именем как в поле `logo` ниже — слот подхватит их сам.
// Пока файла нет — виден нейтральный бейдж с инициалами (как сейчас).
const BRANDS = [
  { initials: "BMW", name: "BMW", logo: "bmw.svg" },
  { initials: "MB", name: "Mercedes-Benz", logo: "mercedes.svg" },
  { initials: "AU", name: "Audi", logo: "audi.svg" },
  { initials: "VW", name: "Volkswagen", logo: "volkswagen.svg" },
  { initials: "SK", name: "Skoda", logo: "skoda.svg" },
  { initials: "TY", name: "Toyota", logo: "toyota.svg" },
  { initials: "HY", name: "Hyundai", logo: "hyundai.svg" },
  { initials: "PO", name: "Porsche", logo: "porsche.svg" },
];

function Row() {
  return (
    <div className="flex items-center gap-10 shrink-0 pr-10">
      {BRANDS.map((b) => (
        <div
          key={b.name}
          title={b.name}
          className="flex items-center gap-2.5 text-cream/35 hover:text-cream/80 transition-colors cursor-default"
        >
          <span className="relative w-8 h-8 rounded-sm border border-line flex items-center justify-center font-mono text-[10px] tracking-tight shrink-0 overflow-hidden">
            {b.initials}
            <span
              className="absolute inset-0 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/logos/${b.logo})` }}
            />
          </span>
          <span className="font-display text-sm tracking-wide whitespace-nowrap">
            {b.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TrustBar() {
  const t = useTranslations("trustBar");
  return (
    <section className="bg-asphalt-2 border-b border-line overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-7 pb-1">
        <div className="text-[11px] font-mono text-grey uppercase tracking-widest mb-5">
          {t("title")}
        </div>
      </div>
      <div className="marquee-wrap py-2">
        <div className="marquee-track flex w-max">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}