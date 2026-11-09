import { Analytics } from "@/components/Analytics";
import { PageStyles } from "@/components/PageStyles";
import { StaticMarkup } from "@/components/StaticMarkup";
import { StructuredData } from "@/components/StructuredData";
import { markupWithData } from "@/lib/content";
import { pageSeo, restrictedZoomViewport } from "@/lib/pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(pageSeo.gallery);
export const viewport = restrictedZoomViewport;

export default function GalleryPage() {
  return (
    <>
      <PageStyles stylesheet="/static/css/gallery.css" />
      <StaticMarkup html={markupWithData("gallery")} />
      <Analytics counterId={101593822} />
      <StructuredData page={pageSeo.gallery} />
    </>
  );
}
