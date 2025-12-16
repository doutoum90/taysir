import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Carousel from "../components/Carousel";
import Section from "../components/Section";
import Card from "../components/Card";
import ServiceCard from "../components/ServiceCard";

import { slides } from "../data/slides";
import { services, type ActivityCategory } from "../data/services";
import { activitySlides } from "../data/activitySlides";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type KPI = { name: string; demandes: number };

export default function Home() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // ✅ Mois traduits (depuis home.months)
  const kpiData: KPI[] = useMemo(() => {
    const monthsRaw = t("home.months", { returnObjects: true }) as unknown;
    const months = Array.isArray(monthsRaw) ? (monthsRaw as string[]) : [];
    const values = [22, 35, 28, 46, 52, 60];

    return months.slice(0, values.length).map((m, idx) => ({
      name: m,
      demandes: values[idx],
    }));
  }, [i18n.language, t]);

  // ✅ WHY cards
  const whyCards = useMemo(() => {
    const data = t("home.whyCards", { returnObjects: true }) as unknown;
    return Array.isArray(data) ? (data as Array<{ title: string; desc: string }>) : [];
  }, [i18n.language, t]);

  // ✅ Labels catégories (UI traduite)
  const categoryLabel = (cat: ActivityCategory) => {
    switch (cat) {
      case "Eau":
        return t("activitiesPage.filters.water", { defaultValue: cat });
      case "Qurban":
        return t("activitiesPage.filters.qurban", { defaultValue: cat });
      case "Repas":
        return t("activitiesPage.filters.meals", { defaultValue: cat });
      case "Coran":
        return t("activitiesPage.filters.quran", { defaultValue: cat });
      case "Élevage":
        return t("activitiesPage.filters.livestock", { defaultValue: cat });
      case "Mosquées":
        return t("activitiesPage.filters.mosques", { defaultValue: cat });
      default:
        return t("activitiesPage.filters.other", { defaultValue: cat });
    }
  };

  // ✅ KPI cards
  const kpiCards = useMemo(() => {
    const total = kpiData.reduce((acc, x) => acc + x.demandes, 0);
    const best = kpiData.reduce((acc, x) => (x.demandes > acc ? x.demandes : acc), 0);
    const avg = kpiData.length ? Math.round(total / kpiData.length) : 0;

    return [
      {
        title: t("home.kpi.totalTitle", { defaultValue: "Total" }),
        value: String(total),
        desc: t("home.kpi.totalDesc", { defaultValue: "Demandes sur la période" }),
      },
      {
        title: t("home.kpi.avgTitle", { defaultValue: "Moyenne" }),
        value: String(avg),
        desc: t("home.kpi.avgDesc", { defaultValue: "Demandes / mois" }),
      },
      {
        title: t("home.kpi.bestTitle", { defaultValue: "Pic" }),
        value: String(best),
        desc: t("home.kpi.bestDesc", { defaultValue: "Meilleur mois" }),
      },
    ];
  }, [kpiData, t]);

  // ✅ 3 activités mises en avant
  const featured = useMemo(() => services.slice(0, 3), []);

  return (
    <div style={{ display: "grid", gap: 18, direction: isRTL ? "rtl" : "ltr" }}>
      {/* HERO carousel */}
      <Carousel slides={slides} />

      {/* WHY */}
      <Section kicker={t("home.kicker")} title={t("home.whyTitle")}>
        <div className="grid cols-3">
          {whyCards.map((x, idx) => (
            <Card key={`${x.title}-${idx}`}>
              <div className="badge">{x.title}</div>
              <p className="p">{x.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* KPI + chart */}
      <Section kicker={t("home.statsKicker")} title={t("home.statsTitle")}>
        <div className="grid cols-3">
          {kpiCards.map((k) => (
            <Card key={k.title}>
              <div className="kicker">{k.title}</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: "var(--navy)", lineHeight: 1.1 }}>
                {k.value}
              </div>
              <p className="p" style={{ marginTop: 8 }}>{k.desc}</p>
            </Card>
          ))}
        </div>

        <div className="card" style={{ padding: 16, marginTop: 14 }}>
          <p className="p" style={{ marginTop: 0 }}>{t("home.statsDesc")}</p>

          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={kpiData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="demandes" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>

      {/* FEATURED ACTIVITIES (same card as Services, compact) */}
      <Section
        kicker={t("nav.services")}
        title={t("home.servicesBtn")}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <p className="p" style={{ marginTop: 0, maxWidth: 780 }}>
            {t("home.featuredDesc", { defaultValue: "Découvrez quelques-unes de nos activités phares." })}
          </p>

          <Link className="btn secondary" to="/services">
            {t("home.detailsBtn", { defaultValue: "Voir tout" })}
          </Link>
        </div>

        <div className="grid cols-3" style={{ marginTop: 12 }}>
          {featured.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              slides={activitySlides[s.category] ?? []}
              categoryLabel={categoryLabel}
              compact
              detailsTo={`/services/${s.id}`} // ✅ ServiceDetail
            />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div
        className="card"
        style={{
          padding: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div className="kicker">{t("nav.contact")}</div>
          <h3 style={{ margin: "6px 0", color: "var(--navy)" }}>{t("home.ctaTitle")}</h3>
          <p className="p" style={{ marginTop: 0 }}>{t("home.ctaText")}</p>
        </div>

        <Link className="btn" to="/contact">
          {t("home.contactBtn")}
        </Link>
      </div>
    </div>
  );
}
