import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateInterviewQuestion, evaluateInterviewAnswer } from "@/lib/anthropic";
import { getProfile, canGenerate } from "@/lib/plans";

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
    const { action } = body;

    if (action === "question") {
      const { targetJob, company, jobDescription, questionNumber, previousQA } = body;
      if (!targetJob || !company) {
        return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
      }
      const result = await generateInterviewQuestion({
        targetJob,
        company,
        jobDescription: jobDescription || "",
        questionNumber: Number(questionNumber) || 1,
        previousQA: previousQA || [],
      });
      return NextResponse.json(result);
    }

    if (action === "evaluate") {
      const { targetJob, question, answer, questionNumber } = body;
      if (!targetJob || !question || !answer) {
        return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
      }
      const result = await evaluateInterviewAnswer({
        targetJob,
        question,
        answer,
        questionNumber: Number(questionNumber) || 1,
      });
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Action invalide" }, { status: 400 });
  } catch (error) {
    console.error("Interview sim error:", error);
    return NextResponse.json({ error: "Erreur lors de la simulation" }, { status: 500 });
  }
}
