import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import PageHero from "@/components/PageHero";
import CasesGallery, { CaseItem } from "@/components/CasesGallery";
import CtaBand from "@/components/home/CtaBand";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casesPage.meta" });
  const path = locale === routing.defaultLocale ? "/cases" : `/${locale}/cases`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { ru: "/cases", uk: "/uk/cases" },
    },
  };
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("casesPage");
  const itemsObj = t.raw("items") as Record<
    string,
    Omit<CaseItem, "slug">
  >;
  const items: CaseItem[] = Object.entries(itemsObj).map(([slug, v]) => ({
    slug,
    ...v,
  }));

  return (
    <>
      <PageHero
        badge={t("hero.badge")}
        title={t("hero.title")}
        description={t("hero.description")}
        ctaHref="/contacts"
        ctaLabel={t("hero.cta")}
        sheetLabel="TORQ-GARAGE / SHEET-06"
        bgImage="/pages/cases-hero.jpg"
      />
      <CasesGallery
        items={items}
        allLabel={t("gallery.all")}
        viewCaseLabel={t("gallery.viewCase")}
      />
      <CtaBand />
    </>
  );
}