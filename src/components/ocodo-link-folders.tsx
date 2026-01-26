import { OcodoLinks } from "@/components/ocodo-links"
import { defaultFolders, useOcodoLinks } from "@/contexts/ocodo-links-context"
import { card, cardButton, iconButton, listClickItem, thinIconStyle } from "@/lib/styles"
import { Bookmark, Edit3Icon } from "lucide-react"
import { forwardRef, useEffect, type FC } from "react"

import { useToggle } from "react-use"

export const OcodoLinkFolders: FC = () => {
  const { folders, setFolders, selectFromAvailableFoldersRef } = useOcodoLinks()
  const [selectFolders, toggleSelectFolders] = useToggle(false)

  useEffect(() => {
    if (selectFolders && selectFromAvailableFoldersRef.current) {
      selectFromAvailableFoldersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectFolders]);

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
      {
        !selectFolders
          ? <Edit3Icon style={thinIconStyle} className={iconButton} onClick={toggleSelectFolders} />
          : <Bookmark style={thinIconStyle} className={iconButton} onClick={toggleSelectFolders} />
      }
      {selectFolders &&
        <OcodoAvailableFolders ref={selectFromAvailableFoldersRef} />
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

export const OcodoAvailableFolders = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { getAvailableFolders, setFolders } = useOcodoLinks();

  return (
    <div className={card} ref={ref}>
      <div>
        <div className="text-2xl select-none">Select link folders...</div>
        {getAvailableFolders().map((e) => (
          <div className={listClickItem} key={e.id}>{e.name}</div>
        ))}
      </div>

      <div
        className={cardButton}
        onClick={() => {
          setFolders([]);
        }}
      >
        Select link folders
      </div>
    </div>
  );
});

