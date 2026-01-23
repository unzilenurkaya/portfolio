import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import FluidCursor from "@/components/ui/FluidCursor";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CookieBanner from "@/components/ui/CookieBanner";
import { PersonSchema, WebSiteSchema } from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unzilenurkaya.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ünzile Nur KAYA | YBS Öğrencisi & Developer",
    template: "%s | Ünzile Nur KAYA",
  },
  description:
    "Veri analizi, Python otomasyonu ve web geliştirme alanlarında uzmanlaşan YBS öğrencisi. Portfolio, projeler ve blog yazıları.",
  keywords: [
    "Ünzile Nur KAYA",
    "portfolio",
    "developer",
    "YBS",
    "veri analizi",
    "python",
    "web geliştirme",
    "data analyst",
    "software developer",
  ],
  authors: [{ name: "Ünzile Nur KAYA", url: siteUrl }],
  creator: "Ünzile Nur KAYA",
  publisher: "Ünzile Nur KAYA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "Ünzile Nur KAYA Portfolio",
    title: "Ünzile Nur KAYA | YBS Öğrencisi & Developer",
    description:
      "Veri analizi, Python otomasyonu ve web geliştirme alanlarında uzmanlaşan YBS öğrencisi.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ünzile Nur KAYA - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ünzile Nur KAYA | YBS Öğrencisi & Developer",
    description:
      "Veri analizi, Python otomasyonu ve web geliştirme alanlarında uzmanlaşan YBS öğrencisi.",
    images: ["/og-image.png"],
    creator: "@unzilenurkaya",
  },
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
  verification: {
    google: "google-site-verification-code",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <PersonSchema
          name="Ünzile Nur KAYA"
          jobTitle="YBS Öğrencisi & Developer"
          description="Veri analizi, Python otomasyonu ve web geliştirme alanlarında uzmanlaşan YBS öğrencisi."
          url={siteUrl}
          image={`${siteUrl}/profile.jpg`}
          sameAs={[
            "https://linkedin.com/in/unzilenurkaya",
            "https://github.com/unzilenurkaya",
            "https://twitter.com/unzilenurkaya",
          ]}
        />
        <WebSiteSchema
          name="Ünzile Nur KAYA Portfolio"
          description="Veri analizi, Python otomasyonu ve web geliştirme alanlarında uzmanlaşan YBS öğrencisi. Portfolio, projeler ve blog yazıları."
          url={siteUrl}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        <LanguageProvider>
          {/* Skip to main content - Accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-black focus:rounded-lg focus:font-medium"
          >
            Ana içeriğe atla
          </a>
          <FluidCursor />
          <main id="main-content">
            {children}
          </main>
          <ScrollToTop />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
