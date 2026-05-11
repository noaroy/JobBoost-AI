import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODEL = "claude-sonnet-4-6";

async function ask(system: string, prompt: string, maxTokens = 2000): Promise<string> {
  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content[0].type === "text" ? msg.content[0].text : "";
}

// ── CV ────────────────────────────────────────────────────────────────────────

export async function generateCV(data: {
  jobOffer: string;
  experience: string;
}): Promise<string> {
  return ask(
    "Tu es un expert RH et rédacteur de CV professionnel. Génère des CV optimisés ATS en Markdown structuré. Ne commente pas, réponds uniquement avec le CV.",
    `Génère un CV professionnel optimisé ATS.

OFFRE D'EMPLOI VISÉE :
${data.jobOffer}

EXPÉRIENCE / PROFIL DU CANDIDAT :
${data.experience}

Instructions :
- Identifie le poste cible depuis l'offre et extrait ses mots-clés ATS
- En-tête : nom (déduit du profil ou "Prénom Nom"), poste cible, email et téléphone fictifs si absents
- Résumé professionnel percutant (2-3 lignes) avec mots-clés de l'offre
- Expériences structurées avec résultats chiffrés (ex: "+30% de conversion")
- Compétences techniques et soft skills en lien avec l'offre
- Formation (déduite si non fournie)
- Format Markdown propre et lisible par les ATS`
  );
}

// ── Cover Letter ──────────────────────────────────────────────────────────────

export async function generateCoverLetter(data: {
  jobOffer: string;
  experience: string;
}): Promise<string> {
  return ask(
    "Tu es un expert en rédaction de lettres de motivation percutantes. Réponds uniquement avec la lettre (objet + corps), sans commentaire.",
    `Génère une lettre de motivation personnalisée.

OFFRE D'EMPLOI :
${data.jobOffer}

PROFIL DU CANDIDAT :
${data.experience}

Instructions :
- Extrait automatiquement : nom de l'entreprise, poste, compétences requises
- Utilise le nom du candidat si mentionné dans son profil
- Accroche forte qui montre que tu connais l'entreprise
- 3 paragraphes : accroche → valeur ajoutée concrète → motivation + CTA
- 280-350 mots, ton professionnel mais humain
- Intègre les mots-clés de l'offre naturellement
- Termine par un CTA clair pour un entretien`
  );
}

// ── Interview Prep ────────────────────────────────────────────────────────────

export async function generateInterviewPrep(data: {
  jobOffer: string;
  profile: string;
}): Promise<string> {
  return ask(
    "Tu es un coach entretien expert. Réponds en Markdown structuré.",
    `Prépare cet entretien.

OFFRE D'EMPLOI :
${data.jobOffer}

PROFIL DU CANDIDAT :
${data.profile}

Génère :
## Questions clés
(5 questions probables avec réponses STAR personnalisées pour ce profil)

## Questions pièges
(3 questions difficiles avec contre-stratégie)

## Questions à poser à l'employeur
(3 questions percutantes qui montrent ta motivation)

## Elevator pitch
(Script 90 secondes personnalisé pour ce poste)`,
    2500
  );
}

// ── Company Suggestions ───────────────────────────────────────────────────────

export async function suggestCompanies(data: {
  query: string;
}): Promise<string> {
  return ask(
    "Tu es un expert en recherche d'emploi et connais parfaitement le marché du travail français. Réponds en Markdown.",
    `Suggestions d'entreprises pour cette recherche : ${data.query}

Génère :
## 10 entreprises cibles
(Pour chaque : Nom | Secteur | Pourquoi postuler | Où postuler)

## Stratégie LinkedIn
(3 actions concrètes pour approcher ces entreprises)

## Plateformes recommandées
(Les meilleures pour ce profil)

## Plan d'action 7 jours
(Checklist quotidienne pour lancer la recherche)`
  );
}

// ── Application Score ─────────────────────────────────────────────────────────

export async function scoreApplication(data: {
  cv: string;
  jobOffer?: string;
}): Promise<string> {
  return ask(
    "Tu es un expert RH senior qui évalue des candidatures. Tu donnes des scores précis et des feedbacks actionnables. Réponds en Markdown structuré.",
    `Évalue cette candidature.

CV :
${data.cv}

${data.jobOffer ? `OFFRE D'EMPLOI :\n${data.jobOffer}` : ""}

Génère :
## Score Global : X/100

### Détail :
- **Impact et clarté du CV** : X/100
- **Optimisation ATS** : X/100
- **Mots-clés manquants** : liste des 5 plus importants
${data.jobOffer ? "- **Adéquation avec le poste** : X/100" : ""}

## ✅ Points forts (3 points)

## ⚠️ Améliorations prioritaires
(3 points avec exemples concrets)

## 🚀 Actions immédiates
(Dans l'ordre d'impact)

## 💡 Probabilité d'être sélectionné : X%`,
    2000
  );
}

