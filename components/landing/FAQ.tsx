"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Est-ce vraiment gratuit pour commencer ?",
    a: "Oui, votre première candidature complète (CV + lettre + préparation entretien) est 100% gratuite, sans carte bancaire. Vous voyez la qualité avant de payer quoi que ce soit.",
  },
  {
    q: "L'IA fait tout ? Je dois vérifier quoi ?",
    a: "L'IA génère 95% du travail. Il vous reste à vérifier les informations personnelles, ajuster le ton si besoin, et copier votre adresse email. Tout le contenu difficile est fait automatiquement.",
  },
  {
    q: "Mes candidatures sont-elles vraiment personnalisées ?",
    a: "Oui. L'IA analyse le texte exact de chaque offre d'emploi pour adapter votre CV et votre lettre. Chaque candidature est unique et fait référence au poste et à l'entreprise spécifiques.",
  },
  {
    q: "Comment l'IA optimise mon CV pour les ATS ?",
    a: "Elle intègre les mots-clés importants de l'annonce, structure le CV dans un format compatible avec les logiciels de tri automatique (ATS), et reformule vos expériences avec le vocabulaire du secteur.",
  },
  {
    q: "Quelle différence entre le plan mensuel et le paiement unique ?",
    a: "Les fonctionnalités sont identiques. Le paiement unique à 80€ vous donne un accès à vie (rentabilisé après 2-3 mois). L'abonnement à 39,99€/mois est pratique si vous cherchez un emploi sur une courte période.",
  },
  {
    q: "Puis-je obtenir un remboursement ?",
    a: "Oui, vous disposez de 7 jours satisfait ou remboursé. Si JobBoost AI ne vous convient pas, contactez-nous par email et nous remboursons immédiatement.",
  },
  {
    q: "Combien de candidatures puis-je générer avec l'accès complet ?",
    a: "Candidatures illimitées. Vous pouvez générer autant de CV, lettres et préparations entretien que vous le souhaitez.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 pr-4">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section bg-white">
      <div className="container-narrow mx-auto">
        <div className="text-center mb-12">
          <span className="badge bg-gray-100 text-gray-600 mb-4">FAQ</span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Questions fréquentes
          </h2>
          <p className="text-gray-500 text-lg">
            Tout ce que vous devez savoir sur JobBoost AI.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
