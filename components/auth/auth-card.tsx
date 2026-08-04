import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-md border-none shadow-xl bg-neutral-950">
      <CardHeader className="space-y-2 text-center pb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardHeader>

      <CardContent className="space-y-6 px-8 pb-8">
        {children}
      </CardContent>
    </Card>
  );
}