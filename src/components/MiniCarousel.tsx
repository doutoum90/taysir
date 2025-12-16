import { useEffect, useMemo, useState } from "react";
import type { Slide } from "../data/slides";
import { useTranslation } from "react-i18next";

type Props = {
  slides: Slide[];
  intervalMs?: number;
  height?: number; // hauteur du mini carousel (ex: 150)
  showControls?: boolean;
};

export default function MiniCarousel({
  slides,
  intervalMs = 2600,
  height = 150,
  showControls = true,
}: Props) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  const safeSlides = useMemo(() => (Array.isArray(slides) ? slides : []), [slides]);

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

  if (!current) {
    return (
      <div
        style={{
          height,
          borderRadius: 16,
          border: "1px solid var(--border)",
          background: "rgba(11,31,59,.03)",
          display: "grid",
          placeItems: "center",
          color: "var(--muted)",
          fontWeight: 800,
        }}
      >
        {t("carousel.imageMissing", { src: "—" })}
      </div>
    );
  }

  // ⚠️ IMPORTANT: toujours mettre defaultValue pour éviter l’affichage des clés
  const title = t(`${current.key}.title`, { defaultValue: "" });
  const subtitle = t(`${current.key}.subtitle`, { defaultValue: "" });
  const alt = t(`${current.key}.alt`, { defaultValue: "" });

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          height,
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid var(--border)",
          position: "relative",
        }}
      >
        <img
          src={current.src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => {
            const msg = t("carousel.imageMissing", { src: current.src });
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600">
                  <rect width="100%" height="100%" fill="#e6ebf2"/>
                  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                        fill="#0B1F3B" font-size="22" font-family="Arial">
                    ${msg}
                  </text>
                </svg>
              `);
          }}
        />

        {/* overlay mini */}
        {(title || subtitle) && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(11,31,59,.75), rgba(11,31,59,.10))",
              padding: 12,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div style={{ color: "white", maxWidth: "90%" }}>
              {title ? <div style={{ fontWeight: 900, fontSize: 14, lineHeight: 1.2 }}>{title}</div> : null}
              {subtitle ? (
                <div style={{ opacity: 0.9, fontWeight: 700, fontSize: 12, marginTop: 2 }}>{subtitle}</div>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {showControls && safeSlides.length > 1 ? (
        <div style={{ position: "absolute", right: 10, bottom: 10, display: "flex", gap: 8 }}>
          <button className="btn secondary" onClick={goPrev} aria-label={t("carousel.prev")}>
            ←
          </button>
          <button className="btn secondary" onClick={goNext} aria-label={t("carousel.next")}>
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
