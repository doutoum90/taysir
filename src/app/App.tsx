import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Testimonials from "../pages/Testimonials";
import ServiceDetail from "../pages/ServiceDetail";
import Contact from "../pages/Contact";

import { useTranslation } from "react-i18next";
import { RTL_LANGS } from "../i18n";
import { useEffect } from "react";

export default function App() {

  const { i18n } = useTranslation();

  useEffect(() => {
    const isRtl = RTL_LANGS.has(i18n.language);
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <div className="app">
      <Header />
      <main className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/temoignages" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />


<Route path="/services/:id" element={<ServiceDetail />} />

        </Routes>
      </main>
      <Footer />
    </div>
  )
}

