import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import LeadForm from "@/components/home/LeadForm";

export default function Hero() {
  return (
    <section className="relative bg-asphalt scan-texture overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-14 pb-16 md:pt-20 md:pb-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cream/55 border border-line rounded-sm px-3 py-1.5 mb-6">
            <ShieldCheck size={14} className="text-signal" />
            СТО ПОЛНОГО ЦИКЛА · ГАРАНТИЯ 12 МЕС
          </div>

          <h1 className="font-display font-semibold uppercase leading-[0.95] text-cream text-5xl sm:text-6xl md:text-[4.5rem] tracking-tight">
            Диагностика
            <br />
            решает <span className="text-signal">до</span>,
            <br />а не после
          </h1>

          <p className="mt-6 text-cream/60 text-lg max-w-md leading-relaxed">
            Ремонт, чип-тюнинг, обвесы и запчасти в одном сервисе. Фиксированная
            цена после диагностики — до начала работ, без сюрпризов в счёте.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/parts"
              className="group border border-line hover:border-signal text-cream font-medium px-6 py-3.5 rounded-sm flex items-center gap-2 transition-colors"
            >
              Каталог запчастей
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <a
              href="tel:+380990000000"
              className="font-mono text-cream/85 hover:text-signal transition-colors"
            >
              +380 99 000 00 00
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md border-t border-line pt-6">
            <div>
              <div className="font-mono text-cream text-2xl font-semibold">
                11
              </div>
              <div className="text-[11px] text-grey mt-1 uppercase tracking-wide">
                лет на рынке
              </div>
            </div>
            <div>
              <div className="font-mono text-cream text-2xl font-semibold">
                6 400+
              </div>
              <div className="text-[11px] text-grey mt-1 uppercase tracking-wide">
                авто обслужено
              </div>
            </div>
            <div>
              <div className="font-mono text-cream text-2xl font-semibold">
                97%
              </div>
              <div className="text-[11px] text-grey mt-1 uppercase tracking-wide">
                возвращаются
              </div>
            </div>
          </div>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}
