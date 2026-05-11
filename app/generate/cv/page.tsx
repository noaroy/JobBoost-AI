"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Copy, Check } from "lucide-react";
import UpgradeWall from "@/components/UpgradeWall";
import MarkdownOutput from "@/components/MarkdownOutput";

const LOADING_STEPS = [
  "Analyse de l'offre d'emploi...",
  "Extraction des mots-clés ATS...",
  "Structuration de votre profil...",
  "Optimisation pour les recruteurs...",
];

const GHOST_WIDTHS = [85, 70, 90, 55, 75, 88, 60, 78, 65, 82, 50, 70];

export default function CVGeneratorPage() {
  const [jobOffer, setJobOffer] = useState("");
  const [experience, setExperience] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    if (!loading) return;
    const t = setInterval(() => setLoadingStep((s) => (s + 1) % LOADING_STEPS.length), 2200);
    return () => clearInterval(t);
  }, [loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/generate/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobOffer, experience }),
      });
      const data = await res.json();
      if (res.status === 403 && data.upgrade) { setShowUpgrade(true); return; }
      if (!res.ok) throw new Error(data.error ?? "Erreur lors de la génération");
      setResult(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {showUpgrade && <UpgradeWall onClose={() => setShowUpgrade(false)} />}

      <header className="bg-slate-900/80 backdrop-blur border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <div className="w-px h-4 bg-slate-700" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-white text-sm">CV optimisé ATS</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            IA active
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 lg:py-10">
        <div className="grid lg:grid-cols-[420px_1fr] gap-6 items-start">

          {/* ── Input panel ── */}
          <div className="lg:sticky lg:top-20">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
              <div className="mb-5">
                <p className="text-xs font-semibold text-orange-400 tracking-widest uppercase mb-2">Générateur IA</p>
                <h2 className="text-lg font-black text-white">CV optimisé ATS</h2>
                <p className="text-slate-400 text-sm mt-1">Collez l&apos;offre + votre expérience. L&apos;IA génère un CV prêt à envoyer.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Offre d&apos;emploi <span className="text-orange-400">*</span>
                  </label>
                  <textarea
                    value={jobOffer}
                    onChange={(e) => setJobOffer(e.target.value)}
                    required
                    rows={7}
                    placeholder={`Nous recherchons un(e) Développeur React Senior pour rejoindre notre équipe chez Payfit.

Missions :
- Développer de nouvelles fonctionnalités produit
- Travailler en collaboration avec les équipes design et backend
- Participer aux code reviews et à l'amélioration continue

Profil :
- 4+ ans d'expérience en React
- Maîtrise de TypeScript et Next.js
- Sensibilité UX et orientation produit`}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-white placeholder:text-slate-600 resize-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Votre expérience / CV actuel <span className="text-orange-400">*</span>
                  </label>
                  <textarea
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                    rows={5}
                    placeholder={`Développeur Frontend chez Doctolib (2021–2024)
- Refonte de l'interface patient, +25% satisfaction
- Migration React class → hooks sur 40k lignes de code

Développeur React chez une startup SaaS (2019–2021)
- Développé le dashboard principal de 0 à 10k utilisateurs

Master Informatique – Université Paris-Saclay
Compétences : React, TypeScript, GraphQL, Node.js`}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-white placeholder:text-slate-600 resize-none transition-colors"
                  />
                </div>

                {error && (
                  <div role="alert" className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Génération en cours...</>
                  ) : (
                    <><Zap className="w-4 h-4" /> Générer mon CV optimisé ATS</>
                  )}
                </button>
                <p className="text-center text-xs text-slate-600">⚡ Résultat en ~15 secondes · Copie en 1 clic</p>
              </form>
            </div>
          </div>

          {/* ── Output panel ── */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <span className="font-semibold text-white text-sm">Votre CV optimisé ATS</span>
              </div>
              {result && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg px-3 py-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copié !" : "Copier"}
                </button>
              )}
            </div>

            <div className="p-6 min-h-[500px]">
              {!result && !loading && (
                <div className="space-y-2.5">
                  <p className="text-xs text-slate-600 mb-4">Aperçu du résultat ↓</p>
                  {GHOST_WIDTHS.map((w, i) => (
                    <div key={i} className="h-3 bg-slate-800 rounded-full opacity-60" style={{ width: `${w}%` }} />
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <Zap className="w-7 h-7 text-orange-400 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-orange-500/5 animate-ping" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">L&apos;IA génère votre CV...</p>
                    <p className="text-orange-400 text-xs animate-pulse">{LOADING_STEPS[loadingStep]}</p>
                  </div>
                </div>
              )}

              {result && <MarkdownOutput content={result} />}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
