"use client";

"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Phone } from "lucide-react";
import TopBar from "@/components/TopBar";
import Button from "@/components/Button";
import LangSwitch from "@/components/LangSwitch";

export default function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  const NAV = [
    { href: "/sto", label: t("sto") },
    { href: "/tuning", label: t("tuning") },
    { href: "/parts", label: t("parts") },
    { href: "/detailing", label: t("detailing") },
    { href: "/cases", label: t("cases") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
    { href: "/contacts", label: t("contacts") },
  ];

  // Закрываем мобильное меню при смене маршрута без setState-в-эффекте:
  // сравниваем во время рендера (recommended React pattern вместо useEffect).
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (open) setOpen(false);
  }

  return (
    <div className="sticky top-0 z-50">
      <TopBar />
      <header className="bg-asphalt/97 backdrop-blur border-b border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-display font-semibold tracking-tight text-xl text-cream">
              TORQ<span className="text-signal">GARAGE</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-sm transition-colors ${
                  pathname === item.href
                    ? "text-signal"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <LangSwitch />
            <a
              href="tel:+380990000000"
              className="flex items-center gap-1.5 font-mono text-sm text-cream/85 hover:text-signal transition-colors"
            >
              <Phone size={15} />
              +380 99 000 00 00
            </a>
            <Button href="/contacts" size="sm">
              {t("bookNow")}
            </Button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-cream"
            aria-label={open ? t("closeMenu") : t("openMenu")}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden bg-asphalt-2 border-t border-line px-5 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-3 text-base font-medium border-b border-line/60 ${
                  pathname === item.href ? "text-signal" : "text-cream/85"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex items-center justify-between">
              <LangSwitch />
            </div>
            <Button href="/contacts" className="mt-3" fullWidth>
              {t("bookNow")}
            </Button>
          </div>
        )}
      </header>
    </div>
  );
}
