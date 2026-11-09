import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.join(process.cwd(), "out");
const pages = [
  { file: "about/index.html", generatedPath: "/about/", sourcePath: "/about" },
  { file: "info/index.html", generatedPath: "/info/", sourcePath: "/info" },
  { file: "gallery/index.html", generatedPath: "/gallery/", sourcePath: "/gallery" },
  {
    file: "news/promotions/index.html",
    generatedPath: "/news/promotions/",
    sourcePath: "/news/promotions",
  },
];

for (const page of pages) {
  const file = path.join(outputDirectory, page.file);
  const generatedUrl = `https://akhiatsaotdyh.ru${page.generatedPath}`;
  const sourceUrl = `https://akhiatsaotdyh.ru${page.sourcePath}`;
  const html = await readFile(file, "utf8");
  await writeFile(file, html.replaceAll(generatedUrl, sourceUrl), "utf8");
}
