import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Reveal from "@/components/Reveal";
import ArticleContent, { ContentBlock } from "@/components/ArticleContent";
import ruMessages from "@/messages/ru.json";

type RawPost = {
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  date: string;
  content: ContentBlock[];
};

const ALL_SLUGS = Object.keys(
  (ruMessages as { blogPage: { posts: Record<string, RawPost> } }).blogPage
    .posts
);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ALL_SLUGS.map((slug) => ({ locale, slug }))
  );
}

async function getPost(locale: string, slug: string) {
  const t = await getTranslations({ locale, namespace: "blogPage" });
  const posts = t.raw("posts") as Record<string, RawPost>;
  return posts[slug] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(locale, slug);
  const path =
    locale === routing.defaultLocale ? `/blog/${slug}` : `/${locale}/blog/${slug}`;

  if (!post) return { title: "404" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: path,
      languages: { ru: `/blog/${slug}`, uk: `/uk/blog/${slug}` },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blogPage");
  const posts = t.raw("posts") as Record<string, RawPost>;
  const post = posts[slug];

  if (!post) notFound();

  const related = Object.entries(posts)
    .filter(([s, v]) => s !== slug && v.tag === post.tag)
    .slice(0, 2);

  const backLabel = t("detail.back");
  const relatedTitle = t("detail.relatedTitle");
  const readMoreLabel = t("grid.readMore");

  return (
    <article className="bg-cream">
      <div className="mx-auto max-w-3xl px-5 md:px-8 pt-10 pb-4">
        <Link
          href="/blog"
          className="font-mono text-xs text-grey hover:text-signal transition-colors"
        >
          ← {backLabel}
        </Link>
      </div>

      <div className="mx-auto max-w-3xl px-5 md:px-8 pb-8">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs text-grey mb-5">
            <span className="text-signal uppercase">{post.tag}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>
          <h1 className="font-display font-semibold uppercase text-h2 tracking-tight leading-tight">
            {post.title}
          </h1>
        </Reveal>
      </div>

      <div className="mx-auto max-w-3xl px-5 md:px-8 pb-20">
        <Reveal delay={0.08}>
          <ArticleContent blocks={post.content} />
        </Reveal>

        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-line-light">
            <Reveal>
              <h2 className="font-display font-semibold uppercase text-lg mb-6">
                {relatedTitle}
              </h2>
            </Reveal>
            <div className="flex flex-col gap-4">
              {related.map(([s, v], i) => (
                <Reveal key={s} delay={i * 0.06}>
                  <Link
                    href={`/blog/${s}`}
                    className="card-depth border border-line-light bg-white p-5 flex items-center justify-between gap-4 hover:border-signal transition-colors"
                  >
                    <span className="font-medium text-sm">{v.title}</span>
                    <span className="font-mono text-xs text-signal shrink-0">
                      {readMoreLabel}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}