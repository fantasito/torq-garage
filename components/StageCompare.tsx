import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export type StageColumn = {
  label: string;
  hp: string;
  torque: string;
  accel: string;
  price?: string;
  highlight?: boolean;
};

/**
 * Таблица сравнения Stock/Stage1/Stage2 — цифры важнее описательного текста
 * для тюнинга (в отличие от СТО, где важнее доверие/гарантия). Значения
 * ориентировочные для среднего 2.0T — реальный прирост подтверждается
 * на дино-стенде индивидуально под конкретный двигатель.
 */
export default function StageCompare({
  title,
  disclaimer,
  columns,
}: {
  title: string;
  disclaimer: string;
  columns: StageColumn[];
}) {
  return (
    <section className="relative bg-asphalt-2 border-y border-line overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <h2 className="font-display font-semibold uppercase text-h2 tracking-tight text-cream mb-12">
            {title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-3 gap-px bg-line rounded-sm overflow-hidden">
          {columns.map((col, i) => (
            <Reveal key={col.label} delay={i * 0.1} className="h-full">
              <div
                className={`h-full flex flex-col p-5 md:p-7 ${
                  col.highlight ? "bg-asphalt" : "bg-asphalt-2"
                }`}
              >
                <div
                  className={`font-mono text-xs uppercase tracking-wide mb-6 ${
                    col.highlight ? "text-signal" : "text-grey"
                  }`}
                >
                  {col.label}
                </div>

                <div className="flex-1 flex flex-col gap-5">
                  <div>
                    <div
                      className={`font-mono font-semibold text-2xl md:text-3xl ${
                        col.highlight ? "text-cream" : "text-cream/70"
                      }`}
                    >
                      {col.hp}
                    </div>
                    <div className="text-[10px] md:text-[11px] text-grey uppercase tracking-wide mt-1">
                      л.с.
                    </div>
                  </div>
                  <div>
                    <div
                      className={`font-mono font-semibold text-2xl md:text-3xl ${
                        col.highlight ? "text-cream" : "text-cream/70"
                      }`}
                    >
                      {col.torque}
                    </div>
                    <div className="text-[10px] md:text-[11px] text-grey uppercase tracking-wide mt-1">
                      Нм
                    </div>
                  </div>
                  <div>
                    <div
                      className={`font-mono font-semibold text-2xl md:text-3xl ${
                        col.highlight ? "text-cream" : "text-cream/70"
                      }`}
                    >
                      {col.accel}
                    </div>
                    <div className="text-[10px] md:text-[11px] text-grey uppercase tracking-wide mt-1">
                      0-100 км/ч
                    </div>
                  </div>
                </div>

                {col.price && (
                  <div className="flex items-center gap-1.5 font-mono text-sm text-signal mt-6 pt-5 border-t border-line">
                    {col.price}
                    <ArrowRight size={14} />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-cream/30 text-xs font-mono mt-6">* {disclaimer}</p>
      </div>
    </section>
  );
}