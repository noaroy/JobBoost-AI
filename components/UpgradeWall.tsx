"use client";

import Link from "next/link";
import { Zap, Lock } from "lucide-react";

export default function UpgradeWall() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7 text-blue-600" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">
          Limite gratuite atteinte
        </h2>
        <p className="text-gray-500 mb-6">
          Vous avez utilisé votre génération gratuite. Passez à l'accès complet pour des candidatures
          <strong className="text-gray-700"> illimitées</strong>.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-left space-y-2">
          {[
            "CV + lettre + entretien illimités",
            "50 templates de lettres inclus",
            "20 réponses d'entretien STAR",
            "Checklist job 30 jours",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-blue-800">
              <span className="text-green-500 font-bold">✓</span>
              {f}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/account"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Zap className="w-5 h-5" />
            Passer à l'accès complet →
          </Link>
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            Retourner au dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
