"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Filter, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const mockProducts = [
  { 
    id: 1, 
    name: "Saf Lavanta Uçucu Yağı", 
    category: "Aromaterapi", 
    price: "245 ₺", 
    desc: "Fransız Alplerinden elde edilen premium kalite. Sakinleştirici ve rahatlatıcı etkisiyle uyku kalitenizi derinleştirir.",
    image: "https://images.unsplash.com/photo-1595806611388-c70f089e9006?w=800&auto=format&fit=crop"
  },
  { 
    id: 2, 
    name: "Organik Kuşburnu Çekirdeği Yağı", 
    category: "Cilt Bakımı", 
    price: "320 ₺", 
    desc: "A Vitamini deposu. Anti-aging etkisiyle cildi yeniler, ince çizgilerin ve lekelerin görünümünü kusursuzca azaltır.",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop"
  },
  { 
    id: 3, 
    name: "Isparta Gül Suyu (Saf Hidrolat)", 
    category: "Cilt Bakımı", 
    price: "150 ₺", 
    desc: "Geleneksel bakır imbiklerde damıtılmış %100 saf gül suyu. Cildin pH dengesini korur, gözenekleri sıkılaştırır.",
    image: "https://images.unsplash.com/photo-1559564114-569b04cb81e4?w=800&auto=format&fit=crop"
  },
  { 
    id: 4, 
    name: "Zencefil & Zerdeçal Eliksiri", 
    category: "Şifa & Bağışıklık", 
    price: "185 ₺", 
    desc: "Kadim Çin Tıbbı formülü. Güçlü bir antioksidan kaynağı olarak hücreleri korur ve bağışıklık sistemini destekler.",
    image: "https://images.unsplash.com/photo-1596647265882-628d09722ea9?w=800&auto=format&fit=crop"
  },
  { 
    id: 5, 
    name: "Huzur Ritüeli Bitki Çayı", 
    category: "Şifa & Bağışıklık", 
    price: "120 ₺", 
    desc: "Organik papatya, melisa ve lavanta içeren özel stres karşıtı harman. Günün yorgunluğunu silmek için ideal.",
    image: "https://images.unsplash.com/photo-1563914946356-068307ce3c99?w=800&auto=format&fit=crop"
  },
  { 
    id: 6, 
    name: "Nane & Okaliptüs Uçucu Yağı", 
    category: "Aromaterapi", 
    price: "190 ₺", 
    desc: "Zihni anında açan, odaklanmayı artıran ve ortamın enerjisini tazeleyen yoğun ferahlık.",
    image: "https://images.unsplash.com/photo-1620241078736-22a3d75a6f87?w=800&auto=format&fit=crop"
  },
];

const categories = ["Tümü", "Cilt Bakımı", "Aromaterapi", "Şifa & Bağışıklık"];

export default function ShopPage() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const filteredProducts = activeCategory === "Tümü" 
    ? mockProducts 
    : mockProducts.filter(p => p.category === activeCategory);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "1.5rem 4rem", background: "rgba(251, 251, 249, 0.9)", backdropFilter: "blur(10px)", zIndex: 100, borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary-dark)", fontWeight: "bold", textDecoration: "none" }}>
          <ArrowLeft size={20} /> AETERA KLİNİK
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--primary-dark)", fontWeight: "bold", cursor: "pointer" }}>
          <ShoppingBag size={24} /> <span style={{ backgroundColor: "var(--secondary)", color: "white", padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.9rem" }}>Sepet (0)</span>
        </div>
      </header>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem", display: "flex", gap: "4rem", marginTop: "2rem" }}>
        
        {/* Sidebar Filters */}
        <div style={{ width: "250px", flexShrink: 0 }}>
          <div style={{ position: "sticky", top: "8rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "var(--primary-dark)", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Filter size={20} /> Koleksiyonlar
            </h2>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "1.1rem",
                      fontWeight: activeCategory === cat ? "bold" : "normal",
                      color: activeCategory === cat ? "var(--primary)" : "var(--accent)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      textAlign: "left",
                      padding: "0.5rem 0",
                      transition: "color 0.2s"
                    }}
                  >
                    {cat}
                    {activeCategory === cat && <ChevronRight size={16} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ flex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ marginBottom: "3rem" }}>
              <h1 style={{ fontSize: "3.5rem", color: "var(--primary-dark)", marginBottom: "0.5rem", lineHeight: 1.1 }}>Doğal Eczane</h1>
              <p style={{ color: "var(--accent)", fontSize: "1.2rem", maxWidth: "600px" }}>Saf, etik ve güçlü. Doğanın kalbinden formüle edilmiş premium seçkiyi keşfedin.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "3rem" }}>
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: hoveredProduct === product.id ? "0 20px 40px rgba(40, 81, 65, 0.15)" : "0 5px 15px rgba(0,0,0,0.04)",
                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    transform: hoveredProduct === product.id ? "translateY(-10px)" : "translateY(0)",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <div style={{ 
                    height: "300px", 
                    width: "100%",
                    position: "relative",
                    overflow: "hidden"
                  }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        transform: hoveredProduct === product.id ? "scale(1.05)" : "scale(1)",
                        transition: "transform 0.6s ease"
                      }} 
                    />
                    <div style={{ position: "absolute", top: "1rem", left: "1rem", backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(5px)", color: "var(--primary-dark)", padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {product.category}
                    </div>
                  </div>
                  
                  <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 style={{ fontSize: "1.4rem", color: "var(--foreground)", marginBottom: "0.8rem", lineHeight: 1.3 }}>{product.name}</h3>
                    <p style={{ color: "var(--accent)", fontSize: "0.95rem", lineHeight: 1.6, flex: 1 }}>
                      {product.desc}
                    </p>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
                      <span style={{ fontSize: "1.6rem", fontWeight: "bold", color: "var(--primary-dark)" }}>{product.price}</span>
                      <button style={{ 
                        padding: "0.8rem 1.8rem", 
                        backgroundColor: hoveredProduct === product.id ? "var(--primary)" : "var(--surface)", 
                        color: hoveredProduct === product.id ? "white" : "var(--primary)",
                        border: "1px solid var(--primary)",
                        borderRadius: "30px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: hoveredProduct === product.id ? "0 8px 20px rgba(40, 81, 65, 0.2)" : "none"
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
    </div>
  );
}
