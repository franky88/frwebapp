"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { updateSkill } from "@/app/actions/skillsActions";
import { toast } from "react-toastify";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

interface UpdateSkillProps {
  skill: SkillType;
  onUpdateSkill: () => void;
}

const UpdateSkill = ({ skill, onUpdateSkill }: UpdateSkillProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateSkill = async (formData: FormData) => {
    try {
      setLoading(true);
      await updateSkill(skill._id, formData);
      console.log("Checkbox value", formData.get("hidden"));
      toast.success("Skill updated successfully!");
      onUpdateSkill();
      setOpen(false);
    } catch (error) {
      console.error("Error updating skill:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button onClick={() => setOpen(true)} variant={"outline"}>
        Update
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update skill</DialogTitle>
            <DialogDescription>Update skill to your profile.</DialogDescription>
          </DialogHeader>
          <form
            action={handleUpdateSkill}
            className="flex flex-col gap-5 items-start"
          >
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={skill.name}
                required
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="type">Type</Label>
              <Input
                type="text"
                placeholder="Type"
                name="type"
                defaultValue={skill.type}
                required
              />
            </div>
            <div className="flex gap-1 w-full">
              <Checkbox
                id="hidden"
                name="hidden"
                defaultChecked={skill.hidden}
              />
              <Label htmlFor="hidden">Hidden</Label>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateSkill;
