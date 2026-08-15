// Convert a GeneratedProject into a FileSystemTree that WebContainer can mount

import { GeneratedProject } from "@/services/ai-schema";
import { FileSystemTree } from "@webcontainer/api";






export function createRuntimeProject(project:GeneratedProject) {
    const files: FileSystemTree = {};
    for(const generatedfile of project.files){
        files[generatedfile.path]={
            file:{
                contents:generatedfile.code
            }
        }
    }
 
}

