import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 px-4">
      <div className="container-wide mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              JobBoost AI
            </Link>
            <p className="text-sm max-w-xs leading-relaxed">
              L'outil IA qui génère votre CV optimisé et votre lettre de motivation en 5 minutes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="text-white font-semibold mb-3">Produit</h4>
              <ul className="space-y-2">
                <li><Link href="#how-it-works" className="hover:text-white transition-colors">Comment ça marche</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Tarifs</Link></li>
                <li><Link href="/generate/cv" className="hover:text-white transition-colors">Générateur CV</Link></li>
                <li><Link href="/generate/cover-letter" className="hover:text-white transition-colors">Lettre de motivation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Compte</h4>
              <ul className="space-y-2">
                <li><Link href="/signup" className="hover:text-white transition-colors">S'inscrire</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Connexion</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Légal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Conditions</Link></li>
                <li><a href="mailto:contact@jobboost.ai" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2025 JobBoost AI. Tous droits réservés.</p>
          <p>Fait avec ⚡ pour les chercheurs d'emploi ambitieux</p>
        </div>
      </div>
    </footer>
  );
}
