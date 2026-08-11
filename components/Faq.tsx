"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "@/components/Reveal";

export type FaqItem = { q: string; a: string };

/**
 * FAQ-аккордеон. Вопросы-подзаголовки как прямые формулировки ("Сколько
 * стоит...", "Как быстро...") — по content-стандарту Biotek (Anti-AI-Slop,
 * Citability: подзаголовок = прямой вопрос, первое предложение ответа =
 * прямой ответ). Годится и как AI-citation trap для поисковых сниппетов.
 */
export default function Faq({
  title,
  items,
}: {
  title: string;
  items: FaqItem[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-cream border-t border-line-light">
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <h2 className="font-display font-semibold uppercase text-h2 tracking-tight mb-10">
            {title}
          </h2>
        </Reveal>

        <div className="flex flex-col">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div className="border-b border-line-light">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display uppercase text-base md:text-lg">
                      {item.q}
                    </span>
                    <Plus
                      size={20}
                      className={`shrink-0 text-signal transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="text-sm text-steel/80 leading-relaxed pb-5 pr-8">
                      {item.a}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}