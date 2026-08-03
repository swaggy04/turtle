import { AuthCard } from "@/components/auth/auth-card";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";


export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <AuthCard
        title="Reset your password"
        description="Choose a new password for your Turtle account."
      >
        <ResetPasswordForm />
      </AuthCard>
    </main>
  );
}