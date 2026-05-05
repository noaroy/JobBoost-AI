"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Check } from "lucide-react";
import UpgradeWall from "@/components/UpgradeWall";
import CopyButton from "@/components/CopyButton";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  targetJob: "",
  experience: "",
  education: "",
  skills: "",
  languages: "",
};

export default function CVGeneratorPage() {
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
      const res = await fetch("/api/generate/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 403 && data.upgrade) {
        setShowUpgrade(true);
        return;
      }

      if (!res.ok) throw new Error(data.error ?? "Une erreur est survenue");

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
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <div className="w-px h-4 bg-slate-700" />
          <h1 className="font-semibold text-white">Générateur de CV optimisé IA</h1>
        </div>
      </header>

      <main className="container-wide mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center">
                  <Zap aria-hidden="true" className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h2 className="font-bold text-white">Vos informations</h2>
                  <p className="text-sm text-slate-500">Remplissez pour générer votre CV optimisé</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Prénom et nom *" placeholder="Marie Dupont" value={form.fullName} onChange={(v) => update("fullName", v)} required />
                  <Field label="Email *" placeholder="marie@example.com" value={form.email} onChange={(v) => update("email", v)} type="email" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Téléphone" placeholder="+33 6 12 34 56 78" value={form.phone} onChange={(v) => update("phone", v)} />
                  <Field label="Ville" placeholder="Paris, France" value={form.location} onChange={(v) => update("location", v)} />
                </div>
                <Field label="Poste visé *" placeholder="Ex: Développeur React Senior, Chef de projet digital..." value={form.targetJob} onChange={(v) => update("targetJob", v)} required />
                <Textarea label="Expériences professionnelles *" placeholder="Listez vos expériences. Ex: 2022-2024 – Développeur Frontend chez Acme. J'ai développé..." value={form.experience} onChange={(v) => update("experience", v)} rows={4} required />
                <Textarea label="Formation" placeholder="Ex: Master Informatique – Université Paris-Saclay (2020)" value={form.education} onChange={(v) => update("education", v)} rows={2} />
                <Field label="Compétences" placeholder="React, TypeScript, Node.js, Agile, SQL..." value={form.skills} onChange={(v) => update("skills", v)} />
                <Field label="Langues" placeholder="Français (natif), Anglais (B2)" value={form.languages} onChange={(v) => update("languages", v)} />

                {error && (
                  <div role="alert" aria-live="polite" className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">{error}</div>
                )}

                <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-2xl bg-orange-500 text-white font-bold hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? (<><span className="animate-spin">⚡</span> Génération en cours...</>) : (<><Zap aria-hidden="true" className="w-5 h-5" /> Générer mon CV optimisé</>)}
                </button>
                <p className="text-xs text-center text-slate-600">Résultat en moins de 60 secondes</p>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white">Votre CV généré</h2>
                {result && <CopyButton text={result} />}
              </div>

              {!result && !loading && (
                <div className="h-96 flex items-center justify-center bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-700 text-center">
                  <div>
                    <div className="text-4xl mb-3">📄</div>
                    <p className="text-slate-500 text-sm">Votre CV optimisé apparaîtra ici</p>
                    <p className="text-slate-600 text-xs mt-1">Remplissez le formulaire et cliquez sur Générer</p>
                  </div>
                </div>
              )}
              {loading && (
                <div className="h-96 flex items-center justify-center bg-orange-500/5 rounded-xl border border-orange-500/20 text-center">
                  <div>
                    <div className="text-4xl mb-3 animate-bounce">⚡</div>
                    <p className="text-orange-400 font-medium text-sm">L&apos;IA génère votre CV...</p>
                    <p className="text-slate-500 text-xs mt-1">Optimisation ATS en cours</p>
                  </div>
                </div>
              )}
              {result && (
                <pre className="whitespace-pre-wrap text-sm text-slate-300 leading-relaxed font-sans bg-slate-800 rounded-xl p-4 overflow-y-auto max-h-[600px]">
                  {result}
                </pre>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, type = "text", required = false }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-white placeholder:text-slate-500" />
    </div>
  );
}

function Textarea({ label, placeholder, value, onChange, rows = 3, required = false }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; rows?: number; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} required={required} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-white placeholder:text-slate-500 resize-y" />
    </div>
  );
}
