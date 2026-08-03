import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { SignInForm } from "@/components/auth/sign-in-form";
import { ForgotPasswordDialog } from "@/components/auth/forgot-password-dialog";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <AuthCard title="Welcome back" description="Sign in to continue building with Turtle.">
        <SignInForm />

        <div className="mt-6 space-y-4 text-center text-sm">
          <div className="flex justify-center">
            <ForgotPasswordDialog />
          </div>
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-medium text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </AuthCard>
    </main>
  );
}
