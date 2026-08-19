"use client";

import { useEffect, useState } from "react";
import { Phone, MapPin, Clock, Send, Mail, Circle } from "lucide-react";

/**
 * "Диспетчерская" — статус-панель в стиле терминала. Статус открыто/закрыто
 * считается на клиенте по текущему времени (Пн-Сб 09:00-19:00, Вс — закрыто).
 * Хардкод расписания здесь, а не парсинг BUSINESS.openingHours — так как
 * формат "Mo-Sa 09:00-19:00" для schema.org и человеко-логика открытия
 * могут разойтись в будущем, лучше не завязывать одно на другое неявно.
 */
function useIsOpenNow() {
  const [state, setState] = useState<{ open: boolean; label: string } | null>(
    null
  );

  useEffect(() => {
    function check() {
      const now = new Date();
      const day = now.getDay(); // 0 = Вс
      const hour = now.getHours() + now.getMinutes() / 60;
      const isWorkDay = day >= 1 && day <= 6;
      const isWorkHour = hour >= 9 && hour < 19;
      const open = isWorkDay && isWorkHour;
      setState({
        open,
        label: open ? "ОТКРЫТО СЕЙЧАС" : "ЗАКРЫТО СЕЙЧАС",
      });
    }
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  return state;
}

export default function StatusPanel({
  addressLabel,
  hoursLabel,
  phoneLabel,
  telegramLabel,
  emailLabel,
  address,
  hours,
  phone,
  phoneDisplay,
  telegram,
  email,
}: {
  addressLabel: string;
  hoursLabel: string;
  phoneLabel: string;
  telegramLabel: string;
  emailLabel: string;
  address: string;
  hours: string;
  phone: string;
  phoneDisplay: string;
  telegram: string;
  email: string;
}) {
  const status = useIsOpenNow();

  const rows = [
    { icon: MapPin, label: addressLabel, value: address },
    { icon: Clock, label: hoursLabel, value: hours },
    {
      icon: Phone,
      label: phoneLabel,
      value: phoneDisplay,
      href: `tel:${phone}`,
    },
    { icon: Send, label: telegramLabel, value: "@torqgarage_bot", href: telegram },
    { icon: Mail, label: emailLabel, value: email, href: `mailto:${email}` },
  ];

  return (
    <div className="card-depth border border-line bg-asphalt-2 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-line">
        <span className="font-mono text-[11px] uppercase tracking-widest text-grey">
          TORQ-GARAGE / STATUS
        </span>
        {status && (
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide">
            <Circle
              size={8}
              className={
                status.open
                  ? "text-ok fill-ok animate-pulse"
                  : "text-steel fill-steel"
              }
            />
            <span className={status.open ? "text-ok" : "text-steel"}>
              {status.label}
            </span>
          </span>
        )}
      </div>

      <div className="divide-y divide-line">
        {rows.map((row) => {
          const content = (
            <>
              <row.icon size={16} className="text-signal shrink-0" />
              <div className="min-w-0">
                <div className="font-mono text-[10px] text-grey uppercase tracking-wide">
                  {row.label}
                </div>
                <div className="text-cream text-sm mt-0.5 truncate">
                  {row.value}
                </div>
              </div>
            </>
          );
          return row.href ? (
            <a
              key={row.label}
              href={row.href}
              className="flex items-center gap-3 px-6 py-4 hover:bg-asphalt transition-colors"
            >
              {content}
            </a>
          ) : (
            <div key={row.label} className="flex items-center gap-3 px-6 py-4">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}