import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

export default function CtaBand() {
  return (
    <section className="bg-asphalt border-t border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <Reveal>
          <h2 className="font-display font-semibold uppercase text-3xl md:text-4xl tracking-tight text-cream max-w-lg">
            Готовы узнать, что действительно нужно вашей машине?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href="/contacts"
            className="group bg-signal hover:bg-signal-dim text-cream font-semibold px-7 py-4 rounded-sm flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            Записаться на диагностику
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
