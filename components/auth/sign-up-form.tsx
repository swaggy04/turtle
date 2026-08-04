"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import {
  signUpSchema,
  SignUpSchema,
} from "@/lib/validations/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpSchema) => {
    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(
          error.message ?? "Failed to create account."
        );
        return;
      }

      toast.success("Welcome to Turtle!");

      reset();

      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Full Name
        </Label>

        <Input
          id="name"
          placeholder="John Doe"
          autoComplete="name"
          disabled={loading}
          className="h-11 rounded-lg"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email Address
        </Label>

        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          autoComplete="email"
          disabled={loading}
          className="h-11 rounded-lg"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">
          Password
        </Label>

        <div className="relative">
          <Input
            id="password"
            type={
              showPassword ? "text" : "password"
            }
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={loading}
            className="h-11 rounded-lg pr-10"
            {...register("password")}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={loading}
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-transparent"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>

        {errors.password && (
          <p className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirm Password
        </Label>

        <div className="relative">
          <Input
            id="confirmPassword"
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={loading}
            className="h-11 rounded-lg pr-10"
            {...register("confirmPassword")}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={loading}
            onClick={() =>
              setShowConfirmPassword(
                (prev) => !prev
              )
            }
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-transparent"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>

        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Terms */}
      <p className="text-xs leading-5 text-muted-foreground">
        By creating an account, you agree to our{" "}
        <Link
          href="/terms"
          className="font-medium text-primary hover:underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="font-medium text-primary hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-lg text-sm font-medium"
      >
        {loading
          ? "Creating Account..."
          : "Create Account"}
      </Button>
    </form>
  );
}