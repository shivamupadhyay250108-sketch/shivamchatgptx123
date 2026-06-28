import { User } from 'lucide-react'

const members = [
  {
    name: 'Father',
    role: 'Farmer',
    schemes: 14,
    benefits: '₹4.6 Lakhs',
  },
  {
    name: 'Mother',
    role: 'Homemaker',
    schemes: 9,
    benefits: '₹2.1 Lakhs',
  },
  {
    name: 'Student',
    role: 'Engineering Student',
    schemes: 12,
    benefits: '₹1.8 Lakhs',
  },
  {
    name: 'Grandfather',
    role: 'Senior Citizen',
    schemes: 7,
    benefits: '₹95,000',
  },
]

export default function MemberCard() {
  return (
    <div className="grid gap-6 md:grid-cols-2">

      {members.map((member) => (
        <div
          key={member.name}
          className="
            rounded-[32px]
            border border-white/10
            bg-[#111827]
            p-8
            transition-all duration-300
            hover:border-cyan-400/30
          "
        >

          <div className="flex items-center gap-5">

            <div
              className="
                flex h-16 w-16 items-center justify-center
                rounded-2xl
                bg-gradient-to-r from-cyan-400 to-purple-500
              "
            >
              <User
                className="text-white"
                size={28}
              />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                {member.name}
              </h2>

              <p className="mt-1 text-white/40">
                {member.role}
              </p>

            </div>

          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">

            <div className="rounded-2xl bg-[#0B0F19] p-5">

              <p className="text-sm text-white/40">
                Eligible Schemes
              </p>

              <h3 className="mt-2 text-2xl font-bold text-cyan-400">
                {member.schemes}
              </h3>

            </div>

            <div className="rounded-2xl bg-[#0B0F19] p-5">

              <p className="text-sm text-white/40">
                Benefits
              </p>

              <h3 className="mt-2 text-2xl font-bold text-green-400">
                {member.benefits}
              </h3>

            </div>

          </div>

        </div>
      ))}

    </div>
  )
}