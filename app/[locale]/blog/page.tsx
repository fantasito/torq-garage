import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Reveal from "@/components/Reveal";
import BlogGrid, { BlogPostSummary } from "@/components/BlogGrid";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage.meta" });
  const path = locale === routing.defaultLocale ? "/blog" : `/${locale}/blog`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { ru: "/blog", uk: "/uk/blog" },
    },
  };
}

type RawPost = {
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  date: string;
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blogPage");
  const postsObj = t.raw("posts") as Record<string, RawPost>;
  const posts: BlogPostSummary[] = Object.entries(postsObj).map(
    ([slug, v]) => ({ slug, ...v })
  );

  return (
    <>
      <section className="bg-cream border-b border-line-light">
        <div className="mx-auto max-w-7xl px-5 md:px-8 pt-16 pb-10 md:pt-20 md:pb-12">
          <Reveal>
            <h1 className="font-display font-semibold uppercase text-hero tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="text-grey text-lg mt-4 max-w-lg leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      <BlogGrid
        posts={posts}
        allLabel={t("grid.all")}
        readMoreLabel={t("grid.readMore")}
      />
    </>
  );
}