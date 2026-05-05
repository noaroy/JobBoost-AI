import { Clock, TrendingDown, Filter, Repeat } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "2 à 4 heures par candidature",
    desc: "Adapter le CV, rédiger la lettre, rechercher l'entreprise… Un processus épuisant qui décourage les meilleurs candidats.",
    stat: "4h",
    statLabel: "perdues par candidature",
  },
  {
    icon: Filter,
    title: "80% des CV filtrés automatiquement",
    desc: "Les logiciels ATS rejettent la majorité des candidatures avant qu'un humain les lise. Sans optimisation, aucune chance.",
    stat: "80%",
    statLabel: "de CV jamais lus",
  },
  {
    icon: TrendingDown,
    title: "Taux de réponse en chute libre",
    desc: "Les lettres génériques ne convainquent plus. Les recruteurs reçoivent des centaines de candidatures identiques.",
    stat: "8%",
    statLabel: "taux de réponse moyen",
  },
  {
    icon: Repeat,
    title: "Un cycle décourageant sans fin",
    desc: "Postuler, attendre, relancer, essuyer des refus… sans retour constructif pour s'améliorer. La recherche dure des mois.",
    stat: "3 mois",
    statLabel: "durée moyenne de recherche",
  },
];

export default function Problem() {
  return (
    <section className="relative bg-slate-950 py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-red-500/30" />
      </div>

      <div className="container-wide mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-sm text-red-400 font-medium">Le problème</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            La recherche d'emploi est<br />
            <span className="text-red-400">brisée par défaut</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Le marché du travail est compétitif, mais le vrai problème, c'est le temps et l'énergie gaspillés sur des tâches répétitives qui pourraient être automatisées.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-14">
          {problems.map((p, i) => (
            <div key={i} className="group bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-red-500/30 hover:bg-slate-900 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-3">
                <span className="text-2xl font-black text-red-400">{p.stat}</span>
                <span className="text-xs text-slate-500">{p.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-gradient-to-r from-red-950/40 to-orange-950/30 border border-red-900/40 rounded-2xl p-8 text-center">
          <p className="text-2xl font-bold text-white mb-2">
            Résultat : <span className="text-red-400">3 mois en moyenne</span> pour trouver un emploi
          </p>
          <p className="text-slate-400 text-lg">
            Alors que les candidats qui automatisent leur recherche avec JobBoost AI trouvent{" "}
            <strong className="text-white">3x plus vite</strong>, avec 3x plus d'entretiens.
          </p>
        </div>
      </div>
    </section>
  );
}
