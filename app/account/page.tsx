import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, Zap, Crown, Check, AlertCircle, Star } from "lucide-react";
import { FREE_GENERATIONS_LIMIT, normalizePlan, isPaid, isPremium } from "@/lib/plans";
import UpgradeButton from "@/components/UpgradeButton";
import PortalButton from "@/components/PortalButton";

const plans = [
  {
    key: "basic" as const,
    name: "Basic",
    price: "29,99€",
    period: "/mois",
    desc: "Candidatures illimitées",
    features: [
      "Candidatures illimitées",
      "CV + lettre générés par l'IA",
      "Simulation d'entretien",
      "Score de candidature /100",
      "Dashboard de suivi",
      "Support email",
    ],
    highlight: false,
  },
  {
    key: "premium" as const,
    name: "Premium",
    price: "39,99€",
    period: "/mois",
    desc: "Tout inclus + Auto-Apply",
    features: [
      "Tout Basic inclus",
      "Auto-Apply en lot (5 offres/fois)",
      "Relances automatiques IA",
      "Plan d'action hebdomadaire",
      "Job matching personnalisé",
      "Support prioritaire",
    ],
    highlight: true,
  },
  {
    key: "lifetime" as const,
    name: "Lifetime",
    price: "99,99€",
    period: " unique",
    desc: "Accès Premium à vie",
    features: [
      "Tout Premium inclus",
      "Accès à vie",
      "Toutes les futures fonctionnalités",
      "Support VIP",
    ],
    highlight: false,
  },
];

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
  const planTier = normalizePlan(plan);
  const count = profile?.generations_count ?? 0;
  const isFree = planTier === "free";
  const paid = isPaid(plan);
  const premium = isPremium(plan);
  const hasStripe = !!profile?.stripe_customer_id;

  const planLabel = {
    free: "Gratuit",
    basic: "Basic",
    premium: "Premium",
    lifetime: "Lifetime ♾️",
  }[planTier] ?? planTier;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="bg-slate-950/90 border-b border-slate-800/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container-wide mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <div className="w-px h-4 bg-slate-700" />
          <h1 className="font-semibold text-white">Mon compte</h1>
        </div>
      </header>

      <main className="container-narrow mx-auto px-4 py-10 space-y-6">
        {/* Banners */}
        {searchParams.success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3 text-emerald-300">
            <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <p className="font-medium">Paiement réussi ! Votre plan est maintenant actif.</p>
          </div>
        )}
        {searchParams.canceled && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-3 text-amber-300">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <p>Paiement annulé. Vous pouvez réessayer ci-dessous.</p>
          </div>
        )}

        {/* Profile card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="font-bold text-white text-lg mb-4">Informations du compte</h2>
          <div className="space-y-3">
            {[
              { label: "Email", value: user.email },
              { label: "Nom", value: profile?.full_name ?? "—" },
              { label: "Générations effectuées", value: String(count) },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                <span className="text-sm text-slate-400">{row.label}</span>
                <span className="text-sm font-medium text-white">{row.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-400">Plan actuel</span>
              <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${
                planTier === "lifetime" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : planTier === "premium" ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                : planTier === "basic" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-slate-700 text-slate-300"
              }`}>
                {(planTier === "lifetime" || planTier === "premium") && <Crown className="w-3.5 h-3.5" />}
                {planLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Billing portal */}
        {paid && hasStripe && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="font-bold text-white text-lg mb-2">Gestion de l&apos;abonnement</h2>
            <p className="text-sm text-slate-400 mb-4">
              Gérez votre abonnement, vos factures et vos informations de paiement via le portail sécurisé Stripe.
            </p>
            <PortalButton />
          </div>
        )}

        {/* Upgrade plans for free / basic users */}
        {!premium && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <h2 className="font-bold text-white text-lg">
                {isFree ? "Passer à un plan payant" : "Passer Premium"}
              </h2>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              {isFree
                ? `Vous avez utilisé ${count}/${FREE_GENERATIONS_LIMIT} génération gratuite. Débloquez les candidatures illimitées.`
                : "Débloquez Auto-Apply, relances automatiques, plan d'action IA et plus."}
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {plans
                .filter((p) => {
                  if (planTier === "basic") return p.key !== "basic";
                  return true;
                })
                .map((p) => (
                  <div
                    key={p.key}
                    className={`relative rounded-2xl p-5 flex flex-col ${
                      p.highlight
                        ? "bg-gradient-to-b from-blue-950/80 to-violet-950/60 border-2 border-violet-500/50"
                        : "border border-slate-700 bg-slate-800/40"
                    }`}
                  >
                    {p.highlight && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        <Star className="w-3 h-3 fill-white" /> POPULAIRE
                      </div>
                    )}
                    <h3 className="font-bold text-white mb-0.5">{p.name}</h3>
                    <p className="text-slate-400 text-xs mb-3">{p.desc}</p>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-black text-white">{p.price}</span>
                      <span className="text-slate-400 text-sm">{p.period}</span>
                    </div>
                    <ul className="space-y-1.5 mb-5 flex-1">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <UpgradeButton plan={p.key} label={`Choisir ${p.name}`} primary={p.highlight} />
                  </div>
                ))}
            </div>

            <p className="text-center text-xs text-slate-600 mt-4">
              Paiement sécurisé par Stripe · Satisfait ou remboursé 7 jours
            </p>
          </div>
        )}

        {premium && (
          <div className="bg-gradient-to-br from-violet-950/40 to-blue-950/30 border border-violet-800/30 rounded-2xl p-6 text-center">
            <Crown className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h2 className="font-bold text-white text-lg mb-1">Vous avez accès à tout</h2>
            <p className="text-slate-400 text-sm">
              {planTier === "lifetime"
                ? "Accès Premium à vie — toutes les fonctionnalités débloquées pour toujours."
                : "Toutes les fonctionnalités Premium sont actives sur votre compte."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
