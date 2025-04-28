"use client";

import { getFolders } from "@/app/actions/krakenAPIActions";
import FolderList from "./FolderList";
import { useEffect, useState } from "react";
import CreateFolder from "./CreateFolder";
import { getCloudinaryFolders } from "@/app/actions/cloudinary";

const FilesClient = ({ parentFolder = "" }: { parentFolder?: string }) => {
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFolders = async () => {
    setLoading(true);
    try {
      const result = await getCloudinaryFolders(parentFolder);
      const folderNames = result.map((f: any) => f.name);
      setFolders(folderNames);
    } catch (error) {
      console.error("Error fetching folders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <div className="w-full">
        <FolderList folders={folders} updateFolders={fetchFolders} />
      </div>
    </div>
  );
};

export default FilesClient;
