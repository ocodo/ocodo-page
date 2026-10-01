import { useOcodoLinks } from "@/contexts/ocodo-links-context";
import { OcodoLinksLoadingBar } from "@/components/ocodo-links-loading-bar";
import type { FC } from "react";

interface OcodoLinksProps {
  folder: string
}

export const OcodoLinks: FC<OcodoLinksProps> = ({ folder }) => {
  const { getBookmarksByFolderName, loading, error, showFolderTitles } = useOcodoLinks();
  const bookmarks = getBookmarksByFolderName(folder);

  if (loading) {
    return <OcodoLinksLoadingBar />;
  }

  if (error) {
    return <div>Error loading links: {error.message}</div>;
  }

  if (!bookmarks || bookmarks.length === 0) {
    return <div>No links in {folder}</div>;
  }

  return (
    <>
      {showFolderTitles &&
        <div className={`text-3xl font-black tracking-tighter mb-2 capitalize cursor-default`}>
          {folder}
        </div>
      }
      <ul>
        {bookmarks.map((bookmark, index) => (
          <li key={index} >
            <a className="cursor-pointer" href={bookmark.href} target="_blank">{bookmark.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
};
