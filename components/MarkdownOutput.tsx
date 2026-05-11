"use client";

import React from "react";

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
      : part
  );
}

export default function MarkdownOutput({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="text-sm leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith("# ")) {
          return <h1 key={i} className="text-xl font-black text-white mt-5 mb-2 first:mt-0">{renderInline(line.slice(2))}</h1>;
        }
        if (line.startsWith("## ")) {
          return <h2 key={i} className="text-base font-bold text-white mt-5 mb-2 pt-3 border-t border-slate-800 first:mt-0 first:pt-0 first:border-0">{renderInline(line.slice(3))}</h2>;
        }
        if (line.startsWith("### ")) {
          return <h3 key={i} className="font-semibold text-orange-400 mt-3 mb-1">{renderInline(line.slice(4))}</h3>;
        }
        if (line.match(/^[-*] /)) {
          return (
            <div key={i} className="flex gap-2 text-slate-300 py-0.5">
              <span className="text-orange-400 shrink-0 mt-0.5 text-xs">▸</span>
              <span>{renderInline(line.slice(2))}</span>
            </div>
          );
        }
        if (line.match(/^\d+\. /)) {
          const num = line.match(/^\d+/)?.[0] ?? "";
          const rest = line.replace(/^\d+\.\s*/, "");
          return (
            <div key={i} className="flex gap-2 text-slate-300 py-0.5">
              <span className="text-orange-400 font-bold shrink-0 w-5 text-right">{num}.</span>
              <span>{renderInline(rest)}</span>
            </div>
          );
        }
        if (line.trim() === "") {
          return <div key={i} className="h-2" />;
        }
        if (line.startsWith("---")) {
          return <hr key={i} className="border-slate-800 my-3" />;
        }
        return <p key={i} className="text-slate-300">{renderInline(line)}</p>;
      })}
    </div>
  );
}
