"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";

export type Part = {
  sku: string;
  name: string;
  category: string;
  price: string;
  /** Сортировочное числовое значение цены (для будущей сортировки/фильтра по диапазону) */
  priceValue: number;
  inStock: boolean;
  eta?: string;
  description?: string;
};

export default function PartsCatalog({
  title,
  subtitle,
  searchPlaceholder,
  allLabel,
  inStockLabel,
  orderLabel,
  colSku,
  colName,
  colCategory,
  colAvailability,
  colPrice,
  emptyLabel,
  parts,
}: {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  allLabel: string;
  inStockLabel: string;
  orderLabel: string;
  colSku: string;
  colName: string;
  colCategory: string;
  colAvailability: string;
  colPrice: string;
  emptyLabel: string;
  parts: Part[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(allLabel);

  const categories = useMemo(
    () => [allLabel, ...Array.from(new Set(parts.map((p) => p.category)))],
    [parts, allLabel]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return parts.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);
      const matchesCategory = category === allLabel || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [parts, query, category, allLabel]);

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <h2 className="font-display font-semibold uppercase text-h2 tracking-tight">
              {title}
            </h2>
            <p className="text-grey text-sm leading-relaxed mt-3">
              {subtitle}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="sticky top-16 z-20 bg-cream/95 backdrop-blur py-4 -mx-5 px-5 md:mx-0 md:px-0">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-grey pointer-events-none"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-white border border-line-light rounded-sm pl-11 pr-4 py-3.5 text-sm focus:border-signal outline-none transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`font-mono text-xs px-3 py-1.5 rounded-sm border transition-colors ${
                    category === c
                      ? "bg-asphalt text-cream border-asphalt"
                      : "border-line-light text-steel hover:border-signal"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-4 card-depth border border-line-light overflow-hidden bg-white">
          <div className="hidden md:grid grid-cols-[130px_1fr_160px_140px_120px] bg-asphalt text-cream/60 text-xs font-mono uppercase px-6 py-3">
            <span>{colSku}</span>
            <span>{colName}</span>
            <span>{colCategory}</span>
            <span>{colAvailability}</span>
            <span className="text-right">{colPrice}</span>
          </div>

          {filtered.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-grey">
              {emptyLabel}
            </div>
          )}

          {filtered.map((p) => (
            <Link
              key={p.sku}
              href={`/parts/${p.sku}`}
              className="grid md:grid-cols-[130px_1fr_160px_140px_120px] gap-1 md:gap-0 px-6 py-4 border-t border-line-light items-center hover:bg-cream/60 transition-colors group"
            >
              <span className="font-mono text-xs text-grey">{p.sku}</span>
              <span className="font-medium group-hover:text-signal transition-colors">
                {p.name}
              </span>
              <span className="text-sm text-steel/70">{p.category}</span>
              <span
                className={`text-xs font-mono ${
                  p.inStock ? "text-ok" : "text-steel/60"
                }`}
              >
                {p.inStock ? inStockLabel : `${orderLabel} ${p.eta ?? ""}`}
              </span>
              <span className="font-mono text-sm md:text-right text-signal font-semibold">
                {p.price}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}