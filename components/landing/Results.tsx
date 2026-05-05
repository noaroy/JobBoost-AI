const stats = [
  { value: "5 min", label: "Pour une candidature complète", sub: "vs 3–4h en moyenne sans IA" },
  { value: "3×", label: "Plus d'entretiens obtenus", sub: "par rapport à une candidature standard" },
  { value: "2 400+", label: "Candidats satisfaits", sub: "ont décroché un entretien ce mois-ci" },
  { value: "94%", label: "Taux de satisfaction", sub: "des utilisateurs recommandent JobBoost AI" },
];

const testimonials = [
  {
    name: "Marie T.",
    role: "Chef de projet — Paris",
    text: "J'ai envoyé 12 candidatures en une matinée. Avant ça me prenait une semaine. J'ai eu 4 retours positifs dès le lendemain.",
    plan: "Premium",
  },
  {
    name: "Thomas R.",
    role: "Développeur Full-Stack — Lyon",
    text: "Le CV généré a passé tous les filtres ATS. J'ai eu un entretien chez une boîte tech top 10 que je n'aurais jamais osé contacter avant.",
    plan: "Lifetime",
  },
  {
    name: "Sophie M.",
    role: "Chargée de communication — Bordeaux",
    text: "La lettre de motivation était tellement bien écrite que le recruteur m'a dit que c'était la meilleure qu'il avait lue cette année.",
    plan: "Premium",
  },
];

export default function Results() {
  return (
    <section className="relative bg-slate-950 py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-sm text-emerald-400 font-medium">Résultats prouvés</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Des résultats concrets,<br />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              pas des promesses
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-xl mx-auto">
            Nos utilisateurs postuler à emploi rapidement et obtiennent plus d&apos;entretiens. Les chiffres parlent d&apos;eux-mêmes.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {stats.map((s, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center hover:border-slate-700 transition-colors">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-2">{s.value}</div>
              <div className="font-semibold text-white text-sm mb-1">{s.label}</div>
              <div className="text-xs text-slate-500">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
              <div className="text-amber-400 text-sm mb-4">★★★★★</div>
              <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
                <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-full">
                  {t.plan}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
