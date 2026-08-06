import { Phone, Send } from "lucide-react";

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
      <a
        href="https://t.me/torqgarage_bot"
        aria-label="Написать в Telegram"
        className="w-12 h-12 rounded-sm bg-asphalt border border-line hover:border-signal text-cream flex items-center justify-center transition-colors shadow-lg"
      >
        <Send size={19} />
      </a>
      <a
        href="tel:+380990000000"
        aria-label="Позвонить"
        className="w-12 h-12 rounded-sm bg-signal hover:bg-signal-dim text-cream flex items-center justify-center transition-colors shadow-lg"
      >
        <Phone size={19} />
      </a>
    </div>
  );
}
