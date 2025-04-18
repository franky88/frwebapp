"use client";

import { getFolders } from "@/app/actions/krakenAPIActions";
import FolderList from "./FolderList";
import { useEffect, useState } from "react";
import CreateFolder from "./CreateFolder";

const FilesClient = () => {
  const [folders, setFolders] = useState<FolderType[]>([]);

  const fetchFolders = async () => {
    try {
      const res = await getFolders();
      console.log(res);
      setFolders(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <div className="flex justify-between w-full bg-white p-2">
        <h1 className="text-2xl font-bold">Folders</h1>
        <CreateFolder />
      </div>
      <div className="p-2 bg-white shadow-md w-full">
        <FolderList folders={folders} />
      </div>
    </div>
  );
};

export default FilesClient;
