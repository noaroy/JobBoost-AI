import Link from "next/link";
import { ArrowRight, Star, Users, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 px-4 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-20 -left-32 w-80 h-80 rounded-full bg-indigo-100/40 blur-3xl" />
      </div>

      <div className="container-narrow mx-auto text-center">
        {/* Social proof badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 mb-8">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-sm font-medium text-blue-800">+2 400 candidats ont décroché un entretien</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight mb-6">
          Postule à{" "}
          <span className="gradient-text">10 offres</span>
          <br />
          en{" "}
          <span className="gradient-text">5 minutes</span>
          <br />
          <span className="text-4xl md:text-5xl lg:text-6xl">grâce à l'IA</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
          CV optimisé + lettre de motivation personnalisée + préparation entretien.{" "}
          <strong className="text-gray-800">Tout généré automatiquement</strong> en moins de 5 minutes.
        </p>

        <p className="text-base text-gray-500 mb-10">
          L'outil CV IA qui transforme votre recherche d'emploi.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/signup" className="btn-primary btn-large w-full sm:w-auto">
            Générer ma 1ère candidature gratuite
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="#how-it-works" className="btn-secondary btn-large w-full sm:w-auto">
            Voir comment ça marche
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>1ère candidature <strong className="text-gray-700">100% gratuite</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>Résultat en <strong className="text-gray-700">moins de 5 minutes</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span><strong className="text-gray-700">Sans carte bancaire</strong> pour l'essai</span>
          </div>
        </div>

        {/* Hero visual */}
        <div className="mt-16 relative max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-sm text-gray-400 ml-2">JobBoost AI — Génération en cours...</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">📄</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">CV optimisé pour "Développeur React"</span>
                    <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">✓ Prêt</span>
                  </div>
                  <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full w-full" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-sm">✉️</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Lettre de motivation — Spotify</span>
                    <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">✓ Prêt</span>
                  </div>
                  <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full w-full" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-sm">🎤</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Préparation entretien</span>
                    <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full animate-pulse">En cours...</span>
                  </div>
                  <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-2/3 transition-all" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">Temps écoulé : <strong className="text-gray-600">3 min 42s</strong></span>
              <span className="text-xs text-blue-600 font-semibold">⚡ 2/3 documents prêts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
