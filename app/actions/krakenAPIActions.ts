"use server";

import axiosInstance from "@/lib/axios";
import { auth } from "@clerk/nextjs/server";

interface CreateFolderProp {
    folder?: FolderType
    error?: string
}

const getLogedInUserId = async () => {
    const { userId } = await auth();
    if (!userId) {
        return { error: "Unauthorized" };
    }
    return userId;
}

export async function getFolders() {
    try {
        const response = await axiosInstance.get('/folder')
        return response.data
    } catch(error) {
        console.error("Axios error", error)
        throw error;
    }
}

export const createFolder = async (formData: FormData) => {
    try {
        await getLogedInUserId();
        const name = formData.get("name")?.toString() ?? "";
        const response = await axiosInstance.post('/folder', {name})
        if (response.status === 200) {
            return response.data.message
        }
    } catch(error) {
        console.error(error)
        return null;
    }
}