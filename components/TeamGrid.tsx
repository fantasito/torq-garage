import Reveal from "@/components/Reveal";

export type TeamMember = {
  initials: string;
  name: string;
  role: string;
  since: string;
};

export default function TeamGrid({
  title,
  members,
}: {
  title: string;
  members: TeamMember[];
}) {
  return (
    <section className="bg-cream border-t border-line-light">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <h2 className="font-display font-semibold uppercase text-h2 tracking-tight mb-12">
            {title}
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {members.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.07}>
              <div className="card-depth border border-line-light bg-white p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-sm bg-asphalt text-signal font-mono font-semibold flex items-center justify-center text-sm">
                    {m.initials}
                  </div>
                  <span className="font-mono text-[10px] text-grey uppercase tracking-wide">
                    ID-{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="font-display uppercase text-lg leading-tight">
                  {m.name}
                </div>
                <div className="text-sm text-steel/70 mt-1">{m.role}</div>
                <div className="font-mono text-[11px] text-signal mt-4 pt-4 border-t border-line-light">
                  {m.since}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}