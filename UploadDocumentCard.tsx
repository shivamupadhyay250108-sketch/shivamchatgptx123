import { Upload } from 'lucide-react'

export default function UploadDocumentCard() {
  return (
    <div
      className="
        rounded-[32px]
        border border-cyan-500/20
        bg-[#111827]
        p-8
      "
    >

      <h2 className="mb-8 text-3xl font-bold text-white">
        Upload New Document
      </h2>

      <div
        className="
          flex flex-col items-center justify-center
          rounded-3xl
          border-2 border-dashed border-cyan-400/30
          bg-[#0B0F19]
          p-16
        "
      >

        <div
          className="
            flex h-20 w-20 items-center justify-center
            rounded-3xl
            bg-gradient-to-r from-cyan-400 to-purple-500
          "
        >

          <Upload
            size={36}
            className="text-white"
          />

        </div>

        <h3 className="mt-6 text-2xl font-bold text-white">
          Drag & Drop Files
        </h3>

        <p className="mt-3 text-white/40">
          Upload welfare documents securely.
        </p>

        <button
          className="
            mt-8
            rounded-2xl
            bg-cyan-500
            px-8 py-4
            font-semibold
            text-white
          "
        >
          Browse Files
        </button>

        <p className="mt-6 text-sm text-white/30">
          Supported formats: PDF, JPG, PNG
        </p>

      </div>

    </div>
  )
}