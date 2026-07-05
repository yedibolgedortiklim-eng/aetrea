"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Filter, ChevronRight, Sparkles, AlertCircle, Volume2, VolumeX, Moon, Shield, Sun } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { products } from "@/lib/products";
import { loadElementProfile, elementConfig, ElementProfile, getCosmicSynergy } from "@/lib/element-profile";

interface MoodDetail {
  emoji: string;
  label: string;
  desc: string;
  tags: string[];
}

const moods: Record<string, MoodDetail> = {
  all: {
    emoji: "✨",
    label: "Kendimi İyi Hissediyorum",
    desc: "Dengemi korumak ve genel zindelik için tüm koleksiyonu gör.",
    tags: [],
  },
  tired: {
    emoji: "😴",
    label: "Yorgun & Enerjisiz",
    desc: "Halsizlik, kronik yorgunluk ve düşük metabolizma desteği.",
    tags: ["enerji-düşüklüğü", "metabolizma", "bağışıklık"],
  },
  stressed: {
    emoji: "😟",
    label: "Stresli & Gergin",
    desc: "Zihinsel yoğunluk, anksiyete ve uyku düzensizlikleri.",
    tags: ["stres", "anksiyete", "uyku-sorunu"],
  },
  sick: {
    emoji: "🤧",
    label: "Hasta Hissediyorum",
    desc: "Soğuk algınlığı, zayıf bağışıklık ve sindirim sorunları.",
    tags: ["bağışıklık", "solunum", "sindirim"],
  },
  skin: {
    emoji: "🌿",
    label: "Cilt Sorunum Var",
    desc: "Kuruluk, yağlanma, sivilce veya hassasiyet.",
    tags: ["kuru-cilt", "yağlı-cilt", "hassas-cilt", "akne"],
  },
};

const categories = ["Tümü", "Cilt Bakımı", "Aromaterapi", "Sağlık & Bağışıklık", "Bitkisel Çay"];

