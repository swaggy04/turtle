"use client"
import { useWorkspace } from "./provider/WorkspaceContext"

export function FileExplorer(){
    const {state,dispatch} =useWorkspace()
    const files =  Object.values(state.files)

 return(
    <div>

    </div>
 )
}