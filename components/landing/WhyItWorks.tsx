import { FileText, Mail, Mic, BarChart2, Send, Map, Bot, Bell } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Générateur de CV",
    desc: "CV optimisé ATS en 30 secondes. Mots-clés intégrés, structure parfaite, adapté à chaque offre.",
    badge: "Gratuit",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    icon: Mail,
    title: "Lettre de motivation",
    desc: "Chaque lettre est unique, personnalisée pour l'entreprise et le poste. Ton professionnel et humain.",
    badge: "Gratuit",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    icon: Mic,
    title: "Simulation d'entretien",
    desc: "Entraînez-vous avec l'IA qui joue le recruteur. Questions STAR, feedback en temps réel, score.",
    badge: "Basic+",
    badgeColor: "bg-slate-700/60 text-slate-300 border-slate-700",
  },
  {
    icon: BarChart2,
    title: "Score de candidature",
    desc: "Recevez une note /100 avec des recommandations concrètes pour améliorer votre dossier.",
    badge: "Basic+",
    badgeColor: "bg-slate-700/60 text-slate-300 border-slate-700",
  },
  {
    icon: Send,
    title: "Relance automatique",
    desc: "L'IA rédige vos emails de relance au bon moment avec le bon ton. Plus jamais d'opportunité perdue.",
    badge: "Premium",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
  {
    icon: Bot,
    title: "Auto-Apply en lot",
    desc: "Générez des candidatures complètes pour 5 offres d'un coup. Postulez à 50 offres par semaine.",
    badge: "Premium",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
  {
    icon: Map,
    title: "Plan d'action quotidien",
    desc: "Votre coach IA analyse vos stats et vous donne un plan précis pour cette semaine.",
    badge: "Premium",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
  {
    icon: Bell,
    title: "Dashboard intelligent",
    desc: "Taux de réponse, score moyen, relances à faire — tout votre pipeline de candidature en un coup d'œil.",
    badge: "Premium",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
];

export default function WhyItWorks() {
  return (
    <section id="features" className="relative bg-slate-950 py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            <span className="text-sm text-orange-400 font-medium">Fonctionnalités</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Tout ce dont vous avez besoin<br />
            <span className="text-orange-400">pour décrocher votre prochain poste</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Une plateforme complète — du CV à l&apos;entretien décroché, en passant par les relances et le suivi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {features.map((f, i) => (
            <div key={i} className="group bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 hover:bg-slate-900 transition-all hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-slate-300" />
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${f.badgeColor}`}>
                  {f.badge}
                </span>
              </div>
              <h3 className="font-bold text-white mb-2 text-sm">{f.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-slate-500 text-sm">
            <span className="text-emerald-400">✓ Gratuit</span> pour commencer ·{" "}
            <span className="text-slate-300">Basic</span> à 29,99€/mois ·{" "}
            <span className="text-violet-400">Premium</span> à 39,99€/mois ·{" "}
            <span className="text-amber-400">Lifetime</span> à 99,99€
          </p>
        </div>
      </div>
    </section>
  );
}
