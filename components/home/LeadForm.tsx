"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import Button from "@/components/Button";

export default function LeadForm() {
  const t = useTranslations("leadForm");
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (phone.trim().length < 7) return;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card-depth border border-line bg-surface p-7 flex items-start gap-3">
        <div className="w-8 h-8 rounded-sm bg-signal/15 flex items-center justify-center shrink-0">
          <Check size={18} className="text-signal" />
        </div>
        <div>
          <div className="text-cream font-semibold">{t("successTitle")}</div>
          <p className="text-cream/55 text-sm mt-1">{t("successText")}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-depth border border-line bg-surface p-7">
      <div className="flex items-center justify-between mb-5">
        <span className="font-display uppercase text-cream text-sm tracking-wide">
          {t("title")}
        </span>
        <span className="font-mono text-[10px] text-grey">FORM-01</span>
      </div>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder={t("namePlaceholder")}
          className="bg-asphalt border border-line rounded-sm px-4 py-3 text-sm text-cream placeholder:text-grey focus:border-signal outline-none transition-colors"
        />
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t("phonePlaceholder")}
          className="bg-asphalt border border-line rounded-sm px-4 py-3 text-sm text-cream placeholder:text-grey focus:border-signal outline-none transition-colors font-mono"
        />
        <Button type="submit" fullWidth>
          {t("submit")}
        </Button>
        <p className="text-[11px] text-grey leading-relaxed">{t("consent")}</p>
      </div>
    </form>
  );
}
