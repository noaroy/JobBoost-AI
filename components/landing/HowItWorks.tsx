import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Décrivez votre profil et l'offre",
    desc: "Collez l'annonce, décrivez votre expérience en quelques lignes. 2 minutes max — l'IA s'occupe du reste.",
    detail: "2 min",
    color: "from-orange-600 to-orange-500",
    glow: "shadow-orange-500/30",
  },
  {
    number: "02",
    title: "L'IA génère votre candidature",
    desc: "En moins de 30 secondes : CV ATS-ready, lettre percutante, score /100, préparation entretien complète.",
    detail: "< 30 sec",
    color: "from-amber-600 to-amber-500",
    glow: "shadow-amber-500/30",
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
        <div className="grid lg:grid-cols-[1fr,auto] gap-16 items-start">

          {/* Left: steps */}
          <div>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-white/60" />
                <span className="text-sm text-slate-300 font-medium">Comment ça marche</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                3 étapes.{" "}
                <span className="text-orange-400">5 minutes.</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-lg">
                Aucune compétence technique requise. Si vous pouvez copier-coller une annonce, vous pouvez utiliser JobBoost AI.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {steps.map((step, i) => (
                <div key={i} className="relative flex gap-7 pb-12 last:pb-0">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-7 top-14 bottom-0 w-px bg-slate-800" />
                  )}

                  {/* Step icon */}
                  <div className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg ${step.glow} flex items-center justify-center text-white font-black text-lg flex-shrink-0`}>
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="pt-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{step.title}</h3>
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-0.5 rounded-full font-semibold whitespace-nowrap">
                        ⏱ {step.detail}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <Link href="/signup" className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold text-base px-7 py-3.5 rounded-xl hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/25 hover:-translate-y-0.5">
                Démarrer gratuitement
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-sm text-slate-500 mt-3 sm:mt-0 sm:self-center">Aucune carte bancaire requise</p>
            </div>
          </div>

          {/* Right: compact proof block */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-24">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-5">Ce que vous obtenez</div>
              <ul className="space-y-3">
                {[
                  { label: "CV optimisé ATS", badge: "Gratuit" },
                  { label: "Lettre de motivation", badge: "Gratuit" },
                  { label: "Score /100 détaillé", badge: "Basic+" },
                  { label: "Simulation entretien IA", badge: "Basic+" },
                  { label: "Relances automatiques", badge: "Premium" },
                  { label: "Auto-Apply en lot (×5)", badge: "Premium" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 text-xs">✓</span>
                      <span className="text-sm text-slate-300">{item.label}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-md font-semibold flex-shrink-0 ${
                      item.badge === "Gratuit"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : item.badge === "Premium"
                        ? "bg-violet-500/10 text-violet-400"
                        : "bg-slate-700/60 text-slate-400"
                    }`}>
                      {item.badge}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-slate-800 text-center">
                <div className="text-2xl font-black text-white mb-0.5">5 min</div>
                <div className="text-xs text-slate-500">pour votre première candidature</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
