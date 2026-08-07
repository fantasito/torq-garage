const CAR_PATH =
  "M18 62 C18 54 24 50 33 49 L44 48 C48 40 56 34 68 34 L108 34 C120 34 128 40 132 48 L143 49 C152 50 158 54 158 62 L158 68 C158 71 156 73 153 73 L143 73 M33 73 L25 73 C22 73 20 71 20 68 L18 62 M143 73 C143 79 138 84 132 84 C126 84 121 79 121 73 M143 73 L121 73 M55 73 C55 79 50 84 44 84 C38 84 33 79 33 73 M55 73 L33 73";

export default function CaseArt({
  variant,
  accentLabel,
}: {
  variant: "chip" | "ceramic" | "suspension";
  accentLabel: string;
}) {
  return (
    <svg
      viewBox="0 0 176 100"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="176" height="100" fill="none" />
      <g stroke="var(--color-line)" strokeWidth="0.5" opacity="0.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 22} y1="0" x2={i * 22} y2="100" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="176" y2={i * 20} />
        ))}
      </g>

      <circle cx="44" cy="84" r="8" stroke="var(--color-cream)" strokeOpacity="0.4" strokeWidth="1.4" />
      <circle cx="132" cy="84" r="8" stroke="var(--color-cream)" strokeOpacity="0.4" strokeWidth="1.4" />

      <path
        d={CAR_PATH}
        stroke="var(--color-cream)"
        strokeOpacity="0.65"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {variant === "chip" && (
        <>
          <path d="M108 34 L108 20" stroke="var(--color-signal)" strokeWidth="1.4" strokeDasharray="2 2" />
          <circle cx="108" cy="17" r="2.5" fill="var(--color-signal)" />
          <text x="114" y="20" className="font-mono" fontSize="6" fill="var(--color-signal)">
            ECU
          </text>
        </>
      )}

      {variant === "ceramic" && (
        <g stroke="var(--color-signal)" strokeWidth="1" opacity="0.9">
          <path d="M60 40 L64 34" strokeDasharray="1.5 1.5" />
          <path d="M85 36 L89 30" strokeDasharray="1.5 1.5" />
          <path d="M110 38 L114 32" strokeDasharray="1.5 1.5" />
        </g>
      )}

      {variant === "suspension" && (
        <>
          <line x1="44" y1="76" x2="44" y2="92" stroke="var(--color-signal)" strokeWidth="1.2" strokeDasharray="2 2" />
          <line x1="132" y1="76" x2="132" y2="92" stroke="var(--color-signal)" strokeWidth="1.2" strokeDasharray="2 2" />
          <path d="M40 88 L44 92 L48 88" stroke="var(--color-signal)" strokeWidth="1.2" fill="none" />
        </>
      )}

      <text x="8" y="94" className="font-mono" fontSize="6" fill="var(--color-cream)" opacity="0.35">
        {accentLabel}
      </text>
    </svg>
  );
}
