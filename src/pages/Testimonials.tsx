import Section from "../components/Section";
import Card from "../components/Card";
import { testimonials } from "../data/testimonials";
import { useTranslation } from "react-i18next";

function Stars({ n }: { n: number }) {
  const { t, i18n } = useTranslation();
  const full = Math.max(0, Math.min(5, Math.round(n)));
  return (
    <span aria-label={t("testimonials.starsLabel", { value: full })}>
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}

export default function Testimonials() {
  const { t } = useTranslation();

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div className="card" style={{ padding: 18 }}>
        <div className="kicker">{t("testimonials.hero.kicker")}</div>
        <h1 className="h1">{t("testimonials.hero.title")}</h1>
        <p className="p">{t("testimonials.hero.desc")}</p>
      </div>

      <Section kicker={t("testimonials.section.kicker")} title={t("testimonials.section.title")}>
        <div className="grid cols-3">
          {testimonials.map((x, idx) => (
            <Card key={`${x.name}-${idx}`}>
              <div className="badge">
                <Stars n={x.rating} />
              </div>
              <h3 style={{ margin: "10px 0 6px", color: "var(--navy)" }}>{x.name}</h3>
              <div style={{ color: "var(--muted)", fontWeight: 700 }}>{t(x.roleKey)}</div>
              <p className="p">{t(x.messageKey)}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
