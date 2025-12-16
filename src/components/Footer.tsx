import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const phones = t("footer.phones", { returnObjects: true }) as string[];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footerInner">
          {/* BRAND */}
          <div>
            <Link to="/" className="brand" style={{ color: "white" }}>
              <img
                src="/assets/logo.jpg"
                alt={t("siteName")}
                style={{ width: 34, height: 34, borderRadius: 10 }}
              />
              <span style={{ textTransform: "uppercase" }}>{t("siteName")}</span>
            </Link>

            <p className="p">{t("footer.desc")}</p>
          </div>

          {/* CONTACT */}
          <div>
            <h4>{t("footer.contactTitle")}</h4>

            <div style={{ display: "grid", gap: 6 }}>
              <strong>{t("footer.phoneLabel")}:</strong>
              {phones.map((p) => (
                <span key={p}>{p}</span>
              ))}

              <strong>{t("footer.addressLabel")}:</strong>
              <span style={{ whiteSpace: "pre-line" }}>
                {t("footer.address")}
              </span>
            </div>
          </div>

          {/* SOCIALS */}
          <div>
            <h4>Social</h4>
            <div style={{ display: "grid", gap: 6 }}>
              <span>{t("footer.socials.whatsapp")}</span>
              <span>{t("footer.socials.email")}</span>
              <span>{t("footer.socials.twitter")}</span>
              <span>{t("footer.socials.instagram")}</span>
              <span>{t("footer.socials.youtube")}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 13, opacity: 0.8 }}>
          © {year} TEYSİR — {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
