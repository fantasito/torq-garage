"use client";

import { useState, useMemo } from "react";
import { ArrowUpRight, ImagePlus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";

export type CaseItem = {
  slug: string;
  category: string;
  car: string;
  title: string;
  result: string;
  /** Путь к /public/cases/<file>, необязателен — если нет, виден слот-плейсхолдер */
  image?: string;
};

export default function CasesGallery({
  items,
  allLabel,
  viewCaseLabel,
}: {
  items: CaseItem[];
  allLabel: string;
  viewCaseLabel: string;
}) {
  const [category, setCategory] = useState(allLabel);

  const categories = useMemo(
    () => [allLabel, ...Array.from(new Set(items.map((i) => i.category)))],
    [items, allLabel]
  );

  const filtered = useMemo(
    () =>
      category === allLabel
        ? items
        : items.filter((i) => i.category === category),
    [items, category, allLabel]
  );

  return (
    <section className="bg-asphalt grain">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <Reveal>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`font-mono text-xs px-3.5 py-2 rounded-sm border transition-colors ${
                  category === c
                    ? "bg-signal text-cream border-signal"
                    : "border-line text-cream/60 hover:border-cream/40 hover:text-cream"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filtered.map((item, i) => {
            const isFeatured = i === 0;
            return (
              <Reveal
                key={item.slug}
                delay={i * 0.08}
                className={isFeatured ? "md:col-span-3" : "md:col-span-1"}
              >
                <Link
                  href={`/cases/${item.slug}`}
                  className={`group relative block border border-line overflow-hidden hover:border-signal/60 transition-colors ${
                    isFeatured ? "aspect-[16/8]" : "aspect-[4/3]"
                  }`}
                >
                  <div className="absolute inset-0 bg-asphalt-2 flex flex-col items-center justify-center gap-2 text-cream/15">
                    <ImagePlus size={isFeatured ? 36 : 26} strokeWidth={1.5} />
                    {item.image && (
                      <span className="font-mono text-[10px] tracking-wide">
                        /cases/{item.image}
                      </span>
                    )}
                  </div>
                  {item.image && (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(/cases/${item.image})` }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/20 to-transparent" />

                  <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wide bg-asphalt/80 text-signal px-2.5 py-1 rounded-sm">
                    {item.category}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <div className="font-mono text-[11px] text-cream/50">
                      {item.car}
                    </div>
                    <h3
                      className={`font-display font-semibold uppercase text-cream leading-tight mt-1.5 ${
                        isFeatured ? "text-2xl md:text-3xl max-w-2xl" : "text-lg"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-mono text-sm text-signal">
                        {item.result}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-cream/60 group-hover:text-cream transition-colors">
                        {viewCaseLabel}
                        <ArrowUpRight
                          size={14}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}