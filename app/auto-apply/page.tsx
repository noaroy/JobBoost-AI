"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import UpgradeWall from "@/components/UpgradeWall";
import CopyButton from "@/components/CopyButton";

type Offer = { company: string; companyDescription: string; jobDescription: string };
type Result = { company: string; cv: string; coverLetter: string };

export default function AutoApplyPage() {
  const [profile, setProfile] = useState({ fullName: "", targetJob: "", experience: "", skills: "" });
  const [offers, setOffers] = useState<Offer[]>([{ company: "", companyDescription: "", jobDescription: "" }]);
  const [results, setResults] = useState<Result[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);

  function updateOffer(i: number, field: keyof Offer, value: string) {
    setOffers((prev) => prev.map((o, idx) => idx === i ? { ...o, [field]: value } : o));
  }

  function addOffer() {
    if (offers.length < 5) setOffers((o) => [...o, { company: "", companyDescription: "", jobDescription: "" }]);
  }

  function removeOffer(i: number) {
    if (offers.length > 1) setOffers((o) => o.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch("/api/auto-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, offers }),
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
      setResults(data.results);
      setExpanded(0);
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

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Auto-Apply</h1>
            <p className="text-slate-400 text-sm">Générez jusqu&apos;à 5 candidatures complètes en une seule fois</p>
          </div>
        </div>

        <div className="mb-8 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3 flex items-center gap-2">
          <span className="text-orange-400 text-xs font-semibold">Premium</span>
          <span className="text-slate-400 text-xs">Cette fonctionnalité est réservée au plan Premium et Lifetime.</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white">Votre profil</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Nom complet *</label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
                  placeholder="Marie Dupont"
                  value={profile.fullName}
                  onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Poste visé *</label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
                  placeholder="Product Manager"
                  value={profile.targetJob}
                  onChange={(e) => setProfile((p) => ({ ...p, targetJob: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Expérience professionnelle *</label>
              <textarea
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500 min-h-[100px]"
                placeholder="Décrivez vos expériences clés (postes, réalisations, durée)..."
                value={profile.experience}
                onChange={(e) => setProfile((p) => ({ ...p, experience: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Compétences clés</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
                placeholder="React, Python, Gestion de projet, Agile..."
                value={profile.skills}
                onChange={(e) => setProfile((p) => ({ ...p, skills: e.target.value }))}
              />
            </div>
          </div>

          {/* Offers */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Offres ({offers.length}/5)</h2>
              {offers.length < 5 && (
                <button type="button" onClick={addOffer} className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 text-sm transition-colors">
                  <Plus className="w-4 h-4" /> Ajouter une offre
                </button>
              )}
            </div>

            {offers.map((offer, i) => (
              <div key={i} className="border border-slate-700/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm font-medium">Offre {i + 1}</span>
                  {offers.length > 1 && (
                    <button type="button" onClick={() => removeOffer(i)} className="text-slate-600 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
                    placeholder="Entreprise *"
                    value={offer.company}
                    onChange={(e) => updateOffer(i, "company", e.target.value)}
                    required
                  />
                  <input
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
                    placeholder="Description entreprise (optionnel)"
                    value={offer.companyDescription}
                    onChange={(e) => updateOffer(i, "companyDescription", e.target.value)}
                  />
                </div>
                <textarea
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500 min-h-[90px]"
                  placeholder="Description du poste / annonce *"
                  value={offer.jobDescription}
                  onChange={(e) => updateOffer(i, "jobDescription", e.target.value)}
                  required
                />
              </div>
            ))}
          </div>

          {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-lg shadow-lg shadow-orange-500/20"
          >
            {loading ? (
              <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Génération en cours ({offers.length} offres)...</>
            ) : (
              <><Zap className="w-5 h-5" /> Générer {offers.length} candidature{offers.length > 1 ? "s" : ""}</>
            )}
          </button>
        </form>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-white mb-6">
              ✅ {results.length} candidature{results.length > 1 ? "s" : ""} générée{results.length > 1 ? "s" : ""}
            </h2>
            {results.map((r, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-800/50 transition-colors"
                >
                  <span className="font-semibold text-white">{r.company}</span>
                  {expanded === i ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>

                {expanded === i && (
                  <div className="px-6 pb-6 space-y-5 border-t border-slate-800">
                    <div>
                      <div className="flex items-center justify-between mt-4 mb-2">
                        <h3 className="text-sm font-semibold text-slate-300">CV</h3>
                        <CopyButton text={r.cv} />
                      </div>
                      <pre className="whitespace-pre-wrap font-sans text-slate-400 text-xs leading-relaxed bg-slate-800/50 rounded-xl p-4 max-h-[300px] overflow-y-auto">{r.cv}</pre>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-slate-300">Lettre de motivation</h3>
                        <CopyButton text={r.coverLetter} />
                      </div>
                      <pre className="whitespace-pre-wrap font-sans text-slate-400 text-xs leading-relaxed bg-slate-800/50 rounded-xl p-4 max-h-[300px] overflow-y-auto">{r.coverLetter}</pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
