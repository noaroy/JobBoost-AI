import Link from "next/link";
import { Zap } from "lucide-react";

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Politique de confidentialité</h1>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Données collectées</h2>
            <p>Nous collectons les données suivantes : votre nom, adresse email, et les informations que vous saisissez dans nos générateurs (expériences, formation, compétences). Ces données sont nécessaires au fonctionnement du service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Utilisation des données</h2>
            <p>Vos données sont utilisées exclusivement pour générer vos candidatures via l'IA et vous envoyer les résultats par email. Nous ne vendons ni ne partageons vos données avec des tiers à des fins commerciales.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Conservation des données</h2>
            <p>Vos données sont conservées pendant la durée de votre abonnement et 12 mois après sa résiliation, sauf demande de suppression de votre part.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Contactez-nous à privacy@jobboost.ai pour exercer ces droits.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Sécurité</h2>
            <p>Vos données sont stockées de manière sécurisée via Supabase, un service conforme aux normes SOC 2 Type II. Toutes les communications sont chiffrées via HTTPS.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Contact</h2>
            <p>Pour toute question : <a href="mailto:privacy@jobboost.ai" className="text-blue-600">privacy@jobboost.ai</a></p>
          </section>
        </div>
      </main>
    </div>
  );
}
