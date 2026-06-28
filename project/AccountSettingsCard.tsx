import { User } from 'lucide-react'

export default function AccountSettingsCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500">

          <User className="text-white" size={24} />

        </div>

        <h2 className="text-3xl font-bold text-white">
          Account Settings
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <InfoItem
          title="Full Name"
          value="Shivam"
        />

        <InfoItem
          title="Email"
          value="shivam@gmail.com"
        />

        <InfoItem
          title="Mobile Number"
          value="+91 9876543210"
        />

        <InfoItem
          title="State"
          value="Madhya Pradesh"
        />

        <InfoItem
          title="Occupation"
          value="Student"
        />

        <InfoItem
          title="Category"
          value="OBC"
        />

      </div>

    </div>
  )
}

function InfoItem({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0F19] p-6">

      <p className="text-sm text-white/40">
        {title}
      </p>

      <h3 className="mt-3 text-xl font-semibold text-white">
        {value}
      </h3>

    </div>
  )
}