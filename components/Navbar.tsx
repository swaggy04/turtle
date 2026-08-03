"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Coins, FolderKanban, Moon, Sun } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";

export function Navbar() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error(error);
      return;
    }

    router.refresh();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          Turtle
        </Link>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-muted"
            aria-label="Toggle Theme"
          >
            <Moon className="h-5 w-5 dark:hidden" />
            <Sun className="hidden h-5 w-5 dark:block" />
          </button>

          {!isPending &&
            (session ? (
              <>
                {/* Projects */}
                <button className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-accent">
                  <FolderKanban className="h-4 w-4 text-sky-500" />
                  <span>12 Projects</span>
                </button>

                {/* Credits */}
                <button className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-accent">
                  <Coins className="h-4 w-4 text-amber-500" />
                  <span>25 Credits</span>
                </button>

                {/* User */}
                <span className="hidden text-sm text-muted-foreground md:block">
                  {session.user.name}
                </span>

                {/* Logout */}
                <Button
                  variant="outline"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  
                >
                  <Link href="/sign-in">Sign In</Link>
                </Button>

                <Button>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </>
            ))}
        </div>
      </div>
    </header>
  );
}