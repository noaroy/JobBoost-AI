import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { scoreApplication } from "@/lib/anthropic";
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
    const { cv, jobOffer } = body;
    if (!cv) {
      return NextResponse.json({ error: "Collez le contenu de votre CV" }, { status: 400 });
    }

    const content = await scoreApplication({ cv, jobOffer });

    await Promise.all([
      supabase.from("generations").insert({
        user_id: user.id, type: "score",
        title: "Score candidature",
        input: body, output: content,
      }),
      incrementGenerationCount(supabase, user.id),
    ]);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Score error:", error);
    return NextResponse.json({ error: "Erreur lors de l'évaluation" }, { status: 500 });
  }
}
