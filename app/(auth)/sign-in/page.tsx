import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthDivider } from "@/components/auth/auth-divider";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-10">
      <AuthCard title="Welcome Back" description="Sign in to continue building with Turtle.">
        <div className="space-y-6">
          <OAuthButtons />

          <AuthDivider />

          <SignInForm />

          <div className="border-t pt-6">
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="font-medium text-primary transition-colors hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </AuthCard>
    </main>
  );
}
