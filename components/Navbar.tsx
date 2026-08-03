import Link from "next/link";
import { Coins, FolderKanban, Moon, Sun } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left */}
        <Link href="/" className="text-xl font-bold tracking-tight transition-opacity hover:opacity-80">
          Turtle
        </Link>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-accent">
            <FolderKanban className="h-4 w-4 text-sky-500" />
            <span>12 Projects</span>
          </button>

          <button className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-accent">
            <Coins className="h-4 w-4 text-amber-500" />
            <span>25 Credits</span>
          </button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-muted"
            aria-label="Toggle Theme"
          >
            <Moon className="h-5 w-5 dark:hidden" />
            <Sun className="hidden h-5 w-5 dark:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
