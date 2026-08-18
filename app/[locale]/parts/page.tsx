import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import PageHero from "@/components/PageHero";
import PartsCatalog, { Part } from "@/components/PartsCatalog";
import VinBand from "@/components/VinBand";
import Faq from "@/components/Faq";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partsPage.meta" });
  const path = locale === routing.defaultLocale ? "/parts" : `/${locale}/parts`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { ru: "/parts", uk: "/uk/parts" },
    },
  };
}

export default async function PartsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("partsPage");
  const parts = t.raw("parts") as Part[];

  const faqItems = [
    { q: t("faq.q1.q"), a: t("faq.q1.a") },
    { q: t("faq.q2.q"), a: t("faq.q2.a") },
    { q: t("faq.q3.q"), a: t("faq.q3.a") },
    { q: t("faq.q4.q"), a: t("faq.q4.a") },
  ];

  return (
    <>
      <PageHero
        badge={t("hero.badge")}
        title={t("hero.title")}
        description={t("hero.description")}
        ctaHref="/contacts"
        ctaLabel={t("hero.cta")}
        sheetLabel="TORQ-GARAGE / SHEET-05"
        bgImage="/pages/parts-hero.jpg"
      />
      <PartsCatalog
        title={t("catalog.title")}
        subtitle={t("catalog.subtitle")}
        searchPlaceholder={t("catalog.searchPlaceholder")}
        allLabel={t("catalog.all")}
        inStockLabel={t("catalog.inStock")}
        orderLabel={t("catalog.order")}
        colSku={t("catalog.colSku")}
        colName={t("catalog.colName")}
        colCategory={t("catalog.colCategory")}
        colAvailability={t("catalog.colAvailability")}
        colPrice={t("catalog.colPrice")}
        emptyLabel={t("catalog.empty")}
        parts={parts}
      />
      <VinBand
        title={t("vinBand.title")}
        text={t("vinBand.text")}
        cta={t("vinBand.cta")}
      />
      <Faq title={t("faq.title")} items={faqItems} />
    </>
  );
}