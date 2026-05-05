"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import UpgradeWall from "@/components/UpgradeWall";
import CopyButton from "@/components/CopyButton";

const initialForm = { targetJob: "", company: "", jobDescription: "", experience: "" };

export default function InterviewPrepPage() {
  const [form, setForm] = useState(initialForm);
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
      const res = await fetch("/api/generate/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  return (
    <div className="min-h-screen bg-slate-950">
      {showUpgrade && <UpgradeWall />}

      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="container-wide mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors min-h-[44px]">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <div className="w-px h-4 bg-slate-700" />
          <h1 className="font-semibold text-white">Préparation entretien IA</h1>
        </div>
      </header>

      <main className="container-wide mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-xl" aria-hidden="true">🎤</div>
              <div>
                <h2 className="font-bold text-white">Préparer votre entretien</h2>
                <p className="text-sm text-slate-500">Questions + réponses STAR personnalisées</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Poste visé *" placeholder="Développeur React Senior" value={form.targetJob} onChange={(v) => update("targetJob", v)} required />
                <Field label="Entreprise *" placeholder="Nom de l'entreprise" value={form.company} onChange={(v) => update("company", v)} required />
              </div>
              <Textarea label="Description du poste *" placeholder="Copiez-collez le texte de l'offre d'emploi ici" value={form.jobDescription} onChange={(v) => update("jobDescription", v)} rows={4} required />
              <Textarea label="Votre expérience *" placeholder="Décrivez votre parcours professionnel et compétences clés" value={form.experience} onChange={(v) => update("experience", v)} rows={3} required />

              {error && (
                <div role="alert" aria-live="polite" className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">{error}</div>
              )}

              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-2xl bg-orange-500 text-white font-bold hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (<><span className="animate-spin">⚡</span> Préparation en cours...</>) : (<><Zap aria-hidden="true" className="w-5 h-5" /> Préparer mon entretien</>)}
              </button>
              <p className="text-xs text-center text-slate-600">Questions clés + réponses STAR + elevator pitch</p>
            </form>
          </div>

          <div>
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white">Votre préparation</h2>
                {result && <CopyButton text={result} />}
              </div>

              {!result && !loading && (
                <div className="h-96 flex items-center justify-center bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-700 text-center">
                  <div>
                    <div className="text-4xl mb-3" aria-hidden="true">🎤</div>
                    <p className="text-slate-500 text-sm">Votre préparation d&apos;entretien apparaîtra ici</p>
                    <p className="text-slate-600 text-xs mt-1">Questions + réponses + conseils</p>
                  </div>
                </div>
              )}
              {loading && (
                <div className="h-96 flex items-center justify-center bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-center">
                  <div>
                    <div className="text-4xl mb-3 animate-bounce" aria-hidden="true">🎤</div>
                    <p className="text-emerald-400 font-medium text-sm">Préparation de votre entretien...</p>
                    <p className="text-slate-500 text-xs mt-1">Analyse du poste et de votre profil</p>
                  </div>
                </div>
              )}
              {result && (
                <pre className="whitespace-pre-wrap text-sm text-slate-300 leading-relaxed font-sans bg-slate-800 rounded-xl p-4 overflow-y-auto max-h-[600px]">{result}</pre>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, required = false }: { label: string; placeholder: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-white placeholder:text-slate-500" />
    </div>
  );
}

function Textarea({ label, placeholder, value, onChange, rows = 3, required = false }: { label: string; placeholder: string; value: string; onChange: (v: string) => void; rows?: number; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} required={required} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-white placeholder:text-slate-500 resize-y" />
    </div>
  );
}
