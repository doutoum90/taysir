import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "./Card";
import MiniCarousel from "./MiniCarousel";

import type { Service, ActivityCategory } from "../data/services";
import type { Slide } from "../data/slides";

type Props = {
  service: Service;
  slides?: Slide[];
  categoryLabel: (cat: ActivityCategory) => string;

  // Mode compact pour Home
  compact?: boolean;

  // liens
  detailsTo?: string; // ex: `/services/${id}`
};

function clampText(text: string, maxChars: number) {
  const s = (text ?? "").trim();
  if (!maxChars || s.length <= maxChars) return s;
  return s.slice(0, Math.max(0, maxChars - 1)).trimEnd() + "…";
}

export default function ServiceCard({
  service,
  slides = [],
  categoryLabel,
  compact = false,
  detailsTo,
}: Props) {
  const { t } = useTranslation();

  const title = t(service.titleKey, { defaultValue: "—" });
  const desc = t(service.descriptionKey, { defaultValue: "—" });

  // ✅ Home = compact : texte + bullets réduits
  const imageHeight = compact ? 150 : 170;
  const descMax = compact ? 110 : 160;
  const bulletsMax = compact ? 2 : 5;

  const raw = t(service.bulletsKey, { returnObjects: true }) as unknown;
  const bullets = Array.isArray(raw) ? (raw as string[]) : [];
  const previewBullets = bullets.slice(0, bulletsMax);

  const to = detailsTo ?? `/services/${service.id}`;

  return (
    <Card>
      <MiniCarousel slides={slides} height={imageHeight} intervalMs={compact ? 2200 : 2400} />

      <div className="badge" style={{ marginTop: 10 }}>
        {categoryLabel(service.category)}
      </div>

      <h3 style={{ margin: "10px 0 6px", color: "var(--navy)" }}>{title}</h3>

      <p className="p" style={{ marginTop: 0 }}>
        {clampText(desc, descMax)}
      </p>

      {previewBullets.length ? (
        <ul
          style={{
            margin: "8px 0 0",
            paddingLeft: 18,
            color: "var(--muted)",
            display: "grid",
            gap: 4,
            fontSize: 14,
          }}
        >
          {previewBullets.map((b, idx) => (
            <li key={`${service.id}-b-${idx}`}>{b}</li>
          ))}
        </ul>
      ) : null}

      <div style={{ marginTop: 12 }}>
        <Link to={to} className="btn secondary">
          {t("activitiesPage.catalog.readMoreBtn", { defaultValue: "Lire la suite →" })}
        </Link>
      </div>
    </Card>
  );
}