const bundles = [
  {
    id: "b-001",
    name: "🌙 Derin Uyku & Huzur Paketi",
    products: "Saf Lavanta Yağı + Papatya Çayı + Bergamot Yağı",
    price: 329,
    originalPrice: 357,
    gradient: "linear-gradient(135deg, #1b1640 0%, #3e2f75 100%)",
    url: "https://www.aktardepo.com",
    badge: "Uyku Ritüeli",
  },
  {
    id: "b-002",
    name: "⚡ Sabah Enerjisi Paketi",
    products: "Zencefil Tozu + Moringa Tozu + Okaliptüs Yağı",
    price: 297,
    originalPrice: 337,
    gradient: "linear-gradient(135deg, #4d330f 0%, #855717 100%)",
    url: "https://www.aktardepo.com",
    badge: "Odaklanma & Güç",
  },
  {
    id: "b-003",
    name: "🌿 Cilt Bakım Ritüeli",
    products: "Kuşburnu Çekirdeği Yağı + Gül Suyu + Jojoba Yağı",
    price: 399,
    originalPrice: 447,
    gradient: "linear-gradient(135deg, #12331f 0%, #2e593e 100%)",
    url: "https://www.aktardepo.com",
    badge: "Baumann Onarıcı",
  },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [selectedMood, setSelectedMood] = useState<string>("all");
  const [elementProfile, setElementProfile] = useState<ElementProfile | null>(null);
  const [showElementBanner, setShowElementBanner] = useState(true);
  
  // Ambient Sound State
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // localStorage okuması
  useEffect(() => {
    const profile = loadElementProfile();
    if (profile) {
      setElementProfile(profile);
      if (profile.element === "Su") setSelectedMood("skin");
      if (profile.element === "Ates") setSelectedMood("stressed");
      if (profile.element === "Hava") setSelectedMood("sick");
      if (profile.element === "Toprak") setSelectedMood("tired");
    }
  }, []);

  // Ambient Audio player başlatma
  useEffect(() => {
    audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav"); // Temsili sakin su/doğa efekti
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3; // Hafif arka plan sesi
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isPlayingSound) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Müzik çalma hatası:", err));
    }
    setIsPlayingSound(!isPlayingSound);
  };

  // Filtreleme mantığı
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "Tümü" || product.category === activeCategory;
    const selectedMoodTags = moods[selectedMood]?.tags || [];
    const matchesMood =
      selectedMood === "all" ||
      product.tags.some((tag) => selectedMoodTags.includes(tag));
    return matchesCategory && matchesMood;
  });

  const currentElement = elementProfile?.element;
  const config = currentElement ? elementConfig[currentElement] : null;

  // Kozmik Uyum Hesaplama
  const cosmicSynergy = currentElement ? getCosmicSynergy(currentElement) : null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1f16", color: "white", paddingTop: "6rem", paddingBottom: "4rem" }}>
      
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "1.5rem 4rem", background: "rgba(13, 31, 22, 0.95)", backdropFilter: "blur(15px)", zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.8)", fontWeight: "bold", textDecoration: "none" }}>
          <ArrowLeft size={20} /> AETERA KLİNİK
        </Link>
        
        {/* Ortam Müziği Kontrolü */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button 
            onClick={toggleSound}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: isPlayingSound ? "#a8d48a" : "white",
              padding: "0.5rem 1rem",
              borderRadius: "30px",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "all 0.3s"
            }}
          >
            {isPlayingSound ? (
              <>
                <Volume2 size={16} /> Ambient Müzik Açık
              </>
            ) : (
              <>
                <VolumeX size={16} /> Ambient Müzik Kapalı
              </>
            )}
          </button>

          {elementProfile && currentElement && (
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.4rem 1rem", borderRadius: "20px", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
              <span>{config?.icon}</span>
              <span style={{ color: "#c9a44a", fontWeight: "bold" }}>{currentElement} Elementi</span>
            </div>
          )}
          
          <a href="https://www.aktardepo.com" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "white", fontWeight: "bold", textDecoration: "none", background: "#c9a44a", padding: "0.5rem 1.2rem", borderRadius: "30px", fontSize: "0.9rem" }}>
            <ShoppingBag size={18} /> Aktardepo Giriş
          </a>
        </div>
      </header>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
        
        {/* Element Profil Banner & Kozmik Uyum Paneli */}
        <AnimatePresence>
          {elementProfile && currentElement && showElementBanner && config && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              style={{
                background: config.gradient,
                border: `1px solid ${config.color}66`,
                borderRadius: "28px",
                padding: "2.5rem",
                marginBottom: "3rem",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
            >
              {/* Sol Soluk Mandala Glow Arkası */}
              <div style={{ position: "absolute", right: "-10%", top: "-10%", fontSize: "12rem", opacity: 0.1, pointerEvents: "none" }}>{config.icon}</div>

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "3rem", alignItems: "start" }}>
                
                {/* Element Bilgileri ve Ritüel */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <span style={{ fontSize: "3.5rem" }}>{config.icon}</span>
                    <div>
                      <h3 style={{ fontSize: "1.7rem", fontWeight: 700, color: "white", marginBottom: "0.3rem" }}>
                        Element Uyumunuz: {currentElement}
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", fontStyle: "italic" }}>
                        Mantra: "{config.mantra}"
                      </p>
                    </div>
                  </div>

                  <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.05rem", lineHeight: 1.6 }}>
                    {config.description} Sizin için özel filtrelenmiş ürün listesi aşağıdadır.
                  </p>

                  {/* Ritüeller */}
                  <div style={{ marginTop: "1rem" }}>
                    <h4 style={{ color: "#c9a44a", fontSize: "1rem", fontWeight: 700, marginBottom: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      🌿 Günlük Element Ritüeliniz
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {config.rituals.map((r, i) => (
                        <div key={i} style={{ background: "rgba(0,0,0,0.2)", padding: "0.8rem 1.2rem", borderRadius: "14px", fontSize: "0.88rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ color: "#a8d48a", fontWeight: "bold", width: "100px" }}>{r.time}:</span>
                          <span style={{ flex: 1, color: "rgba(255,255,255,0.85)" }}>{r.activity}</span>
                          <span style={{ color: "#c9a44a", fontSize: "0.78rem", background: "rgba(201,164,74,0.1)", padding: "0.2rem 0.6rem", borderRadius: "8px", marginLeft: "1rem" }}>{r.recommendedProduct}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Kozmik Synergy Kartı */}
                {cosmicSynergy && (
                  <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "1.8rem", display: "flex", flexDirection: "column", gap: "1.2rem", height: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <Moon size={20} color="#c9a44a" />
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white" }}>Kozmik Uyum & Synergy</h4>
                    </div>
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#a8d48a" }}>
                      {cosmicSynergy.title}
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                      {cosmicSynergy.desc}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem" }}>
                      <Link href="/analysis" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white", padding: "0.5rem 1.2rem", borderRadius: "20px", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600 }}>
                        Yeniden Analiz Yap
                      </Link>
                      <button onClick={() => setShowElementBanner(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "0.85rem" }}>
                        Paneli Gizle
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Başlık */}
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "3.2rem", fontWeight: 300, lineHeight: 1.1, marginBottom: "0.5rem" }}>
            Doğal Eczane & <span style={{ fontWeight: 700, color: "#a8d48a" }}>Şifa Havuzu</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            aktardepo.com güvencesiyle %100 orijinal, saf ve lisanslı şifa ürünleri.
          </p>
        </div>

        {/* Ruh Hali Seçici (Mood Selector) */}
        <div style={{ marginBottom: "4rem" }}>
          <h3 style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#c9a44a", marginBottom: "1.5rem", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            <Sparkles size={16} /> Bugün Nasıl Hissediyorsunuz?
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {Object.entries(moods).map(([key, val]) => {
              const isSelected = selectedMood === key;
              return (
                <motion.div
                  key={key}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMood(key)}
                  style={{
                    background: isSelected ? "rgba(201, 164, 74, 0.12)" : "rgba(255,255,255,0.03)",
                    border: isSelected ? "2px solid #c9a44a" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "20px",
                    padding: "1.5rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textAlign: "center",
                    boxShadow: isSelected ? "0 10px 25px rgba(201, 164, 74, 0.2)" : "none",
                  }}
                >
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.8rem" }}>{val.emoji}</span>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.4rem", color: isSelected ? "#c9a44a" : "white" }}>
                    {val.label}
                  </h4>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Şifa Paketleri (Bundles) */}
        <div style={{ marginBottom: "5rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "white", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            ✨ Özel Şifa Paketleri <span style={{ fontSize: "0.85rem", color: "#a8d48a", fontWeight: "normal", background: "rgba(168,212,138,0.1)", padding: "0.2rem 0.6rem", borderRadius: "10px", marginLeft: "0.5rem" }}>Paket İndirimi</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {bundles.map((bundle) => (
              <motion.div
                key={bundle.id}
                whileHover={{ y: -8, scale: 1.01 }}
                style={{
                  background: bundle.gradient,
                  borderRadius: "24px",
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: "1rem", right: "1.5rem", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "white", padding: "0.2rem 0.7rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold" }}>
                  {bundle.badge}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "white", marginBottom: "1rem", marginTop: "0.5rem" }}>
                    {bundle.name}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                    {bundle.products}
                  </p>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.8rem", marginBottom: "1.2rem" }}>
                    <span style={{ fontSize: "1.8rem", fontWeight: 700, color: "#a8d48a" }}>{bundle.price} ₺</span>
                    <span style={{ fontSize: "1.1rem", textDecoration: "line-through", color: "rgba(255,255,255,0.4)" }}>
                      {bundle.originalPrice} ₺
                    </span>
                  </div>
                  <a
                    href={bundle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      textAlign: "center",
                      background: "white",
                      color: "#0d1f16",
                      padding: "1rem",
                      borderRadius: "30px",
                      textDecoration: "none",
                      fontWeight: 700,
                      transition: "all 0.3s ease",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                    }}
                  >
                    aktardepo.com'da Satın Al →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ana Mağaza Alanı */}
        <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}>
          {/* Sol Kategori Sidebar */}
          <div style={{ width: "240px", flexShrink: 0, position: "sticky", top: "7rem" }}>
            <h2 style={{ fontSize: "1.3rem", color: "white", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Filter size={18} /> Koleksiyonlar
            </h2>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      background: activeCategory === cat ? "rgba(255,255,255,0.06)" : "none",
                      border: "none",
                      fontSize: "1rem",
                      fontWeight: activeCategory === cat ? "bold" : "normal",
                      color: activeCategory === cat ? "#a8d48a" : "rgba(255,255,255,0.6)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      textAlign: "left",
                      padding: "0.8rem 1.2rem",
                      borderRadius: "12px",
                      transition: "all 0.2s",
                    }}
                  >
                    {cat}
                    {activeCategory === cat && <ChevronRight size={16} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Ürün Listesi */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>
                Toplam <strong style={{ color: "white" }}>{filteredProducts.length}</strong> şifa ürünü listeleniyor
              </p>
            </div>

            <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  const activeMoodTags = moods[selectedMood]?.tags || [];
                  
                  // Element Afinite Skoru (Uyum Skoru) Hesaplama
                  let affinityScore = 50; // default 50%
                  let isPreferred = false;
                  
                  if (currentElement) {
                    const elConfig = elementConfig[currentElement];
                    
                    // Ürün element tags'lerinden birini içeriyorsa veya mood eşleşmesi varsa
                    const matchesElementTags = product.tags.some(tag => elConfig.moodTags.includes(tag));
                    const matchesActiveMood = product.tags.some(tag => activeMoodTags.includes(tag));
                    
                    if (matchesElementTags) {
                      affinityScore = 80;
                      isPreferred = true;
                    }
                    if (matchesActiveMood) {
                      affinityScore += 10;
                    }
                    if (cosmicSynergy) {
                      affinityScore += cosmicSynergy.affinityModifier;
                    }
                    
                    // Max 99% sınırla
                    affinityScore = Math.min(Math.max(affinityScore, 10), 99);
                  }

                  return (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.02)",
                        border: isPreferred ? "1px solid rgba(201, 164, 74, 0.3)" : "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "24px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        position: "relative"
                      }}
                    >
                      {/* Element Uyum Rozeti */}
                      {currentElement && isPreferred && (
                        <div style={{ position: "absolute", top: "1rem", right: "1rem", backgroundColor: "rgba(201,164,74,0.9)", backdropFilter: "blur(5px)", color: "#0d1f16", padding: "0.3rem 0.7rem", borderRadius: "12px", fontSize: "0.72rem", fontWeight: "bold", zIndex: 10, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Shield size={10} /> %{affinityScore} Element Uyumu
                        </div>
                      )}

                      {/* Görsel Alanı */}
                      <div style={{ height: "240px", position: "relative", overflow: "hidden", backgroundColor: "rgba(0,0,0,0.15)" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150&q=80";
                          }}
                        />
                        <div style={{ position: "absolute", top: "0.8rem", left: "0.8rem", backgroundColor: "rgba(13,31,22,0.8)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.3rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", color: "#a8d48a", fontWeight: "bold" }}>
                          {product.category}
                        </div>
                      </div>

                      {/* Bilgi Alanı */}
                      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                        <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "white", marginBottom: "0.6rem" }}>
                          {product.name}
                        </h4>
                        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "1.5rem", flex: 1 }}>
                          {product.shortDescription}
                        </p>

                        {/* Etiketler (Tags) */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                          {product.tags.map((tag) => {
                            const isMatch = activeMoodTags.includes(tag);
                            return (
                              <span
                                key={tag}
                                style={{
                                  fontSize: "0.72rem",
                                  padding: "0.2rem 0.5rem",
                                  borderRadius: "8px",
                                  background: isMatch ? "rgba(201, 164, 74, 0.2)" : "rgba(255,255,255,0.05)",
                                  color: isMatch ? "#c9a44a" : "rgba(255,255,255,0.45)",
                                  border: isMatch ? "1px solid rgba(201, 164, 74, 0.4)" : "1px solid transparent",
                                  fontWeight: isMatch ? "bold" : "normal",
                                  transition: "all 0.2s",
                                }}
                              >
                                {tag.replace(/-/g, " ")}
                              </span>
                            );
                          })}
                        </div>

                        {/* Satın Alma Butonu */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                          <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "white" }}>
                            {product.price} ₺
                          </span>
                          <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: "0.6rem 1.2rem",
                              background: "rgba(255,255,255,0.08)",
                              color: "white",
                              borderRadius: "20px",
                              border: "1px solid rgba(255,255,255,0.15)",
                              textDecoration: "none",
                              fontSize: "0.82rem",
                              fontWeight: "bold",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.background = "#c9a44a";
                              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c9a44a";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
                              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
                            }}
                          >
                            Satın Al →
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div style={{ textAlign: "center", padding: "4rem 2rem", background: "rgba(255,255,255,0.02)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <AlertCircle size={40} color="rgba(255,255,255,0.3)" style={{ margin: "0 auto 1rem" }} />
                <h3 style={{ fontSize: "1.2rem", color: "white", marginBottom: "0.5rem" }}>
                  Aradığınız kriterlerde ürün bulunamadı.
                </h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
                  Kategoriyi "Tümü" yapmayı veya farklı bir ruh hali seçmeyi deneyebilirsiniz.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
