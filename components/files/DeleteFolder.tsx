import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useState } from "react";
import { removeFolder } from "@/app/actions/krakenAPIActions";

interface DeleteFolderProps {
  id: string;
  updateFolders: () => void;
}

const DeleteFolder = ({ id, updateFolders }: DeleteFolderProps) => {
  const [open, setOpen] = useState(false);
  const deleteProject = async (id: string) => {
    try {
      await removeFolder(id);
      updateFolders();
      toast.success("Folder deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setOpen(false);
    }
  };
  return (
    <>
      <Button
        variant={"link"}
        onClick={() => setOpen(true)}
        className="text-red-500 hover:text-red-400"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              folder and remove your data from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteProject(id)}
              className="bg-red-600 hover:bg-red-400"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteFolder;
