import Link from "next/link";
import { Zap } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 py-4 px-4">
        <div className="container-narrow mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-900 font-bold">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            JobBoost AI
          </Link>
        </div>
      </header>

      <main className="container-narrow mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Conditions d'utilisation</h1>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptation des conditions</h2>
            <p>En utilisant JobBoost AI, vous acceptez les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description du service</h2>
            <p>JobBoost AI est un outil SaaS qui génère des CV, lettres de motivation et préparations d'entretien à l'aide de l'intelligence artificielle. Les contenus générés sont des suggestions à réviser et adapter selon votre situation.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Compte gratuit et accès payant</h2>
            <p>Le compte gratuit permet de générer 1 candidature complète sans frais, sans carte bancaire requise. L'accès complet est disponible via un abonnement mensuel (39,99€/mois) ou un paiement unique à vie (80€). Les paiements sont traités via Stripe.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Garantie satisfait ou remboursé</h2>
            <p>Vous disposez de 7 jours à compter de votre premier paiement pour demander un remboursement complet, sans justification requise. Contactez support@jobboost.ai dans ce délai.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Propriété des contenus</h2>
            <p>Les contenus générés par l'IA appartiennent à l'utilisateur. JobBoost AI se réserve le droit d'utiliser des données anonymisées pour améliorer ses modèles.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Limitation de responsabilité</h2>
            <p>JobBoost AI ne garantit pas l'obtention d'un emploi. Les résultats dépendent de nombreux facteurs indépendants de notre service. Nous ne sommes pas responsables des décisions de recrutement des employeurs.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact</h2>
            <p>Pour toute question : <a href="mailto:contact@jobboost.ai" className="text-blue-600">contact@jobboost.ai</a></p>
          </section>
        </div>
      </main>
    </div>
  );
}
