import { pageSchema, type PageSeo } from "@/lib/seo";

export function StructuredData({ page }: { page: PageSeo }) {
  const serialized = JSON.stringify(pageSchema(page)).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
