"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Moon, Sun } from "lucide-react";

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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
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
                {/* Plan Badge */}
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium uppercase text-primary border border-primary/20">
                    {(session.user as { plan?: string }).plan ?? "free"}
                  </span>
                </div>

                {/* User Name */}
                <span className="hidden text-sm font-medium md:block">
                  {session.user.name}
                </span>

                {/* Avatar */}
                {(session.user as { imageUrl?: string }).imageUrl ? (
                  <img
                    src={(session.user as { imageUrl?: string }).imageUrl}
                    alt={session.user.name ?? "User"}
                    className="h-10 w-10 rounded-full object-cover border border-border"
                  />
                ) : session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "User"}
                    className="h-10 w-10 rounded-full object-cover border border-border"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Logout */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost">
                    Sign In
                  </Button>
                </Link>

                <Link href="/sign-up">
                  <Button>
                    Get Started
                  </Button>
                </Link>
              </>
            ))}
        </div>
      </div>
    </header>
  );
}