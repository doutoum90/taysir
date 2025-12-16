import { useEffect, useMemo, useState } from "react";
import type { Slide } from "../data/slides";
import { useTranslation } from "react-i18next";

type Props = {
  slides: Slide[];
  intervalMs?: number;
};

export default function Carousel({ slides, intervalMs = 4500 }: Props) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  const safeSlides = useMemo(() => (slides.length ? slides : []), [slides]);

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeSlides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [safeSlides.length, intervalMs]);

  const current = safeSlides[index];

  const goPrev = () => setIndex((i) => (i - 1 + safeSlides.length) % safeSlides.length);
  const goNext = () => setIndex((i) => (i + 1) % safeSlides.length);

  const title = current ? t(`${current.key}.title`, { defaultValue: current.title }) : "";
  const subtitle = current ? t(`${current.key}.subtitle`, { defaultValue: current.subtitle }) : "";
  const alt = current ? t(`${current.key}.alt`, { defaultValue: current.alt }) : "";

  if (!current) {
    return (
      <div className="card" style={{ padding: 18 }}>
        <div className="kicker">{t("carousel.empty.kicker")}</div>
        <h1 className="h1">{t("carousel.empty.title")}</h1>
        <p className="p">
          {t("carousel.empty.desc")} <code>public/assets</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div style={{ position: "relative", height: 360 }}>
        <img
          src={current.src}
          alt={alt}
          onError={(e) => {
            const msg = t("carousel.imageMissing", { src: current.src });
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600">
                  <rect width="100%" height="100%" fill="#e6ebf2"/>
                  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                        fill="#0B1F3B" font-size="28" font-family="Arial">
                    ${msg}
                  </text>
                </svg>
              `);
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(11,31,59,.80), rgba(11,31,59,.25), rgba(11,31,59,.05))",
            display: "flex",
            alignItems: "center",
            padding: 22,
          }}
        >
          <div style={{ maxWidth: 560, color: "white" }}>
            <div className="kicker" style={{ color: "rgba(255,255,255,.85)" }}>
              {t("carousel.kicker")}
            </div>

            <h1 className="h1" style={{ color: "white" }}>
              {title}
            </h1>

            <p className="p" style={{ color: "rgba(255,255,255,.85)" }}>
              {subtitle}
            </p>

            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a className="btn" href="/contact">
                {t("carousel.contactBtn")}
              </a>
              <a className="btn secondary" href="/services">
                {t("carousel.servicesBtn")}
              </a>
            </div>
          </div>
        </div>

        {/* Controls */}
        {safeSlides.length > 1 ? (
          <div style={{ position: "absolute", right: 12, bottom: 12, display: "flex", gap: 8 }}>
            <button className="btn secondary" onClick={goPrev} aria-label={t("carousel.prev")}>
              ←
            </button>
            <button className="btn secondary" onClick={goNext} aria-label={t("carousel.next")}>
              →
            </button>
          </div>
        ) : null}
      </div>

      {/* Dots */}
      {safeSlides.length > 1 ? (
        <div style={{ display: "flex", gap: 8, padding: 12, justifyContent: "center" }}>
          {safeSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={t("carousel.goto", { index: i + 1 })}
              style={{
                width: 10,
                height: 10,
                borderRadius: 99,
                border: "1px solid var(--border)",
                background: i === index ? "var(--navy)" : "white",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
