import { AlertTriangle, Clock, Brain, Frown } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "2 à 4 heures par candidature",
    desc: "Rédiger un CV adapté, une lettre personnalisée, chercher l'entreprise... C'est épuisant et chronophage.",
    color: "text-orange-500 bg-orange-50",
  },
  {
    icon: Brain,
    title: "Syndrome de la page blanche",
    desc: "Vous ne savez pas quoi écrire, comment vous vendre, quels mots utiliser pour attirer l'attention des recruteurs.",
    color: "text-red-500 bg-red-50",
  },
  {
    icon: AlertTriangle,
    title: "Votre CV passe à la corbeille",
    desc: "80% des CV sont filtrés par des logiciels ATS avant d'atteindre un humain. Sans optimisation, aucune chance.",
    color: "text-amber-500 bg-amber-50",
  },
  {
    icon: Frown,
    title: "Lettres génériques qui ne convainquent pas",
    desc: "Envoyer la même lettre à toutes les entreprises, ça ne marche pas. Chaque recruteur le sent immédiatement.",
    color: "text-pink-500 bg-pink-50",
  },
];

export default function Problem() {
  return (
    <section className="section bg-gray-950 text-white">
      <div className="container-wide mx-auto">
        <div className="text-center mb-14">
          <span className="badge bg-red-500/10 text-red-400 mb-4">Le problème</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trouver un emploi est devenu{" "}
            <span className="text-red-400">épuisant</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Vous passez des heures sur chaque candidature pour un résultat souvent décevant. Il y a une solution plus intelligente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {problems.map((p, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${p.color}`}>
                <p.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-800/50 rounded-2xl p-8 text-center">
          <p className="text-2xl font-bold text-white mb-2">
            Résultat : <span className="text-red-400">3 mois de recherche</span> pour un emploi moyen
          </p>
          <p className="text-gray-300 text-lg">
            Alors que les candidats qui utilisent JobBoost AI trouvent <strong className="text-white">2x plus vite</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
