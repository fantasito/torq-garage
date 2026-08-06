"use client";

import { useState, FormEvent } from "react";
import { Check } from "lucide-react";

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (phone.trim().length < 7) return;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-line rounded-sm bg-surface p-6 flex items-start gap-3">
        <div className="w-8 h-8 rounded-sm bg-signal/15 flex items-center justify-center shrink-0">
          <Check size={18} className="text-signal" />
        </div>
        <div>
          <div className="text-cream font-semibold">Заявка принята</div>
          <p className="text-cream/55 text-sm mt-1">
            Перезвоним в течение 18 минут в рабочее время.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line rounded-sm bg-surface p-6"
    >
      <div className="font-display uppercase text-cream text-sm tracking-wide mb-4">
        Запись на диагностику
      </div>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Ваше имя"
          className="bg-asphalt border border-line rounded-sm px-4 py-3 text-sm text-cream placeholder:text-grey focus:border-signal outline-none transition-colors"
        />
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+380 __ ___ __ __"
          className="bg-asphalt border border-line rounded-sm px-4 py-3 text-sm text-cream placeholder:text-grey focus:border-signal outline-none transition-colors font-mono"
        />
        <button
          type="submit"
          className="bg-signal hover:bg-signal-dim text-cream font-semibold py-3 rounded-sm transition-colors text-sm"
        >
          Записаться бесплатно
        </button>
        <p className="text-[11px] text-grey leading-relaxed">
          Нажимая кнопку, соглашаетесь с обработкой персональных данных.
        </p>
      </div>
    </form>
  );
}
