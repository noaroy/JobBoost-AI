import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Zap, FileText, Mail, Mic, Building2, BookOpen, CheckSquare, ArrowRight, LogOut } from "lucide-react";

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
  {
    href: "/resources/templates",
    icon: BookOpen,
    title: "50 Templates de lettres",
    desc: "Tous secteurs confondus",
  },
  {
    href: "/resources/interview-answers",
    icon: Mic,
    title: "20 Réponses d'entretien",
    desc: "Méthode STAR",
  },
  {
    href: "/resources/checklist",
    icon: CheckSquare,
    title: "Checklist 30 jours",
    desc: "Plan d'action complet",
  },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const name = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "vous";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container-wide mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            JobBoost AI
          </Link>
          <form action="/auth/signout" method="post">
            <button type="submit" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </form>
        </div>
      </header>

      <main className="container-wide mx-auto px-4 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bonjour, {name} 👋
          </h1>
          <p className="text-gray-500">
            Que souhaitez-vous générer aujourd'hui ?
          </p>
        </div>

        {/* Main tools */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Outils IA</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tools.map((tool, i) => (
              <Link
                key={i}
                href={tool.href}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-start gap-4 group"
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

        {/* Resources */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Ressources incluses</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {resources.map((r, i) => (
              <Link
                key={i}
                href={r.href}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-200 flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <r.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{r.title}</div>
                  <div className="text-xs text-gray-400">{r.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
