"use client";

import { ReactNode, useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "@/components/Reveal";

export type PriceItem = {
  /** Готовый JSX-элемент иконки (рендерится на сервере), не ссылка на компонент —
      React-компоненты нельзя передавать как пропы из Server в Client Component. */
  icon: ReactNode;
  title: string;
  text: string;
  price: string;
  /** Список того, что входит в услугу — раскрывается по клику. */
  details?: string[];
};

/**
 * Сетка карточек услуг/прайса для внутренних страниц. Клик по карточке
 * раскрывает состав услуги (details) — как у товарной карточки, а не
 * статичная плитка. card-depth обязателен (см. правило в DESIGN.md).
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
  const [open, setOpen] = useState<number | null>(null);

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {items.map((item, i) => {
            const isOpen = open === i;
            const hasDetails = !!item.details?.length;
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <button
                  onClick={() => hasDetails && setOpen(isOpen ? null : i)}
                  disabled={!hasDetails}
                  className={`card-depth border bg-white p-7 w-full text-left flex flex-col transition-all duration-300 ${
                    isOpen
                      ? "border-signal"
                      : "border-line-light hover:border-signal hover:-translate-y-1"
                  } ${hasDetails ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`transition-colors [&_svg]:transition-colors ${
                        isOpen ? "[&_svg]:text-signal" : "[&_svg]:text-steel"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {hasDetails && (
                      <Plus
                        size={18}
                        className={`text-grey transition-transform duration-300 ${
                          isOpen ? "rotate-45 text-signal" : ""
                        }`}
                      />
                    )}
                  </div>
                  <h3 className="font-display font-semibold uppercase text-xl mt-5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-steel/80 mt-3 leading-relaxed flex-1">
                    {item.text}
                  </p>

                  {isOpen && hasDetails && (
                    <ul className="mt-4 pt-4 border-t border-line-light flex flex-col gap-2">
                      {item.details!.map((d) => (
                        <li
                          key={d}
                          className="text-sm text-steel/75 flex items-start gap-2"
                        >
                          <span className="text-signal mt-1.5 w-1 h-1 rounded-full bg-signal shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="font-mono text-xs text-signal mt-6">
                    {item.price}
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}