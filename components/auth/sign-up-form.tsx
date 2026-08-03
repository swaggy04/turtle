"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema, SignUpSchema } from "@/lib/validations/auth";
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpSchema) => {
  const { error } = await authClient.signUp.email({
    name: values.name,
    email: values.email,
    password: values.password,
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log("User created!");
};

  return (
    <div>
      Form goes here...
    </div>
  );
}