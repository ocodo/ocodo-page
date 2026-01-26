import { cn } from "@/lib/utils";

export const card = cn(
  "tracking-tighter duration-500 transition-all",
  "p-5 bg-card rounded-3xl",
  "hover:shadow-2xl",
  "dark:boder-2",
)

export const cardButton = cn(
  card,
  "w-fit",
  "cursor-pointer",
  "hover:bg-card  bg-background border-bg border-2",
  "p-1 px-3"
);

export const listClickItem = cn(
  "hover:bg-foreground/20",
  "cursor-pointer",
)

export const thinIconStyle = {
  stroke: '1px'
}

export const iconButton = cn("p-1 rounded-full bg-foreground/25 cursor-pointer");
