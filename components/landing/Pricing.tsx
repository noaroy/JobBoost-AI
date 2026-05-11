"use client";

import Link from "next/link";
import { Check, Star } from "lucide-react";

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
    cardStyle: "bg-zinc-900 border-zinc-800",
    ctaStyle: "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold",
    checkColor: "text-emerald-400",
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
    cardStyle: "bg-zinc-900 border-zinc-800",
    ctaStyle: "bg-zinc-700 hover:bg-zinc-600 text-white font-semibold",
    checkColor: "text-emerald-400",
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
    cardStyle: "bg-zinc-900 border-amber-400/30 ring-1 ring-amber-400/10 shadow-xl shadow-amber-400/[0.06]",
    ctaStyle: "bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black shadow-lg shadow-amber-400/20",
    checkColor: "text-amber-400",
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
    cardStyle: "bg-zinc-900 border-zinc-700",
    ctaStyle: "bg-zinc-700 hover:bg-zinc-600 text-zinc-200 font-semibold",
    checkColor: "text-emerald-400",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-zinc-950 py-24">
      <div className="container-wide mx-auto px-4 relative z-10">
        <div data-reveal className="text-center mb-16">
          <p className="text-xs text-zinc-600 uppercase tracking-[0.2em] font-semibold mb-4">Tarifs</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Simple, transparent,{" "}
            <span className="text-zinc-600 font-medium">sans surprise</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-xl mx-auto">
            Commencez gratuitement. Passez au niveau supérieur quand vous êtes prêt.
          </p>
        </div>

        <div data-reveal data-delay="1" className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`relative rounded-2xl border p-6 flex flex-col transition-all ${plan.cardStyle}`}>
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-amber-400 text-zinc-950 text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-amber-400/30 whitespace-nowrap">
                  <Star className="w-3 h-3 fill-zinc-950" />
                  PLUS POPULAIRE
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-zinc-500 text-xs mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-zinc-500 text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.checkColor}`} />
                    <span className="text-zinc-300">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all text-sm ${plan.ctaStyle}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div data-reveal data-delay="2" className="text-center mt-10 text-zinc-600 text-sm">
          Paiement sécurisé par Stripe · Résiliable à tout moment · Satisfait ou remboursé 7 jours
        </div>
      </div>
    </section>
  );
}
