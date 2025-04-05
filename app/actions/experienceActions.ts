'use server'

import { auth } from "@clerk/nextjs/server";
import connect from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Experience } from "@/models/experience";

interface AddExperienceAction {
    experience?: ExperienceType;
    error?: string;
}

const getLogedInUserId = async () => {
    const { userId } = await auth();
    if (!userId) {
        return { error: "Unauthorized" };
    }
    return userId;
}

export const addExperience = async (formData: FormData): Promise<AddExperienceAction> => {
    try {
        const userId = await getLogedInUserId();
        
        const title = formData.get("title")?.toString() ?? "";
        const company = formData.get("company")?.toString() ?? "";
        const location = formData.get("location")?.toString() ?? "";
        const from = formData.get("from")?.toString() ?? "";
        const to = formData.get("to")?.toString() ?? "";
        const promoted = formData.get("promoted") === "on" ? true : false;
        const description = formData.get("description")?.toString() ?? "";

        await connect();
        const experience = await Experience.create({
            title,
            company,
            location,
            from,
            to,
            promoted,
            description,
            userId: userId
        });

        revalidatePath('/dashboard/experience');

        return { 
            experience: {
            ...experience.toObject(),
            _id: experience._id.toString(),
            createdAt: experience.createdAt.toISOString(),
            updatedAt: experience.updatedAt.toISOString(),
          }};
    } catch (error) {
        console.error("Error adding experience:", error);
        return { error: "Failed to add experience" };
    }
}

export const getExperiences = async (): Promise<ExperienceType[]> => {
    try {
        await getLogedInUserId();
        await connect();
        const experiences = await Experience.find();
        return experiences.map((experience) => ({
            ...experience.toObject(),
            _id: experience._id.toString(),
            createdAt: experience.createdAt.toISOString(),
            updatedAt: experience.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Error fetching experiences:", error);
        return [];
    }
}

export const deleteExperience = async (id: string): Promise<boolean> => {
    try {
        await getLogedInUserId();
        await connect();
        const experience = await Experience.findById(id);
        console.log("experience ID", experience);
        if (!experience) {
            return false;
        }
        await Experience.findByIdAndDelete(id);
        revalidatePath('/dashboard/experience');
        return true;
    } catch (error) {
        console.error("Error deleting experience:", error);
        return false;
    }
}

export const updateExperience = async (id: string, formData: FormData): Promise<boolean> => {
    try {
        await getLogedInUserId();
        await connect();

        const experience = await Experience.findById(id);
        if (!experience) {
            return false;
        }

        const updatedData = {
            title: formData.get("title")?.toString() ?? experience.title,
            company: formData.get("company")?.toString() ?? experience.company,
            location: formData.get("location")?.toString() ?? experience.location,
            from: formData.get("from")?.toString() ?? experience.from,
            to: formData.get("to")?.toString() ?? experience.to,
            promoted: formData.get("promoted") === "on" ? true : false && experience.current,
            description: formData.get("description")?.toString() ?? experience.description,
        };

        await Experience.findByIdAndUpdate(id, updatedData, { new: true });

        revalidatePath('/dashboard/experience');
        return true;
    } catch (error) {
        console.error("Error updating experience:", error);
        return false;
    }
};
