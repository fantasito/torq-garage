import { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

export type PriceItem = {
  icon: LucideIcon;
  title: string;
  text: string;
  price: string;
};

/**
 * Сетка карточек услуг/прайса для внутренних страниц. Используется на
 * СТО/Тюнинг/Детейлинг с разным набором items. card-depth обязателен
 * (это самостоятельные карточки-плитки — см. правило в DESIGN.md).
 */
export default function PriceList({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: PriceItem[];
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="card-depth border border-line-light bg-white p-7 h-full flex flex-col">
                <item.icon size={26} strokeWidth={1.5} className="text-steel" />
                <h3 className="font-display font-semibold uppercase text-xl mt-5">
                  {item.title}
                </h3>
                <p className="text-sm text-steel/80 mt-3 leading-relaxed flex-1">
                  {item.text}
                </p>
                <div className="font-mono text-xs text-signal mt-6">
                  {item.price}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}