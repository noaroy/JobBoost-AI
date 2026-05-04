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

    // Session immediately available → email confirmation disabled in Supabase
    if (data.session) {
      router.refresh();
      router.push("/dashboard");
      return;
    }

    // No session → Supabase sent a confirmation email
    setEmailSent(true);
    setLoading(false);
  }

  // ── Email sent screen ──────────────────────────────────────────────────────
  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vérifiez votre email</h2>
            <p className="text-gray-500 mb-2">
              Un lien de confirmation a été envoyé à :
            </p>
            <p className="font-semibold text-gray-900 mb-6">{email}</p>
            <p className="text-sm text-gray-400 mb-6">
              Cliquez sur le lien dans l'email pour activer votre compte et accéder au dashboard.
              Vérifiez aussi vos spams.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline text-sm"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-900 font-bold text-xl mb-6">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            JobBoost AI
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Commencer gratuitement</h1>
          <p className="text-gray-500">Votre 1ère candidature professionnelle en 5 minutes</p>
        </div>

        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {perks.map((p, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-100 rounded-full px-3 py-1">
              <Check className="w-3 h-3" />
              {p}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénom et nom</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Marie Dupont"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marie@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 caractères"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary btn-large disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Création du compte..." : "Créer mon compte gratuit"}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            En vous inscrivant, vous acceptez nos{" "}
            <Link href="/terms" className="underline hover:text-gray-600">conditions d'utilisation</Link>{" "}
            et notre{" "}
            <Link href="/privacy" className="underline hover:text-gray-600">politique de confidentialité</Link>.
          </p>

          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
