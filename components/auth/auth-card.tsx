import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";

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
    <Card className="mx-auto w-full max-w-md border-border/60">
      <CardHeader className="space-y-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground text-sm">
          {description}
        </p>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}