import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import { ArrowRight, ImagePlus } from "lucide-react";

// Файлы фото кладутся в /public/cases/<image>. Промпты для генерации — в DESIGN.md.
const CASES = [
  {
    title: "BMW E90 — чип-тюнинг Stage 1",
    result: "+42 л.с. / +58 Нм",
    image: "bmw-e90-chip-tuning.jpg",
  },
  {
    title: "Skoda Octavia — полная керамика",
    result: "Защита 3 года",
    image: "skoda-octavia-ceramic-coating.jpg",
  },
  {
    title: "VW Golf GTI — обвес + подвеска",
    result: "Клиренс −30 мм",
    image: "vw-golf-gti-coilover-suspension.jpg",
  },
];

export default function Cases() {
  const t = useTranslations("cases");
  return (
    <section className="relative bg-asphalt grain overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <h2 className="font-display font-semibold uppercase text-h2 tracking-tight text-cream">
              {t("title")}
            </h2>
            <Link
              href="/cases"
              className="flex items-center gap-1.5 text-sm font-medium text-signal hover:text-signal-dim transition-colors"
            >
              {t("viewAll")} <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="card-depth group border border-line overflow-hidden hover:border-signal/50 transition-colors bg-asphalt">
                <div className="relative aspect-[4/3] bg-asphalt-2 overflow-hidden">
                  {/* Слот под фото: пока файла нет — виден плейсхолдер с точным
                      именем файла, чтобы не перепутать при заливке. Как только
                      /public/cases/<image> появится — он полностью перекроет
                      этот слой, ничего в коде менять не нужно. */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-cream/15">
                    <ImagePlus size={28} strokeWidth={1.5} />
                    <span className="font-mono text-[10px] tracking-wide">
                      /cases/{c.image}
                    </span>
                  </div>
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(/cases/${c.image})` }}
                  />
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

        <p className="text-cream/30 text-xs font-mono mt-8">* {t("disclaimer")}</p>
      </div>
    </section>
  );
}