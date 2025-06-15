import type React from "react";
import { useOcodoLinks } from "@/contexts/ocodo-links-context";
import { OcodoLinksLoadingBar } from "@/components/ocodo-links-loading-bar";

interface OcodoLinksProps {
  folder: string
}

export const OcodoLinks: React.FC<OcodoLinksProps> = ({ folder }) => {
  const { getBookmarksByFolderName, loading, error } = useOcodoLinks();
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
      <ul>
        {bookmarks.map((bookmark, index) => (
          <li key={index} >
            <a href={bookmark.href} target="_blank" rel="noopener noreferrer">{bookmark.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
};
