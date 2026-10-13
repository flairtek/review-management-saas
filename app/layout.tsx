import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SoftwareApplicationJsonLd, OrganizationJsonLd } from "@/components/seo/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reviews.flairtek.com"),
  title: {
    default: "Flairtek Review AI — Every Review. A Smarter Response.",
    template: "%s | Flairtek Review AI",
  },
  description: "AI-powered Google Business Profile review automation, sentiment analysis, and intelligent multi-tone reply drafting platform.",
  openGraph: {
    title: "Flairtek Review AI",
    description: "Every Review. A Smarter Response. Automate your Google reviews with intelligent AI.",
    url: "https://reviews.flairtek.com",
    siteName: "Flairtek Review AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flairtek Review AI",
    description: "Every Review. A Smarter Response.",
    creator: "@flairtek",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-flex flex-col">
        <SoftwareApplicationJsonLd />
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
