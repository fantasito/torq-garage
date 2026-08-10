import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";
import LeadForm from "@/components/home/LeadForm";
import CountUp from "@/components/CountUp";
import Button from "@/components/Button";

export default function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative bg-asphalt overflow-hidden">
      {/* Фото-фон: положи файл в /public/hero-bg.jpg (промпт для генерации — ниже в ответе).
          Если файла нет — просто не рендерится, ничего не ломает; фолбэк-текстура ниже держит фирменный стиль. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-bg.jpg)" }}
      />
      {/* Тёмный оверлей поверх фото — держит контраст текста независимо от того, что на фото */}
      <div className="absolute inset-0 bg-gradient-to-r from-asphalt via-asphalt/90 to-asphalt/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-asphalt/40" />
      {/* Фолбэк-текстура — держит фирменный grain, если фото ещё не залито */}
      <div className="absolute inset-0 scan-texture grain" />

      {/* wayfinding label — характерная деталь бренда, читается как чертёж */}
      <div className="hidden lg:block absolute top-8 right-8 z-10 font-mono text-[10px] text-cream/25 tracking-widest [writing-mode:vertical-rl]">
        TORQ-GARAGE / SHEET-01
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-start">
        <div className="lg:pt-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cream/55 border border-line rounded-sm px-3 py-1.5 mb-7">
            <ShieldCheck size={14} className="text-signal" />
            {t("badge")}
          </div>

          <h1 className="font-display font-semibold uppercase text-hero text-cream">
            {t("titleLine1")} <br />
            {t("titleVerb")}{" "}
            <span
              className="text-signal underline decoration-wavy [text-decoration-thickness:0.05em] [text-underline-offset:0.28em]"
            >
              {t("titleHighlight")}
            </span>
            , <br />
            {t("titleLine2")}
          </h1>

          <p className="mt-7 text-cream/60 text-lg max-w-md leading-relaxed">
            {t("description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button href="/parts" variant="ghost" icon>
              {t("ctaParts")}
            </Button>
            <a
              href="tel:+380990000000"
              className="font-mono text-cream/85 hover:text-signal transition-colors border-b border-transparent hover:border-signal pb-0.5"
            >
              +380 99 000 00 00
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md border-t border-line pt-6">
            <div>
              <div className="font-mono text-cream text-2xl font-semibold">
                <CountUp value={11} />
              </div>
              <div className="text-[11px] text-grey mt-1 uppercase tracking-wide">
                {t("statYears")}
              </div>
            </div>
            <div>
              <div className="font-mono text-cream text-2xl font-semibold">
                <CountUp value={6400} suffix="+" />
              </div>
              <div className="text-[11px] text-grey mt-1 uppercase tracking-wide">
                {t("statCars")}
              </div>
            </div>
            <div>
              <div className="font-mono text-cream text-2xl font-semibold">
                <CountUp value={97} suffix="%" />
              </div>
              <div className="text-[11px] text-grey mt-1 uppercase tracking-wide">
                {t("statReturn")}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:pt-2 lg:sticky lg:top-28">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}