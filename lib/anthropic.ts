import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateCV(data: {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  targetJob: string;
  experience: string;
  education: string;
  skills: string;
  languages: string;
}): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    system:
      "Tu es un expert RH et rédacteur de CV professionnel. Tu génères des CV clairs, percutants et optimisés ATS (Applicant Tracking System). Réponds uniquement avec le contenu du CV formaté en Markdown.",
    messages: [
      {
        role: "user",
        content: `Génère un CV professionnel optimisé pour le poste de ${data.targetJob} avec les informations suivantes :

**Informations personnelles :**
- Nom : ${data.fullName}
- Email : ${data.email}
- Téléphone : ${data.phone}
- Localisation : ${data.location}

**Expériences professionnelles :**
${data.experience}

**Formation :**
${data.education}

**Compétences :**
${data.skills}

**Langues :**
${data.languages}

Optimise le CV avec :
1. Un résumé percutant de 3 lignes adapté au poste
2. Des bullet points avec des résultats chiffrés quand possible
3. Des mots-clés ATS pour le poste visé
4. Une mise en page claire et professionnelle en Markdown`,
      },
    ],
  });

  return message.content[0].type === "text" ? message.content[0].text : "";
}

export async function generateCoverLetter(data: {
  fullName: string;
  targetJob: string;
  company: string;
  jobDescription: string;
  experience: string;
  motivation: string;
}): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    system:
      "Tu es un expert en rédaction de lettres de motivation professionnelles et percutantes. Tu écris des lettres qui captent l'attention des recruteurs dès les premières lignes. Réponds uniquement avec le contenu de la lettre.",
    messages: [
      {
        role: "user",
        content: `Génère une lettre de motivation professionnelle et personnalisée pour :

**Poste visé :** ${data.targetJob}
**Entreprise :** ${data.company}

**Description du poste :**
${data.jobDescription}

**Mon expérience :**
${data.experience}

**Mes motivations :**
${data.motivation}

**Candidat :** ${data.fullName}

La lettre doit :
- Être percutante dès la première phrase
- Montrer que je connais l'entreprise et le poste
- Mettre en avant 2-3 points forts en lien direct avec l'offre
- Se terminer par un appel à l'action clair
- Faire 3 paragraphes maximum (300-400 mots)
- Utiliser un ton professionnel mais humain`,
      },
    ],
  });

  return message.content[0].type === "text" ? message.content[0].text : "";
}

export async function generateInterviewPrep(data: {
  targetJob: string;
  company: string;
  jobDescription: string;
  experience: string;
}): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2500,
    system:
      "Tu es un coach en entretien d'embauche expert. Tu prépares les candidats à réussir leurs entretiens avec des réponses convaincantes. Réponds en Markdown structuré.",
    messages: [
      {
        role: "user",
        content: `Prépare-moi pour un entretien d'embauche pour le poste suivant :

**Poste :** ${data.targetJob}
**Entreprise :** ${data.company}

**Description du poste :**
${data.jobDescription}

**Mon expérience :**
${data.experience}

Génère :
1. **5 questions clés** que le recruteur posera sûrement avec des réponses modèles personnalisées
2. **3 questions pièges** et comment les retourner en avantages
3. **2 questions à poser** à l'employeur pour marquer des points
4. **Conseils de présentation** pour les 2 premières minutes (elevator pitch)

Utilise la méthode STAR pour les réponses comportementales.`,
      },
    ],
  });

  return message.content[0].type === "text" ? message.content[0].text : "";
}

export async function suggestCompanies(data: {
  targetJob: string;
  location: string;
  skills: string;
  preferences: string;
}): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    system:
      "Tu es un expert en recherche d'emploi et connais parfaitement le marché du travail français. Réponds en Markdown.",
    messages: [
      {
        role: "user",
        content: `Suggère des entreprises et une stratégie de recherche d'emploi pour :

**Poste recherché :** ${data.targetJob}
**Localisation :** ${data.location}
**Compétences clés :** ${data.skills}
**Préférences :** ${data.preferences}

Génère :
1. **10 entreprises** à cibler avec leur profil et pourquoi elles recrutent ce profil
2. **Plateformes de recherche d'emploi** les plus adaptées pour ce poste
3. **Stratégie réseau LinkedIn** pour maximiser les chances
4. **Checklist de recherche d'emploi** pour trouver un poste en 30 jours`,
      },
    ],
  });

  return message.content[0].type === "text" ? message.content[0].text : "";
}
