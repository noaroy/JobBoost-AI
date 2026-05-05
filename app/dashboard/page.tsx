import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Zap, FileText, Mail, Mic, Building2, BarChart2, Send, Calendar,
  BookOpen, CheckSquare, ArrowRight, LogOut, User, Clock, Crown,
} from "lucide-react";
import { FREE_GENERATIONS_LIMIT, isPaid, isPremium, normalizePlan } from "@/lib/plans";

const tools = [
  {
    href: "/generate/cv",
    icon: FileText,
    title: "Générateur de CV",
    desc: "CV ATS-ready adapté à chaque offre",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    tag: null,
    premium: false,
  },
  {
    href: "/generate/cover-letter",
    icon: Mail,
    title: "Lettre de motivation",
    desc: "Lettre personnalisée pour chaque entreprise",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    tag: null,
    premium: false,
  },
  {
    href: "/generate/interview",
    icon: Mic,
    title: "Préparation entretien",
    desc: "Questions clés + réponses STAR",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    tag: null,
    premium: false,
  },
  {
    href: "/generate/companies",
    icon: Building2,
    title: "Suggestions d'entreprises",
    desc: "Trouvez les meilleures entreprises cibles",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    tag: null,
    premium: false,
  },
  {
    href: "/interview-sim",
    icon: Mic,
    title: "Simulation d'entretien",
    desc: "Entraînez-vous avec un recruteur IA",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    tag: "Basic+",
    premium: false,
  },
  {
    href: "/score",
    icon: BarChart2,
    title: "Score de candidature",
    desc: "Évaluez votre dossier /100 avec feedback",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    tag: "Basic+",
    premium: false,
  },
  {
    href: "/follow-up",
    icon: Send,
    title: "Email de relance",
    desc: "Relance professionnelle au bon moment",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    tag: "Premium",
    premium: true,
  },
  {
    href: "/action-plan",
    icon: Calendar,
    title: "Plan d'action",
    desc: "Votre coach IA pour cette semaine",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    tag: "Premium",
    premium: true,
  },
  {
    href: "/auto-apply",
    icon: Zap,
    title: "Auto-Apply",
    desc: "5 candidatures complètes en un clic",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    tag: "Premium",
    premium: true,
  },
];

const resources = [
  { href: "/resources/templates", icon: BookOpen, title: "50 Templates de lettres", desc: "Tous secteurs" },
  { href: "/resources/interview-answers", icon: Mic, title: "20 Réponses d'entretien", desc: "Méthode STAR" },
  { href: "/resources/checklist", icon: CheckSquare, title: "Checklist 30 jours", desc: "Plan complet" },
];

