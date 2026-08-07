import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "uk"],
  defaultLocale: "ru",
  // ru без префикса (как основной домен), uk на /uk/ — тот же паттерн,
  // что и на biotek.ua (Polylang: RU default no prefix, UK at /uk/).
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
