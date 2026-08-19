import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PlusCircle, Sparkles, FolderGit2, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  // Fetch user data & workspaces
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      workspaces: {
        orderBy: { updatedAt: "desc" },
      },
    },
  });

  const plan = user?.plan ?? "free";
  const workspaces = user?.workspaces ?? [];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {user?.name ?? session.user.name} 🐢
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Manage your AI workspaces and build applications.
            </p>
          </div>

          <Link href="/workspace">
            <Button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold">
              <PlusCircle className="h-4 w-4" />
              New Workspace
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {/* Current Plan Card */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Subscription Plan
              </span>
              <ShieldCheck className="h-5 w-5 text-indigo-400" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold uppercase text-white">{plan}</span>
              <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-400 border border-indigo-500/20">
                Active
              </span>
            </div>
            <p className="mt-4 text-xs text-zinc-400">
              {plan === "free" ? "Unlimited workspace building." : "Pro tier active."}
            </p>
          </div>

          {/* Workspaces Count Card */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Total Workspaces
              </span>
              <FolderGit2 className="h-5 w-5 text-sky-400" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{workspaces.length}</span>
              <span className="text-xs text-zinc-400">Projects Created</span>
            </div>
            <p className="mt-4 text-xs text-zinc-400">
              All generated files and workspace data stored securely.
            </p>
          </div>
        </div>

        {/* Workspaces Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Your Workspaces</h2>
            <span className="text-xs text-zinc-400">{workspaces.length} saved</span>
          </div>

          {workspaces.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 p-12 text-center">
              <Sparkles className="h-10 w-10 text-emerald-400 mb-3" />
              <h3 className="text-lg font-semibold text-white">No workspaces created yet</h3>
              <p className="mt-1 text-sm text-zinc-400 max-w-sm">
                Start by typing a prompt to build your first AI full-stack Next.js application.
              </p>
              <Link href="/workspace" className="mt-6">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold">
                  Create Workspace
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {workspaces.map((ws) => (
                <Link key={ws.id} href={`/workspace?id=${ws.id}`}>
                  <div className="group rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-emerald-500/50 hover:bg-zinc-900">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white group-hover:text-emerald-400 transition truncate">
                        {ws.title || "Untitled Workspace"}
                      </h3>
                      <FolderGit2 className="h-4 w-4 text-zinc-500 group-hover:text-emerald-400 transition" />
                    </div>

                    <div className="mt-6 flex items-center justify-between text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(ws.updatedAt).toLocaleDateString()}
                      </span>
                      <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
                        Next.js
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}