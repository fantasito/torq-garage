"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function LangSwitch({ className = "" }: { className?: string }) {
  const t = useTranslations("langSwitch");
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className={`flex items-center gap-1 font-mono text-xs ${className}`}>
      {routing.locales.map((l, i) => {
        // getPathname строит канонический путь для целевой локали напрямую
        // (без префикса для ru при localePrefix: "as-needed"), в отличие от
        // <Link locale={l}>, который всегда форсит префикс и даёт лишний
        // 307-редирект для дефолтной локали.
        const href = getPathname({
          // @ts-expect-error dynamic pathname across locales
          href: { pathname, params },
          locale: l,
        });
        return (
          <span key={l} className="flex items-center">
            {i > 0 && <span className="mx-1 opacity-30">/</span>}
            <a
              href={href}
              hrefLang={l}
              className={
                l === locale
                  ? "text-signal"
                  : "text-cream/50 hover:text-cream transition-colors"
              }
              aria-current={l === locale ? "true" : undefined}
            >
              {t(l)}
            </a>
          </span>
        );
      })}
    </div>
  );
}