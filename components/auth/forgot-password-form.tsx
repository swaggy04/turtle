"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/lib/validations/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ForgotPasswordFormProps = {
  onSuccess?: () => void;
};

export function ForgotPasswordForm({
  onSuccess,
}: ForgotPasswordFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordSchema) => {
    try {
      setLoading(true);

      const { error } = await authClient.requestPasswordReset({
        email: values.email,
        redirectTo: "http://localhost:3000/reset-password",
      });

      if (error) {
        toast.error(error.message ?? "Failed to send reset link.");
        return;
      }

      toast.success(
        "If an account exists, we've sent a password reset link."
      );

      reset();

      onSuccess?.();
    } catch (error) {
      console.error("Forgot password failed:", error);

      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          autoComplete="email"
          disabled={loading}
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading
          ? "Sending Reset Link..."
          : "Send Reset Link"}
      </Button>
    </form>
  );
}