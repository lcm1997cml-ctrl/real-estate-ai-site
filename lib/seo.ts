import { Metadata } from "next";

const SITE_NAME = "香港樓盤數據分析";

/** Canonical site origin (no trailing slash). Used for canonical URLs, OG, JSON-LD. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  /** Optional override for the og:image URL */
  ogImage?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  ogImage,
}: SeoInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage ?? `${SITE_URL}/og-default.png`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "zh_HK",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description:
          "整合香港一手樓盤數據，提供客觀比較、按揭分析與置業工具，協助你作出更清晰的決策。",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/projects?district={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }),
    },
  };
}

/** Build JSON-LD for an individual project page. */
export function buildProjectJsonLd({
  name,
  description,
  url,
  image,
  priceFrom,
  district,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceFrom?: string;
  district?: string;
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    image,
    offers: priceFrom
      ? {
          "@type": "Offer",
          price: priceFrom.replace(/[^0-9]/g, ""),
          priceCurrency: "HKD",
          availability: "https://schema.org/InStock",
          areaServed: district ?? "Hong Kong",
        }
      : undefined,
  });
}
