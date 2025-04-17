import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { updateSkillHidden } from "@/app/actions/skillsActions";
import { toast } from "react-toastify";

interface ToggleDisplayProps {
  isVisible: boolean;
  id: string;
  onUpdateSkill: () => void;
}

const ToggleDisplay = ({
  id,
  isVisible,
  onUpdateSkill,
}: ToggleDisplayProps) => {
  const [loading, setLoading] = useState(false);

  const toggleDisplay = async () => {
    try {
      setLoading(true);
      await updateSkillHidden(id, isVisible ? false : true);
      toast.success("Skill updated successfully!");
      onUpdateSkill();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={toggleDisplay}
      value={loading ? "..." : ""}
      disabled={loading}
    >
      {isVisible ? <EyeClosed /> : <Eye />}
    </Button>
  );
};

export default ToggleDisplay;
