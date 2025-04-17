"use client";

import React, { useEffect } from "react";
import AddExperience from "./AddExperience";
import ExperienceList from "./ExperienceList";
import { getExperiences } from "@/app/actions/experienceActions";

const ExperienceClient = () => {
  const [experience, setExperience] = React.useState<ExperienceType[]>([]);
  const [loading, setLoading] = React.useState(true);

  const loadExperience = async () => {
    try {
      setLoading(true);
      const experience = await getExperiences();
      setExperience(experience);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperience();
  }, []);

  const refreshExperience = async () => {
    const updateExperience = await getExperiences();
    setExperience(updateExperience);
  };
  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <div className="flex justify-between w-full bg-white p-4">
        <h1 className="text-2xl font-bold">Experience List</h1>
        <AddExperience onExperienceAdded={refreshExperience} />
      </div>
      <div className="p-2 bg-white shadow-md w-full">
        <ExperienceList
          loading={loading}
          experiences={experience}
          experienceRefetch={refreshExperience}
        />
      </div>
    </div>
  );
};

export default ExperienceClient;
