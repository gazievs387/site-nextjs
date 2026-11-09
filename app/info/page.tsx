import { PageStyles } from "@/components/PageStyles";
import { StaticMarkup } from "@/components/StaticMarkup";
import { StructuredData } from "@/components/StructuredData";
import { readPageMarkup } from "@/lib/content";
import { pageSeo, restrictedZoomViewport } from "@/lib/pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(pageSeo.info);
export const viewport = restrictedZoomViewport;

export default function InfoPage() {
  return (
    <>
      <PageStyles stylesheet="/static/css/info.css" preconnectFonts />
      <StaticMarkup html={readPageMarkup("info")} />
      <StructuredData page={pageSeo.info} />
    </>
  );
}
