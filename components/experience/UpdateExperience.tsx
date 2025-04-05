import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { toast } from "react-toastify";
import { updateExperience } from "@/app/actions/experienceActions";

interface UpdateExperienceProps {
  experience: ExperienceType;
  onExperienceUpdated: () => void;
}

const UpdateExperience = ({
  experience,
  onExperienceUpdated,
}: UpdateExperienceProps) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleUpdateExperience = async (formData: FormData) => {
    try {
      setLoading(true);
      await updateExperience(experience._id, formData);
      toast.success("Experience updated successfully!");
      setOpen(false);
      onExperienceUpdated();
    } catch (error) {
      console.error("Error updating experience:", error);
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
            <DialogTitle>Update experience</DialogTitle>
            <DialogDescription>
              Update experience to your profile.
            </DialogDescription>
          </DialogHeader>
          <form
            action={handleUpdateExperience}
            className="flex flex-col gap-4 items-start"
          >
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  name="title"
                  required
                  defaultValue={experience.title}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="company">Company</Label>
                <Input
                  type="text"
                  placeholder="Company"
                  name="company"
                  defaultValue={experience.company}
                  required
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="location">Location</Label>
                <Input
                  type="text"
                  placeholder="Location"
                  name="location"
                  defaultValue={experience.location}
                  required
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="from">Start Date</Label>
                <Input
                  type="date"
                  name="from"
                  defaultValue={new Date(experience.from)
                    .toISOString()
                    .slice(0, 10)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="to">End Date</Label>
                <Input
                  type="date"
                  name="to"
                  defaultValue={
                    experience.to
                      ? new Date(experience.to).toISOString().slice(0, 10)
                      : ""
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Leave blank if you are currently working here.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="promoted"
                  name="promoted"
                  defaultChecked={experience.promoted}
                />
                <Label htmlFor="promoted">Promoted</Label>
              </div>
            </div>
            <Textarea
              placeholder="Description"
              name="description"
              defaultValue={experience.description}
            />
            <Button type="submit">{loading ? "Submiting..." : "Submit"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateExperience;
