import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  const SERVICE_LINKS = [
    { href: "/sto", key: "sto" },
    { href: "/tuning", key: "tuning" },
    { href: "/parts", key: "parts" },
    { href: "/detailing", key: "detailing" },
  ] as const;

  const COMPANY_LINKS = [
    { href: "/about", key: "about" },
    { href: "/cases", key: "cases" },
    { href: "/blog", key: "blog" },
    { href: "/contacts", key: "contacts" },
  ] as const;

  return (
    <footer className="bg-asphalt text-cream border-t border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <span className="font-display font-semibold text-xl">
            TORQ<span className="text-signal">GARAGE</span>
          </span>
          <p className="mt-3 text-sm text-cream/60 leading-relaxed max-w-xs">
            {t("description")}
          </p>
        </div>

        <div>
          <div className="font-display text-sm tracking-wide uppercase text-grey mb-4">
            {t("servicesTitle")}
          </div>
          <ul className="flex flex-col gap-2.5">
            {SERVICE_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-cream/75 hover:text-signal transition-colors"
                >
                  {t(`serviceLinks.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display text-sm tracking-wide uppercase text-grey mb-4">
            {t("companyTitle")}
          </div>
          <ul className="flex flex-col gap-2.5">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-cream/75 hover:text-signal transition-colors"
                >
                  {t(`companyLinks.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display text-sm tracking-wide uppercase text-grey mb-4">
            {t("contactsTitle")}
          </div>
          <ul className="flex flex-col gap-3 text-sm text-cream/75">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 text-signal shrink-0" />
              {t("address")}
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
              {t("hours")}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-cream/45 font-mono">
          <span>© {new Date().getFullYear()} TORQ GARAGE. {t("rights")}</span>
          <span>{t("portfolioNote")}</span>
        </div>
      </div>
    </footer>
  );
}
