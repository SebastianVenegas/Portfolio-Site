import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { BottomPortfolioMenu } from "@/components/bottom-portfolio-menu";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s | Sebastian Venegas",
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "Sebastian Venegas",
    "full-stack engineer",
    "product engineer",
    "Next.js developer",
    "TypeScript developer",
    "payment systems",
    "frontend architecture",
    "modern web applications",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sebastian Venegas portfolio preview",
      },
    ],
  },
  icons: {
    icon: [{ url: "/SV%20Fav%20White.svg?v=6", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: "Full-Stack Engineer",
    sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
    knowsAbout: [
      "Full-stack engineering",
      "Next.js",
      "TypeScript",
      "Payment systems",
      "Frontend architecture",
      "Product engineering",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          {children}
          <BottomPortfolioMenu />
        </ThemeProvider>
      </body>
    </html>
  );
}
