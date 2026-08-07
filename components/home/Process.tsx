import Reveal from "@/components/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Заявка",
    desc: "Оставляете VIN и описание проблемы — перезваниваем за 18 минут.",
  },
  {
    n: "02",
    title: "Диагностика",
    desc: "Сканируем все узлы, показываем отчёт и называем фиксированную цену.",
  },
  {
    n: "03",
    title: "Работы",
    desc: "Согласованный ремонт или тюнинг — статус видно в переписке.",
  },
  {
    n: "04",
    title: "Выдача",
    desc: "Тест-драйв с мастером, акт выполненных работ, гарантия 12 мес.",
  },
];

export default function Process() {
  return (
    <section className="relative bg-asphalt scan-texture grain overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <h2 className="font-display font-semibold uppercase text-h2 tracking-tight text-cream mb-14">
            Как проходит запись
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-8 md:gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative pl-0 md:border-l md:border-line md:pl-6">
                <div className="font-mono text-signal text-sm mb-3">
                  {s.n}
                </div>
                <h3 className="font-display uppercase text-lg text-cream mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-cream/55 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
