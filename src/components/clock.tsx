import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"

interface ClockProps {
  className?: string
}

const getCurrentDateTime = () => {
  const now = new Date();
  return {
    dateToday: now.toLocaleString('en-us', {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    }),
    timeNow: now.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Bangkok' // Consider making this configurable if needed
    })
  };
};

export const Clock: React.FC<ClockProps> = ({className}) => {
  const [dateTime, setDateTime] = useState(getCurrentDateTime());

  useEffect(() => {
    // Set a timeout to update the date/time
    const timerId = setTimeout(() => {
      setDateTime(getCurrentDateTime());
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts
    // or before the effect re-runs due to `dateTime` changing.
    return () => clearTimeout(timerId);
  }, [dateTime]); // Re-run the effect when `dateTime` changes, thus scheduling the next timeout.

  return (
    <span className={cn("text-xs", className)}>
      {dateTime.dateToday} {dateTime.timeNow}
    </span>
  )
}
