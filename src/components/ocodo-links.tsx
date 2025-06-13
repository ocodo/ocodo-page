import type React from "react";
import { useOcodoLinks } from "@/contexts/ocodo-links-context";

interface OcodoLinksProps {
  folder: string
}

export const OcodoLinks: React.FC<OcodoLinksProps> = ({ folder }) => {
  const { getBookmarksByFolderName, loading, error } = useOcodoLinks();
  const bookmarks = getBookmarksByFolderName(folder);
  console.log(bookmarks);


  if (loading) {
    return <div>Loading links...</div>;
  }

  if (error) {
    return <div>Error loading links: {error.message}</div>;
  }

  if (!bookmarks || bookmarks.length === 0) {
    return <div>No links found in folder: {folder}</div>;
  }

  return (
    <ul>
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}><a href={bookmark.href} target="_blank" rel="noopener noreferrer">{bookmark.title}</a></li>
      ))}
    </ul>
  );
};
