import { Target, MessageSquare, Zap } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Ciblage précis de l'offre",
    desc: "L'IA analyse chaque mot de l'annonce et adapte votre candidature avec exactement le vocabulaire que cherche le recruteur. Résultat : vous semblez avoir été fait pour ce poste.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: MessageSquare,
    title: "Message clair et percutant",
    desc: "Fini les candidatures floues. Chaque phrase a un but précis : capter l'attention, démontrer la valeur, provoquer un appel. Structure éprouvée sur des milliers de candidatures réussies.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Zap,
    title: "Optimisation ATS intelligente",
    desc: "80% des CV sont rejetés avant d'être lus par un humain. Notre IA intègre automatiquement les mots-clés critiques pour passer les filtres et atterrir sur le bureau du recruteur.",
    color: "bg-violet-50 text-violet-600",
  },
];

export default function WhyItWorks() {
  return (
    <section className="section bg-gray-950 text-white">
      <div className="container-wide mx-auto">
        <div className="text-center mb-14">
          <span className="badge bg-blue-500/10 text-blue-400 mb-4">Pourquoi ça marche</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            L'IA qui comprend{" "}
            <span className="text-blue-400">ce que veulent les recruteurs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            JobBoost AI ne copie pas un template. Il analyse votre profil, l'offre, et l'entreprise pour créer une candidature sur-mesure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {reasons.map((r, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-colors">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${r.color}`}>
                <r.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{r.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="text-lg font-bold text-red-400 mb-3">❌ Sans JobBoost AI</div>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• 2-4h par candidature</li>
              <li>• CV générique refusé par les ATS</li>
              <li>• Lettre identique pour toutes les offres</li>
              <li>• 2-3 candidatures max par semaine</li>
              <li>• 3 mois de recherche en moyenne</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-2xl p-6 border border-blue-700/50">
            <div className="text-lg font-bold text-green-400 mb-3">✅ Avec JobBoost AI</div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• 5 minutes par candidature complète</li>
              <li>• CV optimisé ATS pour chaque poste</li>
              <li>• Lettre 100% personnalisée à chaque offre</li>
              <li>• 10-20 candidatures par jour si besoin</li>
              <li>• Entretien décroché en quelques semaines</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
