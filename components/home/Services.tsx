import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Wrench, Cpu, PackageSearch, Sparkles, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function Services() {
  const t = useTranslations("services");

  // Настоящий bento: СТО — большой квадрат 2×2, Тюнинг/Запчасти — узкие карточки
  // друг под другом рядом, Детейлинг — широкий баннер на всю ширину снизу.
  const SERVICES = [
    {
      href: "/sto",
      icon: Wrench,
      key: "sto",
      n: "01",
      size: "xl",
      area: "md:col-span-2 md:row-span-2",
    },
    {
      href: "/tuning",
      icon: Cpu,
      key: "tuning",
      n: "02",
      size: "sm",
      area: "md:col-start-3 md:row-start-1",
    },
    {
      href: "/parts",
      icon: PackageSearch,
      key: "parts",
      n: "03",
      size: "sm",
      area: "md:col-start-3 md:row-start-2",
    },
    {
      href: "/detailing",
      icon: Sparkles,
      key: "detailing",
      n: "04",
      size: "wide",
      area: "md:col-span-3 md:row-start-3",
    },
  ] as const;

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <h2 className="font-display font-semibold uppercase text-h2 tracking-tight max-w-lg">
              {t("title")}
            </h2>
            <p className="text-grey max-w-sm text-sm leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[minmax(200px,auto)_minmax(200px,auto)_auto] gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.href} delay={i * 0.08} className={s.area}>
              <Link
                href={s.href}
                className={`card-depth group flex flex-col border border-line-light hover:border-signal bg-white transition-colors h-full ${
                  s.size === "xl" ? "p-9 justify-between" : "p-7"
                } ${s.size === "wide" ? "md:flex-row md:items-center md:justify-between md:gap-8" : ""}`}
              >
                <div className={s.size === "wide" ? "md:flex md:items-center md:gap-4" : ""}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-grey">
                        {s.n}
                      </span>
                      <s.icon
                        size={s.size === "xl" ? 34 : s.size === "wide" ? 28 : 26}
                        strokeWidth={1.5}
                        className="text-steel"
                      />
                    </div>
                    {s.size !== "wide" && (
                      <ArrowUpRight
                        size={20}
                        className="text-grey group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      />
                    )}
                  </div>
                  <h3
                    className={`font-display font-semibold uppercase mt-6 md:mt-6 ${
                      s.size === "xl" ? "text-3xl" : s.size === "wide" ? "text-2xl" : "text-xl"
                    } ${s.size === "wide" ? "md:mt-0" : ""}`}
                  >
                    {t(`${s.key}.title`)}
                  </h3>
                  {s.size === "xl" && (
                    <p className="text-sm text-steel/80 mt-3 leading-relaxed max-w-sm">
                      {t(`${s.key}.text`)}
                    </p>
                  )}
                </div>

                {s.size !== "xl" && s.size !== "wide" && (
                  <p className="text-sm text-steel/80 mt-3 leading-relaxed">
                    {t(`${s.key}.text`)}
                  </p>
                )}
                {s.size === "wide" && (
                  <p className="text-sm text-steel/80 mt-3 md:mt-0 leading-relaxed max-w-sm">
                    {t(`${s.key}.text`)}
                  </p>
                )}

                <div className="flex items-center justify-between gap-4 mt-6">
                  <div className="font-mono text-xs text-signal">
                    {t(`${s.key}.price`)}
                  </div>
                  {s.size === "wide" && (
                    <ArrowUpRight
                      size={20}
                      className="text-grey group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                    />
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}