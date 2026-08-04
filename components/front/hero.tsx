"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";


const placeholders = [
  "Build a SaaS CRM with authentication...",
  "Create an AI Resume Builder...",
  "Generate a ChatGPT clone using Next.js...",
  "Build a finance dashboard with charts...",
  "Create a project management platform...",
];

export default function Hero() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }, [prompt]);

  const handleSubmit = () => {
    if (!prompt.trim()) return;

    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    router.push(
      `/workspace?prompt=${encodeURIComponent(prompt.trim())}`
    );
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[180px]" />

      {/* Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        {/* Badge */}

        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm backdrop-blur">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          AI Powered Full Stack Builder
        </div>

        {/* Heading */}

        <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-tight sm:text-7xl lg:text-[7rem]">
          Build AI apps
          <br />

          <span className="bg-linear-to-r from-white via-zinc-400 to-emerald-500 bg-clip-text text-transparent">
            from a single
          </span>

          <br />

          prompt.
        </h1>

        {/* Description */}

        <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground lg:text-xl">
          Describe your idea in plain English. Turtle generates
          production-ready full-stack applications you can edit,
          preview and deploy instantly.
        </p>

        {/* Prompt */}

        <div className="relative mx-auto mt-14 w-full max-w-3xl">
          <div
            className={cn(
              "rounded-2xl border bg-[#111111] transition-all duration-200",
              isFocused
                ? "border-white/20 ring-1 ring-white/10"
                : "border-white/10"
            )}
          >
            <textarea
              ref={textareaRef}
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder={placeholders[placeholderIndex]}
              className="min-h-35 w-full resize-none bg-transparent px-6 py-6 text-lg text-white outline-none placeholder:text-zinc-500"
            />

            <div className="flex items-center justify-between border-t border-white/10 p-4">
              <span className="text-sm text-zinc-500">
                Press{" "}
                <kbd className="rounded border border-white/10 px-2 py-1">
                  Shift
                </kbd>{" "}
                +{" "}
                <kbd className="rounded border border-white/10 px-2 py-1">
                  Enter
                </kbd>{" "}
                for newline
              </span>

              <Button
                onClick={handleSubmit}
                disabled={!prompt.trim()}
                className="rounded-xl px-6"
              >
                Generate
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Pills */}

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
          {[
            "Next.js",
            "React",
            "Prisma",
            "Postgres",
            "Docker",
            "AI Agents",
          ].map((item) => (
            <div
              key={item}
              className="rounded-full border border-border/60 bg-background/50 px-4 py-2"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}