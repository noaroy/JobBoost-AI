"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container-wide mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          JobBoost AI
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
            Comment ça marche
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
            Tarifs
          </Link>
          <Link href="#faq" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
            FAQ
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium px-4 py-2 transition-colors">
            Connexion
          </Link>
          <Link href="/signup" className="btn-primary text-sm !py-2 !px-5">
            Essai gratuit →
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-6 flex flex-col gap-4">
          <Link href="#how-it-works" className="text-gray-700 font-medium" onClick={() => setOpen(false)}>Comment ça marche</Link>
          <Link href="#pricing" className="text-gray-700 font-medium" onClick={() => setOpen(false)}>Tarifs</Link>
          <Link href="#faq" className="text-gray-700 font-medium" onClick={() => setOpen(false)}>FAQ</Link>
          <hr className="border-gray-100" />
          <Link href="/login" className="text-gray-700 font-medium" onClick={() => setOpen(false)}>Connexion</Link>
          <Link href="/signup" className="btn-primary text-center" onClick={() => setOpen(false)}>Essai gratuit →</Link>
        </div>
      )}
    </nav>
  );
}
