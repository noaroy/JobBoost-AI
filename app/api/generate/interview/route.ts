import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateInterviewPrep } from "@/lib/anthropic";
import { getProfile, canGenerate, incrementGenerationCount } from "@/lib/plans";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const profile = await getProfile(supabase, user.id);
    if (!profile) {
      return NextResponse.json({ error: "Profil introuvable" }, { status: 404 });
    }

    const { allowed, reason } = canGenerate(profile);
    if (!allowed) {
      return NextResponse.json({ error: reason, upgrade: true }, { status: 403 });
    }

    const body = await req.json();
    const { targetJob, company, jobDescription, experience } = body;

    if (!targetJob || !company || !jobDescription || !experience) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const content = await generateInterviewPrep({ targetJob, company, jobDescription, experience });

    await Promise.all([
      supabase.from("generations").insert({
        user_id: user.id,
        type: "interview_prep",
        title: `Entretien — ${targetJob} chez ${company}`,
        input: body,
        output: content,
      }),
      incrementGenerationCount(supabase, user.id),
    ]);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Interview prep generation error:", error);
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
