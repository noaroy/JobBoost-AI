import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    emoji: "📝",
    title: "Décrivez votre profil et l'offre",
    desc: "Collez l'annonce, décrivez votre expérience en quelques lignes. Pas besoin d'un CV parfait — l'IA s'occupe du reste.",
    detail: "2 minutes max",
    color: "from-blue-500 to-blue-600",
  },
  {
    number: "02",
    emoji: "⚡",
    title: "L'IA génère votre candidature",
    desc: "En moins de 3 minutes, vous recevez un CV ATS-ready, une lettre percutante et une préparation entretien complète.",
    detail: "< 3 minutes",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    number: "03",
    emoji: "🚀",
    title: "Postulez et décrochez l'entretien",
    desc: "Copiez, personnalisez si besoin, et envoyez. Répétez pour 10 offres en une seule session.",
    detail: "Résultat immédiat",
    color: "from-violet-500 to-violet-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-gray-50">
      <div className="container-wide mx-auto">
        <div className="text-center mb-14">
          <span className="badge bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4">Comment ça marche</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            3 étapes. <span className="gradient-text">5 minutes.</span> 1 candidature pro.
          </h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">
            Aucune compétence technique requise. Si vous pouvez copier-coller une annonce, vous pouvez utiliser JobBoost AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-10 translate-x-0" />
              )}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg`}>
                  {step.emoji}
                </div>
                <div className="text-5xl font-black text-gray-100 mb-3">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.desc}</p>
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-100">
                  ⏱ {step.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/signup" className="btn-primary btn-large">
            Démarrer maintenant — C'est gratuit
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-gray-400 mt-3">Aucune carte bancaire requise</p>
        </div>
      </div>
    </section>
  );
}
