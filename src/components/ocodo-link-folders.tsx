import { OcodoLinks } from "@/components/ocodo-links"
import { cn } from "@/lib/utils"
import type { FC } from "react"

export const OcodoLinkFolders: FC = () => {


  const folders = [
    "quick-access",
    "hub-services",
    "frequent",
    "interesting",
    "misc",
    "pinned-repos",
    "font-building",
    "ai",
    "React Research",
  ]

  return (
    <div className="mb-4 px-4 gap-4 grid grid-cols-1 md:grid-cols-3">
      {
        folders.map(
          (folder) => (
            <div className={cn(
              "tracking-tighter duration-500 transition-all",
              "p-5 bg-card rounded-3xl",
              "hover:shadow-2xl",
              "dark:hover:border dark:boder-2",
            )} key={folder}>
              <div>
                <OcodoLinks folder={folder} />
              </div>
            </div>
          )
        )
      }
    </div>
  )
}
