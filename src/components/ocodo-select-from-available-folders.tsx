import { useOcodoLinks } from "@/contexts/ocodo-links-context";
import { card, cardButton, topModalCard } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import {
  type DragEndEvent,
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";

const SortableFolderItem = ({ id, name, onToggle }: { id: string; name: string; onToggle: () => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "p-0.5 px-3 ",
        "rounded-full",
        "w-fit",
        "select-none",
        "bg-teal-900",
        "text-gray-100",
        "max-h-8",
        "flex flex-row gap-2 items-center",
        isDragging && "opacity-50 drop-shadow-2xl",
        "cursor-pointer"
      )}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <Grip className="w-3 h-3" />
      </div>
      <span onClick={onToggle} className="cursor-pointer">
        {name}
      </span>
    </div>
  );
};


export const OcodoSelectFromAvailableFolders = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { getAvailableFolders, folders, setFolders, toggleSelectFolders } = useOcodoLinks();
  const [preSelectedFolders, setPreSelectedFolders] = useState<string[]>(folders ?? []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const resetPreSelected = () => {
    setPreSelectedFolders(folders ?? []);
  }

  const preSelectedToggle = (folderName: string) => {
    setPreSelectedFolders(prev =>
      prev.includes(folderName)
        ? prev.filter(name => name !== folderName)
        : [...prev, folderName]
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPreSelectedFolders((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const availableFolders = getAvailableFolders();

  return (
    <div className={topModalCard} ref={ref}>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold tracking-tighter select-none">
          Select link groups...
        </div>

        {/* Available folders - unchanged */}
        <div className="flex flex-wrap gap-2">
          {availableFolders.map((e) => (
            <div
              className={cn(
                "cursor-pointer",
                "p-1 px-2",
                "rounded-full",
                "w-fit",
                "transition-colors duration-200",
                preSelectedFolders.includes(e.name)
                  ? "bg-emerald-800 text-gray-100 hover:bg-emerald-800/40"
                  : "hover:bg-foreground/20 text-foreground"
              )}
              key={e.id}
              onClick={() => preSelectedToggle(e.name)}
            >
              {e.name}
            </div>
          ))}
        </div>

        {/* Selected folders with drag-and-drop */}
        {preSelectedFolders.length > 0 && (
          <div className={cn(card, "flex flex-col gap-2")}>
            <div className="text-lg font-semibold text-foreground/50 flex items-center gap-2">
              <span>Group Order</span>
              <span className="text-sm font-normal text-foreground/30">
                (Drag to reorder)
              </span>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={preSelectedFolders}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-wrap gap-2 min-h-[50px]">
                  {preSelectedFolders.map((folderName) => (
                    <SortableFolderItem
                      key={folderName}
                      id={folderName}
                      name={folderName}
                      onToggle={() => preSelectedToggle(folderName)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <div className="text-sm text-foreground/50">
              Drag the handles to reorder. Order is preserved when confirming.
            </div>
          </div>
        )}

        {/* Action buttons */}
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
            className={cardButton}
            onClick={() => {
              resetPreSelected();
            }}
          >
            Reset Selection
          </div>
          <div
            className={cardButton}
            onClick={() => {
              setPreSelectedFolders([]);
            }}
          >
            Clear Selection
          </div>
          <div
            className={cn(cardButton, "bg-amber-400 dark:bg-amber-950 hover:bg-amber-500 hover:dark:bg-amber-600")}
            onClick={toggleSelectFolders}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
});
