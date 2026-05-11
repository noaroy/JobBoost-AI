import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Décrivez votre profil et l'offre",
    desc: "Collez l'annonce, décrivez votre expérience en quelques lignes. 2 minutes max — l'IA s'occupe du reste.",
    detail: "2 min",
    color: "from-blue-600 to-blue-500",
    glow: "shadow-blue-500/30",
  },
  {
    number: "02",
    title: "L'IA génère votre candidature",
    desc: "En moins de 30 secondes : CV ATS-ready, lettre percutante, score /100, préparation entretien complète.",
    detail: "< 30 sec",
    color: "from-violet-600 to-violet-500",
    glow: "shadow-violet-500/30",
  },
  {
    number: "03",
    title: "Postulez et décrochez l'entretien",
    desc: "Copiez, personnalisez si besoin, et envoyez. Le dashboard suit vos relances automatiquement.",
    detail: "Résultat immédiat",
    color: "from-emerald-600 to-emerald-500",
    glow: "shadow-emerald-500/30",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-slate-900/50 py-24 border-y border-slate-800/50">
      <div className="container-wide mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-white/60" />
            <span className="text-sm text-slate-300 font-medium">Comment ça marche</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            3 étapes.{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              5 minutes.
            </span>{" "}
            1 candidature pro.
          </h2>
          <p className="text-xl text-slate-400 max-w-xl mx-auto">
            Aucune compétence technique requise. Si vous pouvez copier-coller une annonce, vous pouvez utiliser JobBoost AI.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-gradient-to-r from-blue-500/30 via-violet-500/30 to-emerald-500/30" />

          {steps.map((step, i) => (
            <div key={i} className="relative bg-slate-900 border border-slate-800 rounded-2xl p-7 text-center hover:border-slate-700 transition-colors">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg ${step.glow} flex items-center justify-center mx-auto mb-5 text-white font-black text-xl`}>
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{step.desc}</p>
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/20">
                ⏱ {step.detail}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/signup" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-lg px-8 py-4 rounded-2xl hover:from-blue-500 hover:to-violet-500 transition-all shadow-xl shadow-blue-500/30 hover:-translate-y-0.5">
            Démarrer gratuitement
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-slate-500 mt-3">Aucune carte bancaire requise</p>
        </div>
      </div>
    </section>
  );
}
