import type { Metadata } from "next";
import { PageStyles } from "@/components/PageStyles";
import { ReviewForm } from "@/components/ReviewForm";
import { StructuredData } from "@/components/StructuredData";
import { pageSeo } from "@/lib/pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(pageSeo.review);

export default function ReviewPage() {
  return (
    <>
      <PageStyles stylesheet="/static/css/review.css" bootstrap={false} />
      <main>
        <h1>Оставить отзыв</h1>
        <p className="intro">Мы будем благодарны за ваш отзыв.</p>
        <ReviewForm />
      </main>
      <StructuredData page={pageSeo.review} />
    </>
  );
}
