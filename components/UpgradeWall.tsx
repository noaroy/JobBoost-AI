"use client";

import Link from "next/link";
import { Zap, Lock, X } from "lucide-react";

type Props = { onClose?: () => void };

export default function UpgradeWall({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="w-14 h-14 bg-blue-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7 text-blue-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">
          Limite gratuite atteinte
        </h2>
        <p className="text-slate-400 mb-6">
          Vous avez utilisé votre génération gratuite. Passez à un plan payant pour des candidatures
          <strong className="text-white"> illimitées</strong>.
        </p>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6 text-left space-y-2">
          {[
            "CV + lettre + entretien illimités",
            "Simulation d'entretien IA",
            "Score de candidature /100",
            "50 templates de lettres inclus",
            "Auto-Apply, relances, plan d'action (Premium)",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
              <span className="text-emerald-400 font-bold">✓</span>
              {f}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/account"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            <Zap className="w-5 h-5" />
            Voir les plans →
          </Link>
          {onClose ? (
            <button onClick={onClose} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Continuer en mode gratuit
            </button>
          ) : (
            <Link href="/dashboard" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Retourner au dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
