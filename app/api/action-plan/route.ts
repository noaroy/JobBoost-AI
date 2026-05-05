import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateActionPlan } from "@/lib/anthropic";
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
    const { targetJob, location, experienceLevel, applicationsCount, responsesCount, daysSearching } = body;

    if (!targetJob || !location) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const content = await generateActionPlan({
      targetJob,
      location,
      experienceLevel: experienceLevel || "Intermédiaire",
      applicationsCount: Number(applicationsCount) || 0,
      responsesCount: Number(responsesCount) || 0,
      daysSearching: Number(daysSearching) || 0,
    });

    await Promise.all([
      supabase.from("generations").insert({
        user_id: user.id,
        type: "action-plan",
        title: `Plan d'action — ${targetJob}`,
        input: body,
        output: content,
      }),
      incrementGenerationCount(supabase, user.id),
    ]);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Action plan error:", error);
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
