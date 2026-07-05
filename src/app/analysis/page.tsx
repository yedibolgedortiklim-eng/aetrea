"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, MessageSquare, ArrowLeft, Camera, Sparkles, Activity, HeartPulse } from "lucide-react";
import Link from "next/link";

type AnalysisType = "skin" | "soul" | "body" | null;

export default function AnalysisPage() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisType>(null);
  const [chatMessages, setChatMessages] = useState<{role: 'ai' | 'user', text: string}[]>([]);
  const [inputText, setInputText] = useState("");

  const handleStartAnalysis = (type: AnalysisType) => {
    setSelectedAnalysis(type);
    let initialMessage = "";
    if (type === "skin") {
      initialMessage = "Merhaba! Ben Aetera Cilt Analizi uzmanıyım. Cilt tipinizi belirlemek için kameranızı kullanarak bir fotoğrafınızı yükleyebilir veya size soracağım birkaç basit soruyu yanıtlayabilirsiniz. Lütfen unutmayın, vereceğim tavsiyeler tıbbi bir teşhis değil, kadim doğa bilgeliğine ve bilimsel verilere dayanan kozmetik önerilerdir. Nasıl başlamak istersiniz?";
    } else if (type === "soul") {
      initialMessage = "Hoş geldiniz. Ruhunuzun derinliklerini keşfetmek ve size en uygun aromaterapi, bitki çayları ve doğal destekleri bulmak için buradayım. Bugün kendinizi nasıl hissediyorsunuz?";
    } else if (type === "body") {
      initialMessage = "Merhabalar. Bedensel şifa analizine hoş geldiniz. Belirli bir şikayetiniz mi var, yoksa genel bağışıklık ve zindelik için mi doğal destek arıyorsunuz? (Not: Buradaki bilgiler tıbbi tedavi yerine geçmez.)";
    }
    setChatMessages([{ role: 'ai', text: initialMessage }]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    setChatMessages(prev => [...prev, { role: 'user', text: inputText }]);
    setInputText("");
    
    // Simulate AI response based on Gemini API integration logic
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        text: "Harika. Bu bilgiyi analiz ediyorum. Size en uygun bitkisel özleri ve Aetera ürünlerini önermek için biraz daha detaya ihtiyacım var..." 
      }]);
    }, 1500);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "1.5rem 4rem", background: "rgba(251, 251, 249, 0.9)", backdropFilter: "blur(10px)", zIndex: 100, borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", fontWeight: "bold", textDecoration: "none" }}>
          <ArrowLeft size={20} /> Ana Sayfaya Dön
        </Link>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
        <AnimatePresence mode="wait">
          {!selectedAnalysis ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <h1 style={{ fontSize: "3rem", color: "var(--primary-dark)", marginBottom: "1rem" }}>Hangi Analizi Yapmak İstersiniz?</h1>
                <p style={{ color: "var(--accent)", fontSize: "1.1rem" }}>Yapay zeka asistanlarımız size özel, bilimsel ve kadim tıbba dayalı tavsiyeler vermek için hazır.</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
                {[
                  { id: "skin", icon: <HeartPulse size={48} />, title: "Cilt Analizi", desc: "Fotoğraf veya anket ile cilt tipinizi ve ihtiyaçlarınızı belirleyin." },
                  { id: "soul", icon: <Sparkles size={48} />, title: "Kişilik & Ruh Analizi", desc: "Duygu durumunuza göre aromaterapi ve rahatlatıcı ürün tavsiyeleri." },
                  { id: "body", icon: <Activity size={48} />, title: "Bedensel Şifa Analizi", desc: "Fiziksel şikayetlerinize yönelik kadim tıbba uygun doğal bitkisel kürler." }
                ].map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05, translateY: -10 }}
                    onClick={() => handleStartAnalysis(item.id as AnalysisType)}
                    style={{
                      background: "white",
                      padding: "3rem 2rem",
                      borderRadius: "20px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                      cursor: "pointer",
                      textAlign: "center",
                      border: "2px solid transparent",
                      transition: "border-color 0.3s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--secondary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
                  >
                    <div style={{ color: "var(--primary)", display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                      {item.icon}
                    </div>
                    <h2 style={{ fontSize: "1.5rem", color: "var(--foreground)", marginBottom: "1rem" }}>{item.title}</h2>
                    <p style={{ color: "var(--accent)", lineHeight: 1.5 }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 12rem)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "2rem", color: "var(--primary-dark)" }}>
                  {selectedAnalysis === "skin" && "Cilt Analizi Asistanı"}
                  {selectedAnalysis === "soul" && "Ruh & Kişilik Rehberi"}
                  {selectedAnalysis === "body" && "Şifa Danışmanı"}
                </h2>
                <button 
                  onClick={() => setSelectedAnalysis(null)}
                  style={{ background: "none", border: "1px solid var(--border)", padding: "0.5rem 1rem", borderRadius: "20px", cursor: "pointer", color: "var(--foreground)" }}
                >
                  Farklı Analiz Seç
                </button>
              </div>
              
              <div style={{ flex: 1, backgroundColor: "white", borderRadius: "20px", padding: "2rem", overflowY: "auto", boxShadow: "0 5px 20px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "1rem", borderRadius: "10px", color: "var(--error)", fontSize: "0.9rem", textAlign: "center", border: "1px solid rgba(239,68,68,0.3)" }}>
                  <strong>Yasal Uyarı:</strong> Bu yapay zeka asistanının verdiği tavsiyeler <strong>tıbbi bir teşhis veya tedavi niteliği taşımaz</strong>. Sadece kadim doğa bilgeliğine ve bilimsel verilere dayanan bitkisel/kozmetik önerilerdir. Sağlık sorunlarınız için doktorunuza danışınız.
                </div>

                {chatMessages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    style={{ 
                      alignSelf: msg.role === 'ai' ? 'flex-start' : 'flex-end',
                      maxWidth: "80%",
                      backgroundColor: msg.role === 'ai' ? "var(--surface-hover)" : "var(--primary)",
                      color: msg.role === 'ai' ? "var(--foreground)" : "white",
                      padding: "1rem 1.5rem",
                      borderRadius: msg.role === 'ai' ? "20px 20px 20px 0" : "20px 20px 0 20px",
                      lineHeight: 1.6,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                    }}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop: "1rem" }}>
                {selectedAnalysis === "skin" && (
                  <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", backgroundColor: "var(--surface)", border: "1px solid var(--secondary)", borderRadius: "30px", color: "var(--secondary-dark)", cursor: "pointer", fontWeight: "bold", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--surface)'}>
                      <Camera size={20} /> Fotoğraf Çek
                    </button>
                    <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", backgroundColor: "var(--surface)", border: "1px solid var(--secondary)", borderRadius: "30px", color: "var(--secondary-dark)", cursor: "pointer", fontWeight: "bold", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--surface)'}>
                      <UploadCloud size={20} /> Galeriden Yükle
                    </button>
                  </div>
                )}
                <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "1rem" }}>
                  <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Mesajınızı yazın..." 
                    style={{ flex: 1, padding: "1.2rem 1.5rem", borderRadius: "30px", border: "1px solid var(--border)", fontSize: "1rem", outline: "none", transition: "border-color 0.3s" }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                  />
                  <button type="submit" style={{ padding: "0 2rem", backgroundColor: "var(--primary)", color: "white", borderRadius: "30px", border: "none", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <MessageSquare size={20} /> Gönder
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
