"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Copy, Check } from "lucide-react";

const initialForm = {
  targetJob: "",
  location: "",
  skills: "",
  preferences: "",
};

export default function CompaniesPage() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/generate/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erreur");
      }
      const data = await res.json();
      setResult(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container-wide mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <div className="w-px h-4 bg-gray-200" />
          <h1 className="font-semibold text-gray-900">Suggestions d'entreprises IA</h1>
        </div>
      </header>

      <main className="container-wide mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-xl">🏢</div>
              <div>
                <h2 className="font-bold text-gray-900">Trouvez les meilleures entreprises</h2>
                <p className="text-sm text-gray-400">10 entreprises ciblées + stratégie LinkedIn</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Poste recherché *" placeholder="Développeur React, Chef de projet, Commercial..." value={form.targetJob} onChange={(v) => update("targetJob", v)} required />
              <Field label="Localisation *" placeholder="Paris, Lyon, Bordeaux, Remote..." value={form.location} onChange={(v) => update("location", v)} required />
              <Field label="Compétences clés" placeholder="React, TypeScript, Gestion de projet, CRM..." value={form.skills} onChange={(v) => update("skills", v)} />
              <Textarea
                label="Vos préférences"
                placeholder="Type d'entreprise (startup, grand groupe, PME), secteur (fintech, santé, e-commerce), culture, taille..."
                value={form.preferences}
                onChange={(v) => update("preferences", v)}
                rows={3}
              />

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
              )}

              <button type="submit" disabled={loading} className="w-full btn-primary btn-large disabled:opacity-60">
                {loading ? (
                  <><span className="animate-spin">⚡</span> Recherche en cours...</>
                ) : (
                  <><Zap className="w-5 h-5" /> Trouver mes entreprises cibles</>
                )}
              </button>
            </form>
          </div>

          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Vos entreprises cibles</h2>
                {result && (
                  <button onClick={handleCopy} className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copié !" : "Copier"}
                  </button>
                )}
              </div>
              {!result && !loading && (
                <div className="h-96 flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-center">
                  <div>
                    <div className="text-4xl mb-3">🏢</div>
                    <p className="text-gray-400 text-sm">10 entreprises ciblées apparaîtront ici</p>
                  </div>
                </div>
              )}
              {loading && (
                <div className="h-96 flex items-center justify-center bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                  <div>
                    <div className="text-4xl mb-3 animate-bounce">🏢</div>
                    <p className="text-emerald-600 font-medium text-sm">Recherche d'entreprises...</p>
                  </div>
                </div>
              )}
              {result && (
                <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans bg-gray-50 rounded-xl p-4 overflow-y-auto max-h-[600px]">
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

function Field({ label, placeholder, value, onChange, required = false }: { label: string; placeholder: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
    </div>
  );
}

function Textarea({ label, placeholder, value, onChange, rows = 3, required = false }: { label: string; placeholder: string; value: string; onChange: (v: string) => void; rows?: number; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} required={required} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-y" />
    </div>
  );
}
