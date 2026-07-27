import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import NavigationProgress from "@/components/NavigationProgress";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intel AI — Master DSA, System Design, Full Stack & AI",
  description:
    "Learn from industry experts. Master Data Structures & Algorithms, System Design, Full Stack Development, and Artificial Intelligence with Intel AI's structured learning paths.",
  keywords: ["DSA", "System Design", "Full Stack", "AI", "Machine Learning", "Coding Bootcamp"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Intel AI — Master DSA, System Design, Full Stack & AI",
    description: "Structured learning paths built for the next generation of software engineers and AI practitioners.",
    type: "website",
    siteName: "Intel AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intel AI — Master DSA, System Design, Full Stack & AI",
    description: "Structured learning paths built for the next generation of software engineers and AI practitioners.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">
        <AuthProvider>
          <NavigationProgress />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
