import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, Zap, Crown, Check, AlertCircle } from "lucide-react";
import { FREE_GENERATIONS_LIMIT } from "@/lib/plans";
import UpgradeButton from "@/components/UpgradeButton";
import PortalButton from "@/components/PortalButton";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: { success?: string; canceled?: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, plan, generations_count, stripe_customer_id, stripe_subscription_id")
    .eq("id", user.id)
    .single();

  const plan = profile?.plan ?? "free";
  const count = profile?.generations_count ?? 0;
  const isFree = plan === "free";
  const hasStripe = !!profile?.stripe_customer_id;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container-wide mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <div className="w-px h-4 bg-gray-200" />
          <h1 className="font-semibold text-gray-900">Mon compte</h1>
        </div>
      </header>

      <main className="container-narrow mx-auto px-4 py-10 space-y-6">
        {/* Success / Canceled banners */}
        {searchParams.success && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 text-green-800">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="font-medium">Paiement réussi ! Votre accès complet est maintenant actif.</p>
          </div>
        )}
        {searchParams.canceled && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 text-amber-800">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <p>Paiement annulé. Vous pouvez réessayer ci-dessous.</p>
          </div>
        )}

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Informations du compte</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Email</span>
              <span className="text-sm font-medium text-gray-900">{user.email}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Nom</span>
              <span className="text-sm font-medium text-gray-900">
                {profile?.full_name ?? "—"}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Générations effectuées</span>
              <span className="text-sm font-medium text-gray-900">{count}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-500">Plan actuel</span>
              <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${
                plan === "lifetime"
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : plan === "monthly"
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "bg-gray-100 text-gray-600 border border-gray-200"
              }`}>
                {plan === "lifetime" && <Crown className="w-3.5 h-3.5" />}
                {plan === "lifetime" ? "Accès à vie" : plan === "monthly" ? "Mensuel" : "Gratuit"}
              </span>
            </div>
          </div>
        </div>

        {/* Subscription management */}
        {!isFree && hasStripe && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 text-lg mb-2">Gestion de l'abonnement</h2>
            <p className="text-sm text-gray-500 mb-4">
              Gérez votre abonnement, vos factures et vos informations de paiement.
            </p>
            <PortalButton />
          </div>
        )}

        {/* Upgrade section for free users */}
        {isFree && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-gray-900 text-lg">Passer à l'accès complet</h2>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Vous avez utilisé{" "}
              <strong className="text-gray-700">{count}/{FREE_GENERATIONS_LIMIT}</strong> génération
              {FREE_GENERATIONS_LIMIT > 1 ? "s" : ""} gratuite{FREE_GENERATIONS_LIMIT > 1 ? "s" : ""}.
              Débloquez les candidatures illimitées + tous les bonus.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Monthly */}
              <div className="border-2 border-gray-100 rounded-2xl p-5 hover:border-blue-200 transition-colors">
                <div className="font-bold text-gray-900 mb-1">Abonnement mensuel</div>
                <div className="text-3xl font-black text-gray-900 mb-1">39,99€<span className="text-base font-normal text-gray-400">/mois</span></div>
                <p className="text-xs text-gray-400 mb-4">Résiliable à tout moment</p>
                <ul className="space-y-1.5 mb-5 text-sm text-gray-600">
                  {["Candidatures illimitées", "Tous les outils IA", "Bonus inclus", "Support email"].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <UpgradeButton plan="monthly" label="Choisir Mensuel" />
              </div>

              {/* Lifetime */}
              <div className="border-2 border-blue-600 rounded-2xl p-5 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
                <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-black px-2 py-0.5 rounded-md">
                  POPULAIRE
                </div>
                <div className="font-bold text-gray-900 mb-1">Accès à vie</div>
                <div className="text-3xl font-black text-gray-900 mb-1">80€<span className="text-base font-normal text-gray-400"> une fois</span></div>
                <p className="text-xs text-gray-400 mb-4">Rentabilisé en 2 mois</p>
                <ul className="space-y-1.5 mb-5 text-sm text-gray-600">
                  {["Candidatures illimitées", "Tous les outils IA", "Bonus inclus", "Support prioritaire", "Mises à jour à vie"].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <UpgradeButton plan="lifetime" label="Obtenir l'accès à vie — 80€" primary />
              </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
              Paiement sécurisé par Stripe • Satisfait ou remboursé 7 jours
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
