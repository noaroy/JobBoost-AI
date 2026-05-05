"use client";

import Link from "next/link";
import { Check, Zap, Star } from "lucide-react";

const plans = [
  {
    name: "Gratuit",
    price: "0€",
    period: "",
    desc: "Pour tester la qualité",
    features: [
      "1 candidature complète",
      "CV optimisé ATS",
      "Lettre de motivation",
      "Préparation entretien basique",
    ],
    cta: "Commencer gratuitement",
    href: "/signup",
    style: "bg-slate-900 border-slate-800",
    ctaStyle: "bg-slate-800 hover:bg-slate-700 text-white",
    featured: false,
  },
  {
    name: "Basic",
    price: "29,99€",
    period: "/mois",
    desc: "Pour une recherche active",
    features: [
      "Candidatures illimitées",
      "CV + lettre illimités",
      "Simulation d'entretien IA",
      "Score de candidature /100",
      "Dashboard de suivi",
      "Templates exclusifs",
      "Support email",
    ],
    cta: "Démarrer Basic",
    href: "/signup?plan=basic",
    style: "bg-slate-900 border-blue-500/30",
    ctaStyle: "bg-blue-600 hover:bg-blue-500 text-white",
    featured: false,
  },
  {
    name: "Premium",
    price: "39,99€",
    period: "/mois",
    desc: "Le plus populaire — tout inclus",
    features: [
      "Tout Basic inclus",
      "Auto-Apply en lot (5 offres/fois)",
      "Relances automatiques IA",
      "Plan d'action quotidien",
      "Job matching personnalisé",
      "Coach IA illimité",
      "Support prioritaire",
    ],
    cta: "Passer Premium",
    href: "/signup?plan=premium",
    style: "bg-gradient-to-b from-blue-950/80 to-violet-950/60 border-violet-500/50",
    ctaStyle: "bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-lg shadow-blue-500/20",
    featured: true,
  },
  {
    name: "Lifetime",
    price: "99,99€",
    period: " unique",
    desc: "Accès à vie, plus jamais à payer",
    features: [
      "Tout Premium inclus",
      "Accès à vie",
      "Toutes les futures fonctionnalités",
      "Support VIP",
    ],
    cta: "Accès Lifetime",
    href: "/signup?plan=lifetime",
    style: "bg-gradient-to-b from-amber-950/40 to-slate-900 border-amber-500/30",
    ctaStyle: "bg-amber-500 hover:bg-amber-400 text-white",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-slate-950 py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-sm text-slate-300 font-medium">Tarifs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Simple, transparent,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              sans surprise
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-xl mx-auto">
            Commencez gratuitement. Passez au niveau supérieur quand vous êtes prêt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`relative rounded-2xl border p-6 flex flex-col ${plan.style}`}>
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  <Star className="w-3 h-3 fill-white" />
                  PLUS POPULAIRE
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-xs mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-xl transition-all text-sm ${plan.ctaStyle}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 text-slate-500 text-sm">
          Paiement sécurisé par Stripe · Résiliable à tout moment · Satisfait ou remboursé 7 jours
        </div>
      </div>
    </section>
  );
}
