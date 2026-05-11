"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Zap, Mail, Lock, ArrowRight } from "lucide-react";

function translateError(msg: string): string {
  if (msg.includes("Invalid login credentials") || msg.includes("invalid_credentials"))
    return "Email ou mot de passe incorrect.";
  if (msg.includes("Email not confirmed"))
    return "Veuillez confirmer votre email. Vérifiez votre boîte mail (et vos spams).";
  if (msg.includes("rate limit"))
    return "Trop de tentatives. Attendez quelques minutes.";
  if (msg.includes("User not found"))
    return "Aucun compte trouvé avec cet email.";
  return "Une erreur est survenue. Réessayez.";
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(searchParams.get("error") ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(translateError(signInError.message));
        return;
      }

      router.refresh();
      router.push(redirectTo);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur inattendue";
      setError(translateError(message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/[0.04] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-400/[0.06] rounded-full blur-2xl" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="w-full max-w-sm relative z-10">

        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-8">
            <div className="w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-amber-400/30 group-hover:shadow-amber-400/50 transition-shadow">
              <Zap className="w-4.5 h-4.5 text-zinc-950" strokeWidth={2.5} />
            </div>
            <span className="font-black text-lg text-white tracking-tight">
              JobBoost <span className="text-amber-400">AI</span>
            </span>
          </Link>

          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            Bon retour.
          </h1>
          <p className="text-zinc-500 text-sm">
            Connectez-vous pour accéder à votre espace
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/60 backdrop-blur border border-white/[0.08] rounded-2xl p-8 shadow-2xl shadow-black/60">

          {/* Gold top line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent rounded-full" />

          {error && (
            <div role="alert" aria-live="polite" className="bg-red-500/8 border border-red-500/20 text-red-400 text-xs rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" aria-hidden="true" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@example.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950/80 border border-white/[0.07] rounded-xl text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Mot de passe
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-amber-400/70 hover:text-amber-400 transition-colors"
                >
                  Oublié ?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" aria-hidden="true" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950/80 border border-white/[0.07] rounded-xl text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all"
                />
              </div>
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-400 text-zinc-950 font-black text-sm hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="text-xs text-zinc-700">ou</span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>

          <p className="text-center text-xs text-zinc-600">
            Pas encore de compte ?{" "}
            <Link href="/signup" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors">
              S&apos;inscrire gratuitement
            </Link>
          </p>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-zinc-700 mt-6">
          Vos données ne sont jamais revendues.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
