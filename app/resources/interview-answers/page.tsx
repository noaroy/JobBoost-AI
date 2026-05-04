import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const answers = [
  {
    question: "Parlez-moi de vous",
    tip: "Méthode : Passé → Présent → Futur (90 secondes max)",
    answer: "Après [X années] dans [domaine], où j'ai développé des compétences en [compétences clés], je me suis spécialisé dans [spécialité]. Aujourd'hui je cherche à [objectif] dans une entreprise comme [type d'entreprise] pour contribuer à [impact]. Ce poste m'intéresse particulièrement car [raison spécifique].",
  },
  {
    question: "Pourquoi cette entreprise ?",
    tip: "Montrez que vous avez fait vos recherches",
    answer: "J'ai suivi votre développement sur [sujet] et j'ai été impressionné par [réalisation concrète]. Ce qui me motive vraiment, c'est votre approche de [valeur/mission]. J'aimerais contribuer à [projet/objectif] avec mes compétences en [compétence].",
  },
  {
    question: "Quelles sont vos forces ?",
    tip: "3 forces max, chacune avec un exemple concret (méthode STAR)",
    answer: "Ma force principale est [force 1] : dans mon précédent poste, j'ai [situation] → j'ai [action] → résultat : [résultat chiffré]. Je suis aussi [force 2] et [force 3], que j'applique quotidiennement dans [contexte].",
  },
  {
    question: "Quelles sont vos faiblesses ?",
    tip: "Choisissez une vraie faiblesse + montrez que vous travaillez dessus",
    answer: "J'ai tendance à [faiblesse réelle mais non bloquante]. J'en ai pris conscience et j'ai mis en place [action concrète : formation, méthode, outil]. Aujourd'hui c'est encore un point de vigilance, mais j'ai vu des progrès concrets dans [exemple].",
  },
  {
    question: "Où vous voyez-vous dans 5 ans ?",
    tip: "Montrez ambition + alignement avec l'entreprise",
    answer: "Dans 5 ans, j'aimerais avoir évolué vers [rôle] avec des responsabilités en [domaine]. Je vois cette progression comme naturelle dans une entreprise comme la vôtre où [opportunité d'évolution]. Mon objectif est d'apporter de la valeur sur [projet/domaine] d'abord.",
  },
  {
    question: "Décrivez une situation difficile que vous avez gérée",
    tip: "Utilisez STAR : Situation, Tâche, Action, Résultat",
    answer: "Situation : [contexte difficile précis]. Tâche : j'étais responsable de [mission]. Action : j'ai d'abord [étape 1], puis [étape 2], en [collaboration/méthode]. Résultat : [résultat concret + leçon apprise].",
  },
  {
    question: "Pourquoi quittez-vous votre poste actuel ?",
    tip: "Restez positif, jamais de critique de l'employeur",
    answer: "J'ai vraiment apprécié mon expérience chez [entreprise], j'y ai beaucoup appris sur [compétences]. Je cherche maintenant à [raison positive : nouveau défi, mission plus large, secteur, progression]. Ce poste correspond exactement à l'étape suivante que je recherche.",
  },
  {
    question: "Quelles sont vos prétentions salariales ?",
    tip: "Donnez une fourchette basée sur une recherche du marché",
    answer: "Sur la base de mes [X années] d'expérience et des standards du marché pour ce type de poste, je vise une rémunération entre [X] et [Y]€. Cela dit, je suis ouvert à discuter selon les responsabilités réelles et les avantages proposés.",
  },
  {
    question: "Avez-vous des questions pour nous ?",
    tip: "Toujours avoir 2-3 questions préparées — c'est une erreur de ne pas en avoir",
    answer: "Oui, j'en ai quelques-unes : 1) Comment définiriez-vous le succès pour cette mission après 6 mois ? 2) Quelle est la culture d'équipe et comment se passent les collaborations inter-équipes ? 3) Quelles sont les perspectives d'évolution pour ce poste ?",
  },
  {
    question: "Qu'est-ce qui vous différencie des autres candidats ?",
    tip: "Parlez de votre combinaison unique de compétences",
    answer: "Ce qui me distingue, c'est ma combinaison de [compétence technique] et [soft skill]. Par exemple, [exemple concret qui illustre les deux]. Cette double expertise me permet de [valeur ajoutée unique] ce que peu de candidats peuvent offrir dans ce contexte.",
  },
  {
    question: "Comment gérez-vous le stress et les délais serrés ?",
    tip: "Méthode + exemple réel",
    answer: "Je fonctionne bien sous pression quand le stress est bien géré. Ma méthode : je priorise en classant les tâches par impact/urgence, je communique proactivement sur les contraintes, et je découpe les gros projets en micro-jalons. Par exemple : [situation concrète + résultat].",
  },
  {
    question: "Comment travaillez-vous en équipe ?",
    tip: "Donnez un exemple de collaboration réussie",
    answer: "Je suis un profil [collaboratif/autonome selon le contexte]. Ce qui fonctionne pour moi : une communication claire sur les attentes dès le départ, et un suivi régulier. Dans [projet], j'ai collaboré avec [profils], et on a [résultat]. Ce que je valorise : écouter les contraintes de chacun avant de proposer des solutions.",
  },
  {
    question: "Quels sont vos accomplissements professionnels dont vous êtes le plus fier ?",
    tip: "Choisissez 1-2 accomplissements chiffrés et récents",
    answer: "Je suis particulièrement fier de [projet/accomplissement] chez [entreprise]. En [contexte/délai], j'ai [action précise] qui a permis [résultat chiffré : +X%, gain de X€, économie de X heures...]. Ce projet m'a appris [leçon] et j'aimerais reproduire ce type d'impact ici.",
  },
  {
    question: "Décrivez votre style de management",
    tip: "Pour les postes de manager, soyez précis sur votre approche",
    answer: "Mon style est [directif/participatif/situationnel selon le contexte]. Je crois que mes collaborateurs performent mieux quand [philosophie]. Concrètement : je fixe des objectifs clairs, je donne de l'autonomie sur le 'comment', je suis disponible pour débloquer et je donne du feedback régulier, pas seulement lors des évaluations.",
  },
  {
    question: "Comment vous tenez-vous à jour dans votre domaine ?",
    tip: "Montrez votre curiosité et pro-activité",
    answer: "Je consacre [X heures/semaine] à ma veille via [sources : newsletters, podcasts, communautés]. J'ai récemment [formation/certification/projet perso] sur [sujet émergent du secteur]. J'aime aussi [partager/contribuer] dans [communauté/événements] pour garder un réseau actif.",
  },
  {
    question: "Êtes-vous disponible immédiatement ?",
    tip: "Soyez honnête mais positif",
    answer: "Je suis actuellement en poste avec un préavis de [durée]. Je pourrai être disponible à partir du [date]. Si votre besoin est plus urgent, je peux discuter avec mon employeur actuel d'une réduction du préavis en fonction des conditions.",
  },
  {
    question: "Avez-vous d'autres pistes en cours ?",
    tip: "Oui, mais restez vague. Ça montre que vous êtes attractif.",
    answer: "Oui, j'ai quelques processus en cours avec d'autres entreprises, mais ce poste est clairement ma priorité en raison de [raison authentique]. Je suis en phase finale chez [éviter de nommer], mais ma préférence va clairement à [entreprise actuelle] car [raison concrète et positive].",
  },
  {
    question: "Que ferez-vous si vous n'êtes pas retenu ?",
    tip: "Montrez résilience et détermination, pas désespoir",
    answer: "Je continuerai ma recherche avec le même niveau d'exigence. J'essaierai néanmoins de comprendre les raisons du refus pour m'améliorer. Cela dit, je suis convaincu d'avoir les compétences nécessaires pour ce poste, et je mettrais tout en œuvre pour vous le démontrer si retenu.",
  },
  {
    question: "Comment définissez-vous le succès ?",
    tip: "Alignez votre définition avec les valeurs de l'entreprise",
    answer: "Pour moi, le succès c'est [impact mesurable] + [satisfaction personnelle] + [contribution à l'équipe]. Dans un contexte professionnel : atteindre les objectifs fixés, mais aussi créer de la valeur au-delà, faire grandir ceux avec qui je travaille, et apprendre quelque chose à chaque projet.",
  },
  {
    question: "Êtes-vous prêt à travailler le week-end / voyager ?",
    tip: "Soyez honnête sur vos contraintes personnelles",
    answer: "Je suis flexible et m'adapte aux besoins du poste. Je peux [voyager/travailler ponctuellement en dehors des horaires] lorsque c'est nécessaire. J'ai [contrainte éventuelle] mais j'organise généralement très bien ma disponibilité pour répondre aux enjeux du poste.",
  },
];

