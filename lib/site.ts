export const SITE_URL = "https://torq-garage.vercel.app";
export const SITE_NAME = "TORQ GARAGE";

export const BUSINESS = {
  legalName: "TORQ GARAGE",
  telephone: "+380990000000",
  telephoneDisplay: "+380 99 000 00 00",
  email: "info@torqgarage.ua",
  streetAddress: "ул. Автозаводская, 14",
  addressLocality: "Днепр",
  addressRegion: "Днепропетровская область",
  postalCode: "49000",
  addressCountry: "UA",
  openingHours: "Mo-Sa 09:00-19:00",
  telegram: "https://t.me/torqgarage_bot",
  // Портфолио-проект — координаты условные (центр Днепра), для реального
  // бизнеса заменить на точный адрес при подключении Google Business Profile.
  geo: {
    latitude: 48.4647,
    longitude: 35.0462,
  },
};

/** Список путей для sitemap.ts — обновлять при добавлении новых страниц. */
export const SITE_ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/sto", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/tuning", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/parts", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/detailing", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/cases", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/contacts", priority: 0.8, changeFrequency: "yearly" as const },
];
