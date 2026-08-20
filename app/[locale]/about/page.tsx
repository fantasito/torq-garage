import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Timeline, { TimelineItem } from "@/components/Timeline";
import SpecSheet, { SpecItem } from "@/components/SpecSheet";
import TeamGrid, { TeamMember } from "@/components/TeamGrid";
import CtaBand from "@/components/home/CtaBand";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage.meta" });
  const path = locale === routing.defaultLocale ? "/about" : `/${locale}/about`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { ru: "/about", uk: "/uk/about" },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("aboutPage");

  const timelineItems: TimelineItem[] = [
    { year: t("timeline.y2015.year"), text: t("timeline.y2015.text") },
    { year: t("timeline.y2018.year"), text: t("timeline.y2018.text") },
    { year: t("timeline.y2020.year"), text: t("timeline.y2020.text") },
    { year: t("timeline.y2022.year"), text: t("timeline.y2022.text") },
    { year: t("timeline.y2025.year"), text: t("timeline.y2025.text") },
  ];

  const specItems: SpecItem[] = [
    { label: t("specSheet.philosophy.label"), value: t("specSheet.philosophy.value") },
    { label: t("specSheet.warranty.label"), value: t("specSheet.warranty.value") },
    { label: t("specSheet.transparency.label"), value: t("specSheet.transparency.value") },
    { label: t("specSheet.equipment.label"), value: t("specSheet.equipment.value") },
    { label: t("specSheet.team.label"), value: t("specSheet.team.value") },
  ];

  const teamMembers: TeamMember[] = [
    { initials: t("team.member1.initials"), name: t("team.member1.name"), role: t("team.member1.role"), since: t("team.member1.since") },
    { initials: t("team.member2.initials"), name: t("team.member2.name"), role: t("team.member2.role"), since: t("team.member2.since") },
    { initials: t("team.member3.initials"), name: t("team.member3.name"), role: t("team.member3.role"), since: t("team.member3.since") },
    { initials: t("team.member4.initials"), name: t("team.member4.name"), role: t("team.member4.role"), since: t("team.member4.since") },
  ];

  return (
    <>
      {/* Masthead — без бейджа/кнопки как в PageHero: статистика прямо
          в кадре, акцент на истории компании, а не на конверсии. */}
      <section className="relative bg-asphalt overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/pages/about-hero.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/80 to-asphalt/50" />
        <div className="absolute inset-0 scan-texture grain" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 pt-20 pb-16 md:pt-32 md:pb-20">
          <Reveal>
            <h1 className="font-display font-semibold uppercase text-h2 text-cream max-w-2xl">
              {t("hero.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-cream/60 text-lg mt-5 max-w-xl leading-relaxed">
              {t("hero.description")}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="grid grid-cols-3 gap-6 max-w-lg mt-12 border-t border-line pt-6">
              <div>
                <div className="font-mono text-cream text-3xl font-semibold">
                  <CountUp value={11} />
                </div>
                <div className="text-[11px] text-grey mt-1 uppercase tracking-wide">
                  {t("hero.statYears")}
                </div>
              </div>
              <div>
                <div className="font-mono text-cream text-3xl font-semibold">
                  <CountUp value={6400} suffix="+" />
                </div>
                <div className="text-[11px] text-grey mt-1 uppercase tracking-wide">
                  {t("hero.statCars")}
                </div>
              </div>
              <div>
                <div className="font-mono text-cream text-3xl font-semibold">
                  <CountUp value={8} />
                </div>
                <div className="text-[11px] text-grey mt-1 uppercase tracking-wide">
                  {t("hero.statTeam")}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Timeline title={t("timeline.title")} items={timelineItems} />
      <SpecSheet title={t("specSheet.title")} items={specItems} />
      <TeamGrid title={t("team.title")} members={teamMembers} />
      <CtaBand />
    </>
  );
}