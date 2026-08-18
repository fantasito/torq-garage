import { Check } from "lucide-react";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

export type Package = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

/**
 * Пакеты услуг (Базовый/Стандарт/Премиум) — вместо построчного прайса,
 * когда услуга продаётся комплектами, а не отдельными позициями (детейлинг).
 */
export default function Packages({
  title,
  subtitle,
  packages,
  ctaLabel,
}: {
  title: string;
  subtitle?: string;
  packages: Package[];
  ctaLabel: string;
}) {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <h2 className="font-display font-semibold uppercase text-h2 tracking-tight max-w-lg">
              {title}
            </h2>
            {subtitle && (
              <p className="text-grey max-w-sm text-sm leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.08} className="h-full">
              <div
                className={`h-full flex flex-col p-7 border ${
                  pkg.highlighted
                    ? "card-depth border-signal bg-asphalt"
                    : "border-line-light bg-white"
                }`}
              >
                {pkg.highlighted && (
                  <span className="self-start font-mono text-[10px] uppercase tracking-wide bg-signal text-cream px-2.5 py-1 rounded-sm mb-4">
                    Рекомендуем
                  </span>
                )}
                <h3
                  className={`font-display font-semibold uppercase text-2xl ${
                    pkg.highlighted ? "text-cream" : "text-asphalt"
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`text-sm mt-2 leading-relaxed ${
                    pkg.highlighted ? "text-cream/60" : "text-steel/80"
                  }`}
                >
                  {pkg.description}
                </p>
                <div
                  className={`font-mono text-2xl font-semibold mt-5 ${
                    pkg.highlighted ? "text-signal" : "text-asphalt"
                  }`}
                >
                  {pkg.price}
                </div>

                <ul className="flex flex-col gap-2.5 mt-6 flex-1">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className={`text-sm flex items-start gap-2 ${
                        pkg.highlighted ? "text-cream/75" : "text-steel/80"
                      }`}
                    >
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${
                          pkg.highlighted ? "text-signal" : "text-steel"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href="/contacts"
                  variant={pkg.highlighted ? "primary" : "ghost-dark"}
                  className="mt-7"
                  fullWidth
                >
                  {ctaLabel}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}