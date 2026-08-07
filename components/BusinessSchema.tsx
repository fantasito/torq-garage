import { BUSINESS, SITE_URL } from "@/lib/site";

/**
 * JSON-LD LocalBusiness/AutoRepair schema. Рендерится один раз в layout.tsx.
 * Даёт Google базу для локального пакета (карта, часы, телефон в сниппете)
 * и снижает шанс, что бизнес не подтянется в Google Business Profile intent-запросах
 * вроде "СТО рядом".
 */
export default function BusinessSchema({ locale = "ru" }: { locale?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: BUSINESS.legalName,
    inLanguage: locale,
    image: `${SITE_URL}/og-image.jpg`,
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: "₴₴",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
    sameAs: [BUSINESS.telegram],
    areaServed: {
      "@type": "City",
      name: "Днепр",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги TORQ GARAGE",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Диагностика и ремонт" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Чип-тюнинг" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Детейлинг" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Запчасти" } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
