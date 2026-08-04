import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthDivider } from "@/components/auth/auth-divider";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-10">
      <AuthCard
        title="Create your account"
        description="Start building AI-powered applications with Turtle."
      >
        <div className="space-y-6">
          <OAuthButtons />

          <AuthDivider />

          <SignUpForm />

          <div className="border-t pt-6">
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </AuthCard>
    </main>
  );
}