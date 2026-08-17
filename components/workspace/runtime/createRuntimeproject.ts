import { GeneratedProject } from "@/services/ai-schema";
import { FileSystemTree } from "@webcontainer/api";

export function createRuntimeProject(project: GeneratedProject): FileSystemTree {
    const tree :FileSystemTree={}
    for(const files of project.files){
        const parts = files.path.split("/")
        let current=tree
        for(let i=0;i<parts.length-1;i++){
            const part = parts[i]
            const isLast = i == parts.length-1
        }
    }
    return{

    }
}
