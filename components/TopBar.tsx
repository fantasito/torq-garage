import { Phone, Clock, Send } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-asphalt-2 border-b border-line text-cream/70 text-xs font-mono">
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-9 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="hidden sm:flex items-center gap-1.5">
            <Clock size={13} />
            Пн–Сб 09:00–19:00
          </span>
          <span className="hidden md:inline">Днепр, лев. и прав. берег</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://t.me/torqgarage_bot"
            className="hidden sm:flex items-center gap-1.5 hover:text-signal transition-colors"
          >
            <Send size={13} />
            Telegram
          </a>
          <a
            href="tel:+380990000000"
            className="flex items-center gap-1.5 text-cream hover:text-signal transition-colors"
          >
            <Phone size={13} />
            +380 99 000 00 00
          </a>
        </div>
      </div>
    </div>
  );
}
