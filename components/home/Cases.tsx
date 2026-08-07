import Link from "next/link";
import Reveal from "@/components/Reveal";
import CaseArt from "@/components/home/CaseArt";
import { ArrowRight } from "lucide-react";

const CASES = [
  {
    title: "BMW E90 — чип-тюнинг Stage 1",
    result: "+42 л.с. / +58 Нм",
    variant: "chip" as const,
    art: "SCAN// ECU-REMAP-01",
  },
  {
    title: "Skoda Octavia — полная керамика",
    result: "Защита 3 года",
    variant: "ceramic" as const,
    art: "SCAN// CERAMIC-9H-02",
  },
  {
    title: "VW Golf GTI — обвес + подвеска",
    result: "Клиренс −30 мм",
    variant: "suspension" as const,
    art: "SCAN// COILOVER-03",
  },
];

export default function Cases() {
  return (
    <section className="relative bg-asphalt grain overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <h2 className="font-display font-semibold uppercase text-h2 tracking-tight text-cream">
              Последние работы
            </h2>
            <Link
              href="/cases"
              className="flex items-center gap-1.5 text-sm font-medium text-signal hover:text-signal-dim transition-colors"
            >
              Все кейсы <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="card-depth group border border-line overflow-hidden hover:border-signal/50 transition-colors bg-asphalt">
                <div className="bg-asphalt-2 aspect-[4/3] relative overflow-hidden p-3">
                  <CaseArt variant={c.variant} accentLabel={c.art} />
                </div>
                <div className="p-5 border-t border-line">
                  <h3 className="font-display uppercase text-cream text-base leading-snug">
                    {c.title}
                  </h3>
                  <p className="font-mono text-signal text-sm mt-2">
                    {c.result}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-cream/30 text-xs font-mono mt-8">
          * Иллюстрации — авторские blueprint-схемы. Заменяются на реальные
          фото до/после при заполнении портфолио.
        </p>
      </div>
    </section>
  );
}
