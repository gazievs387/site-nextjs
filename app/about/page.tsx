import { Analytics } from "@/components/Analytics";
import { PageStyles } from "@/components/PageStyles";
import { StaticMarkup } from "@/components/StaticMarkup";
import { StructuredData } from "@/components/StructuredData";
import { YandexMap } from "@/components/YandexMap";
import { readPageMarkup } from "@/lib/content";
import { pageSeo, restrictedZoomViewport } from "@/lib/pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(pageSeo.about);
export const viewport = restrictedZoomViewport;

export default function AboutPage() {
  return (
    <>
      <PageStyles stylesheet="/static/css/info.css" preconnectFonts />
      <StaticMarkup html={readPageMarkup("about")} />
      <YandexMap />
      <Analytics counterId={101282540} />
      <StructuredData page={pageSeo.about} />
    </>
  );
}
