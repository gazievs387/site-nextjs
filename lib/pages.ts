import type { PageSeo } from "@/lib/seo";

export const pageSeo = {
  home: {
    title: 'База отдыха "Ахьаца" в Лдзаа, Абхазия | Домики у моря',
    description:
      "База отдыха Ахьаца в селе Лдзаа: уютные домики под ключ, Wi-Fi, парковка, мангальная зона, трансфер и море в 700 метрах.",
    path: "/",
    image: "img/imgs3/image16.jpg",
  },
  about: {
    title: 'О базе отдыха "Ахьаца" | Лдзаа, Пицунда, Абхазия',
    description:
      "Описание базы отдыха Ахьаца: расположение в Лдзаа рядом с Пицундой, номера, цены, удобства, адрес и контакты для бронирования.",
    path: "/about",
    image: "css/11.jpg",
  },
  info: {
    title: "Ахьаца: значение названия и традиции Абхазии",
    description:
      "История названия Ахьаца, значение граба в абхазской культуре и связь базы отдыха с природой Лдзаа.",
    path: "/info",
    image: "img/Граб66.jpg",
  },
  gallery: {
    title: 'Галерея базы отдыха "Ахьаца" | Фото номеров и территории',
    description:
      "Фотографии базы отдыха Ахьаца в Лдзаа: номера, территория, двор, море и места для отдыха в Абхазии.",
    path: "/gallery",
    image: "img/imgs3/image12.jpg",
  },
  news: {
    title: 'Новости базы отдыха "Ахьаца" | Лдзаа, Абхазия',
    description:
      "Последние новости базы отдыха Ахьаца: события, обновления, условия проживания и полезная информация для гостей в Лдзаа.",
    path: "/news/",
    image: "img/tree11.png",
  },
  promotions: {
    title: 'Акции базы отдыха "Ахьаца" | Скидки и спецпредложения',
    description:
      "Актуальные акции и специальные предложения базы отдыха Ахьаца для отдыха в Лдзаа рядом с Пицундой.",
    path: "/news/promotions",
    image: "img/tree11.png",
  },
  review: {
    title: "Оставить отзыв | База отдыха «Ахьаца»",
    description: "Оставьте отзыв о базе отдыха «Ахьаца».",
    path: "/review/",
    image: "img/tree11.png",
  },
} satisfies Record<string, PageSeo>;

export const restrictedZoomViewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
} as const;
