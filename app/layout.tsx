import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meraki Alger | Salon de beauté privé pour femmes à Hydra",
  description: "Meraki Alger, salon privé exclusivement féminin à Hydra : balayage & blonde, maquillage de mariée, ongles, soins du visage et du corps. Prenez rendez-vous via WhatsApp.",
  openGraph: { title: "Meraki Alger | Beauté & Bien-Être", description: "Un espace privé dédié à la beauté, au bien-être et à l'art de prendre soin de soi.", locale: "fr_DZ", type: "website" },
};
export const viewport: Viewport = { themeColor: "#F7F3ED", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
