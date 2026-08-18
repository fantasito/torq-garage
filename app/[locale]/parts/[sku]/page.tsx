import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldCheck, Truck, RotateCcw, ImagePlus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { Part } from "@/components/PartsCatalog";
import ruParts from "@/messages/ru.json";

// SKU одинаковы для всех локалей (меняется только name/category/description) —
// достаточно взять список артикулов из одного файла для generateStaticParams.
const ALL_SKUS = (ruParts as { partsPage: { parts: Part[] } }).partsPage.parts.map(
  (p) => p.sku
);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ALL_SKUS.map((sku) => ({ locale, sku }))
  );
}

async function getPart(locale: string, sku: string) {
  const t = await getTranslations({ locale, namespace: "partsPage" });
  const parts = t.raw("parts") as Part[];
  return parts.find((p) => p.sku === sku) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; sku: string }>;
}): Promise<Metadata> {
  const { locale, sku } = await params;
  const part = await getPart(locale, sku);
  const path =
    locale === routing.defaultLocale ? `/parts/${sku}` : `/${locale}/parts/${sku}`;

  if (!part) {
    return { title: "404" };
  }

  return {
    title: `${part.name} — ${part.sku}`,
    description: part.description ?? `${part.name} (${part.sku}), ${part.category}. ${part.price}.`,
    alternates: {
      canonical: path,
      languages: { ru: `/parts/${sku}`, uk: `/uk/parts/${sku}` },
    },
  };
}

export default async function PartDetailPage({
  params,
}: {
  params: Promise<{ locale: string; sku: string }>;
}) {
  const { locale, sku } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("partsPage");
  const parts = t.raw("parts") as Part[];
  const part = parts.find((p) => p.sku === sku);

  if (!part) {
    notFound();
  }

  const related = parts
    .filter((p) => p.category === part.category && p.sku !== part.sku)
    .slice(0, 3);

  const d = {
    breadcrumbCatalog: t("detail.breadcrumbCatalog"),
    availabilityLabel: t("detail.availabilityLabel"),
    categoryLabel: t("detail.categoryLabel"),
    skuLabel: t("detail.skuLabel"),
    etaLabel: t("detail.etaLabel"),
    cta: t("detail.cta"),
    relatedTitle: t("detail.relatedTitle"),
    warrantyTitle: t("detail.trust.warranty.title"),
    warrantyText: t("detail.trust.warranty.text"),
    deliveryTitle: t("detail.trust.delivery.title"),
    deliveryText: t("detail.trust.delivery.text"),
    returnTitle: t("detail.trust.return.title"),
    returnText: t("detail.trust.return.text"),
    inStock: t("catalog.inStock"),
    order: t("catalog.order"),
  };

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-8">
        <Link
          href="/parts"
          className="font-mono text-xs text-grey hover:text-signal transition-colors"
        >
          ← {d.breadcrumbCatalog}
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-5 md:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          <Reveal>
            {/* Слот под фото: /public/parts/<sku>.jpg. Пока файла нет — виден
                плейсхолдер с точным именем, чтобы не перепутать при заливке. */}
            <div className="relative aspect-square bg-asphalt-2 border border-line-light rounded-sm overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-steel/25">
                <ImagePlus size={32} strokeWidth={1.5} />
                <span className="font-mono text-[10px] tracking-wide">
                  /parts/{part.sku}.jpg
                </span>
              </div>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(/parts/${part.sku}.jpg)` }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="font-mono text-xs text-signal uppercase tracking-wide">
              {part.category}
            </div>
            <h1 className="font-display font-semibold uppercase text-h2 tracking-tight mt-2">
              {part.name}
            </h1>

            {part.description && (
              <p className="text-steel/80 text-sm leading-relaxed mt-4 max-w-md">
                {part.description}
              </p>
            )}

            <div className="font-mono text-3xl font-semibold text-asphalt mt-6">
              {part.price}
            </div>
            <div
              className={`text-sm font-mono mt-1 ${
                part.inStock ? "text-ok" : "text-steel/60"
              }`}
            >
              {part.inStock ? d.inStock : `${d.order} ${part.eta ?? ""}`}
            </div>

            <div className="mt-7">
              <Button href="/contacts" size="lg" icon>
                {d.cta}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-9 pt-6 border-t border-line-light font-mono text-xs">
              <div>
                <div className="text-grey">{d.skuLabel}</div>
                <div className="text-asphalt mt-1">{part.sku}</div>
              </div>
              <div>
                <div className="text-grey">{d.categoryLabel}</div>
                <div className="text-asphalt mt-1">{part.category}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-line-light">
              <div className="flex flex-col gap-1.5">
                <ShieldCheck size={18} className="text-signal" />
                <div className="text-xs font-medium">{d.warrantyTitle}</div>
                <div className="text-[11px] text-steel/70 leading-snug">
                  {d.warrantyText}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Truck size={18} className="text-signal" />
                <div className="text-xs font-medium">{d.deliveryTitle}</div>
                <div className="text-[11px] text-steel/70 leading-snug">
                  {d.deliveryText}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <RotateCcw size={18} className="text-signal" />
                <div className="text-xs font-medium">{d.returnTitle}</div>
                <div className="text-[11px] text-steel/70 leading-snug">
                  {d.returnText}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-line-light">
            <Reveal>
              <h2 className="font-display font-semibold uppercase text-xl tracking-tight mb-6">
                {d.relatedTitle}
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((r, i) => (
                <Reveal key={r.sku} delay={i * 0.06}>
                  <Link
                    href={`/parts/${r.sku}`}
                    className="card-depth border border-line-light bg-white p-5 block hover:border-signal transition-colors"
                  >
                    <div className="font-mono text-[11px] text-grey">
                      {r.sku}
                    </div>
                    <div className="font-medium text-sm mt-1.5">{r.name}</div>
                    <div className="font-mono text-sm text-signal mt-3">
                      {r.price}
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