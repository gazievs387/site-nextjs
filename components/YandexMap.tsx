"use client";

import { useEffect } from "react";

const mapScript =
  "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A9716a464351952de41801cbbb76a5055e99b00c16cf5b61cee74c61b608ea48e&width=100%&height=400&lang=ru_RU&scroll=true";

export function YandexMap() {
  useEffect(() => {
    const placeholder = document.getElementById("yandex-map-script-placeholder");
    if (!placeholder || placeholder.dataset.loaded) return;

    const script = document.createElement("script");
    script.src = mapScript;
    script.async = true;
    script.charset = "utf-8";
    placeholder.dataset.loaded = "true";
    placeholder.replaceWith(script);
  }, []);

  return null;
}