// ── Follow-up Email ───────────────────────────────────────────────────────────

export async function generateFollowUp(data: {
  context: string;
  previousMessage?: string;
}): Promise<string> {
  return ask(
    "Tu es un expert en communication professionnelle. Tu rédiges des emails de relance percutants mais sans agressivité. Réponds uniquement avec l'email (objet + corps).",
    `Rédige un email de relance professionnel.

CONTEXTE :
${data.context}

${data.previousMessage ? `MESSAGE PRÉCÉDENT :\n${data.previousMessage}` : ""}

L'email doit :
- Commencer par "Objet : [objet accrocheur]"
- Rappel bref et positif de la candidature
- Apporter une valeur ou information nouvelle
- CTA clair pour un entretien
- Ton confiant et professionnel (pas suppliant)
- 150 mots max`,
    800
  );
}

// ── Action Plan ───────────────────────────────────────────────────────────────

export async function generateActionPlan(data: {
  situation: string;
}): Promise<string> {
  return ask(
    "Tu es un coach emploi expert. Tu crées des plans d'action personnalisés et actionnables. Réponds en Markdown.",
    `Crée un plan d'action pour cette semaine de recherche d'emploi.

SITUATION :
${data.situation}

Génère :
## 📊 Diagnostic
(Analyse honnête de la situation et des axes d'amélioration)

## 🎯 3 objectifs SMART pour cette semaine

## 📅 Plan jour par jour (Lun → Ven)
(Tâches concrètes avec durée estimée)

## ⚡ Action prioritaire aujourd'hui
(1 seule action, la plus impactante)

## 💡 Conseil stratégique
(Basé sur la situation décrite)`,
    1800
  );
}

// ── Interview Simulation ──────────────────────────────────────────────────────

export async function generateInterviewQuestion(data: {
  targetJob: string; company: string; jobDescription: string;
  questionNumber: number; previousQA: { q: string; a: string }[];
}): Promise<{ question: string; tip: string }> {
  const history = data.previousQA
    .map((qa, i) => `Q${i + 1}: ${qa.q}\nRéponse: ${qa.a}`)
    .join("\n\n");

  const result = await ask(
    "Tu es un recruteur senior qui conduit des entretiens professionnels. Génère uniquement du JSON valide.",
    `Entretien pour ${data.targetJob} chez ${data.company}.
Offre: ${data.jobDescription}
Question numéro: ${data.questionNumber}
${history ? `Historique:\n${history}` : ""}

Génère la prochaine question. Varie les types (comportementale, technique, motivationnelle, mise en situation).
Réponds en JSON: {"question": "...", "tip": "Conseil court pour bien répondre"}`,
    400
  );

  try {
    return JSON.parse(result.replace(/```json\n?|\n?```/g, "").trim());
  } catch {
    return { question: result, tip: "Utilisez la méthode STAR pour structurer votre réponse." };
  }
}

export async function evaluateInterviewAnswer(data: {
  targetJob: string; question: string; answer: string; questionNumber: number;
}): Promise<{ score: number; feedback: string; betterAnswer: string }> {
  const result = await ask(
    "Tu es un coach entretien expert. Tu évalues les réponses et donnes un feedback constructif. Génère uniquement du JSON valide.",
    `Question d'entretien pour ${data.targetJob}:
"${data.question}"

Réponse du candidat:
"${data.answer}"

Évalue et réponds en JSON:
{
  "score": (0-100),
  "feedback": "Feedback court et constructif (2-3 phrases)",
  "betterAnswer": "Version améliorée de la réponse (50 mots max)"
}`,
    600
  );

  try {
    return JSON.parse(result.replace(/```json\n?|\n?```/g, "").trim());
  } catch {
    return { score: 70, feedback: "Bonne réponse globalement.", betterAnswer: data.answer };
  }
}

// ── Auto-Apply (batch) ────────────────────────────────────────────────────────

export async function generateBatchApplication(data: {
  fullName: string; targetJob: string; experience: string; skills: string;
  company: string; companyDescription: string; jobDescription: string;
}): Promise<{ cv: string; coverLetter: string }> {
  const experienceText = [
    data.fullName && `Nom : ${data.fullName}`,
    data.targetJob && `Poste visé : ${data.targetJob}`,
    `Expérience : ${data.experience}`,
    data.skills && `Compétences : ${data.skills}`,
  ].filter(Boolean).join("\n");

  const jobOfferText = [
    `Entreprise : ${data.company}`,
    data.companyDescription,
    data.jobDescription,
  ].filter(Boolean).join("\n\n");

  const [cv, coverLetter] = await Promise.all([
    generateCV({ jobOffer: jobOfferText, experience: experienceText }),
    generateCoverLetter({ jobOffer: jobOfferText, experience: experienceText }),
  ]);
  return { cv, coverLetter };
}