const typeLabels: Record<string, { label: string; icon: string }> = {
  cv: { label: "CV", icon: "📄" },
  cover_letter: { label: "Lettre", icon: "✉️" },
  "cover-letter": { label: "Lettre", icon: "✉️" },
  interview_prep: { label: "Entretien", icon: "🎤" },
  interview: { label: "Entretien", icon: "🎤" },
  company_suggestions: { label: "Entreprises", icon: "🏢" },
  companies: { label: "Entreprises", icon: "🏢" },
  score: { label: "Score", icon: "📊" },
  "follow-up": { label: "Relance", icon: "📩" },
  "action-plan": { label: "Plan", icon: "📅" },
  "auto-apply": { label: "Auto-Apply", icon: "⚡" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [profileRes, generationsRes] = await Promise.all([
    supabase.from("profiles").select("full_name, plan, generations_count").eq("id", user.id).single(),
    supabase.from("generations").select("id, type, title, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
  ]);

  const profile = profileRes.data;
  const generations = generationsRes.data ?? [];
  const name = profile?.full_name ?? user.email?.split("@")[0] ?? "vous";
  const plan = profile?.plan ?? "free";
  const planTier = normalizePlan(plan);
  const count = profile?.generations_count ?? 0;
  const isFree = planTier === "free";
  const paid = isPaid(plan);
  const premium = isPremium(plan);
  const freeExhausted = isFree && count >= FREE_GENERATIONS_LIMIT;

  const planBadge = {
    free: { label: "Gratuit", color: "bg-slate-700 text-slate-300" },
    basic: { label: "Basic", color: "bg-slate-700/50 text-slate-300 border border-slate-600" },
    premium: { label: "Premium", color: "bg-violet-500/20 text-violet-400 border border-violet-500/30" },
    lifetime: { label: "Lifetime ♾️", color: "bg-amber-500/20 text-amber-400 border border-amber-500/30" },
  }[planTier] ?? { label: planTier, color: "bg-slate-700 text-slate-300" };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-slate-950/90 border-b border-slate-800/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container-wide mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-white">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span>JobBoost <span className="text-orange-400">AI</span></span>
          </Link>

          <div className="flex items-center gap-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${planBadge.color}`}>
              {planBadge.label}
            </span>
            <Link href="/account" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors min-h-[44px] px-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Compte</span>
            </Link>
            <form action="/auth/signout" method="post">
              <button type="submit" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors min-h-[44px] px-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container-wide mx-auto px-4 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-1">Bonjour, {name} 👋</h1>
          <p className="text-slate-400">Que souhaitez-vous générer aujourd&apos;hui ?</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Générations", value: count, color: "text-orange-400", icon: "⚡" },
            { label: "Plan actuel", value: planBadge.label, color: "text-violet-400", icon: "👑" },
            { label: "Accès illimité", value: paid ? "Oui" : "Non", color: paid ? "text-emerald-400" : "text-slate-500", icon: "🔓" },
            { label: "Fonc. Premium", value: premium ? "Oui" : "Non", color: premium ? "text-emerald-400" : "text-slate-500", icon: "🚀" },
          ].map((s, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 sm:p-4">
              <div className="text-base sm:text-lg mb-1">{s.icon}</div>
              <div className={`text-lg sm:text-xl font-black truncate ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Upgrade banners */}
        {freeExhausted && (
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-white">Génération gratuite utilisée</p>
              <p className="text-slate-300 text-sm mt-0.5">Passez à un plan payant pour des candidatures illimitées.</p>
            </div>
            <Link href="/account" className="flex-shrink-0 bg-orange-500 hover:bg-orange-400 text-white font-bold px-5 py-2.5 rounded-xl transition-all text-sm whitespace-nowrap">
              Voir les plans →
            </Link>
          </div>
        )}

        {!paid && !freeExhausted && (
          <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4 mb-8 flex items-center gap-3">
            <span className="text-xl">🎁</span>
            <p className="text-sm text-slate-300">
              <strong className="text-white">1 candidature complète gratuite</strong> disponible. Testez la qualité sans carte bancaire.
            </p>
          </div>
        )}

        {paid && !premium && (
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 mb-8 flex items-center justify-between gap-3">
            <p className="text-sm text-slate-300">
              <span className="text-orange-400 font-semibold">Premium</span> débloque : Auto-Apply, relances automatiques, plan d&apos;action IA et plus.
            </p>
            <Link href="/account" className="text-orange-400 hover:text-orange-300 text-sm font-semibold whitespace-nowrap transition-colors">
              Upgrade →
            </Link>
          </div>
        )}

        {/* Tools grid */}
        <div className="mb-10">
          <h2 className="text-base font-bold text-slate-300 mb-4">Outils IA</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, i) => {
              const locked = (tool.premium && !premium) || (freeExhausted && !paid);
              return (
                <Link
                  key={i}
                  href={locked ? "/account" : tool.href}
                  className={`bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-start gap-4 group transition-all hover:border-slate-700 hover:bg-slate-900 hover:-translate-y-0.5 ${locked ? "opacity-50" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${tool.bg}`}>
                    <tool.icon className={`w-5 h-5 ${tool.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-white text-sm">{tool.title}</h3>
                      {tool.tag && (
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${tool.tag === "Premium" ? "bg-orange-500/10 text-orange-400" : "bg-slate-700/60 text-slate-300"}`}>
                          {tool.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{tool.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0 group-hover:text-orange-400 transition-colors mt-1" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* History */}
          <div className="lg:col-span-2">
            <h2 className="text-base font-bold text-slate-300 mb-4">Historique</h2>
            {generations.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-slate-500 font-medium">Aucune génération pour l&apos;instant</p>
                <p className="text-xs text-slate-600 mt-1">Vos CV, lettres et préparations apparaîtront ici</p>
              </div>
            ) : (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl divide-y divide-slate-800/50">
                {generations.map((g) => {
                  const meta = typeLabels[g.type] ?? { label: g.type, icon: "📄" };
                  return (
                    <Link
                      key={g.id}
                      href={`/history/${g.id}`}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-slate-800/30 transition-colors group"
                    >
                      <span className="text-xl">{meta.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{g.title ?? meta.label}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {formatDate(g.created_at)}
                        </p>
                      </div>
                      <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full flex-shrink-0">
                        {meta.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Resources + Account */}
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-300 mb-4">Ressources</h2>
              <div className="flex flex-col gap-3">
                {resources.map((r, i) => (
                  <Link
                    key={i}
                    href={r.href}
                    className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-all flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <r.icon className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-white">{r.title}</div>
                      <div className="text-xs text-slate-500">{r.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-orange-400 transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 text-center">
              <Crown className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-white font-bold text-sm mb-1">
                {premium ? "Plan Premium actif" : "Passez Premium"}
              </p>
              <p className="text-slate-400 text-xs mb-3">
                {premium
                  ? "Toutes les fonctionnalités sont débloquées."
                  : "Auto-Apply, relances IA, plan d'action et plus."}
              </p>
              {!premium && (
                <Link href="/account" className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all">
                  Voir les plans →
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
