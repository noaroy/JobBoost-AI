import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative bg-zinc-950 py-28 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 55% at 50% 50%, oklch(0.78 0.13 82 / 0.06), transparent)" }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent" aria-hidden="true" />

      <div className="container-narrow mx-auto px-4 text-center relative z-10">

        {/* Credibility — live counter feel */}
        <div className="inline-flex items-center gap-2 text-xs text-zinc-600 uppercase tracking-[0.2em] font-semibold mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          1 200+ entretiens décrochés ce mois · France, Belgique, Suisse
        </div>

        {/* Main headline — benefit + urgency */}
        <h2
          data-reveal
          className="font-black text-white mb-6 leading-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em" }}
        >
          Votre prochain entretien<br />
          <span className="text-amber-400">est à 30 secondes d&apos;ici.</span>
        </h2>

        {/* Subtext — honest and direct */}
        <p data-reveal data-delay="1" className="text-xl text-zinc-400 mb-4 max-w-xl mx-auto leading-relaxed">
          Pendant que vous hésitez, d&apos;autres postulent avec un CV optimisé.
          <br />
          <span className="text-zinc-300">Commencez maintenant — c&apos;est gratuit.</span>
        </p>

        <p data-reveal data-delay="2" className="text-zinc-600 mb-12 text-sm">
          Première candidature gratuite · Résultat en 30 secondes · Aucune carte bancaire requise
        </p>

        {/* CTA — primary + secondary */}
        <div data-reveal data-delay="3" className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-400 text-zinc-950 font-black text-lg px-8 py-4 rounded-2xl hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/25 hover:shadow-amber-400/40 hover:-translate-y-0.5"
          >
            <Zap className="w-5 h-5" />
            Commencer ma première candidature
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 font-semibold text-base px-8 py-4 rounded-2xl transition-all"
          >
            Voir les tarifs
          </Link>
        </div>

        {/* Human closing note */}
        <p data-reveal data-delay="4" className="text-zinc-700 text-sm max-w-md mx-auto leading-relaxed">
          Si vous avez des questions avant de créer un compte, écrivez-nous à{" "}
          <a href="mailto:hello@jobboost.ai" className="text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2">
            hello@jobboost.ai
          </a>
          . On répond vraiment.
        </p>
      </div>
    </section>
  );
}
