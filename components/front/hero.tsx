"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const placeholders = [
  "Build a SaaS CRM with authentication...",
  "Create an AI Resume Builder...",
  "Generate a ChatGPT clone with Next.js...",
  "Build a finance dashboard with charts...",
  "Create a project management platform...",
];

export default function Hero() {
  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-size-[48px_48px]" />

      {/* Glow */}
      {/* <div className="absolute left-1/2 top-0 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[180px]" /> */}

      {/* Fade */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        {/* Badge */}

        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium backdrop-blur">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          AI Powered Full Stack App Builder
        </div>

        {/* Heading */}

        <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-tight sm:text-7xl lg:text-[7rem]">
          Build AI apps
          <br />
          <span className="bg-linear-to-r from-foreground via-zinc-400 to-emerald-500 bg-clip-text text-transparent">
            from a single
          </span>
          <br />
          prompt.
        </h1>

        {/* Description */}

        <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground lg:text-xl">
          Describe your idea in plain English. Turtle generates production-ready full-stack applications you can edit,
          preview and deploy instantly.
        </p>

        {/* Prompt */}

        <div className="relative mx-auto mt-12 w-full max-w-2xl">
          className=
          {cn(
            "rounded-2xl border bg-[#111111] duration-200",
            isFocused ? "border-white/20 ring-1 ring-white/8" : "border-white/8",
          )}
        </div>
      </div>
    </section>
  );
}
