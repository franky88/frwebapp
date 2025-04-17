"use client";

import { deleteSkills, getSkills } from "@/app/actions/skillsActions";
import React, { useEffect, useState } from "react";
import AddSkill from "./AddSkill";
import SkillList from "./SkillList";
import { toast } from "react-toastify";
import DeleteSkills from "./DeleteSkills";

const SkillClient = () => {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const loadSkills = async () => {
    try {
      const skills = await getSkills();
      setSkills(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    const res = await deleteSkills(selectedIds);
    if (res.success) {
      setSelectedIds([]);
      await loadSkills();
      toast.success("Skills successfully deleted!");
    } else {
      toast.error(res.error);
    }
  };

  const refreshSkills = async () => {
    const updatedSkills = await getSkills();
    setSkills(updatedSkills);
  };

  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <div className="flex justify-between w-full bg-white p-4">
        <h1 className="text-2xl font-bold">Skills List</h1>
        <div className="flex gap-1 items-center">
          {selectedIds.length > 0 && (
            <DeleteSkills
              selectedIds={selectedIds}
              handleBulkDelete={handleBulkDelete}
            />
          )}
          <AddSkill onSkillAdded={refreshSkills} />
        </div>
      </div>
      <div className="p-2 bg-white shadow-md w-full">
        <SkillList
          selectedIds={selectedIds}
          handleSelect={handleSelect}
          skills={skills}
          skillsRefetch={refreshSkills}
        />
      </div>
    </div>
  );
};

export default SkillClient;
