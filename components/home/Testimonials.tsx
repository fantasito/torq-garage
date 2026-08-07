import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

const REVIEWS = ["review1", "review2", "review3"] as const;

export default function Testimonials() {
  const t = useTranslations("testimonials");
  return (
    <section className="bg-cream border-t border-line-light">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <h2 className="font-display font-semibold uppercase text-h2 tracking-tight mb-12">
            {t("title")}
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((key, i) => (
            <Reveal key={key} delay={i * 0.08}>
              <div className="card-depth border border-line-light bg-white p-6 h-full flex flex-col">
                <p className="text-sm text-asphalt/80 leading-relaxed flex-1">
                  «{t(`${key}.text`)}»
                </p>
                <div className="mt-5 pt-4 border-t border-line-light font-mono text-xs">
                  <div className="text-asphalt font-medium">{t(`${key}.name`)}</div>
                  <div className="text-grey mt-0.5">{t(`${key}.car`)}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
