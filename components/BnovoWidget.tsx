"use client";

import Script from "next/script";

type AdaptiveOptions = Record<string, string>;

declare global {
  interface Window {
    Bnovo_Widget?: {
      init(callback: () => void): void;
      open(elementId: string, options: AdaptiveOptions): void;
    };
    BookingIframe?: new (options: Record<string, string>) => {
      init(): void;
    };
  }
}

const adaptiveOptions: AdaptiveOptions = {
  type: "horizontal",
  uid: "c59b2150-1d5c-4907-bb0a-021689fa059d",
  lang: "ru",
  width: "100%",
  background: "#f9f5ff",
  bg_alpha: "100",
  padding: "20",
  padding_mobile: "20",
  border_radius: "5",
  font_type: "inter",
  title_color: "#000000",
  title_size: "30",
  without_title: "on",
  inp_color: "#212529",
  inp_bordhover: "#dee2e6",
  inp_bordcolor: "#dee2e6",
  inp_alpha: "100",
  btn_background: "#141499",
  btn_background_over: "#1a1ad9",
  btn_textcolor: "#ffffff",
  btn_textover: "#ffffff",
  btn_bordcolor: "#141499",
  btn_bordhover: "#1a1ad9",
  adults_default: "1",
  dates_preset: "on",
  dfrom_tomorrow: "on",
  dto_nextday: "on",
  url: "",
  switch_mobiles: "on",
  switch_mobiles_width: "980",
};

export function BnovoWidget() {
  return (
    <Script
      src="https://widget.reservationsteps.ru/js/bnovo.js"
      strategy="afterInteractive"
      onReady={() => {
        window.Bnovo_Widget?.init(() => {
          window.Bnovo_Widget?.open("_bn_widget_adaptive", adaptiveOptions);
        });
      }}
    />
  );
}

// The Django project also contains this older iframe integration template.
// It is exported for the same Bnovo account but is not rendered: no page
// includes booking.html in the current site.
export function BnovoBookingIframe() {
  return (
    <>
      <div id="booking_iframe" style={{ position: "relative", paddingBottom: 30 }}>
        <div
          id="bn_iframe"
          style={{
            fontFamily: "'Proxima nova', 'Helvetica Neue', 'Cera Pro Medium', Arial, Helvetica, sans-serif",
            position: "absolute",
            right: 0,
            bottom: 0,
            fontSize: 12,
            lineHeight: "1em",
            opacity: 0.5,
            zIndex: 10,
            marginTop: 10,
          }}
        >
          <div style={{ color: "#1403fc", background: "rgba(0, 0, 0, 0)" }}>
            <a
              style={{ color: "#808080", background: "#fff" }}
              href="https://bnovo.ru/bnovo-mb/?utm_source=client_modul_br"
              id="bnovo_link"
              target="_blank"
            >
              Система управления отелем Bnovo ©
            </a>
          </div>
        </div>
      </div>
      <Script
        src="https://widget.reservationsteps.ru/iframe/library/dist/booking_iframe.js"
        strategy="afterInteractive"
        onReady={() => {
          const BookingIframe = window.BookingIframe;
          if (!BookingIframe) return;

          const booking = new BookingIframe({
            html_id: "booking_iframe",
            uid: "c59b2150-1d5c-4907-bb0a-021689fa059d",
            lang: "ru",
            width: "auto",
            height: "auto",
            rooms: "",
            IsMobile: "0",
            scroll_to_rooms: "0",
          });
          booking.init();
        }}
      />
    </>
  );
}
