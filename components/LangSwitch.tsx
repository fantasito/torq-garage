"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function LangSwitch({ className = "" }: { className?: string }) {
  const t = useTranslations("langSwitch");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className={`flex items-center gap-1 font-mono text-xs ${className}`}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1 opacity-30">/</span>}
          <button
            onClick={() =>
              router.replace(
                // @ts-expect-error dynamic pathname across locales
                { pathname, params },
                { locale: l }
              )
            }
            className={
              l === locale
                ? "text-signal"
                : "text-cream/50 hover:text-cream transition-colors"
            }
            aria-current={l === locale ? "true" : undefined}
          >
            {t(l)}
          </button>
        </span>
      ))}
    </div>
  );
}
