import { AuthCard } from "@/components/auth/auth-card";
import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <AuthCard
        title="Welcome back"
        description="Sign in to continue building with Turtle."
      >
        <SignInForm />
      </AuthCard>
    </main>
  );
}