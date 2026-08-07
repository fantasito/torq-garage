import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

const PARTS = [
  { code: "BR-4471-F", name: "Тормозные колодки передние", price: "890 ₴", cat: "Тормозная система" },
  { code: "SU-1182-K", name: "Амортизатор задний Bilstein", price: "2 340 ₴", cat: "Подвеска" },
  { code: "EN-9903-T", name: "Турбина в сборе Garrett", price: "18 600 ₴", cat: "Двигатель" },
  { code: "EX-2247-M", name: "Выхлопная система спорт", price: "6 750 ₴", cat: "Тюнинг" },
];

export default function PartsTeaser() {
  return (
    <section className="bg-cream border-t border-line-light">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
            <h2 className="font-display font-semibold uppercase text-h2 tracking-tight">
              Каталог запчастей
            </h2>
            <Link
              href="/parts"
              className="flex items-center gap-1.5 text-sm font-medium text-signal hover:text-signal transition-colors"
            >
              Весь каталог <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="card-depth border border-line-light overflow-hidden bg-white">
          <div className="hidden md:grid grid-cols-[120px_1fr_180px_120px] bg-asphalt text-cream/60 text-xs font-mono uppercase px-6 py-3">
            <span>Артикул</span>
            <span>Наименование</span>
            <span>Категория</span>
            <span className="text-right">Цена</span>
          </div>
          {PARTS.map((p, i) => (
            <Reveal key={p.code} delay={i * 0.06}>
              <div className="grid md:grid-cols-[120px_1fr_180px_120px] gap-1 md:gap-0 px-6 py-4 border-t border-line-light items-center hover:bg-white/50 transition-colors">
                <span className="font-mono text-xs text-grey">{p.code}</span>
                <span className="font-medium">{p.name}</span>
                <span className="text-sm text-steel/70">{p.cat}</span>
                <span className="font-mono text-sm md:text-right text-signal font-semibold">
                  {p.price}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
