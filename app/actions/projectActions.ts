'use server'

import { auth } from "@clerk/nextjs/server";
import connect from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Project } from "@/models/projects";

interface AddProjectAction {
    project?: ProjectType;
    error?: string;
}

const getLogedInUserId = async () => {
    const { userId } = await auth();
    if (!userId) {
        return { error: "Unauthorized" };
    }
    return userId;
}

interface GetProjectsProp {
    categoryName?: string
}

export const getProjects = async ({categoryName}: GetProjectsProp): Promise<ProjectType[]> => {
    try {
        await getLogedInUserId();
        await connect();
        const res = await Project.find();
        const projects = categoryName
            ? res.filter(project => project.categoryName === categoryName)
            : res;
        return projects.map((project) => ({
            ...project.toObject(),
            _id: project._id.toString(),
            createdAt: project.createdAt.toISOString(),
            updatedAt: project.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Error fetching experiences:", error);
        return [];
    }
}

export const addProject = async (formData: FormData): Promise<AddProjectAction> => {
    try {
        const userId = await getLogedInUserId();
        
        const name = formData.get("name")?.toString() ?? "";
        const description = formData.get("description")?.toString() ?? "";
        const categoryId = formData.get("categoryId")?.toString() ?? "";
        const categoryName = formData.get("categoryName")?.toString() ?? "";
        const url = formData.get("url")?.toString() ?? "";
        const image = formData.get("image")?.toString() ?? "";

        await connect();
        const project = await Project.create({
            name,
            description,
            categoryId,
            categoryName,
            url,
            image,
            userId: userId
        });

        revalidatePath('/dashboard/portfolio');

        return { 
            project: {
            ...project.toObject(),
            _id: project._id.toString(),
            createdAt: project.createdAt.toISOString(),
            updatedAt: project.updatedAt.toISOString(),
          }};
    } catch (error) {
        console.error("Error adding project:", error);
        return { error: "Failed to add project" };
    }
}

export const deleteProjects = async (ids: string[]): Promise<{ success: boolean; error?: string }> => {
    try {
      const userId = await getLogedInUserId();
      await connect();
  
      const result = await Project.deleteMany({ _id: { $in: ids }, userId });
  
      revalidatePath('/dashboard/portfolio');
  
      return { success: true };
    } catch (error) {
      console.error("Error deleting projects:", error);
      return { success: false, error: "Failed to delete projects" };
    }
  };

export const deleteProject = async (id: string): Promise<boolean> => {
    try {
        await getLogedInUserId();
        await connect();
        const project = await Project.findById(id);
        if (!project) {
            return false;
        }
        await Project.findByIdAndDelete(id);
        revalidatePath('/dashboard/portfolio');
        return true;
    } catch (error) {
        console.error("Error deleting project:", error);
        return false;
    }
}
  