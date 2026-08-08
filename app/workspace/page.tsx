import { auth } from "@/lib/auth"
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

    

    return <WorkspaceClient/>
}

// export default Workspace
