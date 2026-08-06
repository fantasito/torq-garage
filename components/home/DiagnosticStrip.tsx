import Reveal from "@/components/Reveal";

const STATS = [
  { value: "11", suffix: "лет", label: "на рынке Днепра" },
  { value: "6 400+", suffix: "", label: "авто на СТО" },
  { value: "97%", suffix: "", label: "клиентов возвращаются" },
  { value: "18", suffix: "мин", label: "средний отклик на заявку" },
];

export default function DiagnosticStrip() {
  return (
    <section className="bg-asphalt-2 border-y border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="font-mono">
              <div className="text-cream text-2xl md:text-3xl font-semibold">
                {s.value}
                <span className="text-signal text-lg ml-1">{s.suffix}</span>
              </div>
              <div className="text-grey text-xs mt-1 uppercase tracking-wide">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
