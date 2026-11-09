export type NewsItem = {
  id: number;
  title: string | null;
  text: string | null;
  image: string | null;
  created: string;
};

export type PromotionItem = NewsItem & {
  time: string | null;
};
