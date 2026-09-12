import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { AnalyticsInit } from "@/components/AnalyticsInit";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Lilyum Baskı Atölyesi",
    template: "%s | Lilyum Baskı Atölyesi",
  },
  description:
    "Okullar için 3D baskı atölyeleri ve kişiye özel ürünler. Düşle, Tasarla, Şekillendir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${display.variable} ${sans.variable} font-sans antialiased`}>
        <AnalyticsInit />
        {children}
      </body>
    </html>
  );
}
