import { getFolders } from "@/app/actions/krakenAPIActions";
import FolderDetails from "@/components/files/folder/FolderDetails";
import React from "react";

interface Props {
  params: { folderId: string };
}

const FolderIDPage = async ({ params }: Props) => {
  const { folderId } = await params;
  //   const folders = await getFolders();
  //   console.log("Folder list", folders);
  //   const currentFolder = folders.data.find(
  //     (folder: FolderType) => folder.id === folderId
  //   );
  return (
    <>
      <FolderDetails folderId={folderId} />
    </>
  );
};

export default FolderIDPage;
