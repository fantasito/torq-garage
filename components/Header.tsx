"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import TopBar from "@/components/TopBar";

const NAV = [
  { href: "/sto", label: "СТО" },
  { href: "/tuning", label: "Тюнинг" },
  { href: "/parts", label: "Запчасти" },
  { href: "/detailing", label: "Детейлинг" },
  { href: "/cases", label: "Кейсы" },
  { href: "/blog", label: "Блог" },
  { href: "/about", label: "О нас" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contacts"
              className="bg-signal hover:bg-signal-dim text-cream text-sm font-semibold px-4 py-2.5 rounded-sm transition-colors"
            >
              Записаться
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-cream"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
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
            <Link
              href="/contacts"
              className="mt-4 bg-signal text-cream text-center font-semibold px-4 py-3 rounded-sm"
            >
              Записаться
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}
