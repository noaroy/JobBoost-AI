"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Est-ce vraiment gratuit pour commencer ?",
    a: "Oui, votre première candidature complète (CV + lettre + préparation entretien) est 100% gratuite, sans carte bancaire. Vous voyez la qualité avant de payer quoi que ce soit.",
  },
  {
    q: "Quelle différence entre Basic, Premium et Lifetime ?",
    a: "Basic (29,99€/mois) donne accès aux candidatures illimitées, simulation d'entretien et score. Premium (39,99€/mois) ajoute l'Auto-Apply en lot, les relances automatiques, le plan d'action IA et le job matching. Lifetime (99,99€) est l'accès Premium à vie — rentabilisé après 2-3 mois.",
  },
  {
    q: "Mes candidatures sont-elles vraiment personnalisées ?",
    a: "Oui. L'IA analyse le texte exact de chaque offre d'emploi pour adapter votre CV et votre lettre. Chaque candidature est unique et fait référence au poste et à l'entreprise spécifiques.",
  },
  {
    q: "Comment l'IA optimise mon CV pour les ATS ?",
    a: "Elle intègre les mots-clés importants de l'annonce, structure le CV dans un format compatible avec les logiciels de tri automatique (ATS), et reformule vos expériences avec le vocabulaire du secteur visé.",
  },
  {
    q: "Qu'est-ce que la simulation d'entretien ?",
    a: "L'IA joue le rôle du recruteur et vous pose des questions adaptées au poste (comportementales, techniques, motivationnelles). Vous répondez, et elle vous donne un score et un feedback immédiat pour vous améliorer.",
  },
  {
    q: "Comment fonctionne l'Auto-Apply ?",
    a: "Vous entrez vos informations une seule fois et collez jusqu'à 5 offres d'emploi. L'IA génère simultanément un CV et une lettre personnalisés pour chaque offre. Idéal pour envoyer beaucoup de candidatures rapidement.",
  },
  {
    q: "Puis-je obtenir un remboursement ?",
    a: "Oui, vous disposez de 7 jours satisfait ou remboursé. Si JobBoost AI ne vous convient pas, contactez-nous par email et nous remboursons immédiatement, sans question.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-800 last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-white text-sm md:text-base">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative bg-slate-900/40 py-24 border-t border-slate-800/50">
      <div className="container-narrow mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="text-sm text-slate-300 font-medium">Questions fréquentes</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-4">
            Tout ce que vous devez savoir
          </h2>
          <p className="text-slate-400 text-lg">
            Des questions ? Voici les réponses.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl px-6 md:px-8">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
