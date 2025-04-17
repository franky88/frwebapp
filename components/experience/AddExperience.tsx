"use client";

import { addExperience } from "@/app/actions/experienceActions";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";

interface AddExperienceProps {
  onExperienceAdded: () => void;
}

const AddExperience = ({ onExperienceAdded }: AddExperienceProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const clientAction = async (FormData: FormData) => {
    try {
      setLoading(true);
      const fromDate = FormData.get("from") as string;
      const toDate = FormData.get("to") as string;
      if (new Date(fromDate) > new Date(toDate)) {
        toast.error("From date cannot be greater than To date");
        return;
      }
      const results = await addExperience(FormData);
      if (results.error) {
        toast.error(results.error);
      }
      if (results.experience) {
        toast.success("Experience added");
        onExperienceAdded();
        setOpen(false);
      }
    } catch (error) {
      console.error("Error adding experience:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={"default"}>
        <Plus /> Experience
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new experience</DialogTitle>
            <DialogDescription>
              Add a new experience to your profile.
            </DialogDescription>
          </DialogHeader>
          <form
            action={clientAction}
            className="flex flex-col gap-4 items-start"
          >
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="title">Title</Label>
                <Input type="text" placeholder="Title" name="title" required />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="company">Company</Label>
                <Input
                  type="text"
                  placeholder="Company"
                  name="company"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="location">Location</Label>
                <Input
                  type="text"
                  placeholder="Location"
                  name="location"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="url">Website</Label>
                <Input type="text" placeholder="URL" name="url" />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="image">Logo</Label>
                <Input type="text" placeholder="Logo URL" name="image" />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="from">Start Date</Label>
                <Input type="date" name="from" required />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="to">End Date</Label>
                <Input type="date" name="to" />
                <p className="text-sm text-muted-foreground">
                  Leave blank if you are currently working here.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="promoted" name="promoted" />
                <Label htmlFor="promoted">Promoted</Label>
              </div>
            </div>
            <Textarea placeholder="Description" name="description" />
            <Button type="submit">{loading ? "Submiting..." : "Submit"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddExperience;
