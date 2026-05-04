import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const PLANS = {
  monthly: {
    priceId: process.env.STRIPE_PRICE_MONTHLY!,
    name: "Accès Mensuel",
    price: "39,99€/mois",
    mode: "subscription" as const,
  },
  lifetime: {
    priceId: process.env.STRIPE_PRICE_LIFETIME!,
    name: "Accès à Vie",
    price: "80€",
    mode: "payment" as const,
  },
};
