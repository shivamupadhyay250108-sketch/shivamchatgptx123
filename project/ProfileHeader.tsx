export default function ProfileHeader() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <div className="flex items-center gap-6">

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-4xl font-bold text-white">
          S
        </div>

        <div>

          <h1 className="text-4xl font-bold text-white">
            Shivam
          </h1>

          <p className="mt-2 text-white/40">
            Student • Madhya Pradesh
          </p>

          <p className="mt-3 text-cyan-400">
            Profile Completion : 92%
          </p>

        </div>

      </div>

    </div>
  )
}