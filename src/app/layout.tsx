import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

// Высококонтрастный «модный дом» сериф для заголовков и цен.
const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  display: "swap",
});

// Спокойный гротеск для текста и интерфейса.
const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chevailer — закрытый доступ к проверенным поставщикам",
  description:
    "Chevailer — закрытая база проверенных производителей. Прямые контакты без посредников. Доступ по подписке.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
