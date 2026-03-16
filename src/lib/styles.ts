import { cn } from "@/lib/utils";

export const topModalCard = cn(
  "tracking-tighter duration-500 transition-all",
  "p-5 bg-card rounded-b-3xl",
  "hover:shadow-2xl",
  "dark:border-2 dark:border-t-0",
)

export const card = cn(
  "tracking-tighter duration-500 transition-all",
  "p-5 bg-card rounded-3xl",
  "hover:shadow-lg",
  "dark:border-2",
)

export const innerCard = cn(
  "tracking-tighter duration-500 transition-all",
  "p-5 bg-background/30 rounded-3xl",
  "hover:shadow-lg hover:bg-background",
  "dark:border-2",
)

export const cardButton = cn(
  card,
  "flex flex-row",
  "w-fit",
  "text-nowrap",
  "items-center",
  "justify-center",
  "cursor-pointer",
  "hover:bg-card text-foreground bg-background border-bg border-2",
  "p-1 px-5",
  "rounded-full"
);

export const thinIconStyle = {
  stroke: '1px'
}

export const iconButton = cn("p-1 rounded-full bg-foreground/25 cursor-pointer");

export const selectedItem = cn(
  `font-bold`
);
