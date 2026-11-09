import { PageStyles } from "@/components/PageStyles";
import { StaticMarkup } from "@/components/StaticMarkup";
import { StructuredData } from "@/components/StructuredData";
import { markupWithData } from "@/lib/content";
import { pageSeo } from "@/lib/pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(pageSeo.news);

export default function NewsPage() {
  return (
    <>
      <PageStyles stylesheet="/static/css/news.css" />
      <StaticMarkup html={markupWithData("news")} />
      <StructuredData page={pageSeo.news} />
    </>
  );
}
