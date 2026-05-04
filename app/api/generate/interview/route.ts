import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateInterviewPrep } from "@/lib/anthropic";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await req.json();
    const { targetJob, company, jobDescription, experience } = body;

    if (!targetJob || !company || !jobDescription || !experience) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const content = await generateInterviewPrep({ targetJob, company, jobDescription, experience });

    await supabase.from("generations").insert({
      user_id: user.id,
      type: "interview_prep",
      input: body,
      output: content,
    });

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Interview prep generation error:", error);
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
