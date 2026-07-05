"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)", paddingTop: "6rem", paddingBottom: "6rem" }}>
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "1.5rem 4rem", background: "rgba(251, 251, 249, 0.9)", backdropFilter: "blur(10px)", zIndex: 100, borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", fontWeight: "bold", textDecoration: "none" }}>
          <ArrowLeft size={20} /> Ana Sayfaya Dön
        </Link>
      </header>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 style={{ fontSize: "4rem", color: "var(--primary-dark)", marginBottom: "2rem", lineHeight: 1.1 }}>
            Doğanın Zamansız Özü
          </h1>
          
          <div style={{ 
            height: "400px", 
            width: "100%", 
            borderRadius: "30px", 
            marginBottom: "3rem",
            backgroundImage: "url('https://images.unsplash.com/photo-1551020088-7253509b5ca0?w=2574&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
          }} />

          <div style={{ fontSize: "1.2rem", color: "var(--foreground)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p>
              Aetera, köklerini toprağın bilgeliğinden ve suyun arındırıcı gücünden alan bir dijital şifa laboratuvarıdır. İnanıyoruz ki doğa, insanın ruhunu, bedenini ve cildini iyileştirmek için gereken tüm molekülleri kusursuz bir dengeyle yaratmıştır.
            </p>
            <p>
              Geleneksel Çin Tıbbı, Ayurveda ve modern dermatolojinin kesişim noktasında duruyoruz. <strong>aktardepo.com</strong> bünyesindeki %100 saf, organik ve etik olarak elde edilmiş içerikleri, yapay zeka destekli analiz algoritmalarımızla sizin benzersiz ihtiyaçlarınıza özel olarak eşleştiriyoruz.
            </p>
            <blockquote style={{ 
              borderLeft: "4px solid var(--secondary)", 
              paddingLeft: "1.5rem", 
              fontStyle: "italic", 
              color: "var(--primary)",
              margin: "2rem 0",
              fontSize: "1.5rem"
            }}>
              "Her insan eşsiz bir evrendir. Sizin evreninize en uygun bitkiyi bulmak, bizim en büyük tutkumuz."
            </blockquote>
            <p>
              Vizyonumuz, sadece bir alışveriş platformu olmak değil; size bedensel, ruhsal ve cilt odaklı bir uyanış yaşatacak <strong>"Yüzyılın Şifa Platformu"</strong> olmaktır. Sizi anlamak için tasarlanmış analizlerimizle tanışın ve doğanın saf özünün hayatınıza dokunmasına izin verin.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
