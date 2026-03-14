import { useOcodoLinks } from "@/contexts/ocodo-links-context";
import { card, cardButton, topModalCard } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";

export const OcodoSelectFromAvailableFolders = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { getAvailableFolders, folders, setFolders, toggleSelectFolders } = useOcodoLinks();
  const [preSelectedFolders, setPreSelectedFolders] = useState<string[]>(folders ?? [])

  const preSelectedToggle = (folderName: string) => {
    setPreSelectedFolders(prev =>
      prev.includes(folderName)
        ? prev.filter(name => name !== folderName)
        : [...prev, folderName]
    );
  };

  return (
    <div className={topModalCard} ref={ref}>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold tracking-tighter select-none">Select link groups...</div>
        <div className="flex flex-wrap gap-2">
          {getAvailableFolders().map((e) => (
            preSelectedFolders.includes(e.name)
              ?
              <div
                className={cn(
                  "cursor-pointer",
                  "p-1 px-2",
                  "rounded-full",
                  "w-fit",
                  "bg-emerald-800",
                  "hover:bg-emerald-800/40",
                )}
                key={e.id}
                onClick={() => {
                  preSelectedToggle(e.name)
                }}
              >{e.name}</div>
              :
              <div
                className={cn(
                  "hover:bg-foreground/20",
                  "cursor-pointer",
                  "p-1 px-2",
                  "rounded-full",
                  "w-fit",
                )}
                key={e.id}
                onClick={() => {
                  preSelectedToggle(e.name)
                }}
              >{e.name}</div>
          ))}
        </div>
        <div className={cn(card, "flex flex-col gap-2")}>
          <div className="text-lg font-semibold text-foreground/50">Group Order</div>
          <div className="flex flex-wrap gap-2">
            {
              preSelectedFolders.map((f) => <div
                className={cn(
                  "p-1 px-2",
                  "rounded-full",
                  "w-fit",
                  "select-none",
                  "bg-amber-900",
                )}
                key={f}
              >{f}</div>)
            }
          </div>
          <div className="text-sm text-foreground/50">Ordered by selection</div>
        </div>
        <div className="flex flex-row gap-2 mt-5">
          <div
            className={cardButton}
            onClick={() => {
              setFolders(preSelectedFolders);
              toggleSelectFolders();
            }}
          >
            Confirm Changes
          </div>
          <div
            className={cn(cardButton, "bg-destructive/20  hover:bg-destructive/70")}
            onClick={() => {
              toggleSelectFolders();
            }}
          >
            Cancel
          </div>
        </div>
      </div>
    </div >
  );
});
