"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { createCloudinaryFolder } from "@/app/actions/cloudinary";

interface CreateFolderProps {
  updateFolders: () => void;
  id?: string | null;
}

const CreateFolder = ({ updateFolders, id }: CreateFolderProps) => {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  // const clientAction = async (FormData: FormData) => {
  //   try {
  //     const results = await createFolder(id, FormData);
  //     toast.success(results.message);
  //     updateFolders();
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setOpen(false);
  //   }
  // };

  const handleCreate = async () => {
    try {
      const result = await createCloudinaryFolder(folderName);
      toast.success(`Folder created: ${result.name}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setOpen(false);
      setFolderName("");
      updateFolders();
    }
  };

  return (
    <>
      <Button variant={"link"} onClick={() => setOpen(true)} className="h-5">
        <Plus /> Folder
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create folder</DialogTitle>
            <DialogDescription>Add a new folder.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 items-end">
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                required
              />
            </div>
            <Button onClick={handleCreate}>Create</Button>
          </div>
          <div>
            <h2 className="text-lg font-semibold">How to use:</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter the folder name you want to create.</li>
              <li>Click the "Create Folder" button.</li>
              <li>Check the result message below.</li>
            </ol>
            <p className="text-sm text-gray-500">
              Note: The folder name should not contain any special characters or
              spaces.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateFolder;
