import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const setLang = (lng: "fr" | "en" | "ar" | "tr") => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  const Nav = ({ onClick }: { onClick?: () => void }) => (
    <>
      <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")} onClick={onClick}>
        {t("nav.home")}
      </NavLink>
      <NavLink to="/a-propos" className={({ isActive }) => (isActive ? "active" : "")} onClick={onClick}>
        {t("nav.about")}
      </NavLink>
      <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : "")} onClick={onClick}>
        {t("nav.services")}
      </NavLink>
      <NavLink to="/temoignages" className={({ isActive }) => (isActive ? "active" : "")} onClick={onClick}>
        {t("nav.testimonials")}
      </NavLink>
      <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")} onClick={onClick}>
        {t("nav.contact")}
      </NavLink>
    </>
  );

  return (
    <header className="header">
      <div className="container">
        <div className="headerInner">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <img
              src="/assets/logo.jpg"
              alt={t("siteName")}
              style={{ width: 34, height: 34, borderRadius: 10, objectFit: "contain" }}
            />
            <span style={{ textTransform: "uppercase" }}>{t("siteName")}</span>
          </Link>

          <nav className="nav" aria-label={t("header.primaryNav")}>
            <Nav />
          </nav>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <label style={{ color: "rgba(255,255,255,.85)", fontWeight: 700, fontSize: 12 }}>
              {t("lang.label")}
            </label>

            <select
              value={i18n.language}
              onChange={(e) => setLang(e.target.value as any)}
              className="langSelect"
            >
              <option value="fr">{t("lang.fr")}</option>
              <option value="en">{t("lang.en")}</option>
              <option value="ar">{t("lang.ar")}</option>
              <option value="tr">{t("lang.tr")}</option>
            </select>
          </div>

          <button className="btn secondary mobileToggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            {open ? t("header.close") : t("header.menu")}
          </button>
        </div>

        {open ? (
          <div className="mobileMenu" role="navigation" aria-label={t("header.mobileNav")}>
            <Nav onClick={() => setOpen(false)} />
          </div>
        ) : null}
      </div>
    </header>
  );
}
