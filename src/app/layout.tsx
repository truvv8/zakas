import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Didone-засечка для couture-заголовков (поддерживает кириллицу)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chevailer — закрытый доступ к проверенным фабрикам",
  description:
    "Chevailer — приватная сеть проверенных производителей Китая. Прямые контакты без посредников. Доступ по подписке.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="grain min-h-full flex flex-col">{children}</body>
    </html>
  );
}
