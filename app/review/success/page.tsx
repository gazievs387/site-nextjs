import type { Metadata } from "next";
import { PageStyles } from "@/components/PageStyles";

export const metadata: Metadata = { title: "Спасибо за отзыв" };

export default function ReviewSuccessPage() {
  return (
    <>
      <PageStyles stylesheet="/static/css/review-success.css" bootstrap={false} />
      <main>
        <h1>Спасибо за отзыв!</h1>
        <a href="/">На главную</a>
      </main>
    </>
  );
}
