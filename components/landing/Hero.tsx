import Link from "next/link";
import { ArrowRight, Zap, Star } from "lucide-react";

const stats = [
  { value: "5 min", label: "par candidature" },
  { value: "3×", label: "plus d'entretiens" },
  { value: "2 400+", label: "utilisateurs" },
  { value: "94%", label: "satisfaction" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-slate-950 overflow-hidden pt-16">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/8 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="container-narrow mx-auto px-4 py-20 text-center relative z-10">
        {/* Social proof pill */}
        <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-10">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span className="text-sm text-slate-300">
            <strong className="text-white">2 400+</strong> candidats ont décroché un entretien ce mois-ci
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
          Automatise ta recherche<br />
          d'emploi et{" "}
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent bg-[size:200%] animate-[gradientShift_4s_linear_infinite]">
            multiplie tes chances
          </span>
        </h1>

        {/* Sub */}
        <p className="text-xl md:text-2xl text-slate-400 mb-4 max-w-2xl mx-auto leading-relaxed">
          Le système IA qui génère ton CV, ta lettre et prépare tes entretiens{" "}
          <strong className="text-white">en 5 minutes</strong> — pour chaque offre.
        </p>
        <p className="text-slate-500 mb-10 text-base">
          Faire un CV rapidement · Lettre de motivation automatique · Postuler emploi rapidement
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-lg px-8 py-4 rounded-2xl hover:from-blue-500 hover:to-violet-500 transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5">
            <Zap className="w-5 h-5" />
            Commencer gratuitement
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-semibold text-lg px-8 py-4 rounded-2xl hover:bg-white/10 transition-all">
            Voir les fonctionnalités
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-16">
          {stats.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/8 rounded-2xl px-4 py-4">
              <div className="text-3xl font-black text-white mb-1">{s.value}</div>
              <div className="text-xs text-slate-400 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard preview */}
        <div className="relative max-w-3xl mx-auto">
          {/* Glow behind card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-3xl blur-xl" />

          <div className="relative bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl">
            {/* Fake window bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 mx-4">
                <div className="bg-slate-700/50 rounded-md px-3 py-1 text-xs text-slate-400 text-center max-w-xs mx-auto">
                  jobboost.ai/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content preview */}
            <div className="p-5 grid grid-cols-3 gap-3">
              {[
                { label: "Candidatures", value: "24", sub: "+8 cette semaine", color: "text-blue-400" },
                { label: "Taux de réponse", value: "38%", sub: "↑ +12% vs moy.", color: "text-emerald-400" },
                { label: "Score moyen", value: "87/100", sub: "Excellent", color: "text-violet-400" },
              ].map((card, i) => (
                <div key={i} className="bg-slate-800/60 border border-slate-700/40 rounded-xl p-3 text-left">
                  <div className="text-xs text-slate-500 mb-1">{card.label}</div>
                  <div className={`text-xl font-bold ${card.color}`}>{card.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{card.sub}</div>
                </div>
              ))}
            </div>

            <div className="px-5 pb-5 grid grid-cols-2 gap-3">
              {[
                { emoji: "📄", title: "CV — Développeur React", company: "Spotify", status: "✓ Envoyé", color: "text-green-400" },
                { emoji: "✉️", title: "Lettre — Product Manager", company: "Doctolib", status: "⚡ En cours", color: "text-blue-400" },
                { emoji: "🎤", title: "Entretien — UX Designer", company: "Figma", status: "✓ Prêt", color: "text-green-400" },
                { emoji: "🔄", title: "Relance — Data Analyst", company: "BNP Paribas", status: "📅 J+7", color: "text-amber-400" },
              ].map((item, i) => (
                <div key={i} className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-3 flex items-center gap-3">
                  <span className="text-lg">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-white truncate">{item.title}</div>
                    <div className="text-xs text-slate-500">{item.company}</div>
                  </div>
                  <span className={`text-xs font-semibold ${item.color} flex-shrink-0`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
