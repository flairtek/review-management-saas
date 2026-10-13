import React from "react";

export function SoftwareApplicationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flairtek Review AI",
    operatingSystem: "Web",
    applicationCategory: "BusinessApplication",
    description: "AI-powered Google Business Profile review automation, reply generation, and sentiment analytics platform.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "1999",
      highPrice: "12999",
      offerCount: "3",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1250",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flairtek Review AI",
    url: "https://reviews.flairtek.com",
    logo: "https://reviews.flairtek.com/logo.png",
    sameAs: [
      "https://twitter.com/flairtek",
      "https://linkedin.com/company/flairtek",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98765-43210",
      contactType: "customer support",
      email: "support@flairtek.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
