"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PortalButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) router.push(data.url);
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-2 bg-gray-900 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60"
    >
      <CreditCard className="w-4 h-4" />
      {loading ? "Chargement..." : "Gérer mon abonnement →"}
    </button>
  );
}
