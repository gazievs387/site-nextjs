import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import newsData from "@/data/news.json";
import promotionsData from "@/data/promotions.json";
import type { NewsItem, PromotionItem } from "@/lib/types";

export const news = newsData as NewsItem[];
export const promotions = promotionsData as PromotionItem[];

export function readPageMarkup(name: string) {
  return readFileSync(path.join(process.cwd(), "content", `${name}.html`), "utf8");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function urlize(value: string) {
  const escaped = escapeHtml(value);
  return escaped.replace(/(https?:\/\/[^\s<]+)/g, (url) => {
    const cleanUrl = url.replace(/[.,!?;:]+$/, "");
    const trailing = url.slice(cleanUrl.length);
    return `<a href="${cleanUrl}" rel="nofollow">${cleanUrl}</a>${trailing}`;
  });
}

function textWithLineBreaks(value: string) {
  return urlize(value).replace(/\r?\n/g, "<br>");
}

function assetUrl(image: string) {
  const publicFile = path.join(process.cwd(), "public", "media", image);
  return existsSync(publicFile) ? `/media/${image}` : null;
}

function newsCard(item: NewsItem) {
  const title = item.title
    ? `<h5>${textWithLineBreaks(item.title)}</h5>`
    : "";
  const body = item.text
    ? `<p style="white-space: pre-wrap; word-break: break-word">${textWithLineBreaks(item.text)}</p>`
    : "";
  const imagePath = item.image ? assetUrl(item.image) : null;
  const image = imagePath
    ? `<img width="100%" loading="lazy" src="${imagePath}" alt="${escapeHtml(item.title || "Новость базы отдыха Ахьаца")}" />`
    : "";
  const posted = escapeHtml(item.created);

  return `<div class="news_card">${title}${body}${image}<div style="padding-top: 10px">Опубликовано: ${posted}</div></div><hr style="width: 100%">`;
}

function promotionCard(item: PromotionItem) {
  const title = item.title
    ? `<h5>${textWithLineBreaks(item.title)}</h5>`
    : "";
  const expiry = item.time ? escapeHtml(item.time) : "";
  const body = item.text
    ? `<p style="white-space: pre-wrap; word-break: break-word">${textWithLineBreaks(item.text)}</p>`
    : "";
  const imagePath = item.image ? assetUrl(item.image) : null;
  const image = imagePath
    ? `<img width="100%" loading="lazy" src="${imagePath}" alt="${escapeHtml(item.title || "Акция базы отдыха Ахьаца")}" />`
    : "";

  return `<div class="news_card">${title}<div style="padding-top: 0px; padding-bottom: 10px">Акция действует до: ${expiry}</div>${body}${image}</div><hr style="width: 100%">`;
}

export function renderNewsItems() {
  return news.length
    ? news.map(newsCard).join("\n")
    : '<br><br><div id="no_comments">Нет новостей</div>';
}

export function renderPromotionItems() {
  return promotions.length
    ? promotions.map(promotionCard).join("\n")
    : '<br><br><div id="no_comments">На данный момент действующих акций нет</div>';
}

export const galleryImages = [
  "img/img5/image1.jpeg",
  "img/img5/image2.jpeg",
  "img/img5/image4.jpeg",
  "img/imgs3/image11.jpg",
  "img/imgs3/image12.jpg",
  "img/imgs3/image14.jpg",
  "img/imgs3/image15.jpg",
  "img/imgs3/image16.jpg",
  "img/imgs3/image17.jpg",
  "img/imgs3/image18.jpg",
  "img/imgs3/image19.jpg",
  "img/imgs3/image23.jpg",
  "css/img3.jpg",
  "img/imgs2/image15.png",
  "img/imgs2/img8.jpg",
  "img/imgs2/img6.jpg",
  "img/imgs2/img9.jpg",
  "img/imgs2/img2.jpg",
  "img/imgs2/image11.jpg",
  "img/imgs2/image12.jpg",
  "img/imgs2/image13.jpg",
  "img/imgs2/image14.png",
  "img/img6.jpg",
  "css/11.jpg",
];

export function renderGalleryImages() {
  return galleryImages
    .map(
      (image) =>
        `<div><a href="/static/${image}"><img src="/static/${image}" alt="Фото базы отдыха Ахьаца в Лдзаа" loading="lazy" /></a></div>`,
    )
    .join("\n");
}

export function markupWithData(name: "news" | "promotions" | "gallery") {
  const file = readPageMarkup(name);
  const placeholder =
    name === "news"
      ? "__NEWS_ITEMS__"
      : name === "promotions"
        ? "__PROMOTIONS_ITEMS__"
        : "__GALLERY_IMAGES__";
  const replacement =
    name === "news"
      ? renderNewsItems()
      : name === "promotions"
        ? renderPromotionItems()
        : renderGalleryImages();

  return file.replace(placeholder, replacement);
}
