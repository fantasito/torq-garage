import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const COLS = [
  {
    title: "Услуги",
    links: [
      { href: "/sto", label: "Диагностика и ремонт" },
      { href: "/tuning", label: "Тюнинг и чип-тюнинг" },
      { href: "/parts", label: "Каталог запчастей" },
      { href: "/detailing", label: "Детейлинг" },
    ],
  },
  {
    title: "Компания",
    links: [
      { href: "/about", label: "О нас" },
      { href: "/cases", label: "Наши работы" },
      { href: "/blog", label: "Блог" },
      { href: "/contacts", label: "Контакты" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-asphalt text-cream border-t border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <span className="font-display font-semibold text-xl">
            TORQ<span className="text-signal">GARAGE</span>
          </span>
          <p className="mt-3 text-sm text-cream/60 leading-relaxed max-w-xs">
            СТО полного цикла в Днепре: ремонт, чип-тюнинг, обвесы, запчасти
            и детейлинг под одной крышей.
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <div className="font-display text-sm tracking-wide uppercase text-grey mb-4">
              {col.title}
            </div>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/75 hover:text-signal transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <div className="font-display text-sm tracking-wide uppercase text-grey mb-4">
            Контакты
          </div>
          <ul className="flex flex-col gap-3 text-sm text-cream/75">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 text-signal shrink-0" />
              г. Днепр, ул. Автозаводская, 14
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-signal shrink-0" />
              <a href="tel:+380990000000" className="hover:text-signal">
                +380 99 000 00 00
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-signal shrink-0" />
              <a href="mailto:info@torqgarage.ua" className="hover:text-signal">
                info@torqgarage.ua
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock size={16} className="mt-0.5 text-signal shrink-0" />
              Пн–Сб: 09:00–19:00
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-cream/45 font-mono">
          <span>© {new Date().getFullYear()} TORQ GARAGE. Все права защищены.</span>
          <span>Портфолио-проект — разработка и SEO</span>
        </div>
      </div>
    </footer>
  );
}
