import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

const CASES = [
  {
    title: "BMW E90 — чип-тюнинг Stage 1",
    result: "+42 л.с. / +58 Нм",
    color: "bg-[#232730]",
  },
  {
    title: "Skoda Octavia — полная керамика",
    result: "Защита 3 года",
    color: "bg-[#1c2a2c]",
  },
  {
    title: "VW Golf GTI — обвес + подвеска",
    result: "Клиренс −30 мм",
    color: "bg-[#2a2018]",
  },
];

export default function Cases() {
  return (
    <section className="bg-asphalt">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <h2 className="font-display font-semibold uppercase text-3xl md:text-4xl tracking-tight text-cream">
              Последние работы
            </h2>
            <Link
              href="/cases"
              className="flex items-center gap-1.5 text-sm font-medium text-signal hover:text-signal transition-colors"
            >
              Все кейсы <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="group border border-line rounded-sm overflow-hidden">
                <div
                  className={`${c.color} aspect-[4/3] flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="scan-texture absolute inset-0" />
                  <span className="font-mono text-cream/25 text-xs tracking-widest">
                    ФОТО КЕЙСА
                  </span>
                </div>
                <div className="p-5">
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
      </div>
    </section>
  );
}
