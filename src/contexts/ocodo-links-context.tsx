import type React from 'react';
import { createContext, useContext, useEffect, useState, useCallback, type Dispatch, type SetStateAction, type RefObject, useRef, type RefAttributes } from 'react';
import { useLocalStorage } from 'react-use';

export interface Bookmark {
  type: "bookmark";
  name: string;
  href: string;
  id: string;
  tags?: string;
  add_date?: string;
  last_modified?: string;
  icon?: string;
  icon_uri?: string;
  children?: BookmarkItem[];
}

export interface Folder {
  type: "folder";
  name: string;
  id: string;
  add_date?: string;
  last_modified?: string;
  children: BookmarkItem[];
}

export interface Separator {
  type: "separator";
}

export type BookmarkItem = Bookmark | Folder | Separator;

interface OcodoLinksContextType {
  ocodoLinksRootFolder: Folder | null;
  loading: boolean;
  error: Error | null;
  findFolderRecursive: (items: BookmarkItem[], folderName: string) => Folder | undefined;
  getBookmarksByFolderName: (folderName: string) => Bookmark[];
  getAvailableFolders: () => Folder[];
  folders: string[] | undefined;
  setFolders: Dispatch<SetStateAction<string[] | undefined>>;
  selectFromAvailableFoldersRef: RefObject<HTMLDivElement | null>;
}

export const defaultFolders = [
  "quick-access",
  "hub-services",
  "frequent",
  "interesting",
  "React Research",
  "pinned-repos",
  "ai",
  "misc",
  "font-building",
]

const OcodoLinksContext = createContext<OcodoLinksContextType | undefined>(undefined);

export const OcodoLinksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [folders, setFolders] = useLocalStorage<string[]>('folders', defaultFolders)
  const [ocodoLinksRootFolder, setOcodoLinksRootFolder] = useState<Folder | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const selectFromAvailableFoldersRef = useRef<HTMLDivElement | null>(null);

  const findFolderRecursive = (items: BookmarkItem[], folderName: string): Folder | undefined => {
    for (const item of items) {
      if (item.type === 'folder') {
        if (item.name === folderName) {
          return item;
        }

        const nestedFind = findFolderRecursive(item.children, folderName);
        if (nestedFind) return nestedFind;
      }
    }
    return undefined;
  };

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

  const getAvailableFolders = () => ocodoLinksRootFolder ? ocodoLinksRootFolder.children.filter((e) => e.type === 'folder') : []

  const getBookmarksByFolderName = useCallback((subFolderName: string): Bookmark[] => {
    if (!ocodoLinksRootFolder) {
      return [];
    }

    const targetSubFolder = findFolderRecursive(ocodoLinksRootFolder.children, subFolderName);

    if (!targetSubFolder) {
      return [];
    }

    const bookmarks: Bookmark[] = targetSubFolder.children.filter(
      (item): item is Bookmark => item.type === 'bookmark'
    );
    return bookmarks;
  }, [ocodoLinksRootFolder]);

  return (
    <OcodoLinksContext.Provider
      value={{
        ocodoLinksRootFolder,
        getBookmarksByFolderName,
        getAvailableFolders,
        loading,
        error,
        folders,
        findFolderRecursive,
        setFolders,
        selectFromAvailableFoldersRef,
      }}
    >
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
