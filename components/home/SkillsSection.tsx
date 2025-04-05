"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getSkills } from "@/app/actions/skillsActions";

const SkillsSection = () => {
  const [skillsData, setSkillsData] = useState<SkillType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skills = await getSkills();
        setSkillsData(skills.filter((skill) => skill.hidden === false));
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    if (skillsData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % skillsData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [skillsData]);

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center gap-8 h-screen justify-center bg-slate-100"
      style={{
        backgroundImage: "url('/images/bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white opacity-80"></div>

      <div className="relative flex flex-col items-start gap-5 w-[80%] mx-auto z-10">
        <strong className="text-[16pt] font-bold">Skills & Softskills</strong>

        {/* Animated Skills Display */}
        <article className="flex flex-col items-start">
          <div className="text-[30pt] text-start">
            <strong className="font-bebas-neue text-[40pt]">
              I specialize in
            </strong>
            <div className="border-2 p-5 rounded-2xl shadow-lg bg-white">
              <AnimatePresence mode="wait">
                {skillsData.length > 0 && (
                  <motion.div
                    key={skillsData[currentIndex]._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl font-bold"
                  >
                    <div className="flex items-center gap-4 text-[40pt] font-bebas-neue">
                      <strong className="font-bold text-[#11DF97]">
                        {skillsData[currentIndex].type}{" "}
                        {skillsData[currentIndex].name}
                      </strong>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default SkillsSection;
