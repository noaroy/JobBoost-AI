import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const PLANS = {
  basic: {
    priceId: process.env.STRIPE_PRICE_BASIC!,
    name: "Basic",
    price: "29,99€/mois",
    mode: "subscription" as const,
    tier: "basic",
  },
  premium: {
    priceId: process.env.STRIPE_PRICE_PREMIUM!,
    name: "Premium",
    price: "39,99€/mois",
    mode: "subscription" as const,
    tier: "premium",
  },
  lifetime: {
    priceId: process.env.STRIPE_PRICE_LIFETIME!,
    name: "Lifetime",
    price: "99,99€",
    mode: "payment" as const,
    tier: "lifetime",
  },
  // Legacy alias
  monthly: {
    priceId: process.env.STRIPE_PRICE_BASIC!,
    name: "Basic",
    price: "29,99€/mois",
    mode: "subscription" as const,
    tier: "basic",
  },
};
