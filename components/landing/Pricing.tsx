"use client";

import Link from "next/link";
import { Check, Zap } from "lucide-react";
import { useState } from "react";

const features = [
  "CV optimisé ATS illimité",
  "Lettres de motivation illimitées",
  "Préparation entretien illimitée",
  "Suggestions d'entreprises",
  "50 templates de lettres (bonus)",
  "20 réponses d'entretien (bonus)",
  "Checklist job 30 jours (bonus)",
  "Export PDF & Word",
  "Support par email",
];

const freePlanFeatures = [
  "1 candidature complète",
  "CV optimisé ATS",
  "Lettre de motivation",
  "Préparation entretien",
];

export default function Pricing() {
  const [period, setPeriod] = useState<"monthly" | "lifetime">("lifetime");

  return (
    <section id="pricing" className="section bg-gray-50">
      <div className="container-narrow mx-auto">
        <div className="text-center mb-12">
          <span className="badge bg-blue-50 text-blue-600 border border-blue-100 mb-4">Tarifs</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, <span className="gradient-text">transparent</span>, sans surprise
          </h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">
            Commencez gratuitement. Passez à l'accès complet quand vous êtes prêt.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-10">
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all ${
              period === "monthly"
                ? "bg-blue-600 text-white shadow"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setPeriod("lifetime")}
            className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
              period === "lifetime"
                ? "bg-blue-600 text-white shadow"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            Paiement unique
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">Populaire</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free plan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Gratuit</h3>
              <p className="text-gray-500 text-sm">Pour tester et vous convaincre</p>
              <div className="mt-4">
                <span className="text-5xl font-black text-gray-900">0€</span>
                <span className="text-gray-400 ml-2">pour commencer</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {freePlanFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/signup" className="btn-secondary w-full text-center block">
              Essayer gratuitement →
            </Link>
          </div>

          {/* Paid plan */}
          <div className="bg-gradient-to-b from-blue-600 to-indigo-700 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full">
              ⚡ MEILLEURE VALEUR
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Accès Complet</h3>
              <p className="text-blue-200 text-sm">Candidatures illimitées + tous les bonus</p>
              <div className="mt-4">
                {period === "lifetime" ? (
                  <>
                    <span className="text-5xl font-black text-white">80€</span>
                    <span className="text-blue-200 ml-2">paiement unique</span>
                    <div className="text-blue-200 text-sm mt-1">Accès à vie — plus jamais à payer</div>
                  </>
                ) : (
                  <>
                    <span className="text-5xl font-black text-white">39,99€</span>
                    <span className="text-blue-200 ml-2">/mois</span>
                    <div className="text-blue-200 text-sm mt-1">Résiliable à tout moment</div>
                  </>
                )}
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white">
                  <Check className="w-4 h-4 text-green-300 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/signup?plan=paid"
              className="w-full flex items-center justify-center gap-2 bg-white text-blue-700 font-bold py-4 px-6 rounded-xl hover:bg-blue-50 transition-colors text-base"
            >
              <Zap className="w-5 h-5" />
              {period === "lifetime" ? "Obtenir l'accès à vie — 80€" : "Démarrer pour 39,99€/mois"}
            </Link>
            <p className="text-blue-200 text-xs text-center mt-3">
              Paiement sécurisé • Satisfait ou remboursé 7 jours
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Paiement sécurisé par Stripe. Vous pouvez annuler à tout moment.
        </p>
      </div>
    </section>
  );
}
