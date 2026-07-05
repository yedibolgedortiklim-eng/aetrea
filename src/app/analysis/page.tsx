"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Brain, HeartPulse, Droplets } from "lucide-react";

export default function AnalysisHub() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)", color: "var(--foreground)", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <header style={{ position: "absolute", top: 0, left: 0, width: "100%", padding: "2rem 4rem", zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary-dark)", fontWeight: "bold", textDecoration: "none" }}>
          <ArrowLeft size={20} /> Ana Sayfa
        </Link>
        <div style={{ fontWeight: "bold", letterSpacing: "0.2em", color: "var(--primary)", fontSize: "1.2rem" }}>AETERA DİJİTAL KLİNİK</div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "5rem" }}
        >
          <h1 style={{ fontSize: "3.5rem", color: "var(--primary-dark)", marginBottom: "1rem" }}>
            Şifa Yolculuğunuzu Seçin
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--accent)", maxWidth: "700px", margin: "0 auto" }}>
            Bedensel, ruhsal veya cildinize dair özel ihtiyaçlarınızı keşfetmek için bilimsel ve kadim temellere dayanan analiz modüllerimizden birini seçin.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem" }}>
          
          <Link href="/analysis/skin" style={{ textDecoration: "none" }}>
            <motion.div 
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(40, 81, 65, 0.1)" }}
              style={{ padding: "4rem 2rem", backgroundColor: "white", borderRadius: "24px", border: "1px solid var(--border)", cursor: "pointer", height: "100%", transition: "all 0.3s" }}
            >
              <Droplets size={48} color="var(--primary)" style={{ margin: "0 auto 2rem auto" }} />
              <h2 style={{ fontSize: "1.8rem", color: "var(--primary-dark)", marginBottom: "1rem" }}>Akıllı Cilt Analizi</h2>
              <p style={{ color: "var(--accent)", lineHeight: 1.6 }}>Baumann metodolojisinden ilham alan bilimsel değerlendirmeyle cilt bariyerinizi, nem oranınızı ve hücresel ihtiyacınızı keşfedin.</p>
            </motion.div>
          </Link>

          <Link href="/analysis/personality" style={{ textDecoration: "none" }}>
            <motion.div 
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(40, 81, 65, 0.1)" }}
              style={{ padding: "4rem 2rem", backgroundColor: "white", borderRadius: "24px", border: "1px solid var(--border)", cursor: "pointer", height: "100%", transition: "all 0.3s" }}
            >
              <Brain size={48} color="var(--secondary)" style={{ margin: "0 auto 2rem auto" }} />
              <h2 style={{ fontSize: "1.8rem", color: "var(--primary-dark)", marginBottom: "1rem" }}>Kişilik & Ruh</h2>
              <p style={{ color: "var(--accent)", lineHeight: 1.6 }}>Big Five (Beş Faktör) ve stres profili üzerinden içsel dengenizi ölçün, zihninize en uygun şifa formülünü bulun.</p>
            </motion.div>
          </Link>

          <Link href="/analysis/health" style={{ textDecoration: "none" }}>
            <motion.div 
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(40, 81, 65, 0.1)" }}
              style={{ padding: "4rem 2rem", backgroundColor: "white", borderRadius: "24px", border: "1px solid var(--border)", cursor: "pointer", height: "100%", transition: "all 0.3s" }}
            >
              <HeartPulse size={48} color="var(--primary-light)" style={{ margin: "0 auto 2rem auto" }} />
              <h2 style={{ fontSize: "1.8rem", color: "var(--primary-dark)", marginBottom: "1rem" }}>Bütünsel Sağlık</h2>
              <p style={{ color: "var(--accent)", lineHeight: 1.6 }}>Uyku, sindirim ve yaşam enerjiniz (Qi) üzerine kurulu fonksiyonel tıp temelli genel wellness değerlendirmesi.</p>
            </motion.div>
          </Link>

        </div>
      </div>
    </div>
  );
}
