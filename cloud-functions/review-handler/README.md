# Review email function

This folder contains a standalone Node.js handler for the review form. It is not imported by Next.js and is not included in the GitHub Pages static export. The browser sends reviews directly to:

`https://functions.yandexcloud.net/d4eil8dthticklcmmvrn`

## Yandex Cloud setup

- Runtime: Node.js 22
- Entrypoint: `index.handler`
- Install dependencies from this folder with `npm install` before uploading the function code.
- Configure these environment variables in Yandex Cloud:
  - `SMTP_PASSWORD` — required Gmail app password; keep it out of source control.
  - `SMTP_USER` — optional sender account; defaults to `gazievs387@gmail.com` from the supplied example.
  - `REVIEW_EMAIL` — optional recipient; defaults to `SMTP_USER`.
  - `ALLOWED_ORIGIN` — optional browser origin; defaults to `https://akhiatsaotdyh.ru`.

The handler supports `POST` and CORS preflight `OPTIONS`, validates the review fields and arithmetic challenge, and sends a plain-text email through Gmail SMTP. It returns HTTP 200 only after Nodemailer reports successful delivery. The existing function at the URL above must be updated with this handler and environment variables for the flow to work.
