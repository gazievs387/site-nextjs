import { Analytics } from "@/components/Analytics";
import { PageStyles } from "@/components/PageStyles";
import { StaticMarkup } from "@/components/StaticMarkup";
import { StructuredData } from "@/components/StructuredData";
import { markupWithData } from "@/lib/content";
import { pageSeo } from "@/lib/pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(pageSeo.promotions);

export default function PromotionsPage() {
  return (
    <>
      <PageStyles stylesheet="/static/css/news.css" />
      <StaticMarkup html={markupWithData("promotions")} />
      <Analytics counterId={101282540} />
      <StructuredData page={pageSeo.promotions} />
    </>
  );
}
