import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobBoost AI — Postulez à 10 offres en 5 minutes | CV & Lettre de motivation IA",
  description:
    "Générez un CV optimisé et une lettre de motivation personnalisée en moins de 5 minutes grâce à l'IA. Outil CV IA pour postuler plus vite et décrocher votre prochain emploi.",
  keywords: [
    "faire un CV rapidement",
    "améliorer CV",
    "lettre de motivation automatique",
    "postuler emploi rapidement",
    "outil CV IA",
    "CV intelligence artificielle",
    "lettre de motivation IA",
    "candidature automatique",
  ],
  openGraph: {
    title: "JobBoost AI — Postulez à 10 offres en 5 minutes",
    description:
      "CV optimisé + lettre de motivation personnalisée générés par l'IA en moins de 5 minutes.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
