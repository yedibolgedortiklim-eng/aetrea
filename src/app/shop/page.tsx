"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useState } from "react";

const mockProducts = [
  { id: 1, name: "Saf Lavanta Uçucu Yağı", category: "Aromaterapi", price: "245 ₺", desc: "Sakinleştirici ve rahatlatıcı etki. Uyku kalitesini artırır." },
  { id: 2, name: "Organik Kuşburnu Çekirdeği Yağı", category: "Cilt Bakımı", price: "320 ₺", desc: "Anti-aging etkisiyle cildi yeniler, lekelerin görünümünü azaltır." },
  { id: 3, name: "Zencefil & Zerdeçal Özü", category: "Şifa & Bağışıklık", price: "185 ₺", desc: "Güçlü bir antioksidan kaynağı. Bağışıklık sistemini destekler." },
  { id: 4, name: "Gül Suyu (Hidrolat)", category: "Cilt Bakımı", price: "150 ₺", desc: "Gözenekleri sıkılaştırır, cildi canlandırır ve ferahlık verir." },
  { id: 5, name: "Sakinleştirici Bitki Çayı Harmanı", category: "Şifa & Bağışıklık", price: "120 ₺", desc: "Papatya, melisa ve lavanta içeren özel stres karşıtı karışım." },
  { id: 6, name: "Nane Uçucu Yağı", category: "Aromaterapi", price: "190 ₺", desc: "Zihni açar, odaklanmayı artırır ve ferahlık hissi verir." },
];

export default function ShopPage() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "1.5rem 4rem", background: "rgba(251, 251, 249, 0.9)", backdropFilter: "blur(10px)", zIndex: 100, borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", fontWeight: "bold", textDecoration: "none" }}>
          <ArrowLeft size={20} /> Ana Sayfaya Dön
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary-dark)", fontWeight: "bold", cursor: "pointer" }}>
          <ShoppingBag size={24} /> <span>Sepet (0)</span>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h1 style={{ fontSize: "3rem", color: "var(--primary-dark)", marginBottom: "1rem" }}>Aetera Doğal Eczane</h1>
            <p style={{ color: "var(--accent)", fontSize: "1.1rem" }}>Doğanın kalbinden gelen, saflığı korunmuş ürünlerimiz.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2.5rem" }}>
            {mockProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: hoveredProduct === product.id ? "0 20px 40px rgba(40, 81, 65, 0.1)" : "0 5px 15px rgba(0,0,0,0.03)",
                  transition: "all 0.3s ease",
                  transform: hoveredProduct === product.id ? "translateY(-10px)" : "translateY(0)"
                }}
              >
                <div style={{ 
                  height: "250px", 
                  backgroundColor: "var(--surface-hover)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  color: "var(--secondary-light)",
                  position: "relative"
                }}>
                  {/* Mock Image Placeholder */}
                  <div style={{ fontSize: "5rem", opacity: 0.5 }}>🌿</div>
                  
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", backgroundColor: "var(--primary)", color: "white", padding: "0.25rem 0.75rem", borderRadius: "15px", fontSize: "0.8rem", fontWeight: "bold" }}>
                    {product.category}
                  </div>
                </div>
                
                <div style={{ padding: "2rem" }}>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>{product.name}</h3>
                  <p style={{ color: "var(--accent)", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1.5rem", height: "3rem" }}>
                    {product.desc}
                  </p>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary-dark)" }}>{product.price}</span>
                    <button style={{ 
                      padding: "0.5rem 1.5rem", 
                      backgroundColor: hoveredProduct === product.id ? "var(--primary)" : "var(--surface)", 
                      color: hoveredProduct === product.id ? "white" : "var(--primary)",
                      border: "1px solid var(--primary)",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}>
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
