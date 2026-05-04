import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="section bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container-narrow mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-8">
          <span className="text-yellow-300">⚡</span>
          <span className="text-sm font-medium text-white">Rejoignez 2 400+ candidats qui ont trouvé leur emploi</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
          Arrêtez de subir
          <br />
          votre recherche d'emploi
        </h2>

        <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-2xl mx-auto">
          Votre prochaine candidature professionnelle est à{" "}
          <strong className="text-white">5 minutes</strong> d'ici.
        </p>

        <p className="text-blue-200 mb-10 text-base">
          CV optimisé + lettre personnalisée + préparation entretien — tout en une fois.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto bg-white text-blue-700 font-black text-lg px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Générer ma 1ère candidature — Gratuit
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-blue-200">
          <span>✓ Sans carte bancaire</span>
          <span>✓ Résultat en 5 minutes</span>
          <span>✓ Satisfait ou remboursé 7 jours</span>
        </div>
      </div>
    </section>
  );
}
