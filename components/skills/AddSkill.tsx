"use client";

import { addSkill } from "@/app/actions/skillsActions";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Plus } from "lucide-react";

interface AddSkillProps {
  onSkillAdded: () => void;
}

const AddSkill = ({ onSkillAdded }: AddSkillProps) => {
  const [open, setOpen] = useState(false);

  const clientAction = async (FormData: FormData) => {
    const results = await addSkill(FormData);
    console.log("Checkbox value", FormData.get("hidden"));
    if (results.error) {
      toast.error(results.error);
    }
    if (results.skill) {
      toast.success("Skill added");
      setOpen(false);
      onSkillAdded();
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus /> Skill
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new skill</DialogTitle>
            <DialogDescription>
              Add a new skill to your profile.
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
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                type="text"
                placeholder="Type"
                name="type"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="hidden" name="hidden" />
              <Label htmlFor="hidden">Hidden</Label>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddSkill;
