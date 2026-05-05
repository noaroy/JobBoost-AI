import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateBatchApplication } from "@/lib/anthropic";
import { getProfile, canUsePremiumFeature, incrementGenerationCount } from "@/lib/plans";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    const profile = await getProfile(supabase, user.id);
    if (!profile) return NextResponse.json({ error: "Profil introuvable" }, { status: 404 });

    const { allowed, reason } = canUsePremiumFeature(profile);
    if (!allowed) return NextResponse.json({ error: reason, upgrade: true }, { status: 403 });

    const body = await req.json();
    const { fullName, targetJob, experience, skills, offers } = body;

    if (!fullName || !targetJob || !experience || !offers?.length) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    if (offers.length > 5) {
      return NextResponse.json({ error: "Maximum 5 offres par lot" }, { status: 400 });
    }

    const results = await Promise.all(
      offers.map(async (offer: { company: string; companyDescription: string; jobDescription: string }) => {
        const { cv, coverLetter } = await generateBatchApplication({
          fullName,
          targetJob,
          experience,
          skills: skills || "",
          company: offer.company,
          companyDescription: offer.companyDescription || "",
          jobDescription: offer.jobDescription,
        });

        await supabase.from("generations").insert({
          user_id: user.id,
          type: "auto-apply",
          title: `Auto-Apply — ${targetJob} chez ${offer.company}`,
          input: { fullName, targetJob, experience, skills, offer },
          output: `CV:\n${cv}\n\n---\n\nLETTRE:\n${coverLetter}`,
        });

        return { company: offer.company, cv, coverLetter };
      })
    );

    await incrementGenerationCount(supabase, user.id);

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Auto-apply error:", error);
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
