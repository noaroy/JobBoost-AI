"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UpgradeButton({
  plan,
  label,
  primary = false,
}: {
  plan: "basic" | "premium" | "monthly" | "lifetime";
  label: string;
  primary?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all disabled:opacity-60 ${
        primary
          ? "bg-orange-500 text-white hover:bg-orange-400 shadow-lg shadow-orange-500/20"
          : "bg-slate-700 text-white hover:bg-slate-600"
      }`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <Zap className="w-4 h-4" />
      )}
      {loading ? "Redirection..." : label}
    </button>
  );
}
