import { auth } from "@/lib/auth"
import { useAuth } from "../hooks/useAuth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import WorkspaceClient from "@/components/workspace/WorkspaceLayout"

interface workspacePageProps{
    searchParams:Promise<{prompt?:string,id?:string}>
}
export default async function Workspace({searchParams}:workspacePageProps) {
    const session = await auth.api.getSession({headers:await headers()})
    if(!session){
        redirect("/sign-in")
    }

    const {prompt,id }=await searchParams

    return <WorkspaceClient/>
}

// export default Workspace
