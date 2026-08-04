interface workspacePageProps{
    searchParams:Promise<{prompt?:string,id?:string}>
}
const Workspace = ({searchParams}:workspacePageProps) => {
  return (
    <div>
      hello
    </div>
  )
}

export default Workspace
