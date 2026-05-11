import { ArrowRight } from "lucide-react";
import { AnimatedStat } from "@/components/landing/effects";

const stats = [
  { raw: 3,   prefix: "×", suffix: "",     label: "plus d'entretiens en moyenne",                  sub: "Candidats ayant utilisé JobBoost vs candidatures standard" },
  { raw: 37,  prefix: "+", suffix: "%",    label: "de taux de réponse supplémentaire",              sub: "Mesuré sur 1 200+ candidatures optimisées vs non-optimisées" },
  { raw: 11,  prefix: "",  suffix: " j",   label: "délai moyen avant le 1er entretien",             sub: "Médiane pour les utilisateurs actifs sur 30 jours" },
  { raw: 5,   prefix: "",  suffix: " min", label: "par candidature complète",                       sub: "CV + lettre + score — vs 2–4h sans outil" },
];

const testimonials = [
  {
    initials: "KD",
    avatarGradient: "from-violet-600 to-violet-800",
    name: "Karim D.",
    transition: "Analyste data freelance → Société Générale CIB",
    city: "Paris",
    plan: "Basic",
    weeks: 4,
    sent: 18,
    interviews: 5,
    quote: "J'étais freelance depuis 3 ans et je voulais revenir en entreprise. Mon CV était bien sur le fond mais il passait pas les ATS — j'avais aucun retour. Avec JobBoost, j'ai compris ce qui manquait. J'ai eu 5 entretiens sur 18 envois. Avant j'en étais à zéro sur douze.",
    highlight: true,
  },
  {
    initials: "LC",
    avatarGradient: "from-rose-500 to-rose-700",
    name: "Léa C.",
    transition: "Chargée de com. → Content Strategist, scale-up tech",
    city: "Lyon",
    plan: "Premium",
    weeks: 6,
    sent: 22,
    interviews: 7,
    quote: "La lettre de motivation que l'IA génère, ça ressemble vraiment à ce que j'aurais écrit — mais en mieux, et surtout adapté à chaque boîte. Le recruteur qui m'a rappelée m'a dit que ma candidature était la plus personnalisée du lot.",
  },
  {
    initials: "MR",
    avatarGradient: "from-blue-500 to-blue-700",
    name: "Marc R.",
    transition: "Ingénieur mécanique → Chef de projet IT",
    city: "Toulouse",
    plan: "Lifetime",
    weeks: 8,
    sent: 31,
    interviews: 6,
    quote: "Reconversion difficile — j'avais les compétences mais pas le vocabulaire IT dans mon CV. L'IA a su reformuler mon expérience avec les bons mots. Ça m'a économisé des semaines de galère.",
  },
];

export default function Results() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="relative bg-zinc-950 py-24">
      <div className="container-wide mx-auto px-4 relative z-10">

        {/* Header */}
        <div data-reveal className="mb-14">
          <p className="text-xs text-emerald-400/60 uppercase tracking-[0.2em] font-semibold mb-4">Ce que ça donne en pratique</p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight max-w-xl">
            Des résultats mesurés.{" "}
            <span className="text-zinc-500 font-medium">Pas des promesses.</span>
          </h2>
          <p className="text-zinc-500 text-base mt-4 max-w-lg leading-relaxed">
            1 200+ candidats ont utilisé JobBoost ce mois. Voici ce qu&apos;ils ont obtenu.
          </p>
        </div>

        {/* Stats — with methodology note */}
        <div data-reveal data-delay="1" className="border border-white/[0.07] rounded-2xl overflow-hidden mb-16">
          <div className="px-6 py-3 border-b border-white/[0.06] bg-zinc-900/80 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Données utilisateurs — mis à jour ce mois</span>
            </div>
            <span className="text-xs text-zinc-700">Basé sur les utilisateurs actifs des 90 derniers jours</span>
          </div>
          <div className="divide-y divide-white/[0.05]">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-5 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors group">
                <div>
                  <div className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">{s.label}</div>
                  {s.sub && <div className="text-xs text-zinc-700 mt-0.5">{s.sub}</div>}
                </div>
                <div className="font-display font-black text-3xl md:text-4xl text-amber-400 tracking-tight">
                  <AnimatedStat raw={s.raw} prefix={s.prefix} suffix={s.suffix} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured testimonial — real story, specific details */}
        <div data-reveal data-delay="2" className="bg-zinc-900/50 border border-white/[0.07] rounded-2xl p-8 md:p-10 mb-4">

          {/* Transition banner */}
          <div className="flex flex-wrap items-center gap-2 mb-6 px-4 py-3 bg-zinc-800/50 rounded-xl border border-white/[0.05] text-xs">
            <span className="text-zinc-400">{featured.transition.split("→")[0].trim()}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="font-bold text-white">{featured.transition.split("→")[1].trim()}</span>
            <div className="flex items-center gap-2 ml-auto flex-wrap">
              <span className="bg-zinc-800 border border-zinc-700 text-zinc-400 px-2.5 py-1 rounded-full font-semibold">
                {featured.sent} envois
              </span>
              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">
                {featured.interviews} entretiens en {featured.weeks} semaines ✓
              </span>
            </div>
          </div>

          <div className="text-4xl text-zinc-700 font-serif leading-none mb-4 select-none">&ldquo;</div>
          <p className="text-white text-lg md:text-xl leading-relaxed mb-8 max-w-3xl font-medium">
            {featured.quote}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${featured.avatarGradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                {featured.initials}
              </div>
              <div>
                <div className="font-semibold text-white">{featured.name}</div>
                <div className="text-sm text-zinc-500">{featured.city} · Plan {featured.plan}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-sm">★★★★★</span>
            </div>
          </div>
        </div>

        {/* Other testimonials */}
        <div data-reveal data-delay="3" className="grid md:grid-cols-2 gap-4">
          {rest.map((t, i) => (
            <div key={i} className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-colors">
              <div className="flex items-start gap-3 mb-4 pb-4 border-b border-white/[0.05]">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarGradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md`}>
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1 flex-wrap">
                    <span className="truncate">{t.transition.split("→")[0].trim()}</span>
                    <span className="text-zinc-700">→</span>
                    <span className="text-emerald-400 font-semibold flex-shrink-0 truncate">{t.transition.split("→")[1].trim()}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className="text-amber-400 text-xs">★★★★★</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">
                    {t.sent} envois · {t.interviews} entretiens
                  </span>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>

        {/* Honest footnote */}
        <p data-reveal data-delay="4" className="text-center text-xs text-zinc-700 mt-6">
          Les résultats varient selon le secteur, le profil et le marché local. JobBoost AI améliore votre candidature — le reste dépend de vous.
        </p>
      </div>
    </section>
  );
}
