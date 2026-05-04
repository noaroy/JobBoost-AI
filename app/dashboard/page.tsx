import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Zap, FileText, Mail, Mic, Building2,
  BookOpen, CheckSquare, ArrowRight, LogOut,
  User, Clock, Crown, AlertCircle,
} from "lucide-react";
import { FREE_GENERATIONS_LIMIT } from "@/lib/plans";

const tools = [
  {
    href: "/generate/cv",
    icon: FileText,
    title: "Générer un CV optimisé",
    desc: "CV ATS-ready adapté à votre poste en 2 minutes",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    tag: "Le plus populaire",
  },
  {
    href: "/generate/cover-letter",
    icon: Mail,
    title: "Lettre de motivation",
    desc: "Lettre personnalisée pour chaque offre et chaque entreprise",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    tag: null,
  },
  {
    href: "/generate/interview",
    icon: Mic,
    title: "Préparer mon entretien",
    desc: "Questions clés + réponses STAR + conseils de présentation",
    color: "bg-violet-50 text-violet-600 border-violet-100",
    tag: null,
  },
  {
    href: "/generate/companies",
    icon: Building2,
    title: "Suggestions d'entreprises",
    desc: "Trouvez les meilleures entreprises pour votre profil",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    tag: null,
  },
];

const resources = [
  { href: "/resources/templates", icon: BookOpen, title: "50 Templates de lettres", desc: "Tous secteurs confondus" },
  { href: "/resources/interview-answers", icon: Mic, title: "20 Réponses d'entretien", desc: "Méthode STAR" },
  { href: "/resources/checklist", icon: CheckSquare, title: "Checklist 30 jours", desc: "Plan d'action complet" },
];

const typeLabels: Record<string, { label: string; icon: string; color: string }> = {
  cv: { label: "CV", icon: "📄", color: "bg-blue-50 text-blue-700" },
  cover_letter: { label: "Lettre", icon: "✉️", color: "bg-indigo-50 text-indigo-700" },
  interview_prep: { label: "Entretien", icon: "🎤", color: "bg-violet-50 text-violet-700" },
  company_suggestions: { label: "Entreprises", icon: "🏢", color: "bg-emerald-50 text-emerald-700" },
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
  const count = profile?.generations_count ?? 0;
  const isFree = plan === "free";
  const freeExhausted = isFree && count >= FREE_GENERATIONS_LIMIT;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container-wide mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            JobBoost AI
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/account" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Mon compte</span>
            </Link>
            <form action="/auth/signout" method="post">
              <button type="submit" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container-wide mx-auto px-4 py-10">
        {/* Welcome + plan status */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Bonjour, {name} 👋</h1>
            <p className="text-gray-500">Que souhaitez-vous générer aujourd'hui ?</p>
          </div>

          <div className="flex items-center gap-3">
            {plan === "lifetime" && (
              <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold px-3 py-1.5 rounded-full">
                <Crown className="w-4 h-4" />
                Accès à vie
              </span>
            )}
            {plan === "monthly" && (
              <span className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-full">
                <Zap className="w-4 h-4" />
                Abonnement actif
              </span>
            )}
            {isFree && (
              <span className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 text-gray-600 text-sm font-medium px-3 py-1.5 rounded-full">
                {count}/{FREE_GENERATIONS_LIMIT} génération{FREE_GENERATIONS_LIMIT > 1 ? "s" : ""} gratuite{FREE_GENERATIONS_LIMIT > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {/* Upgrade banner for free users who've exhausted their limit */}
        {freeExhausted && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-200" />
              <div>
                <p className="font-bold">Vous avez utilisé votre génération gratuite</p>
                <p className="text-blue-100 text-sm mt-0.5">
                  Passez à l'accès complet pour des candidatures illimitées + tous les bonus.
                </p>
              </div>
            </div>
            <Link
              href="/account"
              className="flex-shrink-0 bg-white text-blue-700 font-bold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors text-sm whitespace-nowrap"
            >
              Passer à l'accès complet →
            </Link>
          </div>
        )}

        {/* Soft upgrade nudge for free users who still have 0 generations */}
        {isFree && count === 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-center gap-3">
            <span className="text-xl">🎁</span>
            <p className="text-sm text-amber-800">
              <strong>1 candidature complète gratuite</strong> disponible — sans carte bancaire.{" "}
              Commencez maintenant !
            </p>
          </div>
        )}

        {/* Main tools */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Outils IA</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tools.map((tool, i) => (
              <Link
                key={i}
                href={tool.href}
                className={`bg-white rounded-2xl border p-6 flex items-start gap-4 group transition-all duration-200 ${
                  freeExhausted
                    ? "border-gray-100 opacity-60 cursor-not-allowed pointer-events-none"
                    : "border-gray-100 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${tool.color}`}>
                  <tool.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                    {tool.tag && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium border border-blue-100">
                        {tool.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{tool.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0 group-hover:text-blue-500 transition-colors mt-1" />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Generation history */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Historique des générations</h2>
            {generations.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-gray-400 font-medium">Aucune génération pour l'instant</p>
                <p className="text-sm text-gray-300 mt-1">Vos CV, lettres et préparations apparaîtront ici</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
                {generations.map((g) => {
                  const meta = typeLabels[g.type] ?? { label: g.type, icon: "📄", color: "bg-gray-50 text-gray-700" };
                  return (
                    <Link
                      key={g.id}
                      href={`/history/${g.id}`}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group"
                    >
                      <span className="text-xl">{meta.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {g.title ?? meta.label}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {formatDate(g.created_at)}
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${meta.color}`}>
                        {meta.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Ressources incluses</h2>
            <div className="flex flex-col gap-3">
              {resources.map((r, i) => (
                <Link
                  key={i}
                  href={r.href}
                  className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all duration-200 flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <r.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900">{r.title}</div>
                    <div className="text-xs text-gray-400">{r.desc}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
