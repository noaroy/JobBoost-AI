import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateCoverLetter } from "@/lib/anthropic";
import { getProfile, canGenerate, incrementGenerationCount } from "@/lib/plans";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    const profile = await getProfile(supabase, user.id);
    if (!profile) return NextResponse.json({ error: "Profil introuvable" }, { status: 404 });

    const { allowed, reason } = canGenerate(profile);
    if (!allowed) return NextResponse.json({ error: reason, upgrade: true }, { status: 403 });

    const body = await req.json();
    const { jobOffer, experience } = body;
    if (!jobOffer || !experience) {
      return NextResponse.json({ error: "Collez l'offre d'emploi et votre expérience" }, { status: 400 });
    }

    const content = await generateCoverLetter({ jobOffer, experience });

    await Promise.all([
      supabase.from("generations").insert({
        user_id: user.id, type: "cover_letter",
        title: "Lettre de motivation",
        input: body, output: content,
      }),
      incrementGenerationCount(supabase, user.id),
    ]);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Cover letter error:", error);
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
