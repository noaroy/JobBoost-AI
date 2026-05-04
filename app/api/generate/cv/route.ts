import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateCV } from "@/lib/anthropic";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, email, phone, location, targetJob, experience, education, skills, languages } = body;

    if (!fullName || !email || !targetJob || !experience) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const content = await generateCV({ fullName, email, phone, location, targetJob, experience, education, skills, languages });

    await supabase.from("generations").insert({
      user_id: user.id,
      type: "cv",
      input: body,
      output: content,
    });

    return NextResponse.json({ content });
  } catch (error) {
    console.error("CV generation error:", error);
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
