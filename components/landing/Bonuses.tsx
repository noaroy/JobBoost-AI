import Link from "next/link";
import { BookOpen, Mic, CheckSquare, ArrowRight } from "lucide-react";

const bonuses = [
  {
    icon: CheckSquare,
    title: "Checklist 30 jours — du 1er jour au 1er entretien",
    desc: "Un plan quotidien concret : quoi faire le lundi matin, quoi relancer le jeudi, comment mesurer votre semaine. Rédigé avec des coaches emploi, pas sorti d'un blog LinkedIn.",
    iconColor: "text-emerald-400",
  },
  {
    icon: Mic,
    title: "20 réponses aux questions d'entretien les plus redoutées",
    desc: "Celles qui font trébucher même les candidats bien préparés. Pour chacune, la structure de réponse STAR avec un exemple complet que vous pouvez adapter à votre expérience.",
    iconColor: "text-zinc-300",
  },
  {
    icon: BookOpen,
    title: "50 templates de lettres par secteur",
    desc: "Tech, finance, santé, commerce, RH — un point de départ solide pour chaque secteur que vous pouvez adapter ou utiliser directement avec le générateur IA.",
    iconColor: "text-amber-400",
  },
];

export default function Bonuses() {
  return (
    <section className="relative bg-zinc-900/30 py-24 border-y border-white/[0.05]">
      <div className="container-wide mx-auto px-4">

        <div className="grid lg:grid-cols-[1fr,260px] gap-12 items-start mb-14">
          <div data-reveal>
            <p className="text-xs text-amber-400/70 uppercase tracking-[0.2em] font-semibold mb-4">Ressources incluses</p>
            <h2
              className="font-display font-black text-white leading-tight mb-5"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", letterSpacing: "-0.025em" }}
            >
              On a aussi construit{" "}
              <span className="text-amber-400">les guides</span>{" "}
              qu&apos;on aurait voulu avoir
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
              Pas des bonus marketing. Des ressources qu&apos;on utilise nous-mêmes pour
              comprendre ce qui marche dans la recherche d&apos;emploi en France aujourd&apos;hui.
            </p>
          </div>

          <div data-reveal data-delay="1" className="hidden lg:flex flex-col gap-3">
            <div className="bg-zinc-950 border border-white/[0.07] rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-white mb-1">3</div>
              <div className="text-sm text-zinc-500">ressources incluses</div>
              <div className="text-xs text-zinc-700 mt-2">Disponibles dès la création du compte</div>
            </div>
            <div className="bg-zinc-950 border border-amber-400/15 rounded-2xl p-4 text-center">
              <div className="text-xs text-zinc-600 mb-2">Accès</div>
              <div className="text-xl font-black text-amber-400">Immédiat</div>
              <div className="text-xs text-zinc-700 mt-1">Pas besoin de payer pour lire</div>
            </div>
          </div>
        </div>

        <div data-reveal data-delay="2" className="divide-y divide-white/[0.05] mb-12">
          {bonuses.map((b, i) => (
            <div
              key={i}
              className="group grid grid-cols-[3rem,1fr] md:grid-cols-[4rem,1fr] items-start gap-5 md:gap-8 py-7 hover:bg-white/[0.02] -mx-4 px-4 transition-colors cursor-default"
            >
              <b.icon className={`w-6 h-6 ${b.iconColor} mt-1 flex-shrink-0`} />
              <div>
                <h3 className="font-bold text-white text-base md:text-lg mb-1.5 group-hover:text-amber-50 transition-colors leading-snug">
                  {b.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div data-reveal data-delay="3" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <p className="text-zinc-600 text-sm max-w-md">
            Ces ressources sont accessibles dans votre dashboard dès la création du compte — plan gratuit inclus.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600 font-semibold px-5 py-2.5 rounded-xl transition-all text-sm flex-shrink-0"
          >
            Accéder aux ressources <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
