import Link from "next/link";
import { Wrench, Cpu, PackageSearch, Sparkles, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const SERVICES = [
  {
    href: "/sto",
    icon: Wrench,
    title: "СТО и ремонт",
    desc: "Компьютерная диагностика, ходовая, двигатель, ТО по регламенту — с полным отчётом сканера.",
    tag: "от 350 ₴",
    n: "01",
    big: true,
  },
  {
    href: "/tuning",
    icon: Cpu,
    title: "Тюнинг и чип-тюнинг",
    desc: "Прошивка ЭБУ на дино-стенде, механические доработки, обвесы.",
    tag: "от 2 400 ₴",
    n: "02",
    big: false,
  },
  {
    href: "/parts",
    icon: PackageSearch,
    title: "Запчасти",
    desc: "Оригинал и аналог в наличии — подбор по VIN за 15 минут.",
    tag: "каталог 12 000+",
    n: "03",
    big: false,
  },
  {
    href: "/detailing",
    icon: Sparkles,
    title: "Детейлинг",
    desc: "Полировка, керамика, химчистка салона и локальное восстановление кузова.",
    tag: "от 1 800 ₴",
    n: "04",
    big: true,
  },
];

export default function Services() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <h2 className="font-display font-semibold uppercase text-h2 tracking-tight max-w-lg">
              Всё под одной крышей
            </h2>
            <p className="text-grey max-w-sm text-sm leading-relaxed">
              Четыре направления, одна команда мастеров и единая гарантия на
              все виды работ.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.href} delay={i * 0.08}>
              <Link
                href={s.href}
                className={`card-depth group block border border-line-light hover:border-signal bg-white transition-colors h-full ${
                  s.big ? "p-9" : "p-7"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-grey">
                      {s.n}
                    </span>
                    <s.icon size={s.big ? 30 : 26} strokeWidth={1.5} className="text-steel" />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-grey group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <h3
                  className={`font-display font-semibold uppercase mt-6 ${
                    s.big ? "text-2xl" : "text-xl"
                  }`}
                >
                  {s.title}
                </h3>
                <p className="text-sm text-steel/80 mt-3 leading-relaxed max-w-sm">
                  {s.desc}
                </p>
                <div className="font-mono text-xs text-signal mt-6">
                  {s.tag}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
