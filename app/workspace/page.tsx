import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import WorkspaceClient from "@/components/workspace/WorkspaceLayout";
import { WorkspaceProvider } from "@/components/workspace/provider/Workspace-Provider";

interface WorkspacePageProps {
  searchParams: Promise<{
    prompt?: string;
    id?: string;
  }>;
}

export default async function Workspace({ searchParams }: WorkspacePageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { prompt, id } = await searchParams;

  return (
    <WorkspaceProvider initialPrompt={prompt ?? ""}>
      <WorkspaceClient />
    </WorkspaceProvider>
  );
}
