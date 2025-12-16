import { useParams, Link } from "react-router-dom";
import { services } from "../data/services";
import { activitySlides } from "../data/activitySlides";
import Section from "../components/Section";
import Card from "../components/Card";
import MiniCarousel from "../components/MiniCarousel";
import { useTranslation } from "react-i18next";

export default function ServiceDetail() {
    const { id } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

    const service = services.find((s) => s.id === id);

    if (!service) {
        return (
            <div className="card" style={{ padding: 18 }}>
                <h1 className="h1">Service introuvable</h1>
                <Link className="btn" to="/services">
                    ← Retour aux services
                </Link>
            </div>
        );
    }

    const bullets = t(service.bulletsKey, { returnObjects: true }) as string[];
    const slides = activitySlides[service.category] ?? [];

    return (
        <div style={{ display: "grid", gap: 18, direction: isRTL ? "rtl" : "ltr" }}>
            {/* HERO */}
            <div className="card" style={{ padding: 18 }}>
                <Link to="/services" className="btn secondary" style={{ marginBottom: 12 }}>
                    ← {t("activitiesPage.back", { defaultValue: "Retour aux services" })}
                </Link>

                <h1 className="h1">{t(service.titleKey)}</h1>
                <p className="p">{t(service.descriptionKey)}</p>
            </div>

            {/* IMAGES */}
            {slides.length ? (
                <Section title={t("activitiesPage.gallery", { defaultValue: "Galerie" })}>
                    <MiniCarousel slides={slides} height={320} intervalMs={3000} />
                </Section>
            ) : null}

            {/* DETAILS */}
            <Section title={t("activitiesPage.details", { defaultValue: "Détails du service" })}>
                <Card>
                    {bullets?.length ? (
                        <ul
                            style={{
                                paddingLeft: 18,
                                display: "grid",
                                gap: 8,
                                color: "var(--muted)",
                            }}
                        >
                            {bullets.map((b, idx) => (
                                <li key={idx}>{b}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p">
                            {t("activitiesPage.noDetails", { defaultValue: "Plus d’informations sur demande." })}
                        </p>
                    )}
                </Card>
            </Section>

            {/* CTA */}
            <div
                className="card"
                style={{
                    padding: 18,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 12,
                }}
            >
                <div>
                    <div className="kicker">{t("nav.contact")}</div>
                    <h3 style={{ margin: "6px 0", color: "var(--navy)" }}>{t("home.ctaTitle")}</h3>
                    <p className="p" style={{ marginTop: 0 }}>{t("home.ctaText")}</p>
                </div>

                <Link to="/contact" className="btn">
                    {t("home.contactBtn")}
                </Link>
            </div>
        </div>
    );
}
