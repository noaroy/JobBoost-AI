import Link from "next/link";
import { ArrowRight } from "lucide-react";

const features = [
  {
    n: "01",
    title: "CV adapté à chaque offre — en 30 secondes",
    desc: "L'IA lit l'annonce et intègre les mots-clés exacts dans votre CV. Pas les mots que vous pensez importants — ceux que l'algorithme ATS cherche. Différent pour chaque offre.",
    tier: "Gratuit",
    tierStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    n: "02",
    title: "Lettre qui parle à un humain, pas à un filtre",
    desc: "Elle cite le nom de l'entreprise, fait référence à leur produit, à leur culture. Les recruteurs remarquent immédiatement la différence avec les lettres génériques.",
    tier: "Gratuit",
    tierStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    n: "03",
    title: "Simuler l'entretien avant de le vivre",
    desc: "L'IA joue le rôle du recruteur et pose les questions difficiles — comportementales, techniques, motivationnelles. Vous vous entraînez, elle vous critique. Sans gêne.",
    tier: "Basic",
    tierStyle: "text-zinc-300 bg-zinc-800/60 border-zinc-700",
  },
  {
    n: "04",
    title: "Score /100 — savoir pourquoi on ne vous rappelle pas",
    desc: "Chaque candidature reçoit un score détaillé par critère. Vous identifiez le point faible exact à corriger avant le prochain envoi. Pas des conseils vagues — des actions concrètes.",
    tier: "Basic",
    tierStyle: "text-zinc-300 bg-zinc-800/60 border-zinc-700",
  },
  {
    n: "05",
    title: "La relance que vous n'osez pas envoyer",
    desc: "7 jours sans réponse ? L'IA rédige un email de relance qui ne fait pas supplier — professionnel, bref, utile. Les recruteurs apprécient. Beaucoup rappellent à ce moment-là.",
    tier: "Premium",
    tierStyle: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  {
    n: "06",
    title: "5 candidatures complètes d'un seul coup",
    desc: "Collez 5 offres, décrivez votre profil une seule fois. L'IA génère 5 CV et 5 lettres personnalisés en parallèle. Ce que vous feriez en 20h, fait en 4 minutes.",
    tier: "Premium",
    tierStyle: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  {
    n: "07",
    title: "Un plan d'action, pas juste des outils",
    desc: "Vous dites où vous en êtes dans votre recherche, l'IA vous dit quoi faire cette semaine — combien postuler, quoi relancer, sur quel critère travailler. Un coach qui ne se fatigue pas.",
    tier: "Premium",
    tierStyle: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  {
    n: "08",
    title: "Dashboard — tout votre pipeline en un coup d'œil",
    desc: "Quelles candidatures attendent une relance. Lesquelles sont mortes. Votre taux de réponse cette semaine vs la semaine dernière. Pas d'Excel, pas de post-its.",
    tier: "Premium",
    tierStyle: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
];

export default function WhyItWorks() {
  return (
    <section id="features" className="relative bg-zinc-950 py-24">
      <div className="container-wide mx-auto px-4">

        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 pb-8 border-b border-white/[0.06]">
          <div>
            <p className="text-xs text-zinc-600 uppercase tracking-[0.2em] font-semibold mb-3">Ce qui est inclus</p>
            <h2 className="font-display font-black text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}>
              8 outils. Une seule recherche.<br />Zéro page blanche.
            </h2>
          </div>
          <Link
            href="#pricing"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors group flex-shrink-0"
          >
            Voir les tarifs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div data-reveal data-delay="1" className="divide-y divide-white/[0.05]">
          {features.map((f) => (
            <div
              key={f.n}
              className="group grid grid-cols-[3rem,1fr] md:grid-cols-[4rem,1fr,auto] items-start gap-5 md:gap-8 py-6 hover:bg-white/[0.02] -mx-4 px-4 transition-colors cursor-default"
            >
              <span className="font-display font-black text-zinc-800 group-hover:text-zinc-700 transition-colors leading-none mt-0.5 select-none text-2xl md:text-3xl">
                {f.n}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h3 className="font-bold text-white text-base md:text-lg group-hover:text-amber-50 transition-colors">
                    {f.title}
                  </h3>
                  <span className={`md:hidden text-xs font-semibold px-2 py-0.5 rounded-full border ${f.tierStyle}`}>
                    {f.tier}
                  </span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">{f.desc}</p>
              </div>
              <span className={`hidden md:inline-flex text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap mt-0.5 ${f.tierStyle}`}>
                {f.tier}
              </span>
            </div>
          ))}
        </div>

        <div data-reveal data-delay="2" className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            <span className="text-emerald-400 font-semibold">Gratuit</span> pour commencer ·{" "}
            <span className="text-zinc-300 font-semibold">Basic</span> à 29,99€/mois ·{" "}
            <span className="text-amber-400 font-semibold">Premium</span> à 39,99€/mois
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-amber-400 text-zinc-950 font-black text-sm px-5 py-2.5 rounded-xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 hover:-translate-y-0.5"
          >
            Commencer gratuitement <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
