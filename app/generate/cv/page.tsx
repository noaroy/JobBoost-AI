"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Copy, Download, Check } from "lucide-react";

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
      const res = await fetch("/api/generate/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Une erreur est survenue");
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
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <div className="w-px h-4 bg-gray-200" />
          <h1 className="font-semibold text-gray-900">Générateur de CV optimisé IA</h1>
        </div>
      </header>

      <main className="container-wide mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Vos informations</h2>
                  <p className="text-sm text-gray-400">Remplissez pour générer votre CV optimisé</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Prénom et nom *" placeholder="Marie Dupont" value={form.fullName} onChange={(v) => update("fullName", v)} />
                  <Field label="Email *" placeholder="marie@example.com" value={form.email} onChange={(v) => update("email", v)} type="email" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Téléphone" placeholder="+33 6 12 34 56 78" value={form.phone} onChange={(v) => update("phone", v)} />
                  <Field label="Ville" placeholder="Paris, France" value={form.location} onChange={(v) => update("location", v)} />
                </div>
                <Field
                  label="Poste visé *"
                  placeholder="Ex: Développeur React Senior, Chef de projet digital..."
                  value={form.targetJob}
                  onChange={(v) => update("targetJob", v)}
                  required
                />
                <Textarea
                  label="Expériences professionnelles *"
                  placeholder="Listez vos expériences. Ex: 2022-2024 – Développeur Frontend chez Acme Corp. J'ai développé..."
                  value={form.experience}
                  onChange={(v) => update("experience", v)}
                  rows={4}
                  required
                />
                <Textarea
                  label="Formation"
                  placeholder="Ex: Master Informatique – Université Paris-Saclay (2020)"
                  value={form.education}
                  onChange={(v) => update("education", v)}
                  rows={2}
                />
                <Field label="Compétences" placeholder="React, TypeScript, Node.js, Agile, SQL..." value={form.skills} onChange={(v) => update("skills", v)} />
                <Field label="Langues" placeholder="Français (natif), Anglais (B2), Espagnol (A2)" value={form.languages} onChange={(v) => update("languages", v)} />

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary btn-large disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin">⚡</span>
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Générer mon CV optimisé
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-gray-400">Résultat en moins de 60 secondes</p>
              </form>
            </div>
          </div>

          {/* Result */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Votre CV généré</h2>
                {result && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copié !" : "Copier"}
                    </button>
                  </div>
                )}
              </div>

              {!result && !loading && (
                <div className="h-96 flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-center">
                  <div>
                    <div className="text-4xl mb-3">📄</div>
                    <p className="text-gray-400 text-sm">Votre CV optimisé apparaîtra ici</p>
                    <p className="text-gray-300 text-xs mt-1">Remplissez le formulaire et cliquez sur Générer</p>
                  </div>
                </div>
              )}

              {loading && (
                <div className="h-96 flex items-center justify-center bg-blue-50 rounded-xl border border-blue-100 text-center">
                  <div>
                    <div className="text-4xl mb-3 animate-bounce">⚡</div>
                    <p className="text-blue-600 font-medium text-sm">L'IA génère votre CV...</p>
                    <p className="text-blue-400 text-xs mt-1">Optimisation ATS en cours</p>
                  </div>
                </div>
              )}

              {result && (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans bg-gray-50 rounded-xl p-4 overflow-y-auto max-h-[600px]">
                    {result}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      />
    </div>
  );
}

function Textarea({
  label,
  placeholder,
  value,
  onChange,
  rows = 3,
  required = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-y"
      />
    </div>
  );
}
