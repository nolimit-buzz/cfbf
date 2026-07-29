import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Climate finance blending facility | CFBF",
  description: "Mobilising blended finance for sustainable energy access. Capitalised with USD21.3 million concessional funding by the UK Foreign, Commonwealth & Development Office (FCDO) and British International Investment (BII) to de-risk green investments in local currency.",
  keywords: ["Climate Finance", "Blended Finance", "Sustainable Energy", "InfraCredit", "FCDO", "BII", "Nigeria", "Solar Grid", "Green Energy"],
  openGraph: {
    title: "Climate finance blending facility | CFBF",
    description: "Mobilising blended finance for sustainable energy access. Capitalised with USD21.3 million concessional funding by the UK Foreign, Commonwealth & Development Office (FCDO) and British International Investment (BII) to de-risk green investments in local currency.",
    url: "https://climatesupportfacility.org",
    siteName: "CFBF Portal",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  other: {
    "DC.title": "Climate finance blending facility | CFBF",
    "DC.creator": "NoLimitBuzz",
    "DC.subject": "Climate Finance, Blended Finance, Solar Infrastructure, Green Bonds",
    "DC.description": "Catalytic blending facility de-risking green investments in Nigeria.",
    "DC.publisher": "InfraCredit",
    "DC.language": "en",
    "DC.coverage.spatial": "Nigeria",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`} suppressHydrationWarning>
      <body className="bg-white text-brand-dark font-sans antialiased selection:bg-brand-accent selection:text-brand-dark" suppressHydrationWarning>
        <Suspense fallback={<div className="h-16 bg-brand-dark" />}>
          <Navbar />
        </Suspense>
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
