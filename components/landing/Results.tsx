const stats = [
  { value: "5 min", label: "Pour une candidature complète", sub: "vs 3h en moyenne sans IA" },
  { value: "3x", label: "Plus d'entretiens obtenus", sub: "par rapport à une candidature standard" },
  { value: "2 400+", label: "Candidats satisfaits", sub: "ont décroché un entretien ce mois-ci" },
  { value: "94%", label: "Taux de satisfaction", sub: "des utilisateurs recommandent JobBoost AI" },
];

const testimonials = [
  {
    name: "Marie T.",
    role: "Chef de projet — Paris",
    text: "J'ai envoyé 12 candidatures en une matinée. Avant ça me prenait une semaine. J'ai eu 4 retours positifs dès le lendemain.",
    emoji: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Thomas R.",
    role: "Développeur Full-Stack — Lyon",
    text: "Le CV généré a passé tous les filtres ATS. J'ai eu un entretien chez une boîte tech top 10 que je n'aurais jamais osé contacter avant.",
    emoji: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Sophie M.",
    role: "Chargée de communication — Bordeaux",
    text: "La lettre de motivation était tellement bien écrite que le recruteur m'a dit que c'était la meilleure qu'il avait lue cette année.",
    emoji: "⭐⭐⭐⭐⭐",
  },
];

export default function Results() {
  return (
    <section className="section bg-white">
      <div className="container-wide mx-auto">
        <div className="text-center mb-14">
          <span className="badge bg-green-50 text-green-600 border border-green-100 mb-4">Résultats</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Des résultats concrets,{" "}
            <span className="gradient-text">pas des promesses</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">
            Nos utilisateurs postuler à emploi rapidement et obtiennent plus d'entretiens. Les chiffres parlent d'eux-mêmes.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((s, i) => (
            <div key={i} className="text-center p-6 bg-gradient-to-b from-blue-50 to-white rounded-2xl border border-blue-100">
              <div className="text-4xl md:text-5xl font-black gradient-text mb-2">{s.value}</div>
              <div className="font-semibold text-gray-900 text-sm mb-1">{s.label}</div>
              <div className="text-xs text-gray-400">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card border-gray-100">
              <div className="text-lg mb-4">{t.emoji}</div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
