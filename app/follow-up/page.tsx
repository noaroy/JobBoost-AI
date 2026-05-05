"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import UpgradeWall from "@/components/UpgradeWall";
import CopyButton from "@/components/CopyButton";

export default function FollowUpPage() {
  const [form, setForm] = useState({
    fullName: "",
    targetJob: "",
    company: "",
    applicationDate: "",
    daysSince: "7",
    additionalContext: "",
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
      const res = await fetch("/api/follow-up", {
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
        setError(data.error || "Erreur lors de la génération");
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

      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Retour au dashboard
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <Send className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Email de relance</h1>
            <p className="text-slate-400 text-sm">Générez un email de relance professionnel et percutant</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Votre nom *</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500"
                placeholder="Marie Dupont"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Poste visé *</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500"
                placeholder="Product Manager"
                value={form.targetJob}
                onChange={(e) => update("targetJob", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Entreprise *</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500"
                placeholder="Doctolib"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Date de candidature *</label>
              <input
                type="date"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500"
                value={form.applicationDate}
                onChange={(e) => update("applicationDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Jours depuis la candidature</label>
            <input
              type="number"
              min="1"
              max="60"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500"
              value={form.daysSince}
              onChange={(e) => update("daysSince", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Contexte supplémentaire</label>
            <textarea
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 min-h-[100px]"
              placeholder="J'ai eu un premier contact positif avec leur équipe RH, j'ai une nouvelle réalisation à mentionner..."
              value={form.additionalContext}
              onChange={(e) => update("additionalContext", e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Génération en cours...</>
            ) : (
              <><Send className="w-4 h-4" /> Générer l&apos;email de relance</>
            )}
          </button>
        </form>

        {result && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Votre email de relance</h2>
              <CopyButton text={result} />
            </div>
            <pre className="whitespace-pre-wrap font-sans text-slate-300 text-sm leading-relaxed">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
