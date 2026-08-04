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
  signInSchema,
  SignInSchema,
} from "@/lib/validations/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ForgotPasswordDialog } from "./forgot-password-dialog";

export function SignInForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInSchema) => {
    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(
          error.message ?? "Invalid email or password"
        );
        return;
      }

      toast.success("Welcome back!");

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
        <div className="flex items-center justify-between">
          <Label htmlFor="password">
            Password
          </Label>

          <div className="text-xs">
  <ForgotPasswordDialog />
</div>
        </div>

        <div className="relative">
          <Input
            id="password"
            type={
              showPassword ? "text" : "password"
            }
            placeholder="••••••••"
            autoComplete="current-password"
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

      {/* Sign In Button */}
      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-lg text-sm font-medium"
      >
        {loading
          ? "Signing In..."
          : "Sign In"}
      </Button>
    </form>
  );
}