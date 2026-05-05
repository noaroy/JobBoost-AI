"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mic, ChevronRight } from "lucide-react";
import UpgradeWall from "@/components/UpgradeWall";

type QA = { q: string; a: string; score?: number; feedback?: string; betterAnswer?: string };

export default function InterviewSimPage() {
  const [setup, setSetup] = useState({ targetJob: "", company: "", jobDescription: "" });
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{ question: string; tip: string } | null>(null);
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState<QA[]>([]);
  const [evaluation, setEvaluation] = useState<{ score: number; feedback: string; betterAnswer: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  async function startSim() {
    if (!setup.targetJob || !setup.company) return;
    setLoading(true);
    try {
      const res = await fetch("/api/interview-sim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "question", ...setup, questionNumber: 1, previousQA: [] }),
      });
      const data = await res.json();
      if (res.status === 403 && data.upgrade) { setShowUpgrade(true); return; }
      if (!res.ok) return;
      setCurrentQuestion(data);
      setStarted(true);
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswer() {
    if (!answer.trim() || !currentQuestion) return;
    setLoading(true);
    setEvaluation(null);
    try {
      const evalRes = await fetch("/api/interview-sim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "evaluate",
          targetJob: setup.targetJob,
          question: currentQuestion.question,
          answer,
          questionNumber: history.length + 1,
        }),
      });
      const evalData = await evalRes.json();
      setEvaluation(evalData);

      const newQA: QA = {
        q: currentQuestion.question,
        a: answer,
        score: evalData.score,
        feedback: evalData.feedback,
        betterAnswer: evalData.betterAnswer,
      };
      setHistory((h) => [...h, newQA]);
    } finally {
      setLoading(false);
    }
  }

  async function nextQuestion() {
    setLoading(true);
    setAnswer("");
    setEvaluation(null);
    try {
      const res = await fetch("/api/interview-sim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "question",
          ...setup,
          questionNumber: history.length + 1,
          previousQA: history.map((qa) => ({ q: qa.q, a: qa.a })),
        }),
      });
      const data = await res.json();
      if (!res.ok) return;
      setCurrentQuestion(data);
    } finally {
      setLoading(false);
    }
  }

  const avgScore = history.length > 0
    ? Math.round(history.reduce((sum, qa) => sum + (qa.score || 0), 0) / history.length)
    : null;

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        {showUpgrade && <UpgradeWall onClose={() => setShowUpgrade(false)} />}
        <div className="max-w-xl mx-auto px-4 py-10">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Retour au dashboard
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Mic className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Simulation d&apos;entretien</h1>
              <p className="text-slate-400 text-sm">Entraînez-vous avec un recruteur IA — feedback en temps réel</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Poste visé *</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                placeholder="UX Designer"
                value={setup.targetJob}
                onChange={(e) => setSetup((s) => ({ ...s, targetJob: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Entreprise *</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                placeholder="Figma"
                value={setup.company}
                onChange={(e) => setSetup((s) => ({ ...s, company: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Description du poste (optionnel)</label>
              <textarea
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 min-h-[100px]"
                placeholder="Collez l'annonce pour des questions plus précises..."
                value={setup.jobDescription}
                onChange={(e) => setSetup((s) => ({ ...s, jobDescription: e.target.value }))}
              />
            </div>
            <button
              onClick={startSim}
              disabled={loading || !setup.targetJob || !setup.company}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Mic className="w-4 h-4" />}
              Démarrer la simulation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Arrêter la simulation
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-sm">Question {history.length + 1}</span>
            {avgScore !== null && (
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${avgScore >= 70 ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                Score moy. {avgScore}/100
              </span>
            )}
          </div>
        </div>

        {/* Current question */}
        {currentQuestion && !evaluation && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Mic className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-emerald-400 text-sm font-medium">Recruteur IA</span>
            </div>
            <p className="text-white font-medium mb-3">{currentQuestion.question}</p>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-2.5">
              <p className="text-blue-300 text-xs">💡 {currentQuestion.tip}</p>
            </div>
          </div>
        )}

        {/* Evaluation result */}
        {evaluation && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white">Feedback IA</h3>
              <span className={`text-2xl font-black ${evaluation.score >= 70 ? "text-emerald-400" : evaluation.score >= 50 ? "text-amber-400" : "text-red-400"}`}>
                {evaluation.score}/100
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{evaluation.feedback}</p>
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4">
              <p className="text-xs text-violet-400 font-semibold mb-1">Version améliorée :</p>
              <p className="text-slate-300 text-sm leading-relaxed italic">&ldquo;{evaluation.betterAnswer}&rdquo;</p>
            </div>
            <button
              onClick={nextQuestion}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Question suivante <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Answer input */}
        {!evaluation && currentQuestion && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Votre réponse</label>
            <textarea
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 min-h-[140px] mb-4"
              placeholder="Répondez à la question du recruteur..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button
              onClick={submitAnswer}
              disabled={loading || !answer.trim()}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
              Soumettre ma réponse
            </button>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-slate-400 text-sm font-medium">Questions précédentes</h3>
            {history.map((qa, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-xs">Q{i + 1}: {qa.q.slice(0, 80)}...</span>
                  {qa.score && (
                    <span className={`text-xs font-bold ${qa.score >= 70 ? "text-emerald-400" : "text-amber-400"}`}>
                      {qa.score}/100
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
