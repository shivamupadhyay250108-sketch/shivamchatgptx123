import { FolderOpen } from 'lucide-react'

export default function DocumentVaultHeader() {
  return (
    <div
      className="
        rounded-[32px]
        border border-cyan-500/20
        bg-[#111827]
        p-8
      "
    >

      <div className="flex items-center gap-6">

        <div
          className="
            flex h-20 w-20 items-center justify-center
            rounded-3xl
            bg-gradient-to-r from-cyan-400 to-purple-500
          "
        >

          <FolderOpen
            size={36}
            className="text-white"
          />

        </div>

        <div>

          <p
            className="
              text-sm uppercase
              tracking-[0.3em]
              text-cyan-400
            "
          >
            Smart Document Vault
          </p>

          <h1 className="mt-3 text-5xl font-bold text-white">
            Document Vault
          </h1>

          <p className="mt-3 text-white/40">
            Store and manage all welfare-related documents securely.
          </p>

        </div>

      </div>

    </div>
  )
}