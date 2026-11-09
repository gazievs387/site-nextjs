"use client";

import { Fragment, useEffect, useState, type FormEvent } from "react";
import axios from "axios";

const reviewFunctionUrl =
  "https://functions.yandexcloud.net/d4eil8dthticklcmmvrn";

export function ReviewForm() {
  const [captcha, setCaptcha] = useState<[number, number]>([3, 4]);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [statusIsError, setStatusIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCaptcha([
      Math.floor(Math.random() * 8) + 1,
      Math.floor(Math.random() * 8) + 1,
    ]);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setStatusIsError(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const review = String(formData.get("text") ?? "").trim();
    const rating = String(formData.get("rating") ?? "");
    const answer = Number(formData.get("captcha"));
    const nextErrors: string[] = [];

    if (!name || name.length > 100) nextErrors.push("Укажите имя (не более 100 символов).");
    if (!review || review.length > 5000) {
      nextErrors.push("Напишите отзыв (не более 5000 символов).");
    }
    if (!/^[1-5]$/.test(rating)) nextErrors.push("Выберите оценку от 1 до 5.");
    if (answer !== captcha[0] + captcha[1]) {
      nextErrors.push("Ответ на проверочный вопрос неверный.");
    }

    if (nextErrors.length) {
      setErrors(nextErrors);
      return;
    }

    setErrors([]);
    setIsSubmitting(true);

    try {
      await axios.post(reviewFunctionUrl, {
        name,
        text: review,
        rating: Number(rating),
        captchaFirst: captcha[0],
        captchaSecond: captcha[1],
        captchaAnswer: answer,
        website: String(formData.get("website") ?? ""),
      });

      window.location.assign("/review/success/");
    } catch {
      setStatus("Не удалось отправить отзыв. Попробуйте ещё раз позже.");
      setStatusIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="id_name">Ваше имя</label>
        <input id="id_name" name="name" type="text" maxLength={100} required />
      </div>

      <div className="field">
        <label htmlFor="id_text">Ваш отзыв</label>
        <textarea id="id_text" name="text" maxLength={5000} required />
      </div>

      <fieldset className="field">
        <legend>Ваша оценка</legend>
        <div className="stars">
          {[5, 4, 3, 2, 1].map((value) => (
            <Fragment key={value}>
              <input
                id={`id_rating_${value - 1}`}
                name="rating"
                type="radio"
                value={value}
                required
              />
              <label
                htmlFor={`id_rating_${value - 1}`}
                title={`${value} из 5`}
              >
                ★
              </label>
            </Fragment>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="id_captcha">Небольшая проверка</label>
        <div className="captcha-question">
          Сколько будет {captcha[0]} + {captcha[1]}?
        </div>
        <input id="id_captcha" name="captcha" type="number" required />
      </div>

      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px" }}
      >
        <label htmlFor="id_website">Оставьте поле пустым</label>
        <input
          id="id_website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      {errors.length > 0 ? (
        <ul className="errorlist" role="alert">
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
      ) : null}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Отправка…" : "Отправить отзыв"}
      </button>

      {status ? (
        <p
          className="intro"
          role={statusIsError ? "alert" : "status"}
          style={{ marginTop: 18, marginBottom: 0 }}
        >
          {status}
        </p>
      ) : null}
    </form>
  );
}
