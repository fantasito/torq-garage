import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Cpu, Gauge, Wind, Settings2, Shapes, Zap } from "lucide-react";
import { routing } from "@/i18n/routing";
import PageHero from "@/components/PageHero";
import PriceList, { PriceItem } from "@/components/PriceList";
import Process from "@/components/home/Process";
import Guarantees from "@/components/home/Guarantees";
import Faq from "@/components/Faq";
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
  const t = await getTranslations({ locale, namespace: "tuningPage.meta" });
  const path = locale === routing.defaultLocale ? "/tuning" : `/${locale}/tuning`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { ru: "/tuning", uk: "/uk/tuning" },
    },
  };
}

export default async function TuningPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("tuningPage");

  const priceItems: PriceItem[] = [
    { icon: <Cpu size={26} strokeWidth={1.5} />, title: t("priceList.stage1.title"), text: t("priceList.stage1.text"), price: t("priceList.stage1.price"), details: t.raw("priceList.stage1.details") },
    { icon: <Zap size={26} strokeWidth={1.5} />, title: t("priceList.stage2.title"), text: t("priceList.stage2.text"), price: t("priceList.stage2.price"), details: t.raw("priceList.stage2.details") },
    { icon: <Wind size={26} strokeWidth={1.5} />, title: t("priceList.exhaust.title"), text: t("priceList.exhaust.text"), price: t("priceList.exhaust.price"), details: t.raw("priceList.exhaust.details") },
    { icon: <Settings2 size={26} strokeWidth={1.5} />, title: t("priceList.suspension.title"), text: t("priceList.suspension.text"), price: t("priceList.suspension.price"), details: t.raw("priceList.suspension.details") },
    { icon: <Shapes size={26} strokeWidth={1.5} />, title: t("priceList.bodykit.title"), text: t("priceList.bodykit.text"), price: t("priceList.bodykit.price"), details: t.raw("priceList.bodykit.details") },
    { icon: <Gauge size={26} strokeWidth={1.5} />, title: t("priceList.dyno.title"), text: t("priceList.dyno.text"), price: t("priceList.dyno.price"), details: t.raw("priceList.dyno.details") },
  ];

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
        sheetLabel="TORQ-GARAGE / SHEET-03"
        bgImage="/pages/tuning-hero.jpg"
      />
      <PriceList
        title={t("priceList.title")}
        subtitle={t("priceList.subtitle")}
        items={priceItems}
      />
      <Process />
      <Guarantees />
      <Faq title={t("faq.title")} items={faqItems} />
      <CtaBand />
    </>
  );
}