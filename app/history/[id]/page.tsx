import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, Copy, Clock } from "lucide-react";
import CopyButton from "@/components/CopyButton";

const typeLabels: Record<string, string> = {
  cv: "CV Optimisé",
  cover_letter: "Lettre de Motivation",
  interview_prep: "Préparation Entretien",
  company_suggestions: "Suggestions d'Entreprises",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function HistoryDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: generation } = await supabase
    .from("generations")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (!generation) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container-wide mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <div className="w-px h-4 bg-gray-200" />
          <h1 className="font-semibold text-gray-900 truncate">
            {typeLabels[generation.type] ?? generation.type}
          </h1>
        </div>
      </header>

      <main className="container-narrow mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {generation.title ?? typeLabels[generation.type]}
              </h2>
              <p className="text-sm text-gray-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Généré le {formatDate(generation.created_at)}
              </p>
            </div>
            <CopyButton text={generation.output} />
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-100 p-6">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
              {generation.output}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
