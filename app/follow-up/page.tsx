"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Copy, Check } from "lucide-react";
import UpgradeWall from "@/components/UpgradeWall";
import MarkdownOutput from "@/components/MarkdownOutput";

const LOADING_STEPS = [
  "Analyse du contexte...",
  "Calibrage du ton professionnel...",
  "Rédaction de l'email...",
  "Optimisation du message...",
];

const GHOST_WIDTHS = [70, 88, 60, 80, 72, 90, 55, 76, 85, 63, 78, 50];

export default function FollowUpPage() {
  const [context, setContext] = useState("");
  const [previousMessage, setPreviousMessage] = useState("");
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
      const res = await fetch("/api/follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, previousMessage: previousMessage || undefined }),
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
            <div className="w-5 h-5 bg-amber-500 rounded flex items-center justify-center">
              <Send className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-white text-sm">Email de relance</span>
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
                <p className="text-xs font-semibold text-amber-400 tracking-widest uppercase mb-2">Rédaction IA</p>
                <h2 className="text-lg font-black text-white">Email de relance</h2>
                <p className="text-slate-400 text-sm mt-1">Décrivez la situation en 2 phrases. Email prêt en 10 secondes.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Contexte de la relance <span className="text-orange-400">*</span>
                  </label>
                  <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    required
                    rows={5}
                    placeholder={`Product Manager chez Doctolib, candidature envoyée il y a 10 jours.
J'ai eu un premier échange téléphonique positif avec leur RH la semaine dernière.
Ils m'ont dit qu'ils prendraient une décision sous 2 semaines.
Je veux relancer sans être insistant.`}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm text-white placeholder:text-slate-600 resize-none transition-colors"
                  />
                  <p className="text-xs text-slate-600 mt-1.5">Incluez : poste, entreprise, délai, contexte particulier</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Message précédent <span className="text-slate-500 font-normal text-xs">(optionnel)</span>
                  </label>
                  <textarea
                    value={previousMessage}
                    onChange={(e) => setPreviousMessage(e.target.value)}
                    rows={3}
                    placeholder="Collez ici votre message d'origine ou la réponse du recruteur pour un contexte plus précis..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm text-white placeholder:text-slate-600 resize-none transition-colors"
                  />
                </div>

                {error && (
                  <div role="alert" className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm transition-all shadow-lg shadow-amber-500/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Rédaction en cours...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Générer mon email de relance</>
                  )}
                </button>
                <p className="text-center text-xs text-slate-600">⚡ Objet + corps · Ton professionnel · Prêt à envoyer</p>
              </form>
            </div>
          </div>

          {/* ── Output panel ── */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-semibold text-white text-sm">Votre email de relance</span>
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

            <div className="p-6 min-h-[400px]">
              {!result && !loading && (
                <div className="space-y-2.5">
                  <p className="text-xs text-slate-600 mb-4">Aperçu du résultat ↓</p>
                  {GHOST_WIDTHS.map((w, i) => (
                    <div key={i} className="h-3 bg-slate-800 rounded-full opacity-60" style={{ width: `${w}%` }} />
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Send className="w-7 h-7 text-amber-400 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-amber-500/5 animate-ping" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">Rédaction de votre email...</p>
                    <p className="text-amber-400 text-xs animate-pulse">{LOADING_STEPS[loadingStep]}</p>
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
