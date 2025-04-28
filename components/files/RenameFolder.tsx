"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Edit, Edit2, Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createFolder, renameFolder } from "@/app/actions/krakenAPIActions";
import { toast } from "react-toastify";

interface RenameFolderProps {
  id: string;
  folderName: string;
  updateFolders: () => void;
}

const RenameFolder = ({ id, folderName, updateFolders }: RenameFolderProps) => {
  const [open, setOpen] = useState(false);

  const clientAction = async (FormData: FormData) => {
    try {
      const results = await renameFolder(id, FormData);
      toast.success(results.message);
      updateFolders();
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Button variant={"link"} onClick={() => setOpen(true)}>
        <Edit />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename folder</DialogTitle>
            <DialogDescription>Assign new folder name.</DialogDescription>
          </DialogHeader>
          <form
            action={clientAction}
            className="flex flex-col gap-4 items-start"
          >
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={folderName}
                required
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RenameFolder;
