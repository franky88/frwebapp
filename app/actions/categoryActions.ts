'use server'

import { auth } from "@clerk/nextjs/server";
import connect from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Category } from "@/models/projects";

interface AddCategoryAction {
    category?: CategoryType;
    error?: string;
}

const getLogedInUserId = async () => {
    const { userId } = await auth();
    if (!userId) {
        return { error: "Unauthorized" };
    }
    return userId;
}

export const addCategory = async (formData: FormData): Promise<AddCategoryAction> => {
    try {
        await getLogedInUserId();
        const name = formData.get("name")?.toString() ?? "";

        await connect();
        const category = await Category.create({
            name,
        });

        revalidatePath('/dashboard/portfolio');

        return { 
            category: {
            ...category.toObject(),
            _id: category._id.toString(),
            createdAt: category.createdAt.toISOString(),
            updatedAt: category.updatedAt.toISOString(),
          }};
    } catch (error) {
        console.error("Error adding category:", error);
        return { error: "Failed to add category" };
    }
}

export const getCategories = async (): Promise<CategoryType[]> => {
    try {
        await getLogedInUserId();
        await connect();
        const categories = await Category.find();
        return categories.map((cat) => ({
            ...cat.toObject(),
            _id: cat._id.toString(),
            createdAt: cat.createdAt.toISOString(),
            updatedAt: cat.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Error fetching category:", error);
        return [];
    }
}