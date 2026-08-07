import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

const STEPS = ["step1", "step2", "step3", "step4"] as const;
const NUMS = ["01", "02", "03", "04"];

export default function Process() {
  const t = useTranslations("process");
  return (
    <section className="relative bg-asphalt scan-texture grain overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <h2 className="font-display font-semibold uppercase text-h2 tracking-tight text-cream mb-14">
            {t("title")}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-8 md:gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s} delay={i * 0.1}>
              <div className="relative pl-0 md:border-l md:border-line md:pl-6">
                <div className="font-mono text-signal text-sm mb-3">
                  {NUMS[i]}
                </div>
                <h3 className="font-display uppercase text-lg text-cream mb-2">
                  {t(`${s}.title`)}
                </h3>
                <p className="text-sm text-cream/55 leading-relaxed">
                  {t(`${s}.text`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
