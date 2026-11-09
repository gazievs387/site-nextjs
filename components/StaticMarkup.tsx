export function StaticMarkup({ html }: { html: string }) {
  return (
    <div
      style={{ display: "contents" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
