export default function FamilyInfoCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Family Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <InfoItem
          title="Family Members"
          value="4"
        />

        <InfoItem
          title="Father's Occupation"
          value="Farmer"
        />

        <InfoItem
          title="Mother's Occupation"
          value="Homemaker"
        />

        <InfoItem
          title="Annual Family Income"
          value="₹2,00,000"
        />

        <InfoItem
          title="Residence"
          value="Rural Area"
        />

        <InfoItem
          title="BPL Status"
          value="Yes"
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