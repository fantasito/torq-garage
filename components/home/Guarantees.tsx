import Reveal from "@/components/Reveal";
import { FileCheck, Ban, Clock3, Wrench } from "lucide-react";

const ITEMS = [
  {
    icon: FileCheck,
    title: "Цена до начала работ",
    desc: "Смета фиксируется письменно после диагностики — не меняется в процессе.",
  },
  {
    icon: Ban,
    title: "Без скрытых доплат",
    desc: "В смете указаны запчасти, работы и сроки. Точка.",
  },
  {
    icon: Clock3,
    title: "Срок — в договоре",
    desc: "Если не успеваем в срок — предоставляем подменное авто.",
  },
  {
    icon: Wrench,
    title: "Гарантия 12 месяцев",
    desc: "На все виды работ и установленные запчасти.",
  },
];

export default function Guarantees() {
  return (
    <section className="bg-cream border-t border-line-light">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-x-8 gap-y-10">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.07}>
              <div className="border-t-2 border-signal pt-4">
                <it.icon size={22} strokeWidth={1.5} className="text-steel" />
                <h3 className="font-display uppercase text-base mt-4">
                  {it.title}
                </h3>
                <p className="text-sm text-steel/75 mt-2 leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
