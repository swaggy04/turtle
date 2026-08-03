import { AuthCard } from "@/components/auth/auth-card";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <AuthCard
        title="Create your account"
        description="Build AI-powered applications with Turtle."
      >
        <SignUpForm />
      </AuthCard>
    </main>
  );
}