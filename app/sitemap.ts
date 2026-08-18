import type { MetadataRoute } from "next";
import { SITE_URL, SITE_ROUTES } from "@/lib/site";
import ruParts from "@/messages/ru.json";

const PART_SKUS = (ruParts as { partsPage: { parts: { sku: string }[] } })
  .partsPage.parts.map((p) => p.sku);

const CASE_SLUGS = Object.keys(
  (ruParts as unknown as { casesPage: { items: Record<string, unknown> } })
    .casesPage.items
);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = SITE_ROUTES.flatMap((route) => {
    const ruUrl = `${SITE_URL}${route.path}`;
    const ukPath = route.path === "/" ? "/uk" : `/uk${route.path}`;
    const ukUrl = `${SITE_URL}${ukPath}`;

    const alternates = {
      languages: {
        ru: ruUrl,
        uk: ukUrl,
      },
    };

    return [
      {
        url: ruUrl,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates,
      },
      {
        url: ukUrl,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates,
      },
    ];
  });

  const partPages = PART_SKUS.flatMap((sku) => {
    const ruUrl = `${SITE_URL}/parts/${sku}`;
    const ukUrl = `${SITE_URL}/uk/parts/${sku}`;
    const alternates = { languages: { ru: ruUrl, uk: ukUrl } };

    return [
      { url: ruUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5, alternates },
      { url: ukUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5, alternates },
    ];
  });

  const casePages = CASE_SLUGS.flatMap((slug) => {
    const ruUrl = `${SITE_URL}/cases/${slug}`;
    const ukUrl = `${SITE_URL}/uk/cases/${slug}`;
    const alternates = { languages: { ru: ruUrl, uk: ukUrl } };

    return [
      { url: ruUrl, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5, alternates },
      { url: ukUrl, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5, alternates },
    ];
  });

  return [...pages, ...partPages, ...casePages];
}