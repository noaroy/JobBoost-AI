import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Vous collez l'offre. L'IA fait le reste.",
    desc: "Copiez le texte de l'annonce — ou l'URL. L'IA lit l'offre, identifie ce que le recruteur cherche vraiment, et adapte tout à votre profil.",
    detail: "~2 minutes",
    color: "from-amber-600 to-amber-500",
    glow: "shadow-amber-500/25",
  },
  {
    number: "02",
    title: "Votre candidature, prête à envoyer",
    desc: "CV reformulé avec les bons mots-clés. Lettre qui parle de l'entreprise par son nom. Score /100 avec les points exacts à améliorer. En 30 secondes.",
    detail: "30 secondes",
    color: "from-zinc-600 to-zinc-500",
    glow: "shadow-zinc-500/20",
  },
  {
    number: "03",
    title: "Vous postulez avec confiance",
    desc: "Copiez, ajustez si vous voulez (c'est votre voix, pas la nôtre), et envoyez. Le dashboard suit vos relances pour que rien ne tombe dans l'oubli.",
    detail: "Résultat immédiat",
    color: "from-emerald-700 to-emerald-600",
    glow: "shadow-emerald-600/20",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-zinc-900/20 py-24 border-y border-white/[0.05]">
      <div className="container-wide mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr,auto] gap-16 items-start">

          {/* Left: steps */}
          <div>
            <div className="mb-12">
              <p className="text-xs text-zinc-600 uppercase tracking-[0.2em] font-semibold mb-4">Comment ça marche</p>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                3 étapes.{" "}
                <span className="text-amber-400">Pas de courbe d&apos;apprentissage.</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-lg leading-relaxed">
                Si vous savez copier-coller une annonce, vous savez utiliser JobBoost AI.
                On a volontairement rendu ça simple — parce que vous avez autre chose à faire.
              </p>
            </div>

            <div className="relative">
              {steps.map((step, i) => (
                <div key={i} className="relative flex gap-7 pb-12 last:pb-0">
                  {i < steps.length - 1 && (
                    <div className="absolute left-7 top-14 bottom-0 w-px bg-white/[0.06]" />
                  )}
                  <div className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg ${step.glow} flex items-center justify-center text-white font-black text-lg flex-shrink-0`}>
                    {step.number}
                  </div>
                  <div className="pt-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{step.title}</h3>
                      <span className="text-xs bg-white/[0.05] text-zinc-400 border border-white/[0.08] px-3 py-0.5 rounded-full font-semibold whitespace-nowrap">
                        {step.detail}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-amber-400 text-zinc-950 font-black text-base px-7 py-3.5 rounded-xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 hover:-translate-y-0.5"
              >
                Essayer sur ma prochaine candidature
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-sm text-zinc-600 mt-3 sm:mt-0 sm:self-center">Gratuit, sans carte bancaire</p>
            </div>
          </div>

          {/* Right: feature summary */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-4">

              {/* What's included */}
              <div className="bg-zinc-950 border border-white/[0.07] rounded-2xl p-5">
                <div className="text-xs text-zinc-600 uppercase tracking-wider font-semibold mb-4">Ce que vous obtenez</div>
                <ul className="space-y-3">
                  {[
                    { label: "CV optimisé ATS",         badge: "Gratuit",  badgeStyle: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
                    { label: "Lettre de motivation",     badge: "Gratuit",  badgeStyle: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
                    { label: "Score candidature /100",   badge: "Basic",    badgeStyle: "bg-zinc-800/80 text-zinc-400 border-zinc-700" },
                    { label: "Simulation entretien IA",  badge: "Basic",    badgeStyle: "bg-zinc-800/80 text-zinc-400 border-zinc-700" },
                    { label: "Relances automatiques",    badge: "Premium",  badgeStyle: "bg-amber-400/10 text-amber-400 border-amber-400/20" },
                    { label: "Auto-Apply ×5 en un clic", badge: "Premium",  badgeStyle: "bg-amber-400/10 text-amber-400 border-amber-400/20" },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center justify-between gap-3">
                      <span className="text-sm text-zinc-300">{item.label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-md font-semibold flex-shrink-0 border ${item.badgeStyle}`}>
                        {item.badge}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-white/[0.06]">
                  <div className="text-xs text-zinc-600 leading-relaxed">
                    Le plan gratuit couvre votre première candidature complète.
                    Pas de frais cachés pour commencer.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
