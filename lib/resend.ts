import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "noreply@jobboost.ai",
    to,
    subject: "Bienvenue sur JobBoost AI — Votre première candidature gratuite vous attend !",
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><style>
  body { font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background: #f9fafb; }
  .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .header { background: linear-gradient(135deg, #2563eb, #4f46e5); padding: 40px 40px 30px; text-align: center; }
  .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 800; }
  .header p { color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 16px; }
  .body { padding: 40px; }
  .body h2 { font-size: 22px; color: #1f2937; }
  .cta { display: block; width: fit-content; margin: 24px auto; padding: 14px 32px; background: #2563eb; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; text-align: center; }
  .feature { display: flex; align-items: flex-start; gap: 12px; margin: 16px 0; }
  .feature span { font-size: 20px; }
  .footer { padding: 24px 40px; background: #f9fafb; text-align: center; font-size: 13px; color: #6b7280; }
</style></head>
<body>
<div class="container">
  <div class="header">
    <h1>⚡ JobBoost AI</h1>
    <p>Postulez à 10 offres en 5 minutes</p>
  </div>
  <div class="body">
    <h2>Bonjour ${name} 👋</h2>
    <p>Bienvenue sur JobBoost AI ! Votre compte est prêt et votre <strong>première candidature est entièrement gratuite</strong>.</p>
    <p>Voici ce que vous pouvez faire dès maintenant :</p>
    <div class="feature"><span>📄</span><div><strong>CV optimisé IA</strong> — Générez un CV professionnel adapté au poste en 2 minutes</div></div>
    <div class="feature"><span>✉️</span><div><strong>Lettre de motivation automatique</strong> — Personnalisée pour chaque offre</div></div>
    <div class="feature"><span>🎤</span><div><strong>Préparation entretien</strong> — Questions clés + réponses modèles</div></div>
    <div class="feature"><span>🏢</span><div><strong>Suggestions d'entreprises</strong> — Trouvez les meilleurs employeurs pour votre profil</div></div>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="cta">Démarrer ma première candidature →</a>
    <p style="font-size: 14px; color: #6b7280; text-align: center;">Moins de 5 minutes pour une candidature professionnelle complète.</p>
  </div>
  <div class="footer">
    <p>© 2025 JobBoost AI — <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #2563eb;">jobboost.ai</a></p>
    <p>Vous recevez cet email car vous venez de créer un compte.</p>
  </div>
</div>
</body>
</html>`,
  });
}

export async function sendGenerationEmail(
  to: string,
  name: string,
  type: "cv" | "cover-letter" | "interview",
  content: string
) {
  const labels = {
    cv: { subject: "Votre CV optimisé est prêt !", title: "CV Professionnel" },
    "cover-letter": { subject: "Votre lettre de motivation est prête !", title: "Lettre de Motivation" },
    interview: { subject: "Votre préparation entretien est prête !", title: "Préparation Entretien" },
  };

  const { subject, title } = labels[type];

  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "noreply@jobboost.ai",
    to,
    subject: `[JobBoost AI] ${subject}`,
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><style>
  body { font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background: #f9fafb; }
  .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .header { background: linear-gradient(135deg, #2563eb, #4f46e5); padding: 32px 40px; }
  .header h1 { color: white; margin: 0; font-size: 22px; font-weight: 800; }
  .body { padding: 40px; }
  .content-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0; font-size: 14px; white-space: pre-wrap; font-family: monospace; }
  .cta { display: block; width: fit-content; margin: 24px auto; padding: 14px 32px; background: #2563eb; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; }
  .footer { padding: 24px 40px; background: #f9fafb; text-align: center; font-size: 13px; color: #6b7280; }
</style></head>
<body>
<div class="container">
  <div class="header"><h1>⚡ JobBoost AI — ${title}</h1></div>
  <div class="body">
    <p>Bonjour ${name},</p>
    <p>Votre <strong>${title.toLowerCase()}</strong> généré par IA est prêt. Retrouvez-le ci-dessous ou dans votre tableau de bord :</p>
    <div class="content-box">${content.substring(0, 2000)}${content.length > 2000 ? "\n\n[... Voir le document complet dans votre dashboard ...]" : ""}</div>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="cta">Voir dans mon dashboard →</a>
  </div>
  <div class="footer"><p>© 2025 JobBoost AI</p></div>
</div>
</body>
</html>`,
  });
}
