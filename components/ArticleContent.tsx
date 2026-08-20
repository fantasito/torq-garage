import { Lightbulb, TriangleAlert } from "lucide-react";

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; variant: "tip" | "warning"; text: string };

/**
 * Рендер блоков статьи — единственное место на сайте, где нужна типографика
 * для длинного текста (в отличие от остальных страниц, построенных на
 * компонентах-плитках). max-w держит комфортную длину строки для чтения.
 */
export default function ArticleContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="max-w-[65ch] flex flex-col gap-5">
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p key={i} className="text-steel/85 text-base md:text-lg leading-relaxed">
              {block.text}
            </p>
          );
        }
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="font-display font-semibold uppercase text-xl md:text-2xl tracking-tight mt-4"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="flex flex-col gap-2.5 my-1">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-steel/85 text-base leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-signal mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "callout") {
          const isWarning = block.variant === "warning";
          const Icon = isWarning ? TriangleAlert : Lightbulb;
          return (
            <div
              key={i}
              className={`border-l-4 rounded-sm bg-asphalt-2/[0.03] pl-5 pr-4 py-4 flex items-start gap-3 ${
                isWarning ? "border-l-warn" : "border-l-signal"
              }`}
            >
              <Icon
                size={18}
                className={`shrink-0 mt-0.5 ${isWarning ? "text-warn" : "text-signal"}`}
              />
              <p className="text-sm text-steel/80 leading-relaxed">
                {block.text}
              </p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}