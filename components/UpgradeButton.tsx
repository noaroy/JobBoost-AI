"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UpgradeButton({
  plan,
  label,
  primary = false,
}: {
  plan: "monthly" | "lifetime";
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
          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
          : "bg-gray-900 text-white hover:bg-gray-800"
      }`}
    >
      {loading ? (
        <span className="animate-spin text-base">⚡</span>
      ) : (
        <Zap className="w-4 h-4" />
      )}
      {loading ? "Redirection..." : label}
    </button>
  );
}
