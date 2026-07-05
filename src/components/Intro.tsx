"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1200); // Wait for exit animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "var(--background)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ position: "relative", width: "250px", height: "250px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Logo Approximation based on the provided image */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "8px solid var(--primary)",
                borderTopColor: "var(--primary-light)",
                boxShadow: "0 0 30px rgba(40, 81, 65, 0.2)"
              }}
            />
            
            <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ 
                  fontSize: "8rem", 
                  color: "var(--secondary)", 
                  fontWeight: "bold", 
                  fontFamily: "serif",
                  background: "linear-gradient(45deg, var(--secondary-dark), var(--secondary-light))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
            >
                A
            </motion.div>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{
              marginTop: "3rem",
              fontSize: "3rem",
              fontWeight: 600,
              color: "var(--primary-dark)",
              letterSpacing: "0.15em",
            }}
          >
            AETERA
          </motion.h1>
          
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            style={{
              marginTop: "0.5rem",
              fontSize: "1.2rem",
              color: "var(--accent)",
              letterSpacing: "0.25em",
              textTransform: "uppercase"
            }}
          >
            Doğanın Zamansız Özü
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
