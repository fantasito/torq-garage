import type { Metadata } from "next";
import "@fontsource/oswald/400.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata: Metadata = {
  metadataBase: new URL("https://torq-garage.vercel.app"),
  title: {
    default: "TORQ GARAGE — СТО, тюнинг, чип-тюнинг, запчасти",
    template: "%s | TORQ GARAGE",
  },
  description:
    "СТО полного цикла: диагностика, ремонт, чип-тюнинг, обвесы, оригинальные и контрактные запчасти, детейлинг. Гарантия на работы, прозрачный расчёт стоимости.",
  keywords: [
    "СТО",
    "тюнинг",
    "чип-тюнинг",
    "запчасти",
    "детейлинг",
    "ремонт авто",
    "диагностика авто",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full">
      <body className="min-h-full flex flex-col bg-cream text-asphalt">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
