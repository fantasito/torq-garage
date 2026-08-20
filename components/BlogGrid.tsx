"use client";

import { useState, useMemo } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  date: string;
};

export default function BlogGrid({
  posts,
  allLabel,
  readMoreLabel,
}: {
  posts: BlogPostSummary[];
  allLabel: string;
  readMoreLabel: string;
}) {
  const [tag, setTag] = useState(allLabel);

  const tags = useMemo(
    () => [allLabel, ...Array.from(new Set(posts.map((p) => p.tag)))],
    [posts, allLabel]
  );

  const filtered = useMemo(
    () => (tag === allLabel ? posts : posts.filter((p) => p.tag === tag)),
    [posts, tag, allLabel]
  );

  const [featured, ...rest] = filtered;

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <Reveal>
          <div className="flex flex-wrap gap-2 mb-10">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`font-mono text-xs px-3.5 py-2 rounded-sm border transition-colors ${
                  tag === t
                    ? "bg-asphalt text-cream border-asphalt"
                    : "border-line-light text-steel hover:border-signal"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        {featured && (
          <Reveal delay={0.08}>
            <Link
              href={`/blog/${featured.slug}`}
              className="group card-depth block border border-line-light bg-white p-8 md:p-12 mb-8 hover:border-signal transition-colors"
            >
              <div className="flex items-center gap-3 font-mono text-xs text-grey mb-5">
                <span className="text-signal uppercase">{featured.tag}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {featured.readTime}
                </span>
              </div>
              <h2 className="font-display font-semibold uppercase text-h2 tracking-tight max-w-2xl leading-tight">
                {featured.title}
              </h2>
              <p className="text-steel/75 text-base mt-4 max-w-xl leading-relaxed">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-signal mt-6 group-hover:gap-2.5 transition-all">
                {readMoreLabel}
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </Reveal>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.07}>
              <Link
                href={`/blog/${post.slug}`}
                className="group card-depth block border border-line-light bg-white p-6 h-full hover:border-signal transition-colors"
              >
                <div className="flex items-center gap-2 font-mono text-[11px] text-grey mb-4">
                  <span className="text-signal uppercase">{post.tag}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-display font-semibold uppercase text-lg leading-tight">
                  {post.title}
                </h3>
                <p className="text-steel/70 text-sm mt-2.5 leading-relaxed">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-signal mt-4 group-hover:gap-2 transition-all">
                  {readMoreLabel}
                  <ArrowUpRight size={13} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}