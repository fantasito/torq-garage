import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";

export default function CtaBand() {
  const t = useTranslations("ctaBand");
  return (
    <section className="relative bg-asphalt border-t border-line grain overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <Reveal>
          <h2 className="font-display font-semibold uppercase text-h2 tracking-tight text-cream max-w-lg">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Button href="/contacts" size="lg" icon>
            {t("cta")}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
