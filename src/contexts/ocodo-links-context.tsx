import type React from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Represents a bookmark link
export interface Bookmark {
  type: "bookmark";
  name: string; // From text content of <a>
  href: string; // From 'href' attribute
  id: string;   // From 'id' attribute
  tags?: string; // From 'tags' attribute
  add_date?: string; // From 'add_date' attribute
  last_modified?: string; // From 'last_modified' attribute
  icon?: string; // From 'icon' attribute
  icon_uri?: string; // From 'icon_uri' attribute
  children?: BookmarkItem[]; // Typically undefined or empty for a bookmark if field is omitted/null
}

// Represents a folder, which can contain other items
export interface Folder {
  type: "folder";
  name: string; // From text content of <h3>
  id: string;   // From 'id' attribute
  add_date?: string;      // From 'add_date' attribute
  last_modified?: string; // From 'last_modified' attribute
  children: BookmarkItem[]; // Contains Bookmarks, other Folders, or Separators. Guaranteed non-nil array.
}

// Represents a separator
export interface Separator {
  type: "separator";
}

// Union type for any item in the bookmarks structure
export type BookmarkItem = Bookmark | Folder | Separator;

interface OcodoLinksContextType {
  ocodoLinksRootFolder: Folder | null;
  getBookmarksByFolderName: (folderName: string) => Bookmark[];
  loading: boolean;
  error: Error | null;
}

const OcodoLinksContext = createContext<OcodoLinksContextType | undefined>(undefined);

const findFolderRecursive = (items: BookmarkItem[], folderName: string): Folder | undefined => {
  for (const item of items) {
    if (item.type === 'folder') {
      if (item.name === folderName) {
        return item;
      }
      // Folders always have a Children array (possibly empty)
      const nestedFind = findFolderRecursive(item.children, folderName);
      if (nestedFind) return nestedFind;
    }
  }
  return undefined;
};

export const OcodoLinksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ocodoLinksRootFolder, setOcodoLinksRootFolder] = useState<Folder | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const OCODO_LINKS_TARGET_FOLDER_TITLE = "ocodo-links";

    const fetchAndSetTargetFolder = async () => {
      try {
        const response = await fetch(`bookmarks.json?cachebust=${Date.now().toString(16)}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('bookmarks data not available... waiting for update');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        // The new bookmarks.json is expected to be an array of BookmarkItem
        const data: BookmarkItem[] = await response.json();
        const targetFolder = findFolderRecursive(data, OCODO_LINKS_TARGET_FOLDER_TITLE);

        if (targetFolder) {
          setOcodoLinksRootFolder(targetFolder);
        } else {
          setError(new Error(`Target folder "${OCODO_LINKS_TARGET_FOLDER_TITLE}" not found in bookmarks.json.`));
        }
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to fetch or process bookmarks'));
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetTargetFolder();
  }, []);

  const getBookmarksByFolderName = useCallback((subFolderName: string): Bookmark[] => {
    if (!ocodoLinksRootFolder) { // ocodoLinksRootFolder is of type Folder | null
      return [];
    }
    // ocodoLinksRootFolder.Children is guaranteed to be BookmarkItem[] for a Folder

    const targetSubFolder = findFolderRecursive(ocodoLinksRootFolder.children, subFolderName);

    if (!targetSubFolder) { // targetSubFolder is of type Folder | undefined
      return [];
    }
    // targetSubFolder is now a Folder, so targetSubFolder.Children exists and is BookmarkItem[]

    // Filter out items of Type "bookmark" from the subfolder's children
    const bookmarks: Bookmark[] = targetSubFolder.children.filter(
      (item): item is Bookmark => item.type === 'bookmark'
    );
    return bookmarks;
  }, [ocodoLinksRootFolder]);

  return (
    <OcodoLinksContext.Provider value={{ ocodoLinksRootFolder, getBookmarksByFolderName, loading, error }}>
      {children}
    </OcodoLinksContext.Provider>
  );
};

export const useOcodoLinks = (): OcodoLinksContextType => {
  const context = useContext(OcodoLinksContext);
  if (context === undefined) {
    throw new Error('useOcodoLinks must be used within an OcodoLinksProvider');
  }
  return context;
};
