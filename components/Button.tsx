import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

// primary — главный CTA (сигнальный оранжевый)
// ghost — вторичный на тёмном фоне (Hero, CtaBand)
// ghost-dark — вторичный на светлом фоне (cream-секции)
type Variant = "primary" | "ghost" | "ghost-dark";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = BaseProps & {
  href: string;
  external?: boolean;
};

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type Props = LinkButtonProps | NativeButtonProps;

const SIZE_CLS: Record<Size, string> = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-6 py-3.5 text-sm",
  lg: "px-7 py-4 text-base",
};

const VARIANT_CLS: Record<Variant, string> = {
  // Основной CTA — сигнальный оранжевый, для главных действий (запись, отправка формы)
  primary:
    "bg-signal hover:bg-signal-dim text-cream font-semibold transition-colors",
  // Вторичный — на тёмном фоне (Hero, CtaBand, тёмные секции)
  ghost:
    "border border-cream/25 hover:border-signal text-cream font-medium transition-colors",
  // Вторичный — на светлом фоне (cream-секции, страницы услуг)
  "ghost-dark":
    "border border-line hover:border-signal text-asphalt font-medium transition-colors",
};

function Content({
  children,
  icon,
}: {
  children: ReactNode;
  icon?: boolean;
}) {
  return (
    <>
      {children}
      {icon && (
        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      )}
    </>
  );
}

export default function Button(props: Props) {
  const {
    variant = "primary",
    size = "md",
    icon = false,
    fullWidth = false,
    children,
    className = "",
  } = props;

  const cls = [
    "group rounded-sm flex items-center justify-center gap-2 whitespace-nowrap",
    SIZE_CLS[size],
    VARIANT_CLS[variant],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
        >
          <Content icon={icon}>{children}</Content>
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        <Content icon={icon}>{children}</Content>
      </Link>
    );
  }

  const { href: _href, ...rest } = props as NativeButtonProps;
  void _href;
  return (
    <button {...rest} className={cls}>
      <Content icon={icon}>{children}</Content>
    </button>
  );
}
