"use client";

import { useState } from "react";
import Intro from "../components/Intro";
import { motion } from "framer-motion";
import { Sparkles, HeartPulse, Activity } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}

      {introComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Header */}
          <header style={{ 
            padding: "2rem 4rem", 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            position: "fixed",
            width: "100%",
            zIndex: 100,
            background: "rgba(251, 251, 249, 0.8)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border)"
          }}>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary)", letterSpacing: "0.1em" }}>
              AETERA
            </div>
            <nav style={{ display: "flex", gap: "2rem", color: "var(--foreground)", fontWeight: 500 }}>
              <Link href="/shop" style={{ transition: "color 0.3s" }}>Mağaza</Link>
              <Link href="/analysis" style={{ transition: "color 0.3s" }}>Yapay Zeka Analizi</Link>
              <Link href="/about" style={{ transition: "color 0.3s" }}>Hakkımızda</Link>
            </nav>
            <div>
              <button style={{ 
                padding: "0.75rem 1.5rem", 
                backgroundColor: "var(--primary)", 
                color: "white", 
                border: "none", 
                borderRadius: "30px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background-color 0.3s"
              }}>
                Giriş Yap
              </button>
            </div>
          </header>

          {/* Hero Section */}
          <section style={{ 
            height: "100vh", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            background: "radial-gradient(circle at top right, var(--surface-hover), var(--background))",
            paddingTop: "5rem"
          }}>
            <div style={{ textAlign: "center", maxWidth: "800px", padding: "0 2rem" }}>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{ 
                  display: "inline-block", 
                  padding: "0.5rem 1.5rem", 
                  borderRadius: "30px", 
                  backgroundColor: "rgba(203, 163, 101, 0.15)",
                  color: "var(--secondary-dark)",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  letterSpacing: "0.05em"
                }}
              >
                Yüzyılın Şifa Platformuna Hoş Geldiniz
              </motion.div>
              
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{ fontSize: "4.5rem", color: "var(--foreground)", lineHeight: 1.1, marginBottom: "1.5rem" }}
              >
                Doğanın Zamansız Özüyle <br/>
                <span style={{ color: "var(--primary)" }}>Kendinizi Keşfedin</span>
              </motion.h1>
              
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{ fontSize: "1.2rem", color: "var(--accent)", marginBottom: "3rem", lineHeight: 1.6 }}
              >
                Kadim bilgeliğin ve modern bilimin ışığında, yapay zeka destekli 
                kişiselleştirilmiş şifa, cilt ve ruh analizi ile eşsiz bir alışveriş deneyimi yaşayın.
              </motion.p>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}
              >
                <Link href="/analysis" style={{
                  padding: "1rem 2.5rem",
                  backgroundColor: "var(--primary)",
                  color: "white",
                  borderRadius: "30px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  boxShadow: "0 10px 25px rgba(40, 81, 65, 0.3)",
                  transition: "transform 0.3s ease"
                }}>
                  Analize Başla
                </Link>
                <Link href="/shop" style={{
                  padding: "1rem 2.5rem",
                  backgroundColor: "transparent",
                  color: "var(--primary)",
                  border: "2px solid var(--primary)",
                  borderRadius: "30px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  transition: "all 0.3s ease"
                }}>
                  Mağazayı Keşfet
                </Link>
              </motion.div>
            </div>
          </section>

          {/* AI Features Section */}
          <section style={{ padding: "8rem 4rem", backgroundColor: "var(--primary-dark)", color: "white" }}>
             <div style={{ textAlign: "center", marginBottom: "5rem" }}>
                <h2 style={{ fontSize: "3rem", color: "var(--secondary-light)" }}>Yapay Zeka Destekli Şifa Rehberiniz</h2>
                <p style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.8)", maxWidth: "700px", margin: "1.5rem auto 0", fontSize: "1.1rem", lineHeight: 1.6 }}>
                  Sizi dinleyen, anlayan ve bedensel, ruhsal ihtiyaçlarınıza en uygun doğadan gelen çözümleri öneren akıllı asistanlar.
                </p>
             </div>
             
             <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3rem", maxWidth: "1200px", margin: "0 auto" }}>
                {[
                  { icon: <Activity size={40} />, title: "Bedensel Şifa", desc: "Şikayetlerinizi dinleyip, kadim ve modern tıbba göre bitkisel kür tavsiyeleri verir. Tamamen doğal destek." },
                  { icon: <Sparkles size={40} />, title: "Kişilik & Ruh", desc: "Ruh halinize uygun rahatlatıcı aromaterapi ve doğal ürünleri eşleştirerek içsel dengenizi sağlar." },
                  { icon: <HeartPulse size={40} />, title: "Akıllı Cilt Analizi", desc: "Cilt tipinize ve özel problemlerinize yönelik %100 doğal, bitkisel içerikli bakım rutini oluşturur." }
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -15, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      padding: "3rem 2.5rem",
                      borderRadius: "24px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                    }}
                  >
                    <div style={{ color: "var(--secondary)", marginBottom: "2rem", display: "inline-block", padding: "1rem", background: "rgba(203,163,101,0.1)", borderRadius: "50%" }}>
                      {feature.icon}
                    </div>
                    <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem", fontWeight: 600 }}>{feature.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontSize: "1.05rem" }}>{feature.desc}</p>
                  </motion.div>
                ))}
             </div>
          </section>
        </motion.div>
      )}
    </main>
  );
}
