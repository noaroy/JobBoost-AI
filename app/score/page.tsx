"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart2 } from "lucide-react";
import UpgradeWall from "@/components/UpgradeWall";
import CopyButton from "@/components/CopyButton";

export default function ScorePage() {
  const [form, setForm] = useState({
    targetJob: "",
    company: "",
    cvContent: "",
    coverLetterContent: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.status === 403 && data.upgrade) {
        setShowUpgrade(true);
        return;
      }
      if (!res.ok) {
        setError(data.error || "Erreur lors de l'évaluation");
        return;
      }
      setResult(data.content);
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {showUpgrade && <UpgradeWall onClose={() => setShowUpgrade(false)} />}

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Retour au dashboard
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Score de candidature</h1>
            <p className="text-slate-400 text-sm">Évaluez votre dossier et obtenez un score /100 avec des recommandations</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Poste visé *</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                placeholder="Développeur React"
                value={form.targetJob}
                onChange={(e) => update("targetJob", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Entreprise *</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                placeholder="Spotify"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Contenu de votre CV *</label>
            <textarea
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 min-h-[140px]"
              placeholder="Collez le contenu de votre CV ici..."
              value={form.cvContent}
              onChange={(e) => update("cvContent", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Lettre de motivation *</label>
            <textarea
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 min-h-[140px]"
              placeholder="Collez votre lettre de motivation ici..."
              value={form.coverLetterContent}
              onChange={(e) => update("coverLetterContent", e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Évaluation en cours...</>
            ) : (
              <><BarChart2 className="w-4 h-4" /> Évaluer ma candidature</>
            )}
          </button>
        </form>

        {result && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Résultat de l&apos;évaluation</h2>
              <CopyButton text={result} />
            </div>
            <div className="prose prose-sm prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-slate-300 text-sm leading-relaxed">{result}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
