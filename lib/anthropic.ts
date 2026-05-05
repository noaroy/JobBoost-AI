import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODEL = "claude-sonnet-4-6";

// ── Helpers ──────────────────────────────────────────────────────────────────

async function ask(system: string, prompt: string, maxTokens = 2000): Promise<string> {
  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content[0].type === "text" ? msg.content[0].text : "";
}

// ── CV ───────────────────────────────────────────────────────────────────────

export async function generateCV(data: {
  fullName: string; email: string; phone: string; location: string;
  targetJob: string; experience: string; education: string;
  skills: string; languages: string;
}): Promise<string> {
  return ask(
    "Tu es un expert RH et rédacteur de CV professionnel. Tu génères des CV clairs, percutants et optimisés ATS. Réponds uniquement avec le contenu du CV en Markdown.",
    `Génère un CV professionnel optimisé pour le poste de ${data.targetJob}.

Nom: ${data.fullName} | Email: ${data.email} | Tél: ${data.phone} | Lieu: ${data.location}

Expériences: ${data.experience}
Formation: ${data.education}
Compétences: ${data.skills}
Langues: ${data.languages}

Inclus: résumé percutant 3 lignes, bullet points avec résultats chiffrés, mots-clés ATS.`
  );
}

// ── Cover Letter ─────────────────────────────────────────────────────────────

export async function generateCoverLetter(data: {
  fullName: string; targetJob: string; company: string;
  jobDescription: string; experience: string; motivation: string;
}): Promise<string> {
  return ask(
    "Tu es un expert en rédaction de lettres de motivation percutantes. Réponds uniquement avec le contenu de la lettre.",
    `Génère une lettre de motivation pour ${data.fullName}, poste: ${data.targetJob} chez ${data.company}.

Offre: ${data.jobDescription}
Expérience: ${data.experience}
Motivations: ${data.motivation}

3 paragraphes max, 350 mots, ton professionnel mais humain, CTA fort en conclusion.`
  );
}

// ── Interview Prep ───────────────────────────────────────────────────────────

export async function generateInterviewPrep(data: {
  targetJob: string; company: string; jobDescription: string; experience: string;
}): Promise<string> {
  return ask(
    "Tu es un coach entretien expert. Réponds en Markdown structuré.",
    `Prépare l'entretien pour: ${data.targetJob} chez ${data.company}.
Offre: ${data.jobDescription}
Profil: ${data.experience}

Génère: 5 questions clés avec réponses STAR, 3 questions pièges avec contre-stratégie, 2 questions à poser à l'employeur, elevator pitch 90 secondes.`,
    2500
  );
}

// ── Company Suggestions ──────────────────────────────────────────────────────

export async function suggestCompanies(data: {
  targetJob: string; location: string; skills: string; preferences: string;
}): Promise<string> {
  return ask(
    "Tu es un expert en recherche d'emploi et connais le marché du travail français. Réponds en Markdown.",
    `Suggestions pour: ${data.targetJob} à ${data.location}.
Compétences: ${data.skills} | Préférences: ${data.preferences}

10 entreprises cibles avec justification, plateformes recommandées, stratégie LinkedIn, checklist 30 jours.`
  );
}

// ── Application Score ────────────────────────────────────────────────────────

export async function scoreApplication(data: {
  targetJob: string; company: string; cvContent: string; coverLetterContent: string;
}): Promise<string> {
  return ask(
    "Tu es un expert RH senior qui évalue des candidatures. Tu donnes des scores précis et des feedbacks actionnables. Réponds en Markdown structuré.",
    `Évalue cette candidature pour le poste de ${data.targetJob} chez ${data.company}.

CV:
${data.cvContent}

Lettre de motivation:
${data.coverLetterContent}

Génère une évaluation avec:
## Score Global: X/100

### Détail des scores:
- **CV (clarté, ATS, impact)**: X/100
- **Lettre de motivation (personnalisation, accroche)**: X/100
- **Adéquation avec le poste**: X/100
- **Présentation professionnelle**: X/100

### ✅ Points forts (3 points)

### ⚠️ Points à améliorer (3 points avec exemples concrets)

### 🚀 Actions prioritaires (dans l'ordre d'impact)

### 💡 Probabilité d'être sélectionné pour un entretien: X%`,
    2000
  );
}

// ── Follow-up Email ──────────────────────────────────────────────────────────

export async function generateFollowUp(data: {
  fullName: string; targetJob: string; company: string;
  applicationDate: string; daysSince: number; additionalContext: string;
}): Promise<string> {
  return ask(
    "Tu es un expert en communication professionnelle. Tu rédiges des emails de relance percutants mais sans agressivité. Réponds uniquement avec le contenu de l'email.",
    `Rédige un email de relance professionnel.

Candidat: ${data.fullName}
Poste: ${data.targetJob} chez ${data.company}
Date candidature: ${data.applicationDate} (il y a ${data.daysSince} jours)
Contexte: ${data.additionalContext}

L'email doit:
- Objet accrocheur (inclus-le)
- Rappel bref et positif de la candidature
- Apport de valeur supplémentaire ou information nouvelle
- Réaffirmation de l'intérêt
- CTA clair pour un entretien
- Ton professionnel et confiant (pas suppliant)
- 150 mots maximum`,
    800
  );
}

// ── Daily Action Plan ────────────────────────────────────────────────────────

export async function generateActionPlan(data: {
  targetJob: string; location: string; experienceLevel: string;
  applicationsCount: number; responsesCount: number; daysSearching: number;
}): Promise<string> {
  const responseRate = data.applicationsCount > 0
    ? Math.round((data.responsesCount / data.applicationsCount) * 100)
    : 0;

  return ask(
    "Tu es un coach emploi expert. Tu crées des plans d'action personnalisés et actionnables. Réponds en Markdown.",
    `Crée un plan d'action pour cette semaine.

Recherche: ${data.targetJob} à ${data.location}
Niveau: ${data.experienceLevel}
Candidatures envoyées: ${data.applicationsCount}
Réponses reçues: ${data.responsesCount} (taux: ${responseRate}%)
Jours de recherche: ${data.daysSearching}

Génère:
## 📊 Analyse de ta situation
(diagnostic honnête basé sur les stats)

## 🎯 Objectifs de la semaine
(3 objectifs SMART)

## 📅 Plan jour par jour (Lun → Ven)
(tâches concrètes avec durée estimée)

## ⚡ Action prioritaire aujourd'hui
(1 seule chose, la plus impactante)

## 💡 Conseil stratégique
(basé sur le taux de réponse actuel)`,
    1800
  );
}

// ── Interview Simulation ─────────────────────────────────────────────────────

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

Génère la prochaine question d'entretien. Varie les types (comportementale, technique, motivationnelle, mise en situation).
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

// ── Auto-Apply (batch) ───────────────────────────────────────────────────────

export async function generateBatchApplication(data: {
  fullName: string; targetJob: string; experience: string; skills: string;
  company: string; companyDescription: string; jobDescription: string;
}): Promise<{ cv: string; coverLetter: string }> {
  const [cv, coverLetter] = await Promise.all([
    generateCV({
      fullName: data.fullName, email: "", phone: "", location: "",
      targetJob: data.targetJob, experience: data.experience,
      education: "", skills: data.skills, languages: "Français (natif)",
    }),
    generateCoverLetter({
      fullName: data.fullName, targetJob: data.targetJob,
      company: data.company, jobDescription: data.jobDescription,
      experience: data.experience, motivation: `Intérêt pour ${data.companyDescription}`,
    }),
  ]);
  return { cv, coverLetter };
}