export default function InterviewAnswersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container-wide mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <div className="w-px h-4 bg-gray-200" />
          <h1 className="font-semibold text-gray-900">20 Réponses d'entretien — Méthode STAR</h1>
        </div>
      </header>

      <main className="container-wide mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Les 20 questions incontournables</h2>
          <p className="text-gray-500 max-w-2xl">
            Ces réponses sont des modèles à personnaliser. Utilisez le{" "}
            <Link href="/generate/interview" className="text-blue-600 font-medium hover:underline">générateur d'entretien IA</Link>{" "}
            pour obtenir des réponses 100% adaptées à votre poste et votre profil.
          </p>
        </div>

        <div className="space-y-4">
          {answers.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black text-blue-100 w-10 text-center flex-shrink-0">{i + 1}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-base mb-2">"{item.question}"</h3>
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-100 text-amber-700 text-xs px-2.5 py-1 rounded-full mb-3">
                    💡 {item.tip}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-100 italic">
                    "{item.answer}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-600 rounded-2xl p-6 text-white text-center">
          <p className="font-bold text-lg mb-2">Préparez un entretien spécifique</p>
          <p className="text-blue-100 text-sm mb-4">
            Obtenez des réponses 100% personnalisées pour votre poste avec l'IA
          </p>
          <Link href="/generate/interview" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            Préparer mon entretien IA →
          </Link>
        </div>
      </main>
    </div>
  );
}
