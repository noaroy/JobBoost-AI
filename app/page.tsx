import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import HowItWorks from "@/components/landing/HowItWorks";
import Demo from "@/components/landing/Demo";
import WhyItWorks from "@/components/landing/WhyItWorks";
import Results from "@/components/landing/Results";
import Bonuses from "@/components/landing/Bonuses";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import { ScrollProgress, ScrollReveal } from "@/components/landing/effects";

export default function LandingPage() {
  return (
    <>
      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:bg-orange-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm"
      >
        Aller au contenu principal
      </a>

      {/* Scroll progress — 2px orange bar at top */}
      <ScrollProgress />

      {/* IntersectionObserver reveal engine */}
      <ScrollReveal />

      <Navbar />

      <main id="main-content">
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Demo />
        <WhyItWorks />
        <Results />
        <Bonuses />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
