"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, Leaf, Activity, ChevronRight, Clock } from "lucide-react";

const modules = [
  {
    href: "/analysis/skin",
    icon: Leaf,
    emoji: "🌿",
    title: "Akıllı Cilt Analizi",
    subtitle: "Baumann Metodolojisi",
    description: "Baumann Cilt Tipi Envanteri'ne (BSTI) dayanan 4-eksenli biyometrik analiz ile cilt tipinizi, hassasiyetinizi ve kişisel bakım rutininizi öğrenin.",
    duration: "3-4 dakika",
    questions: "4 soru",
    color: "#2d5a27",
    gradient: "linear-gradient(135deg, #2d5a27 0%, #4a7c3f 100%)",
    badge: "Dermatoloji Tabanlı",
  },
  {
    href: "/analysis/personality",
    icon: Sparkles,
    emoji: "✨",
    title: "Kişilik & Ruh Analizi",
    subtitle: "Big Five Kişilik Modeli",
    description: "Klinik psikolojinin altın standardı olan Big Five (OCEAN) modeliyle stres seviyenizi, kişilik yapınızı ve ruh halinize uygun botanik formüllerinizi keşfedin.",
    duration: "3-4 dakika",
    questions: "4 soru",
    color: "#7b3f8c",
    gradient: "linear-gradient(135deg, #7b3f8c 0%, #a855c7 100%)",
    badge: "Klinik Psikoloji Tabanlı",
  },
  {
    href: "/analysis/health",
    icon: Activity,
    emoji: "💚",
    title: "Bütünsel Sağlık Analizi",
    subtitle: "Fonksiyonel Tıp Anketi",
    description: "Tıbbi Semptom Anketi (MSQ) metodolojisiyle sindirim, bağışıklık, enerji ve uyku sisteminizi değerlendirin. Kadim ve modern tıbbın önerdiği bitkisel desteği alın.",
    duration: "3-4 dakika",
    questions: "4 soru",
    color: "#8b4513",
    gradient: "linear-gradient(135deg, #8b4513 0%, #c96f2a 100%)",
    badge: "Fonksiyonel Tıp Tabanlı",
  },
];

export default function AnalysisHubPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1f16", color: "white", paddingBottom: "4rem" }}>
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "1.5rem 3rem", background: "rgba(13, 31, 22, 0.9)", backdropFilter: "blur(20px)", zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.9rem" }}>
          <ArrowLeft size={16} /> Ana Sayfa
        </Link>
        <div style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.15em", color: "#c9a44a" }}>AETERA KLİNİK</div>
        <div style={{ width: "80px" }} />
      </header>

      {/* Hero */}
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", textAlign: "center", maxWidth: "800px", margin: "0 auto", padding: "8rem 2rem 4rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(201, 164, 74, 0.15)", border: "1px solid rgba(201, 164, 74, 0.3)", padding: "0.4rem 1rem", borderRadius: "30px", marginBottom: "2rem", fontSize: "0.85rem", color: "#c9a44a", letterSpacing: "0.1em" }}>
            <Sparkles size={14} /> YAPAY ZEKA TABANLI BİLİMSEL ANALİZ
          </div>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 300, lineHeight: 1.2, marginBottom: "1.5rem" }}>
            Bedeninizi, Ruhunuzu ve<br />
            <span style={{ fontWeight: 700, color: "#a8d48a" }}>Cildinizi Tanıyın</span>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: "620px", margin: "0 auto" }}>
            Dünya standardı bilimsel metodolojilerle kişiselleştirilmiş analiz. Sonuçlarınızı doğrudan size uygun doğal ürün önerileriyle eşleştiriyoruz.
          </p>
        </motion.div>
      </div>

      {/* Module Cards */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {modules.map((mod, i) => (
          <motion.div
            key={mod.href}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
          >
            <Link href={mod.href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "28px",
                  padding: "2.5rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow background */}
                <div style={{ position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%", background: `radial-gradient(circle at 30% 30%, ${mod.color}22 0%, transparent 60%)`, pointerEvents: "none" }} />

                {/* Badge */}
                <div style={{ display: "inline-flex", width: "fit-content", background: `${mod.color}33`, border: `1px solid ${mod.color}66`, padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.75rem", color: "#c9a44a", letterSpacing: "0.05em" }}>
                  {mod.badge}
                </div>

                {/* Icon */}
                <div style={{ fontSize: "3rem" }}>{mod.emoji}</div>

                {/* Title */}
                <div>
                  <h2 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.3rem", color: "white" }}>{mod.title}</h2>
                  <p style={{ fontSize: "0.85rem", color: "#c9a44a", letterSpacing: "0.05em" }}>{mod.subtitle}</p>
                </div>

                {/* Description */}
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontSize: "0.95rem", flex: 1 }}>
                  {mod.description}
                </p>

                {/* Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><Clock size={12} /> {mod.duration}</span>
                    <span>• {mod.questions}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#a8d48a", fontWeight: 600, fontSize: "0.9rem" }}>
                    Başla <ChevronRight size={16} />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{ maxWidth: "600px", margin: "4rem auto 0", padding: "0 2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
          Bu analizler tıbbi teşhis niteliği taşımaz. Sunulan sonuçlar ve ürün önerileri bilgilendirme amaçlıdır. Ciddi sağlık sorunları için lütfen bir hekime başvurunuz.
        </p>
      </div>
    </div>
  );
}
