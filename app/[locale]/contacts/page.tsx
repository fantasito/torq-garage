import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { BUSINESS } from "@/lib/site";
import StatusPanel from "@/components/StatusPanel";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactsPage.meta" });
  const path = locale === routing.defaultLocale ? "/contacts" : `/${locale}/contacts`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { ru: "/contacts", uk: "/uk/contacts" },
    },
  };
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contactsPage");
  const subjects = t.raw("form.subjects") as string[];

  const mapSrc = `https://www.google.com/maps?q=${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}&z=15&output=embed`;

  return (
    <section className="relative bg-asphalt scan-texture grain overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-14 pb-24 md:pt-20 md:pb-32">
        <Reveal>
          <h1 className="font-display font-semibold uppercase text-h2 text-cream max-w-xl">
            {t("title")}
          </h1>
          <p className="text-cream/60 text-lg mt-4 max-w-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-6 mt-12">
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6 h-full">
              <StatusPanel
                addressLabel={t("status.address")}
                hoursLabel={t("status.hours")}
                phoneLabel={t("status.phone")}
                telegramLabel={t("status.telegram")}
                emailLabel={t("status.email")}
                address={BUSINESS.streetAddress + ", " + BUSINESS.addressLocality}
                hours="Пн–Сб 09:00–19:00"
                phone={BUSINESS.telephone}
                phoneDisplay={BUSINESS.telephoneDisplay}
                telegram={BUSINESS.telegram}
                email={BUSINESS.email}
              />

              <div className="card-depth border border-line overflow-hidden flex-1 min-h-[240px]">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 240 }}
                  loading="lazy"
                  title={t("mapLabel")}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <ContactForm
              title={t("form.title")}
              namePlaceholder={t("form.namePlaceholder")}
              phonePlaceholder={t("form.phonePlaceholder")}
              subjectLabel={t("form.subjectLabel")}
              subjects={subjects}
              messagePlaceholder={t("form.messagePlaceholder")}
              submitLabel={t("form.submit")}
              consent={t("form.consent")}
              successTitle={t("form.successTitle")}
              successText={t("form.successText")}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}