"use client";

import { useEffect } from "react";

type YandexFunction = ((...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: YandexFunction;
  }
}

export function Analytics({ counterId }: { counterId: number }) {
  useEffect(() => {
    const ym: YandexFunction =
      window.ym ??
      Object.assign(
        (...args: unknown[]) => {
          (ym.a ??= []).push(args);
        },
        { a: [] as unknown[][], l: Date.now() },
      );

    window.ym = ym;
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://mc.yandex.ru/metrika/tag.js"]',
    );
    if (!existing) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://mc.yandex.ru/metrika/tag.js";
      document.head.insertBefore(script, document.head.firstChild);
    }

    ym(counterId, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      ...(counterId === 101282540 ? { webvisor: true } : {}),
    });
  }, [counterId]);

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${counterId}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </div>
    </noscript>
  );
}
