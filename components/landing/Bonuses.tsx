const bonuses = [
  {
    emoji: "📚",
    title: "50 Templates de Lettres",
    value: "Valeur : 49€",
    desc: "50 lettres de motivation rédigées par des experts RH pour tous les secteurs : tech, commerce, santé, finance, créatif...",
    tag: "OFFERT",
  },
  {
    emoji: "🎤",
    title: "20 Réponses d'Entretien",
    value: "Valeur : 39€",
    desc: "Les 20 questions les plus posées en entretien avec des réponses modèles percutantes rédigées avec la méthode STAR.",
    tag: "OFFERT",
  },
  {
    emoji: "✅",
    title: "Checklist Job en 30 jours",
    value: "Valeur : 19€",
    desc: "Un plan d'action quotidien pour trouver un emploi en 30 jours. Quoi faire chaque matin pour maximiser vos chances.",
    tag: "OFFERT",
  },
];

export default function Bonuses() {
  return (
    <section className="section bg-gradient-to-b from-amber-50 to-white">
      <div className="container-wide mx-auto">
        <div className="text-center mb-14">
          <span className="badge bg-amber-100 text-amber-700 border border-amber-200 mb-4">🎁 Bonus exclusifs</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Inclus gratuitement{" "}
            <span className="text-amber-500">avec votre accès</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">
            En plus de l'IA, vous obtenez ces ressources immédiatement — une valeur totale de <strong>107€ offerts</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {bonuses.map((b, i) => (
            <div key={i} className="bg-white rounded-2xl border-2 border-amber-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-black px-2 py-1 rounded-md">
                {b.tag}
              </div>
              <div className="text-4xl mb-4">{b.emoji}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{b.title}</h3>
              <p className="text-xs text-amber-600 font-semibold mb-3">{b.value} — Inclus gratuitement</p>
              <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-500 rounded-2xl p-6 text-center text-white">
          <p className="text-2xl font-black mb-1">
            Valeur totale des bonus : <span className="line-through opacity-60">107€</span>{" "}
            <span className="text-amber-100">→ 0€ inclus avec votre accès</span>
          </p>
          <p className="text-amber-100 text-sm">
            Ces ressources sont disponibles dans votre dashboard dès la création de votre compte.
          </p>
        </div>
      </div>
    </section>
  );
}
