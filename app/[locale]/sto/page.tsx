import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Activity, Droplet, Settings, Disc, Wrench, Zap } from "lucide-react";
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
  const t = await getTranslations({ locale, namespace: "stoPage.meta" });
  const path = locale === routing.defaultLocale ? "/sto" : `/${locale}/sto`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { ru: "/sto", uk: "/uk/sto" },
    },
  };
}

export default async function StoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("stoPage");

  const priceItems: PriceItem[] = [
    { icon: <Activity size={26} strokeWidth={1.5} />, title: t("priceList.diagnostics.title"), text: t("priceList.diagnostics.text"), price: t("priceList.diagnostics.price"), details: t.raw("priceList.diagnostics.details") },
    { icon: <Droplet size={26} strokeWidth={1.5} />, title: t("priceList.maintenance.title"), text: t("priceList.maintenance.text"), price: t("priceList.maintenance.price"), details: t.raw("priceList.maintenance.details") },
    { icon: <Settings size={26} strokeWidth={1.5} />, title: t("priceList.suspension.title"), text: t("priceList.suspension.text"), price: t("priceList.suspension.price"), details: t.raw("priceList.suspension.details") },
    { icon: <Disc size={26} strokeWidth={1.5} />, title: t("priceList.brakes.title"), text: t("priceList.brakes.text"), price: t("priceList.brakes.price"), details: t.raw("priceList.brakes.details") },
    { icon: <Wrench size={26} strokeWidth={1.5} />, title: t("priceList.engine.title"), text: t("priceList.engine.text"), price: t("priceList.engine.price"), details: t.raw("priceList.engine.details") },
    { icon: <Zap size={26} strokeWidth={1.5} />, title: t("priceList.electrics.title"), text: t("priceList.electrics.text"), price: t("priceList.electrics.price"), details: t.raw("priceList.electrics.details") },
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
        sheetLabel="TORQ-GARAGE / SHEET-02"
        bgImage="/pages/sto-hero.jpg"
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