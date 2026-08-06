const BRANDS = [
  "BMW", "MERCEDES-BENZ", "AUDI", "VOLKSWAGEN", "SKODA", "TOYOTA", "HYUNDAI", "PORSCHE",
];

export default function TrustBar() {
  return (
    <section className="bg-asphalt-2 border-b border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        {BRANDS.map((b) => (
          <span
            key={b}
            className="font-display text-cream/35 text-sm md:text-base tracking-wide"
          >
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
