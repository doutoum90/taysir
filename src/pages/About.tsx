import Section from "../components/Section";
import Card from "../components/Card";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type Item = { title: string; desc?: string };

export default function About() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const highlights = useMemo(() => {
    const raw = t("about.organization.highlights", { returnObjects: true }) as unknown;
    return Array.isArray(raw) ? (raw as string[]) : [];
  }, [i18n.language, t]);

  const items = useMemo(() => {
    const raw = t("about.projects.items", { returnObjects: true }) as unknown;
    return Array.isArray(raw) ? (raw as Item[]) : [];
  }, [i18n.language, t]);

  return (
    <div style={{ display: "grid", gap: 18, direction: isRTL ? "rtl" : "ltr" }}>
      {/* HERO */}
      <div
        className="card"
        style={{
          padding: 18,
          border: "1px solid var(--border)",
          background:
            "linear-gradient(135deg, rgba(11,31,59,.12), rgba(11,31,59,.03))",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div className="kicker">{t("about.hero.kicker")}</div>
          <div
            className="badge"
            style={{
              background: "rgba(11,31,59,.10)",
              border: "1px solid rgba(11,31,59,.18)",
              color: "var(--navy)",
            }}
          >
            TEYSİR
          </div>
        </div>

        <h1 className="h1" style={{ marginTop: 8 }}>
          {t("about.hero.title")}
        </h1>

        <p className="p" style={{ maxWidth: 980, marginTop: 6 }}>
          {t("about.hero.desc")}
        </p>

        {/* Mission / Vision cards */}
        <div className="grid cols-2" style={{ marginTop: 14 }}>
          <Card>
            <div className="kicker">{t("about.identity.mission.kicker")}</div>
            <h3 style={{ margin: "6px 0", color: "var(--navy)" }}>
              {t("about.identity.mission.title")}
            </h3>
            <p className="p" style={{ marginTop: 0 }}>
              {t("about.identity.mission.desc")}
            </p>
          </Card>

          <Card>
            <div className="kicker">{t("about.identity.vision.kicker")}</div>
            <h3 style={{ margin: "6px 0", color: "var(--navy)" }}>
              {t("about.identity.vision.title")}
            </h3>
            <p className="p" style={{ marginTop: 0 }}>
              {t("about.identity.vision.desc")}
            </p>
          </Card>
        </div>
      </div>

      {/* ORGANIZATION / HOW WE WORK */}
      <Section kicker={t("about.organization.kicker")} title={t("about.organization.title")}>
        <div className="card" style={{ padding: 16 }}>
          <p className="p" style={{ marginTop: 0 }}>
            {t("about.organization.desc")}
          </p>

          {/* Highlights */}
          <div className="grid cols-3" style={{ marginTop: 12 }}>
            {(highlights.length ? highlights : ["—", "—", "—"]).map((x, idx) => (
              <Card key={`${x}-${idx}`}>
                <div className="badge">{x}</div>
                <p className="p" style={{ marginTop: 10 }}>
                  {t("about.organization.highlightDesc")}
                </p>
              </Card>
            ))}
          </div>

          {/* CTA line */}
          <div
            style={{
              marginTop: 14,
              paddingTop: 14,
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="kicker">{t("nav.contact")}</div>
              <div style={{ fontWeight: 900, color: "var(--navy)" }}>
                {t("home.ctaTitle", { defaultValue: "On démarre quand vous voulez." })}
              </div>
            </div>
            <a className="btn" href="/contact">
              {t("home.contactBtn", { defaultValue: "Nous contacter" })}
            </a>
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section kicker={t("about.projects.kicker")} title={t("about.projects.title")}>
        <div className="grid cols-3">
          {(items.length ? items : []).map((it, idx) => (
            <Card key={`${it.title}-${idx}`}>
              <div className="badge">{it.title}</div>

              <p className="p" style={{ marginTop: 10 }}>
                {it.desc?.trim()
                  ? it.desc
                  : t("about.projects.defaultDesc")}
              </p>

              <div style={{ marginTop: 12 }}>
                <a className="btn secondary" href="/services">
                  {t("home.detailsBtn", { defaultValue: "Détails" })}
                </a>
              </div>
            </Card>
          ))}

          {/* Fallback si aucun item */}
          {!items.length ? (
            <Card>
              <div className="badge">{t("about.projects.title")}</div>
              <p className="p">{t("about.projects.defaultDesc")}</p>
            </Card>
          ) : null}
        </div>
      </Section>
    </div>
  );
}
