import { SupabaseClient } from "@supabase/supabase-js";

export const FREE_GENERATIONS_LIMIT = 1;

export type PlanTier = "free" | "basic" | "premium" | "lifetime";

// Legacy alias: 'monthly' maps to 'basic'
export type Plan = PlanTier | "monthly";

export type Profile = {
  id: string;
  plan: Plan;
  generations_count: number;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
};

export function normalizePlan(plan: Plan): PlanTier {
  if (plan === "monthly") return "basic";
  return plan;
}

export function isPaid(plan: Plan): boolean {
  const p = normalizePlan(plan);
  return p === "basic" || p === "premium" || p === "lifetime";
}

export function isPremium(plan: Plan): boolean {
  const p = normalizePlan(plan);
  return p === "premium" || p === "lifetime";
}

export async function getProfile(
  supabase: SupabaseClient,
  userId: string
): Promise<Profile | null> {
  const { data } = await supabase
    .from("profiles")
    .select("id, plan, generations_count, stripe_customer_id, stripe_subscription_id")
    .eq("id", userId)
    .single();
  return data as Profile | null;
}

export function canGenerate(profile: Profile): { allowed: boolean; reason?: string } {
  if (isPaid(profile.plan)) return { allowed: true };
  if (profile.generations_count >= FREE_GENERATIONS_LIMIT) {
    return { allowed: false, reason: "Limite gratuite atteinte. Passez à l'accès complet pour continuer." };
  }
  return { allowed: true };
}

export function canUsePremiumFeature(profile: Profile): { allowed: boolean; reason?: string } {
  if (isPremium(profile.plan)) return { allowed: true };
  return {
    allowed: false,
    reason: "Cette fonctionnalité est réservée au plan Premium. Mettez à niveau pour y accéder.",
  };
}

export async function incrementGenerationCount(supabase: SupabaseClient, userId: string) {
  await supabase.rpc("increment_generations", { user_id: userId });
}

export const PLAN_LABELS: Record<string, { name: string; color: string; badge: string }> = {
  free:     { name: "Gratuit",     color: "bg-gray-100 text-gray-600",   badge: "gray" },
  basic:    { name: "Basic",       color: "bg-blue-50 text-blue-700",    badge: "blue" },
  monthly:  { name: "Basic",       color: "bg-blue-50 text-blue-700",    badge: "blue" },
  premium:  { name: "Premium",     color: "bg-violet-50 text-violet-700", badge: "violet" },
  lifetime: { name: "Lifetime",    color: "bg-amber-50 text-amber-700",  badge: "amber" },
};
