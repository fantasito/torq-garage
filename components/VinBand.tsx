import { ScanLine } from "lucide-react";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

export default function VinBand({
  title,
  text,
  cta,
}: {
  title: string;
  text: string;
  cta: string;
}) {
  return (
    <section className="relative bg-asphalt grain overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-16">
        <Reveal>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 border border-line rounded-sm p-7 md:p-9">
            <ScanLine size={32} strokeWidth={1.5} className="text-signal shrink-0" />
            <div className="flex-1">
              <h3 className="font-display font-semibold uppercase text-xl text-cream">
                {title}
              </h3>
              <p className="text-sm text-cream/60 mt-2 leading-relaxed max-w-lg">
                {text}
              </p>
            </div>
            <Button href="/contacts" icon className="shrink-0">
              {cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}