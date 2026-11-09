import Script from "next/script";
import { Analytics } from "@/components/Analytics";
import { BnovoWidget } from "@/components/BnovoWidget";
import { PageStyles } from "@/components/PageStyles";
import { StaticMarkup } from "@/components/StaticMarkup";
import { StructuredData } from "@/components/StructuredData";
import { YandexMap } from "@/components/YandexMap";
import { readPageMarkup } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/pages";

export const metadata = createPageMetadata(pageSeo.home);

export default function HomePage() {
  return (
    <>
      <PageStyles
        stylesheet="/static/css/index-v2.css"
        playfair
        marckScript
      />
      <StaticMarkup html={readPageMarkup("home")} />
      <BnovoWidget />
      <YandexMap />
      <Analytics counterId={101282540} />
      <StructuredData page={pageSeo.home} />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script src="/static/js/index.js" strategy="afterInteractive" />
    </>
  );
}
