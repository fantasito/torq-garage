import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";
import LeadForm from "@/components/home/LeadForm";
import CountUp from "@/components/CountUp";
import Button from "@/components/Button";

export default function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative bg-asphalt scan-texture grain overflow-hidden">
      {/* wayfinding label — характерная деталь бренда, читается как чертёж */}
      <div className="hidden lg:block absolute top-8 right-8 font-mono text-[10px] text-cream/25 tracking-widest [writing-mode:vertical-rl]">
        TORQ-GARAGE / SHEET-01
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-start">
        <div className="lg:pt-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cream/55 border border-line rounded-sm px-3 py-1.5 mb-7">
            <ShieldCheck size={14} className="text-signal" />
            {t("badge")}
          </div>

          <h1 className="font-display font-semibold uppercase text-hero text-cream">
            {t("titleLine1")}
            <br />
            {t("titleVerb")}{" "}
            <span className="relative inline-block text-signal">
              {t("titleHighlight")}
              <svg
                viewBox="0 0 60 10"
                className="absolute left-0 -bottom-1 w-full h-2.5"
                preserveAspectRatio="none"
              >
                <path
                  d="M1 6 C 15 2, 25 9, 30 5 S 50 1, 59 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            ,
            <br />
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
