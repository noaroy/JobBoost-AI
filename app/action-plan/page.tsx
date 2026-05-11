"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Copy, Check } from "lucide-react";
import UpgradeWall from "@/components/UpgradeWall";
import MarkdownOutput from "@/components/MarkdownOutput";

const LOADING_STEPS = [
  "Analyse de votre situation...",
  "Identification des priorités...",
  "Planification de la semaine...",
  "Optimisation du plan d'action...",
];

const GHOST_WIDTHS = [82, 68, 90, 55, 78, 88, 62, 75, 85, 58, 70, 50];

export default function ActionPlanPage() {
  const [situation, setSituation] = useState("");
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
      const res = await fetch("/api/action-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation }),
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
            <div className="w-5 h-5 bg-violet-600 rounded flex items-center justify-center">
              <Calendar className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-white text-sm">Plan d&apos;action</span>
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
                <p className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-2">Coach IA</p>
                <h2 className="text-lg font-black text-white">Plan d&apos;action de la semaine</h2>
                <p className="text-slate-400 text-sm mt-1">Décrivez votre situation. Votre coach IA crée un plan personnalisé.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Votre situation actuelle <span className="text-orange-400">*</span>
                  </label>
                  <textarea
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    required
                    rows={8}
                    placeholder={`Développeur React, je cherche un poste à Paris ou en remote depuis 3 semaines.
J'ai envoyé 15 candidatures, reçu 2 réponses positives (1 entretien RH passé, 1 en attente) et 4 refus.

Mon profil : 5 ans d'XP, spécialisé React/TypeScript, niveau senior.
Je vise des startups tech (série A/B) avec un salaire entre 65 et 75k€.

Problème : je pense que mon CV n'est pas assez percutant et je manque de réseau LinkedIn.
Disponible : 2h par jour pour ma recherche.`}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm text-white placeholder:text-slate-600 resize-none transition-colors"
                  />
                  <p className="text-xs text-slate-600 mt-1.5">Plus c&apos;est précis, plus le plan sera personnalisé</p>
                </div>

                {error && (
                  <div role="alert" className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all shadow-lg shadow-violet-500/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Création du plan...</>
                  ) : (
                    <><Calendar className="w-4 h-4" /> Créer mon plan d&apos;action personnalisé</>
                  )}
                </button>
                <p className="text-center text-xs text-slate-600">⚡ Diagnostic · Objectifs SMART · Plan Lun–Ven</p>
              </form>
            </div>
          </div>

          {/* ── Output panel ── */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="font-semibold text-white text-sm">Votre plan de la semaine</span>
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
                    <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                      <Calendar className="w-7 h-7 text-violet-400 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-violet-500/5 animate-ping" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">Création de votre plan...</p>
                    <p className="text-violet-400 text-xs animate-pulse">{LOADING_STEPS[loadingStep]}</p>
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
