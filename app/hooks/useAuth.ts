"use client";

import { authClient } from "@/lib/auth-client";

export function useAuth() {
  const {
    data: session,
    isPending,
    error,
    refetch,
  } = authClient.useSession();

  return {
    session,

    user: session?.user ?? null,

    isSignedIn: !!session,

    isLoading: isPending,

    error,

    refetch,

    signOut: async () => {
      await authClient.signOut();
    },

    signInWithGoogle: async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    },
  };
}