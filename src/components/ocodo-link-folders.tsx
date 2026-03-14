import { OcodoLinks } from "@/components/ocodo-links"
import { defaultFolders, useOcodoLinks } from "@/contexts/ocodo-links-context"
import { card, cardButton } from "@/lib/styles"
import { useEffect, type FC } from "react"

export const OcodoLinkFolders: FC = () => {
  const { folders, setFolders } = useOcodoLinks()

  useEffect(() => {
    console.log("folders")
    console.log(folders)
  }, [folders])

  return folders && folders.length > 0 ?
    <div className="mb-4 px-4 gap-4 grid grid-cols-1 md:grid-cols-3" >
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
    <div className={card}>
      <div
        className={cardButton}
        onClick={() => {
          setFolders(defaultFolders)
          console.log()
        }}
      >Reset link folders</div>
    </div>
}



