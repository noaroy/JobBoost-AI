import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Problem() {
  return (
    <section className="relative bg-zinc-950 py-24">
      <div className="container-wide mx-auto px-4">

        {/* Opening — punchy, visceral */}
        <div data-reveal className="max-w-2xl mb-20">
          <p className="text-xs text-rose-400/60 uppercase tracking-[0.2em] font-semibold mb-6">
            Ce que personne ne vous dit
          </p>

          <div className="space-y-5 text-lg text-zinc-400 leading-relaxed">
            <p>
              Vous postulez dans le vide.{" "}
              <strong className="text-white">Deux heures</strong> sur une candidature.
              CV retravaillé, lettre personnalisée, relecture.
            </p>
            <p>
              Vous envoyez. Puis vous attendez.
            </p>
            <p className="text-zinc-500">
              Dix jours. Trois semaines. Pas même un refus automatique.{" "}
              <em className="text-white not-italic font-semibold">Juste le silence.</em>
            </p>
            <p className="text-zinc-600 text-base">
              Ce n&apos;est pas votre profil qui pose problème.
              C&apos;est que votre CV n&apos;atteint jamais un humain.
            </p>
          </div>
        </div>

        {/* The actual problems — grounded in real experience */}
        <div data-reveal data-delay="1" className="divide-y divide-white/[0.05] mb-16">
          {[
            {
              stat: "80 %",
              label: "des CV éliminés avant qu'un humain les lise",
              body: "Les ATS — logiciels de tri automatique — filtrent sur des mots-clés précis, ceux que vous ne connaissez pas parce que personne ne vous les a donnés. Un recruteur ne verra jamais votre candidature si elle n'a pas le bon vocabulaire. Pas votre expérience : les mots.",
            },
            {
              stat: "6 s",
              label: "pour exister aux yeux d'un recruteur",
              body: "Quand votre CV passe enfin devant un humain, il a 6 secondes. Pas pour lire — pour scanner. Si votre résumé ne dit pas immédiatement ce que vous valez, la page tourne. 400 candidats attendent derrière vous.",
            },
            {
              stat: "4 h",
              label: "perdues par candidature sérieuse",
              body: "Rechercher l'entreprise, adapter le CV, personnaliser la lettre, relire. Sur dix candidatures par semaine, c'est 40 heures — une semaine de travail — consacrées à de la mise en forme. Pendant ce temps, les candidats qui ont les bons outils envoient le double.",
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
            <p className="text-xl md:text-2xl font-black text-white mb-3 leading-snug">
              Le problème n&apos;est pas votre profil.
              <br />
              <span className="text-amber-400">C&apos;est que vous rédigez pour des humains — pas pour des algorithmes.</span>
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Les candidats qui décrochent en 3 semaines plutôt qu&apos;en 3 mois ne sont pas plus compétents.
              Ils savent exactement quels mots-clés intégrer, comment structurer pour passer les ATS,
              et ils envoient des lettres qui résonnent avec le recruteur dès la première ligne.
              Ce n&apos;est pas du talent — c&apos;est de la méthode. Et maintenant ça s&apos;automatise.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-amber-400 text-zinc-950 font-black px-6 py-3 rounded-xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 hover:-translate-y-0.5 text-sm"
            >
              Voir la différence en 30 secondes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
