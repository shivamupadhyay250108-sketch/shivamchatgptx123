export function AuthBackground() {
  return (
    <>
      {/* Purple Glow */}
      <div className="absolute left-[-150px] top-[-150px] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[150px]" />

      {/* Cyan Glow */}
      <div className="absolute bottom-[-150px] right-[-150px] h-[500px] w-[500px] rounded-full bg-cyan-400/20 blur-[150px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </>
  )
}