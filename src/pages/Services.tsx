import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import ServiceCard from "../components/ServiceCard";
import { services, type ActivityCategory } from "../data/services";
import { activitySlides } from "../data/activitySlides";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type CategoryFilter = ActivityCategory | "ALL";

export default function Services() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [filter, setFilter] = useState<CategoryFilter>("ALL");

  /* =======================
     CATEGORIES (UI traduite)
  ======================= */
  const categories = useMemo(
    () => [
      { value: "ALL" as const, label: t("activitiesPage.filters.all") },
      { value: "Eau" as const, label: t("activitiesPage.filters.water") },
      { value: "Qurban" as const, label: t("activitiesPage.filters.qurban") },
      { value: "Repas" as const, label: t("activitiesPage.filters.meals") },
      { value: "Coran" as const, label: t("activitiesPage.filters.quran") },
      { value: "Élevage" as const, label: t("activitiesPage.filters.livestock") },
      { value: "Mosquées" as const, label: t("activitiesPage.filters.mosques") },
      { value: "Autres" as const, label: t("activitiesPage.filters.other") },
    ],
    [i18n.language, t]
  );

  /* =======================
     FILTRAGE
  ======================= */
  const filtered = useMemo(() => {
    if (filter === "ALL") return services;
    return services.filter((s) => s.category === filter);
  }, [filter]);

  /* =======================
     LABEL CATÉGORIE
  ======================= */
  const categoryLabel = (cat: ActivityCategory) => {
    switch (cat) {
      case "Eau":
        return t("activitiesPage.filters.water");
      case "Qurban":
        return t("activitiesPage.filters.qurban");
      case "Repas":
        return t("activitiesPage.filters.meals");
      case "Coran":
        return t("activitiesPage.filters.quran");
      case "Élevage":
        return t("activitiesPage.filters.livestock");
      case "Mosquées":
        return t("activitiesPage.filters.mosques");
      default:
        return t("activitiesPage.filters.other");
    }
  };

  /* =======================
     CHART
  ======================= */
  const chartData = useMemo(() => {
    const counts: Record<ActivityCategory, number> = {
      Eau: 0,
      Qurban: 0,
      Repas: 0,
      Coran: 0,
      Élevage: 0,
      Mosquées: 0,
      Autres: 0,
    };

    services.forEach((s) => {
      counts[s.category]++;
    });

    return [
      { name: t("activitiesPage.filters.water"), value: counts.Eau },
      { name: t("activitiesPage.filters.qurban"), value: counts.Qurban },
      { name: t("activitiesPage.filters.meals"), value: counts.Repas },
      { name: t("activitiesPage.filters.quran"), value: counts.Coran },
      { name: t("activitiesPage.filters.livestock"), value: counts.Élevage },
      { name: t("activitiesPage.filters.mosques"), value: counts.Mosquées },
      { name: t("activitiesPage.filters.other"), value: counts.Autres },
    ];
  }, [i18n.language, t]);

  return (
    <div style={{ display: "grid", gap: 18, direction: isRTL ? "rtl" : "ltr" }}>
      {/* ================= HERO ================= */}
      <div className="card" style={{ padding: 18 }}>
        <div className="kicker">{t("activitiesPage.hero.kicker")}</div>
        <h1 className="h1">{t("activitiesPage.hero.title")}</h1>
        <p className="p">{t("activitiesPage.hero.desc")}</p>

        {/* FILTERS */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
          {categories.map((c) => (
            <button
              key={c.value}
              className={c.value === filter ? "btn" : "btn secondary"}
              onClick={() => setFilter(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================= CHART ================= */}
      <Section kicker={t("activitiesPage.chart.kicker")} title={t("activitiesPage.chart.title")}>
        <div className="card" style={{ padding: 16 }}>
          <p className="p" style={{ marginTop: 0 }}>
            {t("activitiesPage.chart.desc")}
          </p>

          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>

      {/* ================= SERVICES ================= */}
      <Section kicker={t("activitiesPage.catalog.kicker")} title={t("activitiesPage.catalog.title")}>
        <div className="grid cols-3">
          {filtered.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              slides={activitySlides[service.category] ?? []}
              categoryLabel={categoryLabel}
              detailsTo={`/services/${service.id}`}
              compact={false}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
