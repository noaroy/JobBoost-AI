import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Problem() {
  return (
    <section className="relative bg-zinc-950 py-24">
      <div className="container-wide mx-auto px-4">

        {/* Opening — narrative, not bullet list */}
        <div data-reveal className="max-w-2xl mb-20">
          <p className="text-xs text-rose-400/60 uppercase tracking-[0.2em] font-semibold mb-6">
            Vous connaissez ce sentiment
          </p>

          <div className="space-y-5 text-lg text-zinc-400 leading-relaxed">
            <p>
              Vous passez <strong className="text-white">deux heures</strong> sur une candidature.
              Vous adaptez le CV, vous réécrivez la lettre pour la cinquième fois,
              vous relisez tout encore une fois.
            </p>
            <p>
              Vous envoyez.
            </p>
            <p className="text-zinc-500">
              Une semaine. Deux semaines. Pas même un refus.{" "}
              <em className="text-zinc-400 not-italic">Juste le silence.</em>
            </p>
          </div>
        </div>

        {/* The actual problems — grounded in real experience */}
        <div data-reveal data-delay="1" className="divide-y divide-white/[0.05] mb-16">
          {[
            {
              stat: "80 %",
              label: "des CV éliminés avant qu'un humain les lise",
              body: "Les ATS — les logiciels de tri automatique — rejettent la majorité des candidatures sur des critères de mots-clés et de format. Ce n'est pas votre expérience qu'ils évaluent. C'est votre capacité à rédiger pour un algorithme. Ce que personne ne vous a appris.",
            },
            {
              stat: "8 %",
              label: "taux de réponse moyen en France",
              body: "Sur 100 candidatures envoyées, 92 n'obtiennent aucun retour. Pas parce que vous n'êtes pas qualifié — mais parce que votre lettre ressemble à toutes les autres. Les recruteurs reçoivent 400 CV pour un poste. Vous avez 6 secondes pour exister.",
            },
            {
              stat: "4h",
              label: "perdues par candidature sérieuse",
              body: "Rechercher l'entreprise, adapter le CV, personnaliser la lettre, trouver la bonne formule de politesse. Multiplié par dix candidatures par semaine, c'est 40 heures — une semaine de travail — consacrées à de la mise en forme. Pas à votre recherche.",
            },
          ].map((p, i) => (
            <div key={i} className="grid grid-cols-[5rem,1fr] md:grid-cols-[9rem,1fr] gap-6 md:gap-12 py-10 group">
              <div className="pt-1">
                <div className="font-display font-black text-rose-400 leading-none tabular-nums" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
                  {p.stat}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base md:text-lg mb-3 group-hover:text-rose-50 transition-colors leading-snug">
                  {p.label}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* The real insight — transition to solution */}
        <div data-reveal data-delay="2" className="bg-zinc-900/60 border border-white/[0.07] rounded-2xl p-8 md:p-10">
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
              Le problème n&apos;est pas votre profil.
              <br />
              <span className="text-zinc-400 font-medium">C&apos;est la façon dont vous le présentez.</span>
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Les candidats qui trouvent en 3 semaines plutôt qu&apos;en 3 mois ne sont pas plus compétents.
              Ils savent quels mots-clés utiliser, comment structurer un CV pour les ATS,
              et ils envoient des lettres qui parlent à un recruteur, pas à un algorithme.
              Ça s&apos;apprend — ou ça s&apos;automatise.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-amber-400 text-zinc-950 font-black px-6 py-3 rounded-xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 hover:-translate-y-0.5 text-sm"
            >
              Voir ce que ça change concrètement <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
