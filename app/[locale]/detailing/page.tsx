import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import PageHero from "@/components/PageHero";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Reveal from "@/components/Reveal";
import Packages, { Package } from "@/components/Packages";
import Process from "@/components/home/Process";
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
  const t = await getTranslations({ locale, namespace: "detailingPage.meta" });
  const path = locale === routing.defaultLocale ? "/detailing" : `/${locale}/detailing`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { ru: "/detailing", uk: "/uk/detailing" },
    },
  };
}

export default async function DetailingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("detailingPage");

  const packages: Package[] = [
    { name: t("packages.basic.name"), price: t("packages.basic.price"), description: t("packages.basic.description"), features: t.raw("packages.basic.features") },
    { name: t("packages.standard.name"), price: t("packages.standard.price"), description: t("packages.standard.description"), features: t.raw("packages.standard.features"), highlighted: true },
    { name: t("packages.premium.name"), price: t("packages.premium.price"), description: t("packages.premium.description"), features: t.raw("packages.premium.features") },
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
        sheetLabel="TORQ-GARAGE / SHEET-04"
        bgImage="/pages/detailing-hero.jpg"
      />

      <section className="bg-asphalt-2 border-b border-line">
        <div className="mx-auto max-w-5xl px-5 md:px-8 py-20 md:py-24">
          <Reveal>
            <h2 className="font-display font-semibold uppercase text-h2 tracking-tight text-cream mb-10 text-center">
              {t("beforeAfter.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfterSlider
              beforeSrc="/detailing/before.jpg"
              afterSrc="/detailing/after.jpg"
              beforeLabel={t("beforeAfter.before")}
              afterLabel={t("beforeAfter.after")}
            />
          </Reveal>
        </div>
      </section>

      <Packages
        title={t("packages.title")}
        subtitle={t("packages.subtitle")}
        packages={packages}
        ctaLabel={t("packages.cta")}
      />
      <Process />
      <Faq title={t("faq.title")} items={faqItems} />
      <CtaBand />
    </>
  );
}