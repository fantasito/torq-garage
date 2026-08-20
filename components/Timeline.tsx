import Reveal from "@/components/Reveal";

export type TimelineItem = { year: string; text: string };

export default function Timeline({
  title,
  items,
}: {
  title: string;
  items: TimelineItem[];
}) {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <h2 className="font-display font-semibold uppercase text-h2 tracking-tight mb-14">
            {title}
          </h2>
        </Reveal>

        <div className="relative pl-8 md:pl-10">
          <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-line-light" />
          <div className="flex flex-col gap-10">
            {items.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.08}>
                <div className="relative">
                  <div className="absolute -left-8 md:-left-10 top-1 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-cream border-2 border-signal" />
                  <div className="font-mono text-signal text-sm font-semibold">
                    {item.year}
                  </div>
                  <p className="text-steel/80 text-sm md:text-base leading-relaxed mt-1.5 max-w-lg">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}