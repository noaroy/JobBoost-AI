import Link from "next/link";
import { BookOpen, Mic, CheckSquare } from "lucide-react";

const bonuses = [
  {
    icon: BookOpen,
    title: "50 Templates de Lettres",
    value: "49€",
    desc: "50 lettres rédigées par des experts RH pour tous les secteurs : tech, commerce, santé, finance, créatif...",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: Mic,
    title: "20 Réponses d'Entretien",
    value: "39€",
    desc: "Les 20 questions les plus posées en entretien avec des réponses modèles percutantes (méthode STAR).",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: CheckSquare,
    title: "Checklist 30 Jours",
    value: "19€",
    desc: "Un plan d'action quotidien pour trouver un emploi en 30 jours. Quoi faire chaque matin pour maximiser vos chances.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
];

export default function Bonuses() {
  return (
    <section className="relative bg-slate-900/40 py-24 border-y border-slate-800/50">
      <div className="container-wide mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-amber-400 text-sm">🎁</span>
            <span className="text-sm text-amber-400 font-medium">Bonus exclusifs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            107€ de ressources offerts<br />
            <span className="text-amber-400">avec votre accès</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-xl mx-auto">
            En plus de l&apos;IA, ces ressources sont disponibles immédiatement dans votre dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10 max-w-4xl mx-auto">
          {bonuses.map((b, i) => (
            <div key={i} className={`relative bg-slate-900 border ${b.bg} rounded-2xl p-6 overflow-hidden`}>
              <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-black px-2 py-0.5 rounded-md">
                OFFERT
              </div>
              <div className={`w-10 h-10 rounded-xl ${b.bg} border flex items-center justify-center mb-4`}>
                <b.icon className={`w-5 h-5 ${b.color}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{b.title}</h3>
              <p className="text-xs text-amber-400 font-semibold mb-3">Valeur : {b.value} — Inclus gratuitement</p>
              <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-950/40 to-amber-900/20 border border-amber-900/40 rounded-2xl p-6 text-center">
          <p className="text-xl font-bold text-white mb-2">
            Valeur totale des bonus :{" "}
            <span className="line-through text-slate-500">107€</span>{" "}
            <span className="text-amber-400">→ 0€ inclus avec votre accès</span>
          </p>
          <p className="text-slate-400 text-sm mb-4">
            Disponibles immédiatement dans votre dashboard dès la création du compte.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
            Accéder aux bonus gratuitement →
          </Link>
        </div>
      </div>
    </section>
  );
}
