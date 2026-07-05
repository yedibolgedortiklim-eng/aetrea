import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aetera | Doğanın Zamansız Özü",
  description: "Yüzyılın E-Ticaret ve Şifa Platformu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={outfit.variable}>
      <body style={{ fontFamily: "var(--font-outfit), sans-serif", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ flex: 1 }}>{children}</div>
        <footer style={{ backgroundColor: "var(--primary-dark)", color: "white", padding: "4rem 4rem 2rem 4rem", marginTop: "auto" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4rem" }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", color: "var(--secondary)", letterSpacing: "0.1em", marginBottom: "1rem" }}>AETERA</h2>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Doğanın zamansız özüyle bedensel ve ruhsal uyanışınız için dijital şifa laboratuvarınız.</p>
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Keşfet</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.8rem", color: "rgba(255,255,255,0.7)" }}>
                <li><a href="/shop" style={{ color: "inherit", textDecoration: "none" }}>Doğal Eczane (Mağaza)</a></li>
                <li><a href="/analysis" style={{ color: "inherit", textDecoration: "none" }}>Kişisel Analiz</a></li>
                <li><a href="/about" style={{ color: "inherit", textDecoration: "none" }}>Hakkımızda</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>İletişim</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "0.5rem" }}>yedibolgedortiklim@gmail.com</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginTop: "2rem" }}>&copy; 2026 Aetera. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
