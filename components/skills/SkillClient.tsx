"use client";

import { getSkills } from "@/app/actions/skillsActions";
import React, { useEffect, useState } from "react";
import AddSkill from "./AddSkill";
import SkillList from "./SkillList";

const SkillClient = () => {
  const [skills, setSkills] = useState<SkillType[]>([]);

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

  const refreshSkills = async () => {
    const updatedSkills = await getSkills();
    setSkills(updatedSkills);
  };

  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <div className="flex justify-between w-full bg-white p-4">
        <h1 className="text-2xl font-bold">Skills List</h1>
        <AddSkill onSkillAdded={refreshSkills} />
      </div>
      <div className="p-2 bg-white shadow-md w-full">
        <SkillList skills={skills} skillsRefetch={refreshSkills} />
      </div>
    </div>
  );
};

export default SkillClient;
