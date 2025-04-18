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
import { createFolder } from "@/app/actions/krakenAPIActions";
import { toast } from "react-toastify";

const CreateFolder = () => {
  const [open, setOpen] = useState(false);

  const clientAction = async (FormData: FormData) => {
    try {
      const results = await createFolder(FormData);
      console.log(results);
      toast.success(results);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus /> Folder
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create folder</DialogTitle>
            <DialogDescription>Add a new folder.</DialogDescription>
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

export default CreateFolder;
