"use client";

import { useState } from "react";
import { createCloudinaryFolder } from "@/app/actions/cloudinary";

const CreateCloudinaryFolder = () => {
  const [folderName, setFolderName] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    try {
      const result = await createCloudinaryFolder(folderName);
      setMessage(`Folder created: ${result.name}`);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <input
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <button onClick={handleCreate}>Create Folder</button>
      <p>{message}</p>
    </div>
  );
};

export default CreateCloudinaryFolder;
