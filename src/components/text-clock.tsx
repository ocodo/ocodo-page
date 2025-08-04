import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"

interface TextClockProps {
  className?: string
  title?: string
  timeZone?: string
  timeOnly?: boolean
}

const getCurrentDateTime = (tz: string) => {
  const now = new Date();
  return {
    dateToday: now.toLocaleString('en-us', {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    }),
    timeNow: now.toLocaleTimeString('en-US', {
      timeZone: tz
    })
  };
};

export const TextClock: React.FC<TextClockProps> = ({ className, timeOnly, title, timeZone = 'Asia/Bangkok' }) => {
  const [dateTime, setDateTime] = useState(getCurrentDateTime(timeZone));

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDateTime(getCurrentDateTime(timeZone));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [dateTime, timeZone]);

  return (
    <span className={cn("text-xs", className)}>
      {title && `${title} `}
      {timeOnly
        ? dateTime.timeNow
        : `${dateTime.dateToday} ${dateTime.timeNow}`}
    </span>
  )
}
