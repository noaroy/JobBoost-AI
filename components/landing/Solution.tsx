import { FileText, Mail, Mic, BarChart2 } from "lucide-react";

const tools = [
  {
    icon: FileText,
    title: "Un CV qui parle à Doctolib — pas à Amazon",
    desc: "L'IA lit l'annonce, extrait les 10–15 mots-clés qui comptent, et les intègre dans votre CV. Pas générique. Adapté à cette offre, ce recruteur, cette entreprise.",
    tag: "Gratuit",
    tagStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Mail,
    title: "Une lettre qui ne commence pas par « je me permets »",
    desc: "Chaque lettre cite l'entreprise par son nom, fait référence à un produit réel ou à un défi du secteur. Les recruteurs voient la différence en 3 lignes.",
    tag: "Gratuit",
    tagStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Mic,
    title: "Entraînez-vous à voix haute avant l'entretien",
    desc: "L'IA joue le recruteur, pose les vraies questions difficiles, et vous donne un feedback sur vos réponses. Pas des conseils génériques — une simulation de votre entretien spécifique.",
    tag: "Basic+",
    tagStyle: "text-zinc-400 bg-zinc-800/60 border-zinc-700",
  },
  {
    icon: BarChart2,
    title: "Savoir pourquoi on ne vous rappelle pas",
    desc: "Le score /100 décompose votre candidature critère par critère. Vous savez exactement ce qui bloque — et comment le corriger avant le prochain envoi.",
    tag: "Basic+",
    tagStyle: "text-zinc-400 bg-zinc-800/60 border-zinc-700",
  },
];

export default function Solution() {
  return (
    <section className="relative bg-zinc-950 py-24 overflow-hidden">
      <div className="container-wide mx-auto px-4 relative z-10">

        {/* Header */}
        <div data-reveal className="max-w-2xl mb-16">
          <p className="text-xs text-zinc-600 uppercase tracking-[0.2em] font-semibold mb-4">Ce qu&apos;on fait concrètement</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Ce n&apos;est pas de la magie.{" "}
            <span className="text-amber-400">C&apos;est du travail bien fait.</span>
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Chaque outil fait une chose précise — bien, vite, et adapté à votre situation.
            Pas un assistant généraliste. Un spécialiste de la candidature.
          </p>
        </div>

        {/* Tools — specific, benefit-focused */}
        <div data-reveal data-delay="1" className="grid md:grid-cols-2 gap-5 mb-16">
          {tools.map((t, i) => (
            <div key={i} className="bg-zinc-900/50 border border-white/[0.06] rounded-2xl p-6 hover:-translate-y-0.5 hover:border-white/[0.1] transition-all">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-10 h-10 bg-zinc-800/80 rounded-xl flex items-center justify-center flex-shrink-0">
                  <t.icon className="w-5 h-5 text-zinc-300" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 mt-0.5 ${t.tagStyle}`}>
                  {t.tag}
                </span>
              </div>
              <h3 className="font-bold text-white mb-2 leading-snug">{t.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Before / after — honest comparison */}
        <div data-reveal data-delay="2" className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <div className="bg-zinc-900/50 border border-rose-500/15 rounded-2xl p-7">
            <div className="text-xs font-semibold text-rose-400/70 uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-rose-400/50 inline-block" />
              Sans JobBoost AI
            </div>
            {[
              "2–4h par candidature, épuisement après 10 jours",
              "CV générique → rejeté avant d'être lu par un humain",
              "Lettre identique pour toutes les offres, ça se voit",
              "Silence radio, sans savoir pourquoi",
              "3 mois de recherche en moyenne",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                <span className="text-rose-500/60 font-bold text-sm mt-0.5 flex-shrink-0">✕</span>
                <span className="text-zinc-500 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900/60 border border-emerald-500/15 rounded-2xl p-7">
            <div className="text-xs font-semibold text-emerald-400/70 uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-emerald-400/50 inline-block" />
              Avec JobBoost AI
            </div>
            {[
              "5 min par candidature, volume × 10",
              "CV avec les mots-clés exacts de l'offre, format ATS",
              "Lettre qui cite l'entreprise et le poste par leur nom",
              "Score /100 — vous savez où vous en êtes et pourquoi",
              "Entretien décroché en quelques semaines",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                <span className="text-emerald-400 font-bold text-sm mt-0.5 flex-shrink-0">✓</span>
                <span className="text-zinc-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
