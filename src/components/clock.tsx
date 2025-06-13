import { cn } from "@/lib/utils"

interface ClockProps {
  className?: string
}

export const Clock: React.FC<ClockProps> = ({className}) => {
  const dateToday = new Date().toLocaleString('en-us', {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  })
  const timeNow = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Bangkok'
  })

  return (
    <span className={cn("text-xs", className)}>
      {dateToday} {timeNow}
    </span>
  )
}

