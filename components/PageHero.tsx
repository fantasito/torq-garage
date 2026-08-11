import { ShieldCheck } from "lucide-react";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

/**
 * Hero для внутренних страниц (СТО/Тюнинг/Детейлинг и т.д.) — с фото-слотом
 * (тот же паттерн, что на главной: если файла нет, просто не рендерится,
 * фолбэк-grain остаётся) и входной анимацией. См. DESIGN.md.
 */
export default function PageHero({
  badge,
  title,
  description,
  ctaHref,
  ctaLabel,
  sheetLabel,
  bgImage,
}: {
  badge: string;
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  sheetLabel: string;
  /** Путь в /public, например "/pages/sto-hero.jpg". Промпты — в DESIGN.md. */
  bgImage: string;
}) {
  return (
    <section className="relative bg-asphalt overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-asphalt via-asphalt/90 to-asphalt/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-asphalt/30" />
      <div className="absolute inset-0 scan-texture grain" />

      <div className="hidden lg:block absolute top-8 right-8 z-10 font-mono text-[10px] text-cream/25 tracking-widest [writing-mode:vertical-rl]">
        {sheetLabel}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-2xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cream/55 border border-line rounded-sm px-3 py-1.5 mb-7">
              <ShieldCheck size={14} className="text-signal" />
              {badge}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-display font-semibold uppercase text-h2 text-cream">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 text-cream/60 text-lg leading-relaxed max-w-xl">
              {description}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9">
              <Button href={ctaHref} size="lg" icon>
                {ctaLabel}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}