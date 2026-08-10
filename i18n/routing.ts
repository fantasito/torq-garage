import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "uk"],
  defaultLocale: "ru",
  // ru без префикса (как основной домен), uk на /uk/ — тот же паттерн,
  // что и на biotek.ua (Polylang: RU default no prefix, UK at /uk/).
  localePrefix: "as-needed",
  // Без этого next-intl запоминает выбранный язык в cookie NEXT_LOCALE и
  // редиректит "/" на "/uk", если человек до этого заходил на украинскую
  // версию — из-за этого переключатель RU/UK выглядел так, будто "откидывает
  // назад". С localeDetection: false каждый URL всегда отдаёт ровно ту
  // локаль, которая в нём указана, без скрытых редиректов по cookie.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];