"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Leaf, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { loadElementProfile, elementConfig, ElementProfile } from "@/lib/element-profile";

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--primary-dark)", minHeight: "100vh", color: "var(--background)", overflow: "hidden" }}>
      
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "2rem 4rem", zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", letterSpacing: "0.2em", color: "white" }}>
          AETERA
        </div>
        <nav style={{ display: "flex", gap: "3rem" }}>
          <Link href="/shop" style={{ color: "white", textDecoration: "none", fontWeight: 500, opacity: 0.9 }}>Mağaza</Link>
          <Link href="/analysis" style={{ color: "white", textDecoration: "none", fontWeight: 500, opacity: 0.9 }}>Yapay Zeka Analizi</Link>
          <Link href="/about" style={{ color: "white", textDecoration: "none", fontWeight: 500, opacity: 0.9 }}>Hakkımızda</Link>
        </nav>
      </header>

      {/* Hero with Video */}
      <div style={{ position: "relative", width: "100%", height: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Video Background */}
        <video 
          autoPlay 
          controls 
          loop 
          playsInline 
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "100%",
            minHeight: "100%",
            width: "auto",
            height: "auto",
            zIndex: 0,
            objectFit: "cover",
            opacity: 0.8
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>

        {/* Overlay to ensure text readability */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(27, 57, 45, 0.4)", // Dark green overlay
          zIndex: 1
        }}></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "800px", padding: "0 2rem" }}
        >
          <h1 style={{ fontSize: "4.5rem", marginBottom: "1rem", lineHeight: 1.1, fontWeight: 300, color: "white", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            Doğanın <br/><span style={{ fontWeight: 600, color: "var(--secondary)" }}>Zamansız Özü</span>
          </h1>
          <p style={{ fontSize: "1.4rem", opacity: 0.9, marginBottom: "3rem", color: "white", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Bedeninize, ruhunuza ve cildinize iyi gelecek kadim formüller. Yapay zeka ile kişiselleştirilmiş şifa deneyimine başlayın.
          </p>
        </motion.div>
      </div>

      {/* Returning User Element Profile Section */}
      <ReturningUserSection />

      {/* Features / Analysis Cards */}
      <div style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontSize: "1.2rem", opacity: 0.8, color: "rgba(255,255,255,0.8)" }}>
            Sizi dinleyen, anlayan ve bedensel, ruhsal ihtiyaçlarınıza en uygun doğadan gelen çözümleri öneren akıllı asistanlar.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          
          <Link href="/analysis/health" style={{ textDecoration: "none" }}>
            <motion.div 
              whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.1)" }}
              style={{ padding: "3rem", borderRadius: "24px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
            >
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "rgba(203, 163, 101, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}>
                <Activity color="var(--secondary)" size={30} />
              </div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "white" }}>Bedensel Şifa</h3>
              <p style={{ opacity: 0.7, lineHeight: 1.6, color: "white" }}>Şikayetlerinizi dinleyip, kadim ve modern tıbba göre bitkisel kür tavsiyeleri verir. Tamamen doğal destek.</p>
            </motion.div>
          </Link>

          <Link href="/analysis/personality" style={{ textDecoration: "none" }}>
            <motion.div 
              whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.1)" }}
              style={{ padding: "3rem", borderRadius: "24px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
            >
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "rgba(203, 163, 101, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}>
                <Sparkles color="var(--secondary)" size={30} />
              </div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "white" }}>Kişilik & Ruh</h3>
              <p style={{ opacity: 0.7, lineHeight: 1.6, color: "white" }}>Ruh halinize uygun rahatlatıcı aromaterapi ve doğal ürünleri eşleştirerek içsel dengenizi sağlar.</p>
            </motion.div>
          </Link>

          <Link href="/analysis/skin" style={{ textDecoration: "none" }}>
            <motion.div 
              whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.1)" }}
              style={{ padding: "3rem", borderRadius: "24px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
            >
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "rgba(203, 163, 101, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}>
                <Leaf color="var(--secondary)" size={30} />
              </div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "white" }}>Akıllı Cilt Analizi</h3>
              <p style={{ opacity: 0.7, lineHeight: 1.6, color: "white" }}>Cilt tipinize ve özel problemlerinize yönelik %100 doğal, bitkisel içerikli bakım rutini oluşturur.</p>
            </motion.div>
          </Link>

        </div>
      </div>
    </div>
  );
}

function ReturningUserSection() {
  const [profile, setProfile] = useState<ElementProfile | null>(null);

  useEffect(() => {
    setProfile(loadElementProfile());
  }, []);

  if (!profile || !profile.element) return null;

  const config = elementConfig[profile.element];
  if (!config) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        maxWidth: "900px",
        margin: "4rem auto 0",
        padding: "0 2rem",
        zIndex: 2,
        position: "relative",
      }}
    >
      <div
        style={{
          background: config.gradient,
          border: `1px solid ${config.color}88`,
          borderRadius: "28px",
          padding: "2.5rem",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
        }}
      >
        <span style={{ fontSize: "4rem" }}>{config.icon}</span>
        <div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
            Tekrar Hoş Geldiniz!
          </h2>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
            En son yaptığınız analize göre dominant elementiniz: <strong style={{ color: "#a8d48a" }}>{profile.element}</strong> ({config.description}).
            Şifa yolculuğunuza kaldığınız yerden devam edebilirsiniz.
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/shop" style={{ background: "white", color: "#0d1f16", padding: "0.8rem 1.8rem", borderRadius: "30px", textDecoration: "none", fontWeight: 700, fontSize: "0.95rem" }}>
            Kişisel Mağazama Git →
          </Link>
          <Link href="/analysis" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "white", padding: "0.8rem 1.8rem", borderRadius: "30px", textDecoration: "none", fontWeight: 600, fontSize: "0.95rem" }}>
            Yeni Analiz Yap
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

