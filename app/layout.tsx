import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vps.avasis.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CrowdQuest — Every match moment becomes a quest",
  description:
    "A live, sponsor-funded fan quest experience powered by TxLINE match data.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "CrowdQuest — Every match moment becomes a quest",
    description: "Free, sponsor-funded football quests with visible source and settlement state.",
    url: siteUrl,
    siteName: "CrowdQuest",
    images: [{ url: "/screenshot.jpeg", width: 1200, height: 750, alt: "CrowdQuest match room" }],
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
