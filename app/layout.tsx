import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { YandexMetrika } from "@/components/YandexMetrika";
import { siteDescription, siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: siteDescription,
  verification: { yandex: "18b1388a71a02133" },
  manifest: "/static/img/site.webmanifest",
  icons: {
    icon: [
      { url: "/static/img/граб1.ico", type: "image/x-icon" },
      { url: "/static/img/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/static/img/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/static/img/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/static/img/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  other: { "msapplication-TileColor": "#da532c" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
