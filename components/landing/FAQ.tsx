"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "C'est vraiment gratuit pour commencer ?",
    a: "Oui. Votre première candidature complète — CV + lettre + score — est entièrement gratuite. Pas de carte bancaire, pas de période d'essai qui se transforme en abonnement. Vous voyez ce que ça donne avant de décider quoi que ce soit.",
  },
  {
    q: "Est-ce que ma candidature va avoir l'air générée par une IA ?",
    a: "C'est la question que tout le monde pose, et c'est légitime. La réponse courte : non, si vous prenez 2 minutes pour la relire. L'IA structure et intègre les mots-clés — mais c'est votre expérience, votre parcours, votre voix. On vous recommande toujours de relire et d'ajuster une phrase ou deux avant d'envoyer.",
  },
  {
    q: "Quelle différence entre Basic, Premium et Lifetime ?",
    a: "Basic (29,99€/mois) : candidatures illimitées, simulation d'entretien, score /100. Premium (39,99€/mois) : tout Basic + Auto-Apply en lot (5 offres simultanées), relances automatiques, plan d'action hebdomadaire. Lifetime (99,99€ une fois) : accès Premium à vie — rentabilisé après 2-3 mois d'abonnement Premium.",
  },
  {
    q: "Comment l'IA sait quels mots-clés utiliser ?",
    a: "Elle analyse le texte exact de l'offre que vous collez — les mots qui reviennent, ceux en gras, ceux dans le titre du poste. Ces mots sont ceux que l'ATS va chercher. Elle les intègre naturellement dans votre CV sans les forcer. Ce n'est pas du keyword stuffing — c'est de la reformulation intelligente.",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Vos données sont chiffrées en transit (SSL) et stockées sur des serveurs européens conformes au RGPD. On ne vend pas vos données, on ne les utilise pas pour entraîner des modèles sans votre consentement. Le détail est dans notre politique de confidentialité — rédigée en français lisible, pas en jargon juridique.",
  },
  {
    q: "Comment fonctionne la simulation d'entretien ?",
    a: "Vous décrivez le poste et l'entreprise, et l'IA adapte les questions à ce contexte. Elle pose des questions comportementales (STAR), techniques selon le domaine, et motivationnelles. Vous répondez par écrit, elle vous donne un retour détaillé sur chaque réponse. C'est brutal dans le bon sens — elle n'est pas là pour vous ménager.",
  },
  {
    q: "Et si ça ne me convient pas ?",
    a: "7 jours satisfait ou remboursé, sans condition. Envoyez un email et on rembourse — pas de questionnaire, pas de processus compliqué. Si ça ne vous a pas aidé, on ne va pas se battre pour garder votre argent.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-white text-sm md:text-base">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-zinc-600 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-zinc-400 text-sm leading-relaxed pb-5">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative bg-zinc-900/20 py-24 border-t border-white/[0.05]">
      <div className="container-narrow mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs text-zinc-600 uppercase tracking-[0.2em] font-semibold mb-4">Questions fréquentes</p>
          <h2 className="text-4xl font-black text-white mb-4">
            Ce que vous vous demandez sûrement
          </h2>
          <p className="text-zinc-500 text-lg">
            Réponses directes, sans remplissage.
          </p>
        </div>

        <div className="bg-zinc-950 border border-white/[0.07] rounded-2xl px-6 md:px-8">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
