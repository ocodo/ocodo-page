import { OcodoLinks } from "@/components/ocodo-links"
import { defaultFolders, useOcodoLinks } from "@/contexts/ocodo-links-context"
import { card, cardButton } from "@/lib/styles"
import { cn } from "@/lib/utils"
import { useEffect, type FC } from "react"

export const OcodoLinkFolders: FC = () => {
  const { folders, setFolders } = useOcodoLinks()

  useEffect(() => {
    console.log("folders")
    console.log(folders)
  }, [folders])

  return folders && folders.length > 0 ?
    <div className="mb-4 mt-12 px-4 gap-4 grid grid-cols-1 md:grid-cols-3" >
      {
        folders.map(
          (folder) => (
            <div className={card} key={folder}>
              <div>
                <OcodoLinks folder={folder} />
              </div>
            </div>
          )
        )
      }
    </div>
    :
    <div className={cn(card, "flex flex-col items-center gap-2")}>
      <div className="text-2xl font-bold tracking-tighter select-none">No link groups...</div>
      <div
        className={cardButton}
        onClick={() => {
          setFolders(defaultFolders)
          console.log()
        }}
      >Use default folders</div>
    </div>
}



