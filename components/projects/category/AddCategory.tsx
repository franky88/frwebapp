"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addCategory } from "@/app/actions/categoryActions";
import { toast } from "react-toastify";
import { useState } from "react";

interface AddCategoryProps {
  onCategoryAdded: () => void;
}

const AddCategory = ({ onCategoryAdded }: AddCategoryProps) => {
  const [open, setOpen] = useState(false);

  const clientAction = async (FormData: FormData) => {
    const results = await addCategory(FormData);
    if (results.error) {
      toast.error(results.error);
    }
    if (results.category) {
      toast.success("Category added");
      setOpen(false);
      onCategoryAdded();
    }
  };

  return (
    <>
      <Button variant={"outline"} onClick={() => setOpen(true)}>
        <Plus /> Category
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
            <DialogDescription>
              Add a new project to your profile.
            </DialogDescription>
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

export default AddCategory;
