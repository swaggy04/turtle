export async function GenerateWorkspace(prompt:string){


      const response = await fetch(
    "/api/workspace/generate",
    {
      method: "POST",
    }
  );

}