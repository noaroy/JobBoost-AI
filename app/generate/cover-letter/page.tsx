"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import UpgradeWall from "@/components/UpgradeWall";
import CopyButton from "@/components/CopyButton";

const initialForm = {
  fullName: "",
  targetJob: "",
  company: "",
  jobDescription: "",
  experience: "",
  motivation: "",
};

export default function CoverLetterPage() {
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
      const res = await fetch("/api/generate/cover-letter", {
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
          <h1 className="font-semibold text-white truncate">Générateur de lettre de motivation automatique</h1>
        </div>
      </header>

      <main className="container-wide mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center justify-center text-xl" aria-hidden="true">✉️</div>
              <div>
                <h2 className="font-bold text-white">Informations de la candidature</h2>
                <p className="text-sm text-slate-500">Plus c&apos;est précis, meilleure est la lettre</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Votre nom complet *" placeholder="Marie Dupont" value={form.fullName} onChange={(v) => update("fullName", v)} required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Poste visé *" placeholder="Développeur React" value={form.targetJob} onChange={(v) => update("targetJob", v)} required />
                <Field label="Entreprise *" placeholder="Spotify, Google, startup..." value={form.company} onChange={(v) => update("company", v)} required />
              </div>
              <Textarea label="Description du poste (coller l'annonce) *" placeholder="Copiez-collez ici le texte complet de l'offre d'emploi. Plus il est détaillé, meilleure sera la lettre." value={form.jobDescription} onChange={(v) => update("jobDescription", v)} rows={5} required />
              <Textarea label="Votre expérience pertinente *" placeholder="Décrivez brièvement votre parcours et ce qui vous rend pertinent pour CE poste." value={form.experience} onChange={(v) => update("experience", v)} rows={3} required />
              <Textarea label="Vos motivations pour cette entreprise" placeholder="Pourquoi cette entreprise en particulier ? Mission, culture, projets..." value={form.motivation} onChange={(v) => update("motivation", v)} rows={2} />

              {error && (
                <div role="alert" aria-live="polite" className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">{error}</div>
              )}

              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-2xl bg-orange-500 text-white font-bold hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (<><span className="animate-spin">⚡</span> Génération en cours...</>) : (<><Zap aria-hidden="true" className="w-5 h-5" /> Générer ma lettre de motivation</>)}
              </button>
            </form>
          </div>

          <div>
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white">Votre lettre générée</h2>
                {result && <CopyButton text={result} />}
              </div>

              {!result && !loading && (
                <div className="h-96 flex items-center justify-center bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-700 text-center">
                  <div>
                    <div className="text-4xl mb-3" aria-hidden="true">✉️</div>
                    <p className="text-slate-500 text-sm">Votre lettre de motivation apparaîtra ici</p>
                  </div>
                </div>
              )}
              {loading && (
                <div className="h-96 flex items-center justify-center bg-violet-500/5 rounded-xl border border-violet-500/20 text-center">
                  <div>
                    <div className="text-4xl mb-3 animate-bounce" aria-hidden="true">✉️</div>
                    <p className="text-violet-400 font-medium text-sm">Rédaction de votre lettre...</p>
                    <p className="text-slate-500 text-xs mt-1">Personnalisation pour {form.company || "cette entreprise"}</p>
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
