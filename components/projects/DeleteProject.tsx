import { deleteProject } from "@/app/actions/projectActions";
import React, { useState } from "react";
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

interface DeleteProjectProps {
  id: string;
  onProjectDelete: () => void;
}

const DeleteProject = ({ id, onProjectDelete }: DeleteProjectProps) => {
  const [open, setOpen] = useState(false);
  const removeProject = async (id: string) => {
    try {
      deleteProject(id);
      onProjectDelete();
      toast.success("Skill deleted successfully!");
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
        variant={"destructive"}
        onClick={() => setOpen(true)}
        className="hover:bg-red-400"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              project and remove your data from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => removeProject(id)}
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

export default DeleteProject;
