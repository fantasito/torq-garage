"use client";

import { useState, FormEvent } from "react";
import { Check } from "lucide-react";
import Button from "@/components/Button";

export default function ContactForm({
  title,
  namePlaceholder,
  phonePlaceholder,
  subjectLabel,
  subjects,
  messagePlaceholder,
  submitLabel,
  consent,
  successTitle,
  successText,
}: {
  title: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  subjectLabel: string;
  subjects: string[];
  messagePlaceholder: string;
  submitLabel: string;
  consent: string;
  successTitle: string;
  successText: string;
}) {
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (phone.trim().length < 7) return;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card-depth border border-line-light bg-white p-8 flex items-start gap-3">
        <div className="w-9 h-9 rounded-sm bg-signal/10 flex items-center justify-center shrink-0">
          <Check size={20} className="text-signal" />
        </div>
        <div>
          <div className="font-display uppercase text-lg">{successTitle}</div>
          <p className="text-steel/70 text-sm mt-1.5">{successText}</p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-depth border border-line-light bg-white p-8"
    >
      <h3 className="font-display font-semibold uppercase text-xl mb-6">
        {title}
      </h3>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder={namePlaceholder}
          className="bg-cream border border-line-light rounded-sm px-4 py-3 text-sm focus:border-signal outline-none transition-colors"
        />
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={phonePlaceholder}
          className="bg-cream border border-line-light rounded-sm px-4 py-3 text-sm font-mono focus:border-signal outline-none transition-colors"
        />

        <div>
          <label className="font-mono text-[11px] text-grey uppercase tracking-wide">
            {subjectLabel}
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {subjects.map((s, i) => (
              <SubjectChip key={s} label={s} defaultActive={i === 0} />
            ))}
          </div>
        </div>

        <textarea
          placeholder={messagePlaceholder}
          rows={4}
          className="bg-cream border border-line-light rounded-sm px-4 py-3 text-sm focus:border-signal outline-none transition-colors resize-none"
        />

        <Button type="submit" fullWidth>
          {submitLabel}
        </Button>
        <p className="text-[11px] text-grey leading-relaxed">{consent}</p>
      </div>
    </form>
  );
}

function SubjectChip({
  label,
  defaultActive,
}: {
  label: string;
  defaultActive?: boolean;
}) {
  const [active, setActive] = useState(!!defaultActive);
  return (
    <button
      type="button"
      onClick={() => setActive((v) => !v)}
      className={`font-mono text-xs px-3 py-1.5 rounded-sm border transition-colors ${
        active
          ? "bg-asphalt text-cream border-asphalt"
          : "border-line-light text-steel hover:border-signal"
      }`}
    >
      {label}
    </button>
  );
}