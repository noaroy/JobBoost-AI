"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import UpgradeWall from "@/components/UpgradeWall";
import CopyButton from "@/components/CopyButton";

export default function ActionPlanPage() {
  const [form, setForm] = useState({
    targetJob: "",
    location: "",
    experienceLevel: "Intermédiaire",
    applicationsCount: "0",
    responsesCount: "0",
    daysSearching: "0",
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
      const res = await fetch("/api/action-plan", {
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
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Plan d&apos;action hebdomadaire</h1>
            <p className="text-slate-400 text-sm">Votre coach IA génère un plan personnalisé pour cette semaine</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Poste visé *</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500"
                placeholder="Data Analyst"
                value={form.targetJob}
                onChange={(e) => update("targetJob", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Localisation *</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500"
                placeholder="Paris / Remote"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Niveau d&apos;expérience</label>
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500"
              value={form.experienceLevel}
              onChange={(e) => update("experienceLevel", e.target.value)}
            >
              <option>Débutant (0-2 ans)</option>
              <option>Intermédiaire</option>
              <option>Senior (5+ ans)</option>
              <option>Expert / Manager</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Candidatures envoyées</label>
              <input
                type="number"
                min="0"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500"
                value={form.applicationsCount}
                onChange={(e) => update("applicationsCount", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Réponses reçues</label>
              <input
                type="number"
                min="0"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500"
                value={form.responsesCount}
                onChange={(e) => update("responsesCount", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Jours de recherche</label>
              <input
                type="number"
                min="0"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500"
                value={form.daysSearching}
                onChange={(e) => update("daysSearching", e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Génération du plan...</>
            ) : (
              <><Calendar className="w-4 h-4" /> Générer mon plan d&apos;action</>
            )}
          </button>
        </form>

        {result && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Votre plan de la semaine</h2>
              <CopyButton text={result} />
            </div>
            <pre className="whitespace-pre-wrap font-sans text-slate-300 text-sm leading-relaxed">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
