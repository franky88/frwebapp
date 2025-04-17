"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { addProject } from "@/app/actions/projectActions";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AddCategoryProps {
  categories: CategoryType[];
  onProjectAdded: () => void;
}

const AddProject = ({ categories, onProjectAdded }: AddCategoryProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const clientAction = async (FormData: FormData) => {
    const results = await addProject(FormData);
    if (results.error) {
      toast.error(results.error);
    }
    if (results.project) {
      toast.success("Project added");
      setOpen(false);
      onProjectAdded();
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus /> Project
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new project</DialogTitle>
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
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description"
                name="description"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="url">Project URL</Label>
              <Input
                id="url"
                type="text"
                placeholder="Project URL"
                name="url"
                required
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                type="text"
                placeholder="Image URL"
                name="image"
                required
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Select
                onValueChange={(value) => {
                  const category = categories.find((cat) => cat._id === value);
                  if (category) {
                    setSelectedCategory({
                      id: category._id,
                      name: category.name,
                    });
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {selectedCategory && (
              <>
                <input
                  type="hidden"
                  name="categoryId"
                  value={selectedCategory.id}
                />
                <input
                  type="hidden"
                  name="categoryName"
                  value={selectedCategory.name}
                />
              </>
            )}
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProject;
