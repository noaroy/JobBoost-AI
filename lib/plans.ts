import { SupabaseClient } from "@supabase/supabase-js";

export const FREE_GENERATIONS_LIMIT = 1;

export type Profile = {
  id: string;
  plan: "free" | "monthly" | "lifetime";
  generations_count: number;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
};

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

export function canGenerate(profile: Profile): {
  allowed: boolean;
  reason?: string;
} {
  if (profile.plan === "monthly" || profile.plan === "lifetime") {
    return { allowed: true };
  }

  if (profile.generations_count >= FREE_GENERATIONS_LIMIT) {
    return {
      allowed: false,
      reason: "Limite gratuite atteinte. Passez à l'accès complet pour continuer.",
    };
  }

  return { allowed: true };
}

export async function incrementGenerationCount(
  supabase: SupabaseClient,
  userId: string
) {
  await supabase.rpc("increment_generations", { user_id: userId });
}
