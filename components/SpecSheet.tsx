import Reveal from "@/components/Reveal";

export type SpecItem = { label: string; value: string };

/**
 * Список "ценности как спецификация" — key:value ряды в техническом стиле,
 * визуально перекликается со StatusPanel на Контактах, но на светлом фоне
 * и без интерактивности (просто спецификация компании).
 */
export default function SpecSheet({
  title,
  items,
}: {
  title: string;
  items: SpecItem[];
}) {
  return (
    <section className="bg-asphalt-2 border-y border-line">
      <div className="mx-auto max-w-4xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <h2 className="font-display font-semibold uppercase text-h2 tracking-tight text-cream mb-12">
            {title}
          </h2>
        </Reveal>

        <div className="divide-y divide-line">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <div className="grid sm:grid-cols-[200px_1fr] gap-2 sm:gap-8 py-5">
                <div className="font-mono text-xs text-signal uppercase tracking-wide">
                  {item.label}
                </div>
                <div className="text-cream/75 text-sm md:text-base leading-relaxed">
                  {item.value}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}