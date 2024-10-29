import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ThemeProvider } from "@/components/theme-provider";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../app/api/uploadthing/core";
/**
 * Root layout component for the website.
 * Renders the main structure of the HTML document with metadata and child components.
 *
 * @param children - The child components to be rendered within the layout.
 * @returns The HTML structure with metadata, theme provider, router configuration, and child components.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Foot Flair",
    template: "%s | Foot Flair",
  },
  description:
    "Discover stylish and comfortable footwear at Foot Flair. Your ultimate destination for high-quality shoes.",
  keywords: ["shoes", "footwear", "fashion", "comfort", "style"],
  authors: [{ name: "Foot Flair Team" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
