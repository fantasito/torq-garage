import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "@fontsource/oswald/400.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import BusinessSchema from "@/components/BusinessSchema";
import { routing } from "@/i18n/routing";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const path = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s | ${SITE_NAME}`,
    },
    description: t("description"),
    alternates: {
      canonical: path,
      languages: {
        ru: "/",
        uk: "/uk",
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: locale === "uk" ? "uk_UA" : "ru_UA",
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
      images: [
        { url: "/og-image.jpg", width: 1200, height: 630, alt: SITE_NAME },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Разрешает статический рендер страниц (не только layout) для этой локали
  setRequestLocale(locale);

  return (
    <html lang={locale} className="h-full">
      <body className="min-h-full flex flex-col bg-cream text-asphalt">
        <NextIntlClientProvider>
          <BusinessSchema locale={locale} />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingCTA />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
