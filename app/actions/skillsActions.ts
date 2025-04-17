"use server";

import { auth } from "@clerk/nextjs/server";
import connect from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Skills } from "@/models/skills";

interface AddSkillProps {
    skill?: SkillType;
    error?: string;
}

const getLogedInUserId = async () => {
    const { userId } = await auth();
    if (!userId) {
        return { error: "Unauthorized" };
    }
    return userId;
}

export const addSkill = async (formData: FormData): Promise<AddSkillProps> => {
    try {
        const userId = await getLogedInUserId();
        
        const name = formData.get("name")?.toString() ?? "";
        const type = formData.get("type")?.toString() ?? "";
        const hidden = formData.get("hidden") === "on" ? true : false;

        await connect();
        const skill = await Skills.create({
            name,
            type,
            hidden,
            userId: userId
        });

        revalidatePath('/dashboard/skills');

        return { 
            skill: {
            ...skill.toObject(),
            _id: skill._id.toString(),
            createdAt: skill.createdAt.toISOString(),
            updatedAt: skill.updatedAt.toISOString(),
          }};
    } catch (error) {
        console.error("Error adding skill:", error);
        return { error: "Failed to add skill" };
    }
}

export const getSkills = async (): Promise<SkillType[]> => {
    try {
        await getLogedInUserId();
        await connect();
        const skills = await Skills.find();
        return skills.map((skill) => ({
            ...skill.toObject(),
            _id: skill._id.toString(),
            createdAt: skill.createdAt.toISOString(),
            updatedAt: skill.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Error fetching skills:", error);
        return [];
    }
}

export const deleteSkill = async (id: string): Promise<boolean> => {
    try {
        await getLogedInUserId();
        await connect();
        const skill = await Skills.findById(id);
        console.log("skill ID", skill);
        if (!skill) {
            return false;
        }
        await Skills.findByIdAndDelete(id);
        revalidatePath('/dashboard/skills');
        return true;
    } catch (error) {
        console.error("Error deleting skills:", error);
        return false;
    }
}

export const deleteSkills = async (ids: string[]): Promise<{ success: boolean; error?: string }> => {
    try {
      const userId = await getLogedInUserId();
      await connect();
  
      const result = await Skills.deleteMany({ _id: { $in: ids }, userId });
  
      revalidatePath('/dashboard/skills');
  
      return { success: true };
    } catch (error) {
      console.error("Error deleting skills:", error);
      return { success: false, error: "Failed to delete skills" };
    }
};

export const updateSkill = async (id: string, formData: FormData): Promise<boolean> => {
    try {
        await getLogedInUserId();
        await connect();

        const skill = await Skills.findById(id);
        if (!skill) {
            return false;
        }

        const updatedData = {
            name: formData.get("name")?.toString() ?? skill.name,
            type: formData.get("type")?.toString() ?? skill.type,
            hidden: formData.get("hidden") === "on" ? true : false && skill.hidden,
        };

        await Skills.findByIdAndUpdate(id, updatedData, { new: true });

        revalidatePath('/dashboard/skills');
        return true;
    } catch (error) {
        console.error("Error updating skills:", error);
        return false;
    }
};

export const updateSkillHidden = async (id: string, hidden: boolean): Promise<boolean> => {
    try {
      await getLogedInUserId();
      await connect();
  
      const skill = await Skills.findById(id);
      if (!skill) return false;
  
      await Skills.findByIdAndUpdate(id, { hidden }, { new: true });
  
      revalidatePath("/dashboard/skills");
      return true;
    } catch (error) {
      console.error("Error updating skill hidden status:", error);
      return false;
    }
};