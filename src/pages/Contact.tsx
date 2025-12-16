import { useMemo, useState } from "react";
import Section from "../components/Section";
import Card from "../components/Card";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type TouchedState = Partial<Record<keyof FormState, boolean>>;

// ✅ (recommandé) Vite: import.meta.env | CRA: process.env
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export default function Contact() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // ✅ Données réelles
  const phone1 = "+90 552 605 69 15";
  const phone2 = "+90 539 378 71 41";
  const phone1Dial = "+905526056915";
  const phone2Dial = "+905393787141";

  const address = `DENİZKÖŞKLER MAH. KORU ÇIKMAZI SK.
N° 4, Porte Intérieure N° 1
Avcılar / Istanbul – Turquie`;

  const email = "contact@taysir.org";
  const twitter = "https://twitter.com/xxxx";
  const instagram = "https://instagram.com/xxxx";
  const youtube = "https://youtube.com/@xxxx";
  const whatsappLink = `https://wa.me/${phone1Dial.replace("+", "")}`;

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [touched, setTouched] = useState<TouchedState>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) e.name = t("contact.form.errors.nameRequired");
    if (!form.email.trim() || !form.email.includes("@"))
      e.email = t("contact.form.errors.emailInvalid");
    if (!form.message.trim()) e.message = t("contact.form.errors.messageRequired");

    return e;
  }, [form, i18n.language, t]);

  const canSubmit = Object.keys(errors).length === 0;
  const showError = (field: keyof FormState) => Boolean(touched[field] && errors[field]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onBlur(field: keyof FormState) {
    setTouched((x) => ({ ...x, [field]: true }));
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setTouched({ name: true, email: true, message: true });
    setSendError(null);

    if (!canSubmit) return;

    setSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      setTouched({});
      setTimeout(() => setSent(false), 3500);
    } catch (error) {
      console.error(error);
      setSending(false);
      setSendError(t("contact.form.sendError", { defaultValue: "Erreur lors de l’envoi. Réessayez." }));
    }
  }

  return (
    <div style={{ display: "grid", gap: 18, direction: isRTL ? "rtl" : "ltr" }}>
      {/* HERO */}
      <div className="card" style={{ padding: 18 }}>
        <div className="kicker">{t("contact.hero.kicker")}</div>
        <h1 className="h1">{t("contact.hero.title")}</h1>
        <p className="p">{t("contact.hero.desc")}</p>
      </div>

      <div className="grid cols-2">
        {/* FORM */}
        <Card>
          <Section title={t("contact.form.sectionTitle")}>
            <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
              {/* Name */}
              <div>
                <label style={{ display: "block", fontWeight: 800, color: "var(--navy)", marginBottom: 6 }}>
                  {t("contact.form.placeholders.fullName")}
                </label>
                <input
                  className="input"
                  name="name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  onBlur={() => onBlur("name")}
                  aria-invalid={showError("name")}
                  aria-describedby={showError("name") ? "err-name" : undefined}
                />
                {showError("name") ? (
                  <div id="err-name" style={{ color: "crimson", fontSize: 13, marginTop: 6 }}>
                    {errors.name}
                  </div>
                ) : null}
              </div>

              {/* Email */}
              <div>
                <label style={{ display: "block", fontWeight: 800, color: "var(--navy)", marginBottom: 6 }}>
                  {t("contact.form.placeholders.email")}
                </label>
                <input
                  className="input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  onBlur={() => onBlur("email")}
                  aria-invalid={showError("email")}
                  aria-describedby={showError("email") ? "err-email" : undefined}
                />
                {showError("email") ? (
                  <div id="err-email" style={{ color: "crimson", fontSize: 13, marginTop: 6 }}>
                    {errors.email}
                  </div>
                ) : null}
              </div>

              {/* Phone */}
              <div>
                <label style={{ display: "block", fontWeight: 800, color: "var(--navy)", marginBottom: 6 }}>
                  {t("contact.form.placeholders.phoneOptional")}
                </label>
                <input
                  className="input"
                  name="phone"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  onBlur={() => onBlur("phone")}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{ display: "block", fontWeight: 800, color: "var(--navy)", marginBottom: 6 }}>
                  {t("contact.form.placeholders.message")}
                </label>
                <textarea
                  className="textarea"
                  name="message"
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                  onBlur={() => onBlur("message")}
                  aria-invalid={showError("message")}
                  aria-describedby={showError("message") ? "err-message" : undefined}
                />
                {showError("message") ? (
                  <div id="err-message" style={{ color: "crimson", fontSize: 13, marginTop: 6 }}>
                    {errors.message}
                  </div>
                ) : null}
              </div>

              <button
                className="btn"
                type="submit"
                disabled={!canSubmit || sending}
                style={{ opacity: !canSubmit || sending ? 0.6 : 1 }}
              >
                {sending ? t("contact.form.sending", { defaultValue: "Envoi..." }) : t("contact.form.submit")}
              </button>

              {sent ? (
                <div className="badge" role="status">
                  {t("contact.form.sent")}
                </div>
              ) : null}

              {sendError ? (
                <div style={{ color: "crimson", fontSize: 13 }}>
                  {sendError}
                </div>
              ) : null}
            </form>
          </Section>
        </Card>

        {/* INFO */}
        <Card>
          <Section title={t("contact.info.sectionTitle")}>
            {/* QUICK ACTIONS */}
            <div className="card" style={{ padding: 14, border: "1px solid var(--border)", marginBottom: 12 }}>
              <div className="kicker" style={{ marginBottom: 8 }}>
                {t("contact.quick.title", { defaultValue: "Contact rapide" })}
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                <a className="btn secondary" href={`tel:${phone1Dial}`} style={{ justifyContent: "center" }}>
                  {t("contact.quick.call", { defaultValue: "Appeler" })} • {phone1}
                </a>

                <a className="btn secondary" href={`tel:${phone2Dial}`} style={{ justifyContent: "center" }}>
                  {t("contact.quick.call", { defaultValue: "Appeler" })} • {phone2}
                </a>

                <a className="btn" href={whatsappLink} target="_blank" rel="noreferrer" style={{ justifyContent: "center" }}>
                  {t("footer.socials.whatsapp", { defaultValue: "WhatsApp" })}
                </a>
              </div>
            </div>

            {/* DETAILS */}
            <div style={{ display: "grid", gap: 10, color: "var(--muted)" }}>
              <div>
                <strong style={{ color: "var(--navy)" }}>{t("contact.info.phoneLabel", { defaultValue: "Téléphone" })}</strong>
                <div style={{ display: "grid", gap: 4, marginTop: 4 }}>
                  <span>{phone1}</span>
                  <span>{phone2}</span>
                </div>
              </div>

              <div>
                <strong style={{ color: "var(--navy)" }}>{t("contact.info.addressLabel", { defaultValue: "Adresse" })}</strong>
                <div style={{ whiteSpace: "pre-line", marginTop: 4 }}>{address}</div>
              </div>

              <div>
                <strong style={{ color: "var(--navy)" }}>
                  {t("contact.social.title", { defaultValue: "Social" })}
                </strong>

                <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
                  <a className="btn secondary" href={whatsappLink} target="_blank" rel="noreferrer">
                    {t("footer.socials.whatsapp", { defaultValue: "WhatsApp" })}
                  </a>

                  <a className="btn secondary" href={`mailto:${email}`}>
                    {t("footer.socials.email", { defaultValue: "E-mail" })}
                  </a>

                  <a className="btn secondary" href={twitter} target="_blank" rel="noreferrer">
                    {t("footer.socials.twitter", { defaultValue: "Twitter" })}
                  </a>

                  <a className="btn secondary" href={instagram} target="_blank" rel="noreferrer">
                    {t("footer.socials.instagram", { defaultValue: "Instagram" })}
                  </a>

                  <a className="btn secondary" href={youtube} target="_blank" rel="noreferrer">
                    {t("footer.socials.youtube", { defaultValue: "YouTube" })}
                  </a>
                </div>
              </div>
            </div>

            {/* MAP PLACEHOLDER */}
            <div style={{ marginTop: 14, borderRadius: 14, overflow: "hidden", border: "1px solid var(--border)" }}>
              <div style={{ padding: 14, background: "rgba(11,31,59,.05)", color: "var(--navy)", fontWeight: 900 }}>
                {t("contact.map.title")}
              </div>
              <div style={{ padding: 14, color: "var(--muted)" }}>{t("contact.map.desc")}</div>
            </div>
          </Section>
        </Card>
      </div>
    </div>
  );
}
