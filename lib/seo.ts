import type { Metadata } from "next";

export const siteUrl = "https://akhiatsaotdyh.ru";
export const siteName = 'База отдыха "Ахьаца"';
export const siteDescription =
  "База отдыха Ахьаца в селе Лдзаа, Абхазия: уютные домики, парковка, Wi-Fi, мангальная зона и 700 метров до моря.";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image: string;
};

export function createPageMetadata(page: PageSeo): Metadata {
  const canonical = new URL(page.path, siteUrl).toString();
  const image = new URL(`/static/${page.image}`, siteUrl).toString();

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      locale: "ru_RU",
      type: "website",
      siteName,
      title: page.title,
      description: page.description,
      url: canonical,
      images: [{ url: image, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
}

export function pageSchema(page: PageSeo) {
  const canonical = new URL(page.path, siteUrl).toString();
  const pageImage = new URL(`/static/${page.image}`, siteUrl).toString();
  const businessId = new URL("#lodging-business", siteUrl).toString();
  const websiteId = new URL("#website", siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: "ru-RU",
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: page.title,
        description: page.description,
        inLanguage: "ru-RU",
        isPartOf: { "@id": websiteId },
        about: { "@id": businessId },
        primaryImageOfPage: { "@type": "ImageObject", url: pageImage },
      },
      {
        "@type": "LodgingBusiness",
        "@id": businessId,
        name: siteName,
        alternateName: "Ахьаца",
        url: siteUrl,
        description: siteDescription,
        image: [
          "/static/img/imgs3/image16.jpg",
          "/static/img/imgs3/image12.jpg",
          "/static/css/11.jpg",
        ].map((path) => new URL(path, siteUrl).toString()),
        telephone: "+7-962-890-17-55",
        priceRange: "1500-5600 RUB",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Агрба 67",
          addressLocality: "Лдзаа",
          addressRegion: "Гагрский район",
          addressCountry: "Abkhazia",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 43.178621736218254,
          longitude: 40.37610995137239,
        },
        amenityFeature: ["Wi-Fi", "Парковка", "Мангальная зона", "Трансфер"].map(
          (name) => ({
            "@type": "LocationFeatureSpecification",
            name,
            value: true,
          }),
        ),
        sameAs: [
          "https://www.instagram.com/akhiatsaotdyh",
          "https://t.me/akhyatsaotdyh",
        ],
      },
    ],
  };
}
