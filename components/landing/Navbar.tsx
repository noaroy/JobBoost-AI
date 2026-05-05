"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Menu, X } from "lucide-react";

const links = [
  { href: "#features", label: "Fonctionnalités" },
  { href: "#how-it-works", label: "Comment ça marche" },
  { href: "#pricing", label: "Tarifs" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/20" : "bg-transparent"
    }`}>
      <div className="container-wide mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-white">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-black tracking-tight">JobBoost <span className="text-orange-400">AI</span></span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5">
            Connexion
          </Link>
          <Link href="/signup"
            className="btn-primary text-sm !py-2 !px-5 !rounded-lg shadow-lg shadow-orange-500/20">
            Essai gratuit →
          </Link>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-white rounded-lg hover:bg-white/5 transition-colors" onClick={() => setOpen(!open)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-slate-950/98 backdrop-blur-xl border-t border-white/5 px-4 py-6 flex flex-col gap-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
              onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="divider-dark my-2" />
          <Link href="/login" className="text-slate-400 px-3 py-2" onClick={() => setOpen(false)}>Connexion</Link>
          <Link href="/signup" className="btn-primary text-center" onClick={() => setOpen(false)}>Essai gratuit →</Link>
        </div>
      )}
    </nav>
  );
}
