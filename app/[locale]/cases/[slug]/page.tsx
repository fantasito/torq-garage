import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check, ImagePlus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ruCases from "@/messages/ru.json";

type RawCase = {
  category: string;
  car: string;
  title: string;
  result: string;
  duration: string;
  description: string;
  whatWeDid: string[];
  image?: string;
  beforeAfter?: boolean;
};

const ALL_SLUGS = Object.keys(
  (ruCases as { casesPage: { items: Record<string, RawCase> } }).casesPage
    .items
);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ALL_SLUGS.map((slug) => ({ locale, slug }))
  );
}

async function getCase(locale: string, slug: string) {
  const t = await getTranslations({ locale, namespace: "casesPage" });
  const items = t.raw("items") as Record<string, RawCase>;
  return items[slug] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getCase(locale, slug);
  const path =
    locale === routing.defaultLocale ? `/cases/${slug}` : `/${locale}/cases/${slug}`;

  if (!item) return { title: "404" };

  return {
    title: `${item.title} — ${item.car}`,
    description: item.description,
    alternates: {
      canonical: path,
      languages: { ru: `/cases/${slug}`, uk: `/uk/cases/${slug}` },
    },
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("casesPage");
  const items = t.raw("items") as Record<string, RawCase>;
  const item = items[slug];

  if (!item) notFound();

  const related = Object.entries(items)
    .filter(([s, v]) => s !== slug && v.category === item.category)
    .slice(0, 3);

  const d = {
    back: t("detail.backToGallery"),
    carLabel: t("detail.carLabel"),
    durationLabel: t("detail.durationLabel"),
    categoryLabel: t("detail.categoryLabel"),
    whatWeDidTitle: t("detail.whatWeDidTitle"),
    resultTitle: t("detail.resultTitle"),
    relatedTitle: t("detail.relatedTitle"),
    cta: t("detail.cta"),
  };

  return (
    <div className="bg-asphalt">
      <div className="mx-auto max-w-5xl px-5 md:px-8 py-8">
        <Link
          href="/cases"
          className="font-mono text-xs text-cream/50 hover:text-signal transition-colors"
        >
          ← {d.back}
        </Link>
      </div>

      <section className="mx-auto max-w-5xl px-5 md:px-8 pb-20">
        <Reveal>
          <div className="font-mono text-xs text-signal uppercase tracking-wide">
            {item.category}
          </div>
          <h1 className="font-display font-semibold uppercase text-h2 tracking-tight text-cream mt-2 max-w-2xl">
            {item.title}
          </h1>
          <p className="text-cream/60 text-sm leading-relaxed mt-4 max-w-xl">
            {item.description}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8">
            {item.beforeAfter ? (
              <BeforeAfterSlider
                beforeSrc="/detailing/before.jpg"
                afterSrc="/detailing/after.jpg"
                beforeLabel="До"
                afterLabel="После"
              />
            ) : (
              <div className="relative aspect-[16/9] bg-asphalt-2 border border-line rounded-sm overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-cream/15">
                  <ImagePlus size={32} strokeWidth={1.5} />
                  {item.image && (
                    <span className="font-mono text-[10px] tracking-wide">
                      /cases/{item.image}
                    </span>
                  )}
                </div>
                {item.image && (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(/cases/${item.image})` }}
                  />
                )}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="grid sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-line font-mono text-sm">
            <div>
              <div className="text-cream/40 text-xs">{d.carLabel}</div>
              <div className="text-cream mt-1">{item.car}</div>
            </div>
            <div>
              <div className="text-cream/40 text-xs">{d.durationLabel}</div>
              <div className="text-cream mt-1">{item.duration}</div>
            </div>
            <div>
              <div className="text-cream/40 text-xs">{d.resultTitle}</div>
              <div className="text-signal mt-1">{item.result}</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 pt-8 border-t border-line">
            <h2 className="font-display font-semibold uppercase text-lg text-cream mb-5">
              {d.whatWeDidTitle}
            </h2>
            <ul className="flex flex-col gap-3">
              {item.whatWeDid.map((step) => (
                <li key={step} className="flex items-start gap-3 text-sm text-cream/70">
                  <Check size={16} className="text-signal mt-0.5 shrink-0" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-12">
            <Button href="/contacts" size="lg" icon>
              {d.cta}
            </Button>
          </div>
        </Reveal>

        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-line">
            <Reveal>
              <h2 className="font-display font-semibold uppercase text-lg text-cream mb-6">
                {d.relatedTitle}
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map(([s, v], i) => (
                <Reveal key={s} delay={i * 0.06}>
                  <Link
                    href={`/cases/${s}`}
                    className="card-depth border border-line bg-asphalt-2 p-5 block hover:border-signal/50 transition-colors"
                  >
                    <div className="font-mono text-[11px] text-cream/40">
                      {v.car}
                    </div>
                    <div className="font-display uppercase text-cream text-sm mt-1.5">
                      {v.title}
                    </div>
                    <div className="font-mono text-xs text-signal mt-3">
                      {v.result}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}