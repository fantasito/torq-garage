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
  },
  {
    href: "/tuning",
    icon: Cpu,
    title: "Тюнинг и чип-тюнинг",
    desc: "Прошивка ЭБУ на дино-стенде, механические доработки, обвесы и визуальный тюнинг.",
    tag: "от 2 400 ₴",
  },
  {
    href: "/parts",
    icon: PackageSearch,
    title: "Запчасти",
    desc: "Оригинал и качественный аналог в наличии и под заказ — подбор по VIN за 15 минут.",
    tag: "каталог 12 000+",
  },
  {
    href: "/detailing",
    icon: Sparkles,
    title: "Детейлинг",
    desc: "Полировка, керамика, химчистка салона и локальное восстановление кузова.",
    tag: "от 1 800 ₴",
  },
];

export default function Services() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <h2 className="font-display font-semibold uppercase text-3xl md:text-4xl tracking-tight max-w-lg">
              Всё под одной крышей
            </h2>
            <p className="text-grey max-w-sm text-sm leading-relaxed">
              Четыре направления, одна команда мастеров и единая гарантия на
              все виды работ.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.href} delay={i * 0.08}>
              <Link
                href={s.href}
                className="group block border border-line-light rounded-sm p-7 h-full hover:border-signal transition-colors bg-white/40"
              >
                <div className="flex items-start justify-between">
                  <s.icon
                    size={28}
                    strokeWidth={1.5}
                    className="text-steel"
                  />
                  <ArrowUpRight
                    size={20}
                    className="text-grey group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <h3 className="font-display font-semibold uppercase text-xl mt-5">
                  {s.title}
                </h3>
                <p className="text-sm text-steel/80 mt-2.5 leading-relaxed">
                  {s.desc}
                </p>
                <div className="font-mono text-xs text-signal mt-5">
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
