import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateCoverLetter } from "@/lib/anthropic";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, targetJob, company, jobDescription, experience, motivation } = body;

    if (!fullName || !targetJob || !company || !jobDescription || !experience) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const content = await generateCoverLetter({ fullName, targetJob, company, jobDescription, experience, motivation });

    await supabase.from("generations").insert({
      user_id: user.id,
      type: "cover_letter",
      input: body,
      output: content,
    });

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Cover letter generation error:", error);
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
