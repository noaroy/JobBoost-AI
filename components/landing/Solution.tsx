import { Zap, Brain, Target, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: Zap,
    title: "Automatisation totale",
    desc: "CV, lettre, relance, score — tout est généré en secondes. Zéro page blanche, zéro perte de temps.",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
  },
  {
    icon: Brain,
    title: "IA contextuelle",
    desc: "Chaque candidature est adaptée au poste exact. L'IA lit l'annonce et personnalise tout pour maximiser votre impact.",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
  {
    icon: Target,
    title: "Optimisation ATS",
    desc: "Vos CV passent les filtres automatiques grâce aux bons mots-clés et à la bonne structure. Plus jamais de corbeille.",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: TrendingUp,
    title: "Suivi intelligent",
    desc: "Dashboard complet, score de candidature, relances automatiques. Vous savez exactement où vous en êtes.",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
];

export default function Solution() {
  return (
    <section className="relative bg-slate-950 py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            <span className="text-sm text-orange-400 font-medium">La solution</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Votre assistant IA pour<br />
            <span className="text-orange-400">
              chaque étape de la candidature
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            JobBoost AI automatise tout ce qui est répétitif pour que vous puissiez vous concentrer sur ce qui compte vraiment : décrocher l&apos;entretien.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {pillars.map((p, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:-translate-y-1 hover:border-slate-700 transition-all">
              <div className={`w-12 h-12 rounded-xl ${p.iconBg} flex items-center justify-center mb-4`}>
                <p.icon className={`w-6 h-6 ${p.iconColor}`} />
              </div>
              <h3 className="font-bold text-white mb-2">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7">
            <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-red-400" /> Avant JobBoost AI
            </div>
            {[
              "4h par candidature, épuisement",
              "CV générique rejeté par les ATS",
              "Lettre copiée-collée sans impact",
              "0 feedback, 0 suivi structuré",
              "3 mois de galère en moyenne",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-slate-800/60 last:border-0">
                <span className="text-red-500 font-bold">✕</span>
                <span className="text-slate-400 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-900/80 border border-emerald-500/20 rounded-2xl p-7">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-emerald-400" /> Avec JobBoost AI
            </div>
            {[
              "5 min par candidature automatisée",
              "CV ATS-ready, mots-clés inclus",
              "Lettre personnalisée par offre",
              "Score /100, dashboard, relances auto",
              "Entretien décroché en quelques semaines",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-slate-800/60 last:border-0">
                <span className="text-emerald-400 font-bold">✓</span>
                <span className="text-white text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
