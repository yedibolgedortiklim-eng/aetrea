"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Leaf, Activity } from "lucide-react";

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
