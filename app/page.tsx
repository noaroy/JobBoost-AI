import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import HowItWorks from "@/components/landing/HowItWorks";
import WhyItWorks from "@/components/landing/WhyItWorks";
import Results from "@/components/landing/Results";
import Bonuses from "@/components/landing/Bonuses";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
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
