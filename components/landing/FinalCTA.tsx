import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative bg-slate-950 py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container-narrow mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium text-slate-300">Rejoignez 2 400+ candidats qui ont trouvé leur emploi</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
          Arrêtez de subir<br />
          votre recherche d&apos;emploi
        </h2>

        <p className="text-xl md:text-2xl text-slate-400 mb-4 max-w-2xl mx-auto">
          Votre prochaine candidature professionnelle est à{" "}
          <strong className="text-white">5 minutes</strong> d&apos;ici.
        </p>

        <p className="text-slate-500 mb-12 text-base">
          CV optimisé · Lettre personnalisée · Préparation entretien — tout automatisé par l&apos;IA.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-black text-lg px-8 py-4 rounded-2xl hover:from-blue-500 hover:to-violet-500 transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
          >
            <Zap className="w-5 h-5" />
            Générer ma 1ère candidature — Gratuit
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Sans carte bancaire</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Résultat en 5 minutes</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Remboursé 7 jours si insatisfait</span>
        </div>
      </div>
    </section>
  );
}
