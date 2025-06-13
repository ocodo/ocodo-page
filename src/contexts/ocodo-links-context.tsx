import type React from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface Bookmark {
  id: string;
  title: string;
  href: string;
  // Add other properties like 'icon', 'description', 'tags' if they exist in your JSON
}

interface Folder {
  id: string;
  title: string;
  bookmarks: Bookmark | Bookmark[]; // Can be a single bookmark or an array
  // Potentially nested folders
  folders?: Folder[];
}

interface BookmarksData {
  folders: Folder[];
}

interface OcodoLinksContextType {
  ocodoLinksRootFolder: Folder | null; // Stores the main "ocodo-links" folder
  getBookmarksByFolderName: (folderName: string) => Bookmark[];
  loading: boolean;
  error: Error | null;
}

const OcodoLinksContext = createContext<OcodoLinksContextType | undefined>(undefined);

// Helper function for recursive search, can be defined outside the component or as a local utility
const findFolderRecursive = (folders: Folder[], folderName: string): Folder | undefined => {
  for (const folder of folders) {
    if (folder.title === folderName) return folder;
    if (folder.folders) {
      const nestedFind = findFolderRecursive(folder.folders, folderName);
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
    const OCODO_LINKS_TARGET_FOLDER_TITLE = "ocodo-links"; // The specific folder title we care about

    const fetchAndSetTargetFolder = async () => {
      try {
        const response = await fetch('bookmarks.json');
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('bookmarks data not available... waiting for update');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        const data: BookmarksData = await response.json();

        // Find the "ocodo-links" folder within the fetched data
        const targetFolder = findFolderRecursive(data.folders, OCODO_LINKS_TARGET_FOLDER_TITLE);

        if (targetFolder) {
          setOcodoLinksRootFolder(targetFolder);
        } else {
          // Set error if the specific folder isn't found after successful fetch
          setError(new Error(`Target folder "${OCODO_LINKS_TARGET_FOLDER_TITLE}" not found in bookmarks.json.`));
        }
      } catch (e) {
        // This catch handles errors from fetch, response.json(), or if findFolderRecursive itself throws (though unlikely here)
        setError(e instanceof Error ? e : new Error('Failed to fetch or process bookmarks'));
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetTargetFolder();
  }, []);

  const getBookmarksByFolderName = useCallback((subFolderName: string): Bookmark[] => {
    if (!ocodoLinksRootFolder || !ocodoLinksRootFolder.folders) {
      return [];
    }

    // Search for the subFolderName *within* the ocodoLinksRootFolder's subfolders
    const targetSubFolder = findFolderRecursive(ocodoLinksRootFolder.folders, subFolderName);

    if (!targetSubFolder) {
      return [];
    }
    // Ensure bookmarks are always returned as an array
    return Array.isArray(targetSubFolder.bookmarks) ? targetSubFolder.bookmarks : [targetSubFolder.bookmarks];

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
