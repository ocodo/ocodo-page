import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"

interface TextClockProps {
  className?: string
  timeZone?: string
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

export const TextClock: React.FC<TextClockProps> = ({ className, timeZone ='Asia/Bangkok' }) => {
  const [dateTime, setDateTime] = useState(getCurrentDateTime(timeZone));

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDateTime(getCurrentDateTime(timeZone));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [dateTime, timeZone]);

  return (
    <span className={cn("text-xs", className)}>
      {dateTime.dateToday} {dateTime.timeNow}
    </span>
  )
}
