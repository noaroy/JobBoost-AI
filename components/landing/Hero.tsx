"use client";

import Link from "next/link";
import { ArrowRight, Zap, RotateCcw, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";

const EXAMPLE_JOB = `Product Manager — Growth
Doctolib · Paris, France

Nous recherchons :
• Product management B2B ou SaaS marketplace
• Analytics : Amplitude, Mixpanel, SQL
• A/B testing et optimisation du funnel
• Cycle Agile/Scrum — cérémonies, sprints
• Anglais courant, équipe internationale
• OKRs et pilotage de la croissance

Missions : Définir et prioriser le roadmap produit,
travailler avec engineering et design, piloter
les métriques de rétention et d'acquisition.`;

const KNOWN_SKILLS = [
  "Amplitude", "Mixpanel", "SQL", "A/B Testing", "OKRs", "Agile", "Scrum",
  "B2B SaaS", "Jira", "Confluence", "Notion", "Figma", "Sketch",
  "JavaScript", "TypeScript", "React", "Vue", "Angular", "Node.js", "Python",
  "Java", "Go", "Rust", "PHP", "Docker", "Kubernetes", "AWS", "GCP", "Azure",
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "CI/CD", "Git", "DevOps",
  "GraphQL", "REST", "Linux", "Terraform",
  "Power BI", "Tableau", "BigQuery", "Spark", "Pandas", "Machine Learning",
  "TensorFlow", "PyTorch", "NLP",
  "SEO", "SEM", "Google Analytics", "Google Ads", "Facebook Ads",
  "CRM", "Salesforce", "HubSpot", "Email Marketing",
  "UX", "UI", "Design Thinking", "Prototyping",
  "Excel", "VBA", "SAP", "RGPD",
  "Anglais", "English", "Leadership", "Management", "Communication",
];

type Domain = "pm" | "dev" | "data" | "marketing" | "design" | "generic";

const DOMAIN_TITLES: Record<Domain, string> = {
  pm: "Product Manager",
  dev: "Développeur",
  data: "Data Analyst",
  marketing: "Marketing Manager",
  design: "Product Designer",
  generic: "Expert",
};

function extractFromJob(text: string): { company: string; skills: string[] } {
  const lines = text.split("\n").filter((l) => l.trim());
  const second = lines[1]?.trim() || "";
  const company = second.split("·")[0].split(",")[0].trim();

  const skills = KNOWN_SKILLS.filter((skill) => {
    const escaped = skill.replace(/[+.()|?*[\]{}\\^$]/g, "\\$&");
    return new RegExp(`(^|\\W)${escaped}(\\W|$)`, "i").test(text);
  });

  return { company, skills };
}

function detectDomain(skills: string[]): Domain {
  const s = new Set(skills.map((sk) => sk.toLowerCase()));
  const counts: Record<string, number> = {
    pm: ["okrs", "a/b testing", "amplitude", "mixpanel", "scrum", "agile", "b2b saas", "jira", "confluence"].filter((k) => s.has(k)).length,
    dev: ["javascript", "typescript", "react", "vue", "angular", "node.js", "python", "java", "go", "docker", "kubernetes", "aws", "gcp", "azure"].filter((k) => s.has(k)).length,
    data: ["sql", "pandas", "tableau", "power bi", "bigquery", "spark", "machine learning", "tensorflow", "pytorch", "nlp"].filter((k) => s.has(k)).length,
    marketing: ["seo", "sem", "google analytics", "google ads", "facebook ads", "crm", "hubspot", "salesforce", "email marketing"].filter((k) => s.has(k)).length,
    design: ["figma", "sketch", "ux", "ui", "design thinking", "prototyping"].filter((k) => s.has(k)).length,
  };
  let best: Domain = "generic";
  let bestScore = 0;
  for (const [domain, score] of Object.entries(counts)) {
    if (score > bestScore) { bestScore = score; best = domain as Domain; }
  }
  return bestScore === 0 ? "generic" : best;
}

function pick(skills: string[], candidates: string[]): string {
  return skills.find((s) => candidates.map((c) => c.toLowerCase()).includes(s.toLowerCase())) ?? candidates[0];
}

function buildBullets(domain: Domain, skills: string[]): [string, string][] {
  switch (domain) {
    case "pm": {
      const tool1 = pick(skills, ["Amplitude", "Mixpanel", "SQL", "Google Analytics"]);
      const tool2 = pick(skills, ["SQL", "Amplitude", "Mixpanel", "Tableau", "Power BI"]);
      const agile = pick(skills, ["Agile", "Scrum", "Kanban"]);
      return [
        ["Piloté le roadmap croissance sur 3 squads — ", "+42 % rétention J30"],
        [`Défini 8 OKRs avec ${tool1} et ${tool2} — `, "impact ×2.3 sur le MRR"],
        ["Lancé 14 A/B tests, 6 en production — ", "+18 % taux de conversion"],
        [`Animé les cérémonies ${agile} pour `, "12 personnes · 4 squads produit"],
      ];
    }
    case "dev": {
      const lang = pick(skills, ["TypeScript", "JavaScript", "Python", "Java", "Go", "Rust", "PHP"]);
      const framework = pick(skills, ["React", "Vue", "Angular", "Node.js"]);
      const infra = pick(skills, ["Docker", "Kubernetes", "AWS", "GCP", "Azure"]);
      return [
        [`Architecté 3 microservices en ${lang} — `, "−40 % latence API"],
        [`Déployé sur ${infra} avec CI/CD — `, "déploiements ×3 plus rapides"],
        [`Livré 8 features ${framework} — `, "+24 % engagement utilisateur"],
        ["Reviewé 200+ PRs, mentoring junior — ", "0 régression en production"],
      ];
    }
    case "data": {
      const viz = pick(skills, ["Tableau", "Power BI", "BigQuery"]);
      const db = pick(skills, ["SQL", "PostgreSQL", "MySQL", "BigQuery", "MongoDB"]);
      const ml = pick(skills, ["Machine Learning", "TensorFlow", "PyTorch", "Pandas", "Spark", "NLP"]);
      return [
        [`Construit 5 dashboards ${viz} — `, "−30 % délai de décision"],
        [`Optimisé 80 requêtes ${db} — `, "×4 sur les performances"],
        [`Déployé 2 modèles ${ml} — `, "+22 % précision prédiction"],
        ["Automatisé 3 pipelines ETL — ", "6h de traitement → 20 min"],
      ];
    }
    case "marketing": {
      const paid = pick(skills, ["Google Ads", "Facebook Ads", "SEM", "LinkedIn Ads"]);
      const crm = pick(skills, ["HubSpot", "Salesforce", "CRM", "Email Marketing"]);
      return [
        [`Géré €50K/mois sur ${paid} — `, "ROAS ×3.2"],
        [`Optimisé via ${crm} — `, "+65 % trafic organique J90"],
        ["Lancé 12 campagnes email — ", "+34 % open rate"],
        ["A/B testé 8 landing pages — ", "+18 % taux de conversion"],
      ];
    }
    case "design": {
      const tool = pick(skills, ["Figma", "Sketch", "Adobe XD"]);
      return [
        [`Designé 3 flux principaux sur ${tool} — `, "SUS score 87/100"],
        ["Mené 20 user tests — ", "−45 % friction onboarding"],
        ["Créé le design system — ", "×2 vitesse de dev frontend"],
        ["Livré 50+ composants UI — ", "0 régression visuelle"],
      ];
    }
    default:
      return [
        ["Piloté 3 projets stratégiques — ", "+42 % rétention J30"],
        ["Optimisé les processus clés — ", "impact ×2.3 sur les métriques"],
        ["Lancé 14 initiatives, 6 en production — ", "+18 % performance"],
        ["Coordonné les équipes pour ", "12 personnes · 4 squads"],
      ];
  }
}

const BEFORE_SKILLS = ["Gestion de projet", "UX Research", "Communication", "Jira"];
const BEFORE_BULLETS = [
  "Participation à la définition du roadmap produit",
  "Collaboration avec les équipes techniques",
  "Suivi des indicateurs de performance",
];

type Phase = "idle" | "analyzing" | "done";
type Extracted = { company: string; skills: string[] };

export default function Hero() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [jobText, setJobText] = useState(EXAMPLE_JOB);
  const [stepIdx, setStepIdx] = useState(0);
  const [score, setScore] = useState(34);
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
  const [extracted, setExtracted] = useState<Extracted | null>(null);
  const [stepsLen, setStepsLen] = useState(6);

  const jobMeta = useMemo(() => {
    const lines = jobText.split("\n").filter((l) => l.trim());
    const company = lines[1]?.split("·")[0]?.split(",")[0]?.trim() || "";
    return { company };
  }, [jobText]);

  function runAnalysis() {
    const data = extractFromJob(jobText);
    setExtracted(data);

    const kw = Math.max(data.skills.length, 4);
    const missing = Math.max(kw - 2, 3);
    const ref = data.company || "l'offre";
    const preview = data.skills.slice(0, 5).join(" · ") || "Mots-clés intégrés…";

    const steps = [
      { ms: 350, text: `Lecture de l'offre ${ref}…` },
      { ms: 750, text: `${kw} mots-clés ATS identifiés` },
      { ms: 1150, text: `Score initial : 34/100 · ${missing} manquants` },
      { ms: 1550, text: `Réécriture résumé + métriques…` },
      { ms: 1950, text: `${preview}…` },
      { ms: 2350, text: `Score final : 91/100 — optimisé ✓` },
    ];

    setStepsLen(steps.length);
    setPhase("analyzing");
    setScore(34);
    setStepIdx(0);
    setVisibleSteps([]);

    steps.forEach((step, i) => {
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, step.text]);
        setStepIdx(i + 1);
        if (i === steps.length - 1) {
          setTimeout(() => {
            setPhase("done");
            let s = 34;
            const iv = setInterval(() => {
              s = Math.min(s + 1, 91);
              setScore(s);
              if (s >= 91) clearInterval(iv);
            }, 22);
          }, 400);
        }
      }, step.ms);
    });
  }

  function reset() {
    setPhase("idle");
    setScore(34);
    setStepIdx(0);
    setVisibleSteps([]);
    setExtracted(null);
  }

  const domain = useMemo(() => detectDomain(extracted?.skills ?? []), [extracted]);
  const displayTitle = DOMAIN_TITLES[domain];

  const afterSkills = useMemo(() => {
    if (!extracted || extracted.skills.length === 0) {
      return [
        { label: "Amplitude", new: true },
        { label: "Mixpanel", new: true },
        { label: "SQL", new: true },
        { label: "A/B Testing", new: true },
        { label: "OKRs", new: true },
        { label: "Agile/Scrum", new: true },
        { label: "B2B SaaS", new: true },
        { label: "Jira", new: false },
      ];
    }
    const newSkills = extracted.skills.slice(0, 8).map((s) => ({ label: s, new: true }));
    const existingOnly = BEFORE_SKILLS
      .filter((s) => !extracted.skills.some((e) => e.toLowerCase() === s.toLowerCase()))
      .slice(0, 2)
      .map((s) => ({ label: s, new: false }));
    return [...newSkills, ...existingOnly];
  }, [extracted]);

  const afterBullets = useMemo(
    () => buildBullets(domain, extracted?.skills ?? []),
    [domain, extracted]
  );

  const newSkillCount = afterSkills.filter((s) => s.new).length;
  const skills = extracted?.skills ?? [];

  const progress =
    phase === "idle" ? 0 : phase === "done" ? 100 : (stepIdx / stepsLen) * 100;

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-zinc-950 overflow-hidden pt-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% -10%, oklch(0.78 0.13 82 / 0.07), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-12 relative z-10">

        {/* Social proof */}
        <div data-reveal className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 bg-zinc-900/80 border border-white/[0.08] rounded-full px-4 py-2">
            <div className="flex -space-x-1.5">
              {[
                "from-violet-500 to-violet-700",
                "from-blue-500 to-blue-700",
                "from-rose-500 to-rose-700",
                "from-emerald-500 to-emerald-700",
              ].map((g, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full bg-gradient-to-br ${g} border-2 border-zinc-900 flex items-center justify-center text-[8px] font-black text-white`}
                >
                  {["ML", "TR", "SC", "AB"][i]}
                </div>
              ))}
            </div>
            <span className="text-sm text-zinc-400">
              <strong className="text-white">1 200+</strong> candidats ont
              décroché un entretien ce mois
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-10">
          <h1
            data-reveal
            data-delay="1"
            className="font-display font-black text-white mb-5"
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: "1.05",
            }}
          >
            Votre CV est lu{" "}
            <span className="relative inline-block">
              <span className="text-rose-400">6 secondes.</span>
            </span>
            <br />
            Faisons en sorte{" "}
            <span className="text-amber-400">que ça compte.</span>
          </h1>

          <p
            data-reveal
            data-delay="2"
            className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Collez l&apos;offre ci-dessous. L&apos;IA intègre les mots-clés
            exacts que le recruteur cherche — et que votre CV actuel
            n&apos;a probablement pas.
          </p>
        </div>

        {/* Interactive demo */}
        <div
          data-reveal
          data-delay="3"
          className="grid lg:grid-cols-2 gap-4 mb-8"
        >
          {/* LEFT: Job input */}
          <div className="flex flex-col bg-zinc-900/80 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
            <div className="flex items-center justify-between px-4 py-3 bg-black/20 border-b border-white/[0.06]">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                L&apos;offre d&apos;emploi
              </span>
              <span className="text-[10px] text-zinc-700">
                Exemple pré-rempli — modifiable
              </span>
            </div>

            <textarea
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              disabled={phase === "analyzing"}
              rows={12}
              className="flex-1 w-full bg-transparent px-4 py-3 text-[13px] text-zinc-300 placeholder-zinc-700 resize-none focus:outline-none leading-relaxed font-mono disabled:opacity-50"
              placeholder="Collez n'importe quelle offre d'emploi…"
            />

            <div className="px-4 py-3 border-t border-white/[0.06] bg-black/10">
              {phase === "idle" && (
                <button
                  onClick={runAnalysis}
                  disabled={!jobText.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 text-zinc-950 font-black text-sm px-5 py-3 rounded-xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Zap className="w-4 h-4" />
                  Voir ce qui manque dans mon CV
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {phase === "analyzing" && (
                <div className="w-full inline-flex items-center justify-center gap-2 bg-zinc-800 text-zinc-400 font-semibold text-sm px-5 py-3 rounded-xl cursor-not-allowed">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyse en cours…
                </div>
              )}
              {phase === "done" && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors flex-shrink-0"
                  >
                    <RotateCcw className="w-3 h-3" /> Recommencer
                  </button>
                  <Link
                    href="/signup"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-400 text-zinc-950 font-black text-sm px-5 py-3 rounded-xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 hover:-translate-y-0.5"
                  >
                    <Zap className="w-4 h-4" />
                    Créer mon compte — Gratuit
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: CV result */}
          <div className="flex flex-col bg-zinc-900/80 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
            <div
              className={`px-4 py-3 border-b border-white/[0.06] transition-all duration-500 ${
                phase === "done"
                  ? "bg-emerald-500/[0.06] border-emerald-500/20"
                  : phase === "analyzing"
                  ? "bg-amber-400/[0.04]"
                  : "bg-rose-500/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-bold uppercase tracking-widest ${
                    phase === "done"
                      ? "text-emerald-400"
                      : phase === "analyzing"
                      ? "text-amber-400"
                      : "text-rose-400"
                  }`}
                >
                  {phase === "idle"
                    ? "Votre CV — tel qu'il est"
                    : phase === "analyzing"
                    ? "Analyse en cours…"
                    : "Votre CV — après optimisation ✓"}
                </span>
                <div className="flex items-baseline gap-1">
                  {phase === "idle" && (
                    <>
                      <span className="text-2xl font-black text-rose-400">34</span>
                      <span className="text-zinc-600 text-xs">/100</span>
                    </>
                  )}
                  {phase === "analyzing" && (
                    <>
                      <span className="text-2xl font-black text-amber-400">{score}</span>
                      <span className="text-zinc-600 text-xs">/100</span>
                    </>
                  )}
                  {phase === "done" && (
                    <>
                      <span className="text-2xl font-black text-emerald-400">{score}</span>
                      <span className="text-zinc-600 text-xs">/100</span>
                    </>
                  )}
                </div>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    phase === "done"
                      ? "bg-emerald-500"
                      : phase === "analyzing"
                      ? "bg-amber-400"
                      : "bg-rose-500/60"
                  }`}
                  style={{
                    width:
                      phase === "idle"
                        ? "34%"
                        : phase === "done"
                        ? `${score}%`
                        : `${progress}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-hidden relative">
              {/* IDLE: before state */}
              {phase === "idle" && (
                <div className="p-4 space-y-3">
                  <div>
                    <div className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest mb-1">
                      Résumé
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-relaxed italic">
                      &ldquo;Je travaille dans le product management depuis
                      quelques années. Je suis motivé et je m&apos;adapte
                      facilement aux environnements variés.&rdquo;
                    </p>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest mb-1.5">
                      Compétences
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {BEFORE_SKILLS.map((sk) => (
                        <span
                          key={sk}
                          className="text-[10px] bg-zinc-800 text-zinc-500 border border-zinc-700/60 px-2 py-0.5 rounded-full"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest mb-1.5">
                      Expérience
                    </div>
                    <div className="text-[10px] font-medium text-zinc-500 mb-1.5">
                      Product Manager — Startup SaaS (2022–présent)
                    </div>
                    <ul className="space-y-1.5">
                      {BEFORE_BULLETS.map((b) => (
                        <li key={b} className="text-[11px] text-zinc-600 flex gap-2">
                          <span className="text-zinc-700 flex-shrink-0 mt-0.5">·</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-2 bg-rose-500/[0.06] border border-rose-500/15 rounded-xl p-3 text-[10px] text-rose-400/70">
                    ⚠ Mots-clés{jobMeta.company ? ` ${jobMeta.company}` : ""}{" "}
                    manquants — ce CV sera probablement filtré automatiquement
                  </div>
                </div>
              )}

              {/* ANALYZING: terminal */}
              {phase === "analyzing" && (
                <div className="p-4 h-full">
                  <div className="bg-zinc-950/80 border border-white/[0.05] rounded-xl p-3 font-mono text-[11px] space-y-2 h-full">
                    <div className="text-zinc-700 mb-2">
                      $ jobboost optimize --job offre.txt
                    </div>
                    {visibleSteps.map((st, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2 animate-in fade-in duration-300 ${
                          st.includes("Score initial")
                            ? "text-amber-400"
                            : st.includes("Score final")
                            ? "text-emerald-400"
                            : "text-zinc-400"
                        }`}
                      >
                        <span className="flex-shrink-0 mt-0.5">
                          {st.includes("Score initial") ? "⚠" : st.includes("Score final") ? "✓" : "›"}
                        </span>
                        <span>{st}</span>
                      </div>
                    ))}
                    {stepIdx < stepsLen && (
                      <span className="text-zinc-600 animate-pulse">▊</span>
                    )}
                  </div>
                </div>
              )}

              {/* DONE: optimized CV */}
              {phase === "done" && (
                <div className="p-4 space-y-3">
                  {/* Résumé — 100% dynamique */}
                  <div>
                    <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      Résumé{" "}
                      <span className="text-emerald-400 normal-case font-normal tracking-normal">
                        ↑ réécrit
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-relaxed">
                      {skills.length === 0 ? (
                        <>
                          Profil optimisé avec les mots-clés de l&apos;offre.
                          Expérience reformulée avec métriques — score ATS amélioré.
                        </>
                      ) : (
                        <>
                          <span className="text-amber-400 font-semibold">{displayTitle}</span>{" "}
                          avec 3 ans d&apos;expérience en{" "}
                          <span className="text-amber-400 font-semibold">{skills[0]}</span>
                          {skills[1] && (
                            <>
                              . Maîtrise de{" "}
                              <span className="text-amber-400 font-semibold">{skills[1]}</span>
                              {skills[2] && (
                                <> et <span className="text-amber-400 font-semibold">{skills[2]}</span></>
                              )}
                            </>
                          )}
                          {skills[3] && (
                            <>
                              . Pilotage{" "}
                              <span className="text-amber-400 font-semibold">{skills[3]}</span>
                              {skills[4] && (
                                <> et <span className="text-amber-400 font-semibold">{skills[4]}</span></>
                              )}
                            </>
                          )}{" "}
                          — résultats mesurables.
                        </>
                      )}
                    </p>
                  </div>

                  {/* Compétences — 100% dynamiques */}
                  <div>
                    <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      Compétences{" "}
                      <span className="text-amber-400 normal-case font-normal tracking-normal">
                        +{newSkillCount} mots-clés de l&apos;offre
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {afterSkills.map((sk) => (
                        <span
                          key={sk.label}
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                            sk.new
                              ? "bg-amber-400/10 text-amber-400 border-amber-400/25"
                              : "bg-zinc-800 text-zinc-500 border-zinc-700/60"
                          }`}
                        >
                          {sk.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expérience — titre + bullets 100% dynamiques */}
                  <div>
                    <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      Expérience{" "}
                      <span className="text-emerald-400 normal-case font-normal tracking-normal">
                        ↑ résultats chiffrés
                      </span>
                    </div>
                    <div className="text-[10px] font-semibold text-zinc-300 mb-1.5">
                      {displayTitle} — Startup SaaS (2022–présent)
                    </div>
                    <ul className="space-y-1.5">
                      {afterBullets.map(([plain, metric], i) => (
                        <li key={i} className="text-[11px] flex gap-2">
                          <span className="text-emerald-400 flex-shrink-0 mt-0.5">·</span>
                          <span className="text-zinc-400">
                            {plain}
                            <span className="text-amber-400 font-semibold">{metric}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom trust strip */}
        <div
          data-reveal
          data-delay="4"
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-5 text-xs text-zinc-600 flex-wrap justify-center">
            <span>✓ Aucune carte bancaire</span>
            <span>✓ Résultat en 30 secondes</span>
            <span>✓ Vos données ne sont jamais revendues</span>
          </div>
          <Link
            href="#how-it-works"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5 flex-shrink-0"
          >
            Comment ça marche <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
