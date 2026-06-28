interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low'
}

export default function PriorityBadge({
  priority,
}: PriorityBadgeProps) {
  const badgeStyles = {
    high: `
      bg-red-500/20
      text-red-400
      border-red-500/30
    `,
    medium: `
      bg-orange-500/20
      text-orange-400
      border-orange-500/30
    `,
    low: `
      bg-green-500/20
      text-green-400
      border-green-500/30
    `,
  }

  const label = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  }

  return (
    <div
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-4
        py-2
        text-sm
        font-semibold
        ${badgeStyles[priority]}
      `}
    >
      {label[priority]}
    </div>
  )
}