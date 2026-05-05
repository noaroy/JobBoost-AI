import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 text-slate-400 py-14 px-4">
      <div className="container-wide mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 text-white font-bold text-lg mb-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span>JobBoost <span className="text-orange-400">AI</span></span>
            </Link>
            <p className="text-sm leading-relaxed">
              L&apos;assistant IA qui génère votre CV, lettre de motivation et prépare vos entretiens en 5 minutes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="text-white font-semibold mb-4">Outils</h4>
              <ul className="space-y-2.5">
                <li><Link href="/generate/cv" className="hover:text-white transition-colors">Générateur CV</Link></li>
                <li><Link href="/generate/cover-letter" className="hover:text-white transition-colors">Lettre de motivation</Link></li>
                <li><Link href="/generate/interview" className="hover:text-white transition-colors">Préparation entretien</Link></li>
                <li><Link href="/generate/companies" className="hover:text-white transition-colors">Suggestions entreprises</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Compte</h4>
              <ul className="space-y-2.5">
                <li><Link href="/signup" className="hover:text-white transition-colors">S&apos;inscrire</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Connexion</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Tarifs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Légal</h4>
              <ul className="space-y-2.5">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Conditions d&apos;utilisation</Link></li>
                <li><a href="mailto:contact@jobboost.ai" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>© 2025 JobBoost AI. Tous droits réservés.</p>
          <p>Fait avec ⚡ pour les chercheurs d&apos;emploi ambitieux</p>
        </div>
      </div>
    </footer>
  );
}
