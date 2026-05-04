import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const templates = [
  { sector: "Tech & Digital", items: ["Développeur Frontend/Backend", "Product Manager", "Data Analyst", "UX/UI Designer", "DevOps Engineer", "Chef de projet IT", "Scrum Master", "CTO", "Growth Hacker", "Community Manager"] },
  { sector: "Commerce & Vente", items: ["Commercial B2B", "Responsable de compte", "Business Developer", "Account Manager", "Directeur commercial", "Chargé d'affaires", "Télévendeur", "Responsable régional", "KAM", "Inside Sales"] },
  { sector: "Marketing & Communication", items: ["Responsable marketing", "Traffic Manager", "Chargé de communication", "Rédacteur web/SEO", "Brand Manager", "Social Media Manager", "Responsable relations presse", "Chef de publicité", "Directeur artistique", "Consultant marketing"] },
  { sector: "Finance & Gestion", items: ["Contrôleur de gestion", "Comptable", "Auditeur", "Analyste financier", "DAF", "Trésorier", "Responsable paie", "Expert-comptable", "Consultant finance", "Credit manager"] },
  { sector: "RH & Management", items: ["Responsable RH", "Chargé de recrutement", "DRH", "Coach professionnel", "Manager d'équipe", "Chef de service"] },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container-wide mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <div className="w-px h-4 bg-gray-200" />
          <h1 className="font-semibold text-gray-900">50 Templates de lettres de motivation</h1>
        </div>
      </header>

      <main className="container-wide mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">50 templates par secteur</h2>
          <p className="text-gray-500">
            Utilisez ces templates comme base et adaptez-les avec le{" "}
            <Link href="/generate/cover-letter" className="text-blue-600 font-medium hover:underline">générateur IA</Link> pour une lettre 100% personnalisée.
          </p>
        </div>

        <div className="space-y-8">
          {templates.map((group, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4">📂 {group.sector}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.items.map((item, j) => (
                  <Link
                    key={j}
                    href={`/generate/cover-letter?job=${encodeURIComponent(item)}`}
                    className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-sm text-gray-700 hover:text-blue-700 group"
                  >
                    <span className="text-gray-300 group-hover:text-blue-400">✉️</span>
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
