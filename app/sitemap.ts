import type { MetadataRoute } from "next";
import { SITE_URL, SITE_ROUTES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_ROUTES.flatMap((route) => {
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
}
