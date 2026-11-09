const nodemailer = require("nodemailer");

const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
const smtpUser = process.env.SMTP_USER || "gazievs387@gmail.com";
const reviewEmail = process.env.REVIEW_EMAIL || smtpUser;

function response(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    },
    body: statusCode === 204 ? "" : JSON.stringify(payload),
  };
}

function requestMethod(event) {
  return (
    event.httpMethod ||
    event.requestContext?.http?.method ||
    event.method ||
    ""
  ).toUpperCase();
}

function parseBody(event) {
  let body = event.body ?? "{}";

  if (event.isBase64Encoded && typeof body === "string") {
    body = Buffer.from(body, "base64").toString("utf8");
  }

  if (typeof body === "string") return JSON.parse(body);
  return body;
}

function smtpTransport() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: smtpUser,
      pass: process.env.SMTP_PASSWORD,
    },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
  });
}

module.exports.handler = async function handler(event) {
  const method = requestMethod(event);
  if (method === "OPTIONS") return response(204, {});
  if (method !== "POST") return response(405, { error: "Method not allowed" });

  let data;
  try {
    data = parseBody(event);
  } catch {
    return response(400, { error: "Invalid JSON" });
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return response(400, { error: "A JSON object is required" });
  }

  // Treat filled honeypot submissions as accepted, without emailing them.
  if (String(data.website ?? "").trim()) return response(200, { ok: true });

  const name = String(data.name ?? "").trim();
  const text = String(data.text ?? "").trim();
  const rating = Number(data.rating);
  const captchaFirst = Number(data.captchaFirst);
  const captchaSecond = Number(data.captchaSecond);
  const captchaAnswer = Number(data.captchaAnswer);

  if (!name || name.length > 100 || !text || text.length > 5000) {
    return response(400, { error: "Name or review text is invalid" });
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return response(400, { error: "Rating must be between 1 and 5" });
  }

  if (
    !Number.isInteger(captchaFirst) ||
    captchaFirst < 1 ||
    captchaFirst > 8 ||
    !Number.isInteger(captchaSecond) ||
    captchaSecond < 1 ||
    captchaSecond > 8 ||
    captchaAnswer !== captchaFirst + captchaSecond
  ) {
    return response(400, { error: "Incorrect verification answer" });
  }

  try {
    const transporter = smtpTransport();

    await transporter.sendMail({
      from: smtpUser,
      to: reviewEmail,
      subject: "Отзыв с сайта базы отдыха «Ахьаца»",
      text: [`Имя: ${name}`, `Оценка: ${rating} из 5`, "", text].join("\n"),
    });
  } catch (error) {
    console.error("Review email delivery failed", error);
    return response(502, { error: "Unable to send review" });
  }

  return response(200, { ok: true });
};
