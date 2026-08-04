const WorkspaceClient = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-[#0a0a0a]">
      {/* Chat Panel */}
      <aside className="w-90 shrink-0 border-r border-white/10 bg-[#0d0d0d]">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-white/30">
            Chat panel coming soon
          </p>
        </div>
      </aside>

      {/* Code Panel */}
      <main className="flex flex-1 flex-col overflow-hidden bg-[#0a0a0a]">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-white/30">
            Code panel coming soon
          </p>
        </div>
      </main>
    </div>
  );
};

export default WorkspaceClient;