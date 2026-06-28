import { FileText, CheckCircle } from 'lucide-react'

const documents = [
  {
    name: 'Aadhaar Card',
    status: 'Verified',
  },
  {
    name: 'Income Certificate',
    status: 'Verified',
  },
  {
    name: '10th Marksheet',
    status: 'Verified',
  },
  {
    name: 'Residence Certificate',
    status: 'Pending',
  },
]

export default function DocumentsCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Documents Uploaded
      </h2>

      <div className="space-y-5">

        {documents.map((doc) => (
          <div
            key={doc.name}
            className="flex items-center justify-between rounded-3xl border border-white/10 bg-[#0B0F19] p-6"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-white">

                <FileText size={22} />

              </div>

              <div>

                <h3 className="text-lg font-semibold text-white">
                  {doc.name}
                </h3>

                <p className="mt-1 text-white/40">
                  Government Document
                </p>

              </div>

            </div>

            <div
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium ${
                doc.status === 'Verified'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}
            >

              <CheckCircle size={16} />

              {doc.status}

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}