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
import { deleteExperience } from "@/app/actions/experienceActions";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

interface DeleteExperienceProps {
  id: string;
  onExperienceDelete: () => void;
}

const DeleteExperience = ({
  id,
  onExperienceDelete,
}: DeleteExperienceProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const removeExperience = async (id: string) => {
    try {
      setLoading(true);
      deleteExperience(id);
      toast.success("Experience deleted successfully!");
      onExperienceDelete();
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
        variant={"outline"}
        onClick={() => setOpen(true)}
        className="border-red-500 hover:bg-red-400 hover:text-white"
        disabled={loading}
      >
        {loading ? "Removing ..." : <Trash2 className="h-4 w-4" />}
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              experience and remove your data from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => removeExperience(id)}
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

export default DeleteExperience;
