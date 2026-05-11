"use client";

import { useEffect, useRef, useState } from "react";

/* ── Scroll progress bar ──────────────────────────────────────────────────── */
export function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      id="scroll-progress"
      className="fixed top-0 left-0 right-0 h-[2px] bg-orange-500 origin-left z-[200]"
      style={{ transform: "scaleX(0)", transition: "none" }}
      aria-hidden="true"
    />
  );
}

/* ── Scroll-driven section reveals ────────────────────────────────────────── */
export function ScrollReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.querySelectorAll("[data-reveal]").forEach((el) =>
        el.classList.add("in-view")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}

/* ── Animated stat counter ─────────────────────────────────────────────────── */
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function AnimatedStat({
  raw,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  raw: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [current, setCurrent] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setCurrent(raw); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1);
            setCurrent(Math.round(easeOutExpo(p) * raw));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [raw, duration]);

  const formatted =
    current >= 1000
      ? current.toLocaleString("fr-FR")
      : String(current);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{formatted}{suffix}
    </span>
  );
}
