"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, FileText, Mail, Mic, BarChart2, Layers } from "lucide-react";

const TABS = [
  { id: "cv",        label: "CV optimisé",         icon: FileText },
  { id: "lettre",    label: "Lettre de motivation", icon: Mail },
  { id: "entretien", label: "Préparation entretien",icon: Mic },
  { id: "score",     label: "Score /100",           icon: BarChart2 },
  { id: "auto",      label: "Auto-Apply ×5",        icon: Layers },
] as const;

type TabId = typeof TABS[number]["id"];

// ─── CV mockup ────────────────────────────────────────────────────────────────
function CVMockup() {
  return (
    <div className="grid lg:grid-cols-[1fr,220px] gap-4">
      <div className="bg-zinc-950/60 border border-emerald-500/15 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-4 border-b border-white/[0.05]">
          <div className="text-sm font-black text-white">Sarah Chen</div>
          <div className="text-xs text-amber-400 font-semibold mt-0.5">Product Manager Growth · Paris</div>
          <div className="text-xs text-zinc-500 mt-1">sarah.chen@email.com · linkedin.com/in/schen · Paris, France</div>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
              Résumé <span className="text-emerald-400 normal-case font-normal tracking-normal">↑ réécrit par l'IA</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Product Manager Growth avec 4 ans d'expérience en{" "}
              <span className="text-amber-400 font-semibold">B2B SaaS</span>. Maîtrise d'
              <span className="text-amber-400 font-semibold">Amplitude</span> et{" "}
              <span className="text-amber-400 font-semibold">SQL</span>. Pilotage{" "}
              <span className="text-amber-400 font-semibold">OKRs</span> — +42 % rétention J30, ×2.3 MRR.
            </p>
          </div>
          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
              Compétences <span className="text-amber-400 font-normal normal-case tracking-normal">+9 mots-clés intégrés</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { l: "Amplitude", n: true }, { l: "Mixpanel", n: true }, { l: "SQL", n: true },
                { l: "A/B Testing", n: true }, { l: "OKRs", n: true }, { l: "Agile/Scrum", n: true },
                { l: "B2B SaaS", n: true }, { l: "Figma", n: false }, { l: "Jira", n: false },
              ].map((s) => (
                <span key={s.l} className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${s.n ? "bg-amber-400/10 text-amber-400 border-amber-400/25" : "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
                  {s.l}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
              Expérience <span className="text-emerald-400 font-normal normal-case tracking-normal">↑ métriques ajoutées</span>
            </div>
            <div className="text-xs font-semibold text-zinc-200 mb-1.5">Product Manager Growth — Fintech SaaS (2020–présent)</div>
            <ul className="space-y-1.5">
              {[
                ["Piloté le roadmap croissance sur 3 squads — ", "+42 % rétention J30"],
                ["Défini 8 OKRs avec Amplitude et SQL — ", "impact ×2.3 sur le MRR"],
                ["Lancé 14 A/B tests, 6 en production — ", "+18 % taux de conversion"],
              ].map(([plain, metric], i) => (
                <li key={i} className="text-xs flex gap-2">
                  <span className="text-emerald-400 flex-shrink-0">·</span>
                  <span className="text-zinc-400">{plain}<span className="text-amber-400 font-semibold">{metric}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="bg-zinc-950/80 border border-emerald-500/20 rounded-xl p-4 text-center">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Score ATS</div>
          <div className="text-4xl font-black text-emerald-400">91<span className="text-lg text-zinc-600">/100</span></div>
          <div className="text-[10px] text-zinc-600 mt-1">Score initial : <span className="text-rose-400">34/100</span></div>
          <div className="h-1.5 bg-zinc-800 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: "91%" }} />
          </div>
        </div>
        <div className="bg-zinc-950/80 border border-white/[0.06] rounded-xl p-4 space-y-2">
          {[
            { l: "Mots-clés intégrés", v: "17/18", c: "text-emerald-400" },
            { l: "Format ATS", v: "Compatible ✓", c: "text-emerald-400" },
            { l: "Métriques", v: "4 chiffres", c: "text-amber-400" },
            { l: "Réponses estimées", v: "+37 %", c: "text-amber-400" },
          ].map((r) => (
            <div key={r.l} className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-600">{r.l}</span>
              <span className={`text-[11px] font-bold ${r.c}`}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Cover letter mockup ──────────────────────────────────────────────────────
function LettreMotivationMockup() {
  return (
    <div className="grid lg:grid-cols-[1fr,200px] gap-4">
      <div className="bg-zinc-950/60 border border-emerald-500/15 rounded-xl p-5 font-[Georgia,serif]">
        <div className="text-xs text-zinc-500 mb-4">Paris, le {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</div>
        <div className="text-xs text-zinc-400 mb-4">
          <div className="font-semibold text-white">Madame, Monsieur,</div>
        </div>
        <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
          <p>
            Passionnée par l'<span className="text-amber-400 font-semibold">innovation produit</span> dans le secteur <span className="text-amber-400 font-semibold">fintech</span>,
            je souhaite rejoindre Alma en tant que Product Manager Growth.
            Votre approche du <span className="text-amber-400 font-semibold">BNPL</span> et votre croissance de <span className="text-amber-400 font-semibold">300 %</span> en 2023
            témoignent d'une vision produit que je veux contribuer à construire.
          </p>
          <p>
            Fort de 4 ans d'expérience en croissance B2B SaaS, j'ai piloté des roadmaps sur 3 squads
            avec <span className="text-amber-400 font-semibold">Amplitude</span> et <span className="text-amber-400 font-semibold">SQL</span>,
            générant +42 % de rétention J30. Mes 14 A/B tests ont produit +18 % de conversion —
            des résultats directement alignés avec vos défis d'acquisition.
          </p>
          <p>
            Je serais ravi d'échanger sur la façon dont mon expérience en <span className="text-amber-400 font-semibold">OKRs</span> et
            en gestion <span className="text-amber-400 font-semibold">Agile</span> peut accélérer votre croissance.
          </p>
          <p className="pt-1">Cordialement,<br /><span className="font-semibold text-white">Sarah Chen</span></p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="bg-zinc-950/80 border border-emerald-500/20 rounded-xl p-4">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Analyse IA</div>
          <div className="space-y-2.5">
            {[
              { l: "Personnalisation", v: "Élevée ✓", c: "text-emerald-400" },
              { l: "Mots-clés offre", v: "9/10", c: "text-emerald-400" },
              { l: "Ton professionnel", v: "Optimal ✓", c: "text-emerald-400" },
              { l: "Références spécifiques", v: "3 ✓", c: "text-amber-400" },
            ].map((r) => (
              <div key={r.l} className="flex justify-between">
                <span className="text-[10px] text-zinc-600">{r.l}</span>
                <span className={`text-[10px] font-bold ${r.c}`}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-amber-400/[0.06] border border-amber-400/15 rounded-xl p-3 text-center">
          <div className="text-lg font-black text-amber-400">Unique</div>
          <div className="text-[10px] text-zinc-600 mt-0.5">par offre, par entreprise</div>
        </div>
      </div>
    </div>
  );
}

// ─── Interview prep mockup ────────────────────────────────────────────────────
function EntretienMockup() {
  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-3 gap-3 mb-1">
        {[
          { q: "Parlez-moi de vous", tag: "Ouverture", color: "border-blue-500/20 text-blue-400 bg-blue-500/[0.04]" },
          { q: "Pourquoi ce poste ?", tag: "Motivation", color: "border-violet-500/20 text-violet-400 bg-violet-500/[0.04]" },
          { q: "Votre plus grande réussite ?", tag: "STAR", color: "border-amber-400/20 text-amber-400 bg-amber-400/[0.04]" },
        ].map((item) => (
          <div key={item.q} className={`border rounded-xl p-3 ${item.color}`}>
            <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${item.color.split(" ")[1]}`}>{item.tag}</div>
            <div className="text-xs text-zinc-300 font-medium">{item.q}</div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-950/60 border border-amber-400/15 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Question clé</span>
          <span className="text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2 py-0.5 rounded-full">Méthode STAR</span>
        </div>
        <p className="text-sm font-semibold text-white mb-3">&ldquo;Décrivez un projet où vous avez eu un impact mesurable sur la croissance.&rdquo;</p>
        <div className="space-y-2">
          {[
            { label: "Situation", text: "Taux de rétention J30 en baisse à 42 % chez notre SaaS B2B." },
            { label: "Tâche", text: "Piloter un sprint de 6 semaines pour identifier les points de friction." },
            { label: "Action", text: "Analyse Amplitude, 3 A/B tests, refonte onboarding avec UX." },
            { label: "Résultat", text: "+28 points de rétention J30, impact direct +€180k ARR." },
          ].map((s) => (
            <div key={s.label} className="flex gap-2 text-xs">
              <span className="text-amber-400 font-black flex-shrink-0 w-16">{s.label} :</span>
              <span className="text-zinc-400">{s.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-zinc-950/60 border border-white/[0.06] rounded-xl p-4">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Elevator pitch (60 sec)</div>
          <p className="text-xs text-zinc-400 leading-relaxed italic">
            &ldquo;PM Growth avec 4 ans en SaaS B2B, spécialisé en acquisition et rétention. Chez [Entreprise précédente], j'ai ×2 le MRR en 18 mois via data et A/B testing. Je veux apporter cette rigueur data-driven chez Alma.&rdquo;
          </p>
        </div>
        <div className="bg-zinc-950/60 border border-white/[0.06] rounded-xl p-4">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">5 questions à poser</div>
          <ul className="space-y-1.5">
            {["Quels sont vos OKRs pour ce trimestre ?", "Comment vous mesurez le succès du PM ?", "Stack data — Amplitude ou Mixpanel ?"].map((q) => (
              <li key={q} className="text-[11px] text-zinc-400 flex gap-2">
                <span className="text-emerald-400 flex-shrink-0">→</span>{q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── Score mockup ─────────────────────────────────────────────────────────────
function ScoreMockup() {
  return (
    <div className="grid md:grid-cols-[auto,1fr] gap-5">
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#27272a" strokeWidth="10" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#f59e0b" strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - 0.78)}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-amber-400">78</span>
            <span className="text-xs text-zinc-600">/100</span>
          </div>
        </div>
        <div className="text-sm font-bold text-amber-400 mt-1">Très bon</div>
        <div className="text-xs text-zinc-600 mt-0.5">Score global</div>
      </div>

      <div className="space-y-3">
        <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Détail par critère</div>
        {[
          { label: "Pertinence CV / offre",    score: 85, color: "bg-emerald-500" },
          { label: "Mots-clés ATS",             score: 91, color: "bg-emerald-500" },
          { label: "Lettre de motivation",       score: 78, color: "bg-amber-400" },
          { label: "Expérience requise",        score: 70, color: "bg-amber-400" },
          { label: "Compétences techniques",    score: 65, color: "bg-amber-400/70" },
        ].map((c) => (
          <div key={c.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-zinc-400">{c.label}</span>
              <span className="text-xs font-bold text-white">{c.score}/100</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className={`h-full ${c.color} rounded-full transition-all duration-500`} style={{ width: `${c.score}%` }} />
            </div>
          </div>
        ))}

        <div className="bg-amber-400/[0.06] border border-amber-400/15 rounded-xl p-3 mt-2">
          <div className="text-[10px] font-bold text-amber-400 mb-1">Recommandation IA</div>
          <p className="text-[11px] text-zinc-400">Ajoutez des certifications cloud (AWS, GCP) pour booster votre score technique de +15 points.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Auto-apply mockup ────────────────────────────────────────────────────────
function AutoApplyMockup() {
  const offers = [
    { company: "Alma",      job: "PM Growth",         status: "done",    score: 91 },
    { company: "Pennylane", job: "Senior PM",          status: "done",    score: 88 },
    { company: "Qonto",     job: "Head of Product",    status: "done",    score: 85 },
    { company: "Spendesk",  job: "PM Core Banking",    status: "done",    score: 83 },
    { company: "Swile",     job: "Product Lead",       status: "loading", score: 0  },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-zinc-500">Génération en lot — <span className="text-white font-semibold">5 offres</span></div>
        <div className="text-xs text-emerald-400 font-semibold">4/5 terminé ✓</div>
      </div>

      <div className="space-y-2">
        {offers.map((o, i) => (
          <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${
            o.status === "done"
              ? "bg-zinc-900/60 border-white/[0.07]"
              : "bg-amber-400/[0.04] border-amber-400/20"
          }`}>
            <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-[10px] font-black text-zinc-400 flex-shrink-0">
              {o.company.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{o.company} — <span className="text-zinc-400 font-normal">{o.job}</span></div>
              {o.status === "done" ? (
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-emerald-400">CV ✓</span>
                  <span className="text-[10px] text-zinc-700">·</span>
                  <span className="text-[10px] text-emerald-400">Lettre ✓</span>
                </div>
              ) : (
                <div className="text-[10px] text-amber-400 animate-pulse">Génération en cours…</div>
              )}
            </div>
            {o.status === "done" ? (
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div className="text-sm font-black text-emerald-400">{o.score}</div>
                <div className="text-[10px] text-zinc-600">/100</div>
              </div>
            ) : (
              <div className="w-4 h-4 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 pt-1">
        {[
          { label: "Temps total",  value: "4 min 12 s",   sub: "vs 20h manuellement" },
          { label: "CV générés",   value: "5 CV",          sub: "personnalisés" },
          { label: "Score moyen",  value: "86.7/100",      sub: "ATS-ready" },
        ].map((s) => (
          <div key={s.label} className="bg-zinc-900/60 border border-white/[0.06] rounded-xl p-3 text-center">
            <div className="text-base font-black text-amber-400">{s.value}</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">{s.label}</div>
            <div className="text-[9px] text-zinc-700 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const MOCKUPS: Record<TabId, React.ReactNode> = {
  cv:        <CVMockup />,
  lettre:    <LettreMotivationMockup />,
  entretien: <EntretienMockup />,
  score:     <ScoreMockup />,
  auto:      <AutoApplyMockup />,
};

export default function Demo() {
  const [activeTab, setActiveTab] = useState<TabId>("cv");

  return (
    <section id="demo" className="relative bg-zinc-950 py-24 overflow-hidden border-y border-white/[0.04]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 35% at 50% 50%, oklch(0.78 0.13 82 / 0.04), transparent)" }}
        aria-hidden="true"
      />

      <div className="container-narrow mx-auto px-4 relative z-10">

        {/* Header */}
        <div data-reveal className="text-center mb-10">
          <p className="text-xs text-amber-400/60 uppercase tracking-[0.2em] font-semibold mb-4">8 outils inclus dès le premier jour</p>
          <h2
            className="font-display font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
          >
            Tout ce dont vous avez besoin,{" "}
            <span className="text-amber-400">en un seul endroit</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            De la candidature à l&apos;entretien — chaque étape est couverte par l&apos;IA.
          </p>
        </div>

        {/* Tabs */}
        <div data-reveal data-delay="1" className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1 scrollbar-none justify-center flex-wrap">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                  active
                    ? "bg-amber-400 text-zinc-950"
                    : "bg-zinc-900 border border-white/[0.07] text-zinc-400 hover:text-white hover:border-white/[0.12]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main card */}
        <div data-reveal data-delay="2" className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
          {/* Chrome bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-black/20 border-b border-white/[0.06]">
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="flex-1 mx-4">
              <div className="bg-zinc-800/50 rounded-md px-3 py-1 text-xs text-zinc-600 text-center max-w-xs mx-auto">
                jobboost.ai / {activeTab === "cv" ? "generate/cv" : activeTab === "lettre" ? "generate/cover-letter" : activeTab === "entretien" ? "generate/interview" : activeTab === "score" ? "score" : "auto-apply"}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {MOCKUPS[activeTab]}
          </div>
        </div>

        {/* Bottom CTA */}
        <div data-reveal data-delay="3" className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-white font-semibold text-sm">Prêt à tester sur votre vrai profil ?</p>
            <p className="text-zinc-500 text-xs mt-0.5">Première candidature complète gratuite — aucune carte bancaire.</p>
          </div>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-amber-400 text-zinc-950 font-black text-sm px-6 py-3 rounded-xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4" />
            Commencer gratuitement
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
