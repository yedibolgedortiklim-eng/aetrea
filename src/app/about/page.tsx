"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const elements = [
  { symbol: "🌍", name: "Toprak", principle: "Köklerin bilgeliği", color: "#5c4a2a" },
  { symbol: "💧", name: "Su", principle: "Akışın arındırıcı gücü", color: "#1a4a7a" },
  { symbol: "🔥", name: "Ateş", principle: "Dönüşümün ısısı", color: "#8b2500" },
  { symbol: "🌬️", name: "Hava", principle: "Ruhun özgür nefesi", color: "#2a5a4a" },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1f16", color: "white", paddingBottom: "6rem" }}>

      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "1.5rem 4rem", background: "rgba(13, 31, 22, 0.92)", backdropFilter: "blur(20px)", zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "0.9rem" }}>
          <ArrowLeft size={18} /> Ana Sayfaya Dön
        </Link>
        <div style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.2em", color: "#c9a44a" }}>AETERA</div>
        <div style={{ width: "120px" }} />
      </header>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "7rem 2rem 0" }}>

        {/* Hero Görseli */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div style={{ position: "relative", borderRadius: "32px", overflow: "hidden", marginBottom: "4rem", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/aetera-about-hero.jpg"
              alt="Aetera — Dört Element ve Kozmik Denge"
              style={{ width: "100%", height: "520px", objectFit: "cover", display: "block" }}
            />
            {/* Altta metin katmanı */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(13,31,22,0.95) 0%, transparent 100%)", padding: "3rem 3rem 2.5rem" }}>
              <p style={{ color: "#c9a44a", fontSize: "0.8rem", letterSpacing: "0.3em", marginBottom: "0.5rem" }}>ZAMANIN ÖLÜMSÜZ RUHU</p>
              <h1 style={{ fontSize: "3rem", fontWeight: 300, color: "white", lineHeight: 1.2, margin: 0 }}>
                Doğanın <span style={{ fontWeight: 700, color: "#a8d48a" }}>Zamansız Özü</span>
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Ana Metin */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
        >
          {/* Kimiz */}
          <div>
            <p style={{ color: "#c9a44a", fontSize: "0.75rem", letterSpacing: "0.3em", marginBottom: "1rem" }}>AETERA NEDİR?</p>
            <p style={{ fontSize: "1.25rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.9 }}>
              <strong style={{ color: "white" }}>Aetera</strong>, zamanın ölümsüz ruhuyla hayatları aydınlatmak ve manalandırmak için doğmuş bir ekoldür. Kadim bilgeliğin modern bilimle buluştuğu bu ekolde; her insan, evreni içinde taşıyan bir varlık olarak kabul edilir.
            </p>
          </div>

          {/* Ekolümüz */}
          <div style={{ background: "rgba(201, 164, 74, 0.08)", border: "1px solid rgba(201, 164, 74, 0.2)", borderRadius: "24px", padding: "2.5rem" }}>
            <p style={{ color: "#c9a44a", fontSize: "0.75rem", letterSpacing: "0.3em", marginBottom: "1.5rem" }}>EKOLÜMÜZDEKİ TEMEL İNANÇ</p>
            <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.9 }}>
              Aetera; kişinin ve toplumun uyumunu, <strong style={{ color: "white" }}>zaman ve mekan dengesiyle</strong> dört elemente uygun hale getiren bir düşünce ve şifa ekolüdür. Ateş, Su, Toprak ve Hava — bu dört evrensel güç, insanın bedeninde, ruhunda ve zihninde de titreşmektedir. Sağlık, güzellik ve ruhsal denge ancak bu dört unsurun kişiye özgü dengesiyle mümkün olabilir.
            </p>
          </div>

          {/* Dört Element */}
          <div>
            <p style={{ color: "#c9a44a", fontSize: "0.75rem", letterSpacing: "0.3em", marginBottom: "2rem" }}>DÖRT ELEMENTIN DENGESİ</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {elements.map((el, i) => (
                <motion.div
                  key={el.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "1.8rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}
                >
                  <span style={{ fontSize: "2.5rem" }}>{el.symbol}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: "white", fontSize: "1.1rem", marginBottom: "0.3rem" }}>{el.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.5 }}>{el.principle}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Alıntı */}
          <blockquote style={{ borderLeft: "3px solid #c9a44a", paddingLeft: "2rem", margin: "1rem 0" }}>
            <p style={{ fontSize: "1.5rem", fontStyle: "italic", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: "1rem" }}>
              "Zamanın ölümsüz ruhu, her bitkinin içinde gizlidir. Biz yalnızca o ruhu sizinle buluşturuyoruz."
            </p>
            <cite style={{ color: "#c9a44a", fontSize: "0.85rem", letterSpacing: "0.1em" }}>— AETERA Ekolü</cite>
          </blockquote>

          {/* Metodoloji */}
          <div>
            <p style={{ color: "#c9a44a", fontSize: "0.75rem", letterSpacing: "0.3em", marginBottom: "1.5rem" }}>BİLİMSEL & KADİM METODOLOJI</p>
            <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.9 }}>
              Geleneksel Çin Tıbbı, Ayurveda ve modern dermatolojinin kesişim noktasında duran Aetera; <strong style={{ color: "white" }}>Baumann Cilt Tipi Envanteri</strong>, <strong style={{ color: "white" }}>Big Five Kişilik Modeli</strong> ve <strong style={{ color: "white" }}>Fonksiyonel Tıp Semptom Anketi</strong> gibi dünya standardı bilimsel metodolojileri, kadim dört element öğretisiyle harmanlayarak her kişiye özgü bir şifa yolu çizer.
            </p>
          </div>

          {/* Vizyon */}
          <div style={{ background: "linear-gradient(135deg, rgba(45, 90, 39, 0.3) 0%, rgba(13,31,22,0.5) 100%)", border: "1px solid rgba(168, 212, 138, 0.2)", borderRadius: "24px", padding: "2.5rem", textAlign: "center" }}>
            <p style={{ color: "#a8d48a", fontSize: "0.75rem", letterSpacing: "0.3em", marginBottom: "1.2rem" }}>VİZYONUMUZ</p>
            <p style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.8 }}>
              Sadece bir alışveriş platformu değil; zamanın ölümsüz ruhuyla hayatları aydınlatan, kişiyi ve toplumu dört elementin dengesinde buluşturan — <strong style={{ color: "white" }}>"Yüzyılın Şifa Ekolü"</strong> olmak.
            </p>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/analysis" style={{ flex: 1, textAlign: "center", background: "linear-gradient(135deg, #2d5a27 0%, #4a7c3f 100%)", color: "white", padding: "1.2rem 2rem", borderRadius: "30px", textDecoration: "none", fontWeight: 700, fontSize: "1rem" }}>
              Analizimi Başlat
            </Link>
            <Link href="/shop" style={{ flex: 1, textAlign: "center", background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.8)", padding: "1.2rem 2rem", borderRadius: "30px", textDecoration: "none", fontWeight: 600, fontSize: "1rem", border: "1px solid rgba(255,255,255,0.15)" }}>
              Doğal Eczane
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
