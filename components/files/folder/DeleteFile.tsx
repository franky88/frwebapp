"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteFile } from "@/app/actions/krakenAPIActions";
import { toast } from "react-toastify";

interface DeleteFileProps {
  hashId: string;
  updateFiles: () => void;
}

const DeleteFile = ({ hashId, updateFiles }: DeleteFileProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const removeFile = async () => {
    try {
      setLoading(true);
      const res = await deleteFile(hashId);
      if (res.success) {
        toast.success("File deleted successfully!");
        updateFiles();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant={"link"}
        onClick={() => setOpen(true)}
        className="text-red-500 hover:text-red-400"
        disabled={loading}
      >
        {loading ? (
          <LoaderCircle className="animate-spin text-red-300" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              file and remove your data from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={removeFile}
              className="bg-red-600 hover:bg-red-400"
              disabled={loading}
            >
              {loading ? "Removing..." : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteFile;
