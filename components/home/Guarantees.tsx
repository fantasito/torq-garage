import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import { FileCheck, Ban, Clock3, Wrench } from "lucide-react";

const ITEMS = [
  { icon: FileCheck, key: "price" },
  { icon: Ban, key: "noExtra" },
  { icon: Clock3, key: "deadline" },
  { icon: Wrench, key: "warranty" },
] as const;

export default function Guarantees() {
  const t = useTranslations("guarantees");
  return (
    <section className="bg-cream border-t border-line-light">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-x-8 gap-y-10">
          {ITEMS.map((it, i) => (
            <Reveal key={it.key} delay={i * 0.07}>
              <div className="border-t-2 border-signal pt-4">
                <it.icon size={22} strokeWidth={1.5} className="text-steel" />
                <h3 className="font-display uppercase text-base mt-4">
                  {t(`${it.key}.title`)}
                </h3>
                <p className="text-sm text-steel/75 mt-2 leading-relaxed">
                  {t(`${it.key}.text`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
