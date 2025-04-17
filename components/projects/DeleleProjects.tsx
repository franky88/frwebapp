import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
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

interface DeleteProjectsProps {
  selectedIds: string[];
  handleBulkDelete: () => void;
}

const DeleleProjects = ({
  selectedIds,
  handleBulkDelete,
}: DeleteProjectsProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={"destructive"} onClick={() => setOpen(true)}>
        Delete Selected <Badge variant="secondary">{selectedIds.length}</Badge>
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              selected projects and remove your data from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-400"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleleProjects;
