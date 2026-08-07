"use client";

import { useTranslations } from "next-intl";

// Замени initials/name на реальные SVG-логотипы, когда будут готовы:
// <img src="/logos/bmw.svg" alt="BMW" className="h-7 w-auto opacity-45 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
const BRANDS = [
  { initials: "BMW", name: "BMW" },
  { initials: "MB", name: "Mercedes-Benz" },
  { initials: "AU", name: "Audi" },
  { initials: "VW", name: "Volkswagen" },
  { initials: "SK", name: "Skoda" },
  { initials: "TY", name: "Toyota" },
  { initials: "HY", name: "Hyundai" },
  { initials: "PO", name: "Porsche" },
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
          <span className="w-8 h-8 rounded-sm border border-line flex items-center justify-center font-mono text-[10px] tracking-tight shrink-0">
            {b.initials}
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
