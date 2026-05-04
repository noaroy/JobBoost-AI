import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const weeks = [
  {
    week: "Semaine 1",
    title: "Préparation & fondations",
    color: "bg-blue-50 border-blue-200",
    headingColor: "text-blue-700",
    tasks: [
      { day: "Lun", task: "Définir clairement votre poste cible et secteur", done: false },
      { day: "Lun", task: "Générer votre CV optimisé avec JobBoost AI", done: false },
      { day: "Mar", task: "Optimiser votre profil LinkedIn (photo pro, titre, résumé)", done: false },
      { day: "Mar", task: "Créer une liste de 20 entreprises cibles", done: false },
      { day: "Mer", task: "Préparer 5 versions de votre CV (secteurs différents)", done: false },
      { day: "Mer", task: "Générer 3 modèles de lettres de motivation avec l'IA", done: false },
      { day: "Jeu", task: "S'inscrire sur Indeed, LinkedIn, Welcome to the Jungle, Apec", done: false },
      { day: "Jeu", task: "Activer les alertes emploi sur les plateformes", done: false },
      { day: "Ven", task: "Contacter 5 personnes de votre réseau par message LinkedIn", done: false },
      { day: "Ven", task: "Bilan de la semaine : qu'est-ce qui peut être amélioré ?", done: false },
    ],
  },
  {
    week: "Semaine 2",
    title: "Lancement & candidatures",
    color: "bg-indigo-50 border-indigo-200",
    headingColor: "text-indigo-700",
    tasks: [
      { day: "Lun", task: "Postuler à 5 offres avec des candidatures personnalisées via l'IA", done: false },
      { day: "Lun", task: "Suivre chaque candidature dans un tableur (date, statut, contact)", done: false },
      { day: "Mar", task: "Rejoindre 3 groupes LinkedIn de votre secteur", done: false },
      { day: "Mar", task: "Faire une demande de connexion à 10 recruteurs du secteur", done: false },
      { day: "Mer", task: "Postuler à 5 nouvelles offres", done: false },
      { day: "Mer", task: "Relancer les candidatures de la semaine 1 (pas de réponse)", done: false },
      { day: "Jeu", task: "Publier un post LinkedIn sur votre expertise ou recherche", done: false },
      { day: "Jeu", task: "Demander des recommandations à 2 anciens collègues/managers", done: false },
      { day: "Ven", task: "Candidatures spontanées à 3 entreprises de votre liste cible", done: false },
      { day: "Ven", task: "Préparer votre pitch de 60 secondes", done: false },
    ],
  },
  {
    week: "Semaine 3",
    title: "Relances & réseautage",
    color: "bg-violet-50 border-violet-200",
    headingColor: "text-violet-700",
    tasks: [
      { day: "Lun", task: "Relancer toutes les candidatures sans réponse (email de suivi)", done: false },
      { day: "Lun", task: "Postuler à 5 nouvelles offres", done: false },
      { day: "Mar", task: "Contacter un chasseur de tête de votre secteur via LinkedIn", done: false },
      { day: "Mar", task: "Demander 2 informational interviews à des pros du secteur", done: false },
      { day: "Mer", task: "Participer à un événement networking ou webinaire du secteur", done: false },
      { day: "Mer", task: "Vérifier et mettre à jour votre profil GitHub/portfolio si pertinent", done: false },
      { day: "Jeu", task: "5 nouvelles candidatures avec lettres personnalisées IA", done: false },
      { day: "Jeu", task: "Préparer vos réponses aux 5 questions clés d'entretien", done: false },
      { day: "Ven", task: "Bilan des 3 semaines : taux de réponse, ajustements", done: false },
      { day: "Ven", task: "Ajuster votre CV/lettre si le taux de réponse est < 10%", done: false },
    ],
  },
  {
    week: "Semaine 4",
    title: "Entretiens & closing",
    color: "bg-emerald-50 border-emerald-200",
    headingColor: "text-emerald-700",
    tasks: [
      { day: "Lun", task: "Préparer chaque entretien avec le générateur IA de JobBoost", done: false },
      { day: "Lun", task: "Rechercher les actualités récentes de chaque entreprise", done: false },
      { day: "Mar", task: "Faire un entretien blanc avec un proche ou via vidéo", done: false },
      { day: "Mar", task: "Préparer 5 questions intelligentes à poser aux recruteurs", done: false },
      { day: "Mer", task: "Envoyer un email de remerciement après chaque entretien (24h)", done: false },
      { day: "Mer", task: "Continuer de postuler même avec des entretiens en cours", done: false },
      { day: "Jeu", task: "Négocier les offres reçues (salaire, avantages, télétravail)", done: false },
      { day: "Jeu", task: "Comparer les offres sur une grille critères pondérés", done: false },
      { day: "Ven", task: "Prendre votre décision finale en vous basant sur vos critères", done: false },
      { day: "Ven", task: "🎉 Félicitations — Signez votre contrat !", done: false },
    ],
  },
];

const tips = [
  { emoji: "🎯", tip: "Qualité > Quantité. 5 candidatures personnalisées valent mieux que 50 génériques." },
  { emoji: "⏰", tip: "Postulez dans les 48h après publication d'une offre. Les recruteurs lisent d'abord les premières candidatures." },
  { emoji: "📊", tip: "Si votre taux de réponse est < 10%, revoyez votre CV/lettre avec JobBoost AI." },
  { emoji: "🔗", tip: "50% des emplois sont pourvus par le réseau. Investissez dans LinkedIn tous les jours." },
  { emoji: "📧", tip: "Relancez systématiquement après 7 jours sans réponse. Les recruteurs apprécient la persévérance." },
  { emoji: "🧠", tip: "Préparez chaque entretien individuellement. Un candidat préparé a 3x plus de chances." },
];

export default function ChecklistPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container-wide mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <div className="w-px h-4 bg-gray-200" />
          <h1 className="font-semibold text-gray-900">Checklist — Trouver un emploi en 30 jours</h1>
        </div>
      </header>

      <main className="container-wide mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Plan d'action 30 jours</h2>
          <p className="text-gray-500 max-w-2xl">
            Suivez ce plan rigoureusement. Chaque tâche a été validée par des coaches emploi et des centaines de candidats qui ont trouvé un emploi en moins d'un mois.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {weeks.map((week, i) => (
            <div key={i} className={`rounded-2xl border-2 p-6 ${week.color}`}>
              <div className={`font-black text-sm uppercase tracking-wide mb-1 ${week.headingColor}`}>{week.week}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-4">{week.title}</h3>
              <ul className="space-y-2">
                {week.tasks.map((task, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded border-2 border-gray-300 bg-white flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-gray-400 mr-2">{task.day}</span>
                      <span className="text-gray-700">{task.task}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h3 className="font-bold text-gray-900 text-lg mb-4">💡 Conseils des experts pour maximiser vos chances</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {tips.map((t, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-xl flex-shrink-0">{t.emoji}</span>
                <p className="text-gray-600">{t.tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-600 rounded-2xl p-6 text-white text-center">
          <p className="font-bold text-lg mb-2">Générez toutes vos candidatures avec l'IA</p>
          <p className="text-blue-100 text-sm mb-4">CV + lettre + préparation entretien en 5 minutes par offre</p>
          <Link href="/generate/cv" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            Commencer maintenant →
          </Link>
        </div>
      </main>
    </div>
  );
}
