"use client";

import dynamic from 'next/dynamic';
import Hero from "@/components/home/Hero"; // Above fold — keep eager

// Below-fold — lazy loaded to prevent simultaneous hydration
const AboutSection    = dynamic(() => import('@/components/home/About'),   { ssr: false });
const HowWeDriveImpact = dynamic(() => import('@/components/home/Impact'), { ssr: false });
const Projects        = dynamic(() => import('@/components/home/Projects'), { ssr: false });
const MapSection      = dynamic(() => import('@/components/home/Map'),     { ssr: false });
const FeaturedStories = dynamic(() => import('@/components/home/Stories'), { ssr: false });
const LatestNews      = dynamic(() => import('@/components/home/News'),    { ssr: false });
const NetZeroSection  = dynamic(() => import('@/components/home/NetZero'), { ssr: false });


export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://climatesupportfacility.org/#organization",
        "name": "Climate Finance Blending Facility (CFBF)",
        "url": "https://climatesupportfacility.org",
        "logo": {
          "@type": "ImageObject",
          "url": "https://climatesupportfacility.org/logo.png"
        },
        "description": "A catalytic facility managed by InfraCredit and capitalized with UK FCDO concessional capital and British International Investment (BII) funding to de-risk green investments in local currency.",
        "sponsor": [
          {
            "@type": "Organization",
            "name": "UK Foreign, Commonwealth & Development Office (FCDO)"
          },
          {
            "@type": "Organization",
            "name": "British International Investment (BII)"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://climatesupportfacility.org/#website",
        "url": "https://climatesupportfacility.org",
        "name": "Climate Finance Blending Facility | CFBF",
        "publisher": {
          "@id": "https://climatesupportfacility.org/#organization"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <AboutSection />
      <HowWeDriveImpact />
      <Projects />
      <MapSection />
      <FeaturedStories />
      <LatestNews />
      <NetZeroSection />
    </>
  );
}
