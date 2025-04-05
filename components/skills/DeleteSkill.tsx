"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { deleteSkill } from "@/app/actions/skillsActions";
import { toast } from "react-toastify";

interface DeleteSkillProps {
  id: string;
  onSkillDelete: () => void;
}

const DeleteSkill = ({ id, onSkillDelete }: DeleteSkillProps) => {
  const [open, setOpen] = useState(false);

  const removeSkill = async (id: string) => {
    try {
      deleteSkill(id);
      onSkillDelete();
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
              skill and remove your data from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => removeSkill(id)}
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

export default DeleteSkill;
