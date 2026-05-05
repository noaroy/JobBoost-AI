const stats = [
  { value: "3×", label: "Plus d'entretiens obtenus", sub: "vs candidature standard non optimisée" },
  { value: "5 min", label: "Par candidature complète", sub: "vs 3–4h en moyenne sans IA" },
  { value: "2 400+", label: "Candidats ont décroché un entretien ce mois-ci", sub: "" },
  { value: "94%", label: "Taux de satisfaction", sub: "des utilisateurs recommandent JobBoost AI" },
];

const testimonials = [
  {
    name: "Marie T.",
    role: "Chef de projet",
    city: "Paris",
    plan: "Premium",
    text: "J'ai envoyé 12 candidatures en une matinée. Avant ça me prenait une semaine. J'ai eu 4 retours positifs dès le lendemain.",
  },
  {
    name: "Thomas R.",
    role: "Développeur Full-Stack",
    city: "Lyon",
    plan: "Lifetime",
    text: "Le CV généré a passé tous les filtres ATS. J'ai eu un entretien chez une boîte tech top 10 que je n'aurais jamais osé contacter avant.",
  },
  {
    name: "Sophie M.",
    role: "Chargée de communication",
    city: "Bordeaux",
    plan: "Premium",
    text: "La lettre de motivation était tellement bien écrite que le recruteur m'a dit que c'était la meilleure qu'il avait lue cette année.",
  },
];

export default function Results() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="relative bg-slate-950 py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide mx-auto px-4 relative z-10">
        {/* Left-aligned header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-sm text-emerald-400 font-medium">Résultats prouvés</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight max-w-xl">
            Des résultats concrets,<br />pas des promesses
          </h2>
        </div>

        {/* Stats — data table layout */}
        <div className="border border-slate-800 rounded-2xl overflow-hidden mb-16">
          <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Statistiques utilisateurs</span>
            </div>
            <span className="text-xs text-slate-600">2 400+ candidats actifs</span>
          </div>
          <div className="divide-y divide-slate-800/60">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-5 bg-slate-900/40 hover:bg-slate-900/60 transition-colors group">
                <div>
                  <div className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{s.label}</div>
                  {s.sub && <div className="text-xs text-slate-600 mt-0.5">{s.sub}</div>}
                </div>
                <div className="font-display font-black text-3xl md:text-4xl text-orange-400 tabular-nums tracking-tight">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        {/* Featured */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 md:p-10 mb-4">
          <div className="text-5xl text-slate-600 font-serif leading-none mb-4 select-none">&ldquo;</div>
          <p className="text-white text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl font-medium">
            {featured.text}
          </p>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                {featured.name[0]}
              </div>
              <div>
                <div className="font-semibold text-white">{featured.name}</div>
                <div className="text-sm text-slate-500">{featured.role} · {featured.city}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-amber-400 text-sm">★★★★★</span>
              <span className="text-xs bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2.5 py-1 rounded-full font-semibold">
                {featured.plan}
              </span>
            </div>
          </div>
        </div>

        {/* Compact pair */}
        <div className="grid md:grid-cols-2 gap-4">
          {rest.map((t, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-amber-400 text-sm">★★★★★</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${
                  t.plan === "Lifetime"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : "bg-violet-500/10 text-violet-400 border-violet-500/20"
                }`}>{t.plan}</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <div className="w-8 h-8 rounded-full bg-orange-500/80 flex items-center justify-center text-white font-bold text-xs">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role} · {t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
