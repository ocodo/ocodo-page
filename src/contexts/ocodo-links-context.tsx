import type React from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface Bookmark {
  id: string;
  title: string;
  href: string;
}

interface Folder {
  id: string;
  title: string;
  bookmark: Bookmark | Bookmark[];
  folder?: Folder[];
}

interface BookmarksData {
  xbel: {
    version: string;
    folder: Folder[]
  };
}

interface OcodoLinksContextType {
  ocodoLinksRootFolder: Folder | null;
  getBookmarksByFolderName: (folderName: string) => Bookmark[];
  loading: boolean;
  error: Error | null;
}

const OcodoLinksContext = createContext<OcodoLinksContextType | undefined>(undefined);

const findFolderRecursive = (folders: Folder[], folderName: string): Folder | undefined => {
  for (const folder of folders) {
    if (folder.title === folderName) return folder;
    if (folder.folder) {
      const nestedFind = findFolderRecursive(folder.folder, folderName);
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
        const data: BookmarksData = await response.json();
        const targetFolder = findFolderRecursive(data.xbel.folder, OCODO_LINKS_TARGET_FOLDER_TITLE);

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
    if (!ocodoLinksRootFolder || !ocodoLinksRootFolder.folder) {
      return [];
    }

    const targetSubFolder = findFolderRecursive(ocodoLinksRootFolder.folder, subFolderName);

    if (!targetSubFolder) {
      return [];
    }

    return Array.isArray(targetSubFolder.bookmark) ? targetSubFolder.bookmark : [targetSubFolder.bookmark];

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
