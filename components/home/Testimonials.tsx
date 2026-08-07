import Reveal from "@/components/Reveal";

const REVIEWS = [
  {
    name: "Дмитрий К.",
    car: "BMW F30 320d",
    text: "Приехал с вибрацией на руле, до этого два СТО развели руками. Здесь нашли причину за час диагностики и показали на видео с эндоскопа. Починили в тот же день.",
  },
  {
    name: "Артём С.",
    car: "VW Golf 7 GTI",
    text: "Делал чип-тюнинг Stage 1 и замену подвески. Прирост мощности подтвердили на дино-стенде до и после — цифры сошлись с тем, что обещали.",
  },
  {
    name: "Ирина П.",
    car: "Skoda Octavia A7",
    text: "Записалась на ТО через сайт, перезвонили за 10 минут, назвали цену сразу по VIN. В сервисе ничего сверху не накинули.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream border-t border-line-light">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <h2 className="font-display font-semibold uppercase text-h2 tracking-tight mb-12">
            Что говорят клиенты
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <div className="card-depth border border-line-light bg-white p-6 h-full flex flex-col">
                <p className="text-sm text-asphalt/80 leading-relaxed flex-1">
                  «{r.text}»
                </p>
                <div className="mt-5 pt-4 border-t border-line-light font-mono text-xs">
                  <div className="text-asphalt font-medium">{r.name}</div>
                  <div className="text-grey mt-0.5">{r.car}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
