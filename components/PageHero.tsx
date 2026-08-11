import { ShieldCheck } from "lucide-react";
import Button from "@/components/Button";

/**
 * Упрощённый Hero для внутренних страниц (СТО/Тюнинг/Детейлинг и т.д.) —
 * без формы записи и огромной типографики главной, но в той же стилистике
 * (asphalt/grain, signal-бейдж). См. правило разметки страниц в DESIGN.md.
 */
export default function PageHero({
  badge,
  title,
  description,
  ctaHref,
  ctaLabel,
  sheetLabel,
}: {
  badge: string;
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  sheetLabel: string;
}) {
  return (
    <section className="relative bg-asphalt scan-texture grain overflow-hidden">
      <div className="hidden lg:block absolute top-8 right-8 font-mono text-[10px] text-cream/25 tracking-widest [writing-mode:vertical-rl]">
        {sheetLabel}
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cream/55 border border-line rounded-sm px-3 py-1.5 mb-7">
            <ShieldCheck size={14} className="text-signal" />
            {badge}
          </div>

          <h1 className="font-display font-semibold uppercase text-h2 text-cream">
            {title}
          </h1>

          <p className="mt-5 text-cream/60 text-lg leading-relaxed max-w-xl">
            {description}
          </p>

          <div className="mt-9">
            <Button href={ctaHref} size="lg" icon>
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}