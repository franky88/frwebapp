"use client";

import { getExperiences } from "@/app/actions/experienceActions";
import { useEffect, useState } from "react";
import Image from "next/image";

const ExperienceSection = () => {
  const [experiences, setExperience] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const data = await getExperiences();
      setExperience(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);
  return (
    <section
      id="experience"
      className="flex flex-col items-center gap-8 h-screen justify-center w-full"
    >
      <div className="container flex flex-col items-center gap-5">
        <div className="flex flex-col gap-5">
          <h1 className="text-[30pt] font-bold">Experience</h1>
          {loading && <p>Loading...</p>}
          {experiences.length === 0 && <p>No experiences found</p>}
          {experiences.map((experience) => (
            <div key={experience._id} className="flex items-start gap-8">
              <Image src={"globe.svg"} width={30} height={30} alt="globe" />
              <article className="max-w-md bg-slate-100 p-5 rounded-b-2xl rounded-tr-2xl shadow-lg">
                <strong className="text-xl">{experience.title}</strong>
                <br />
                <span>{experience.company}</span>
                <br />
                <span>Tasks & responsibilities:</span>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
