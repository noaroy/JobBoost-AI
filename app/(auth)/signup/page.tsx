"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Zap, Mail, Lock, User, ArrowRight, Check } from "lucide-react";

const perks = [
  "1ère candidature 100% gratuite",
  "CV optimisé ATS en 5 minutes",
  "Sans carte bancaire",
];

function translateError(msg: string): string {
  if (msg.includes("already registered") || msg.includes("already been registered"))
    return "Un compte existe déjà avec cette adresse email. Connectez-vous.";
  if (msg.includes("Password should be at least"))
    return "Le mot de passe doit contenir au moins 6 caractères.";
  if (msg.includes("Invalid email"))
    return "Adresse email invalide.";
  if (msg.includes("rate limit") || msg.includes("over_email_send_rate_limit"))
    return "Trop de tentatives. Attendez quelques minutes avant de réessayer.";
  if (msg.includes("Email not confirmed"))
    return "Veuillez confirmer votre email avant de vous connecter.";
  if (msg.includes("signup_disabled"))
    return "Les inscriptions sont temporairement désactivées.";
  return msg;
}

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signUpError) {
      setError(translateError(signUpError.message));
      setLoading(false);
      return;
    }

    if (data.session) {
      router.refresh();
      router.push("/dashboard");
      return;
    }

    setEmailSent(true);
    setLoading(false);
  }

  // ── Email sent screen ──────────────────────────────────────────────────────
  if (emailSent) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center">
            <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail aria-hidden="true" className="w-8 h-8 text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Vérifiez votre email</h2>
            <p className="text-slate-400 mb-2">
              Un lien de confirmation a été envoyé à :
            </p>
            <p className="font-semibold text-white mb-6">{email}</p>
            <p className="text-sm text-slate-500 mb-6">
              Cliquez sur le lien dans l&apos;email pour activer votre compte et accéder au dashboard.
              Vérifiez aussi vos spams.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-orange-400 font-semibold hover:text-orange-300 text-sm"
            >
              Déjà confirmé ? Se connecter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Signup form ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white font-bold text-xl mb-6">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            JobBoost AI
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Commencer gratuitement</h1>
          <p className="text-slate-400">Votre 1ère candidature professionnelle en 5 minutes</p>
        </div>

        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {perks.map((p, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
              <Check aria-hidden="true" className="w-3 h-3" />
              {p}
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
          {error && (
            <div role="alert" aria-live="polite" className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Prénom et nom</label>
              <div className="relative">
                <User aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Marie Dupont"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marie@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 caractères"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-2xl bg-orange-500 text-white font-bold hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Création du compte..." : "Créer mon compte gratuit"}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 mt-4">
            En vous inscrivant, vous acceptez nos{" "}
            <Link href="/terms" className="text-slate-500 underline hover:text-slate-300">conditions d&apos;utilisation</Link>{" "}
            et notre{" "}
            <Link href="/privacy" className="text-slate-500 underline hover:text-slate-300">politique de confidentialité</Link>.
          </p>

          <p className="text-center text-sm text-slate-500 mt-6">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-orange-400 font-semibold hover:text-orange-300">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
