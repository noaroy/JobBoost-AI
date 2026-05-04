import { CheckCircle, Zap } from "lucide-react";

const features = [
  {
    emoji: "📄",
    title: "CV optimisé ATS",
    desc: "Votre CV adapté au poste visé, avec les bons mots-clés pour passer les filtres automatiques.",
  },
  {
    emoji: "✉️",
    title: "Lettre de motivation automatique",
    desc: "Une lettre personnalisée pour chaque entreprise, percutante dès la première phrase.",
  },
  {
    emoji: "🎯",
    title: "Adaptation à l'offre",
    desc: "L'IA analyse l'offre et adapte votre candidature exactement à ce que cherche le recruteur.",
  },
  {
    emoji: "🎤",
    title: "Préparation entretien",
    desc: "Questions clés, réponses modèles en méthode STAR, conseils pour briller le jour J.",
  },
  {
    emoji: "🏢",
    title: "Suggestions d'entreprises",
    desc: "Trouvez les meilleures entreprises qui correspondent à votre profil et vos ambitions.",
  },
  {
    emoji: "✅",
    title: "Checklist de recherche",
    desc: "Un plan d'action structuré pour trouver votre prochain emploi en 30 jours.",
  },
];

export default function Solution() {
  return (
    <section className="section bg-white">
      <div className="container-wide mx-auto">
        <div className="text-center mb-14">
          <span className="badge bg-blue-50 text-blue-600 border border-blue-100 mb-4">La solution</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            JobBoost AI fait le travail.{" "}
            <span className="gradient-text">Vous décrochez le job.</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            En moins de 5 minutes, l'IA génère tout ce dont vous avez besoin pour postuler de manière professionnelle à n'importe quel emploi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {features.map((f, i) => (
            <div key={i} className="card hover:shadow-md hover:-translate-y-1 transition-all duration-200 group">
              <div className="text-3xl mb-4">{f.emoji}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2 flex items-center gap-2">
                {f.title}
                <CheckCircle className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-yellow-300" />
            <span className="text-yellow-300 font-semibold text-lg">L'avantage JobBoost AI</span>
          </div>
          <p className="text-3xl md:text-4xl font-black mb-4">
            Ce qui prenait 3 heures<br />prend maintenant <span className="text-yellow-300">5 minutes</span>
          </p>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Postulez à 10 fois plus d'offres avec 10 fois moins d'efforts. C'est mathématique.
          </p>
        </div>
      </div>
    </section>
  );
}
