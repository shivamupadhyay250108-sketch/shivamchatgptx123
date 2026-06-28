export default function PersonalInfoCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Personal Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <InfoItem
          title="Full Name"
          value="Shivam"
        />

        <InfoItem
          title="Gender"
          value="Male"
        />

        <InfoItem
          title="Occupation"
          value="Student"
        />

        <InfoItem
          title="State"
          value="Madhya Pradesh"
        />

        <InfoItem
          title="Annual Income"
          value="₹2,00,000"
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