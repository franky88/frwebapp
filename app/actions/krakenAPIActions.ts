"use server";

import { axiosInstance } from "@/lib/axios";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

interface CreateFolderProp {
    message?: string
    error?: string
}

const getLogedInUserId = async () => {
  const { userId } = await auth();
  if (!userId) {
      return { error: "Unauthorized" };
  }
  return userId;
}

export const getFolders = async (): Promise<FolderTypeResponse> => {
  try {
    await getLogedInUserId()
    const response = await axiosInstance.get('/folder')
    return response.data
  } catch(error) {
    console.error("Axios error", error)
    return {status: 500, data: []};
  }
}

export const createFolder = async (id: string | null, formData: FormData): Promise<CreateFolderProp> => {
  try {
      await getLogedInUserId();
      const name = formData.get("name")?.toString() ?? "";
      const response = await axiosInstance.post('/folder', { id, name })
      return { message: response.data.data.message }
  } catch(error) {
      console.error(error)
      return { error: "Failed to create folder" };
  }
}

export const removeFolder = async (id: string): Promise<CreateFolderProp> => {
  try {
      await getLogedInUserId();
      const response = await axiosInstance.delete(`/folder/${id}`)
      return { message: response.data.data.message }
  } catch(error) {
      return {error: "Failed to delete folder"}
  }
}

export const renameFolder = async (id: string, formData: FormData): Promise<CreateFolderProp> => {
  try {
      await getLogedInUserId();
      const name = formData.get("name")?.toString() ?? "";
      const response = await axiosInstance.patch(`/folder/${id}/rename`, {name})
      return { message: response.data.data.message }
  } catch(error) {
      return {error: "Failed to rename folder"}
  }
}

interface UploadFileResponse {
  message?: string;
  error?: string;
  uploads?: any[];
}
  

export const uploadFiles = async (id: string, formData: FormData): Promise<UploadFileResponse> => {
  try {
    await getLogedInUserId()

    const files = formData.getAll("files") as File[];
    const folderId = id;
    const premiumOnly = formData.get("premiumOnly") === "true";

    if (!files || files.length === 0) return { error: "No files selected" };

    const uploadedFiles: any[] = [];

    for (const file of files) {
      const serverRes = await axiosInstance.get("/server/available")

      if (serverRes.data.status !== 200) {
        return { error: serverRes.data.data?.message || "Failed to get upload server" };
      }

      const { url: uploadUrl, serverAccessToken } = serverRes.data.data;

      const uploadForm = new FormData();
      uploadForm.append("file", file);
      uploadForm.append("serverAccessToken", serverAccessToken);
      if (folderId) uploadForm.append("folderId", folderId);
      if (premiumOnly) uploadForm.append("premiumOnly", "true");

      const uploadRes = await axios.post(uploadUrl, uploadForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-AUTH-TOKEN": process.env.KRAKEN_API_TOKEN,
        },
      });

      if (uploadRes.data && uploadRes.data.status === 200) {
        uploadedFiles.push(uploadRes.data.data);
      } else {
        uploadedFiles.push({ error: uploadRes.data?.data?.message || "Upload failed" });
      }
    }

    return {
      message: "Upload complete",
      uploads: uploadedFiles,
    };
  } catch (error: any) {
    console.error("Upload error:", error?.response?.data || error.message);
    return { error: "File upload failed" };
  }
};

export const getFiles = async (): Promise<FileTypeResponseAll> => {
  try {
    await getLogedInUserId();
    const response = await axiosInstance.get('/file');
    return response.data;
  } catch (error: any) {
    console.error("Axios error:", error?.response?.data || error.message || error);
    throw error
  }
};

export const getFile = async (hashId: string): Promise<FileTypeResponse> => {
  try {
    await getLogedInUserId();

    const response = await axiosInstance.get(`/file/${hashId}`);
    
    if (response.data?.status !== 200) {
      throw new Error(response.data?.data?.message || "Failed to fetch file");
    }

    return response.data;
  } catch (error: any) {
    console.error("Axios error:", error?.response?.data || error.message || error);
    throw new Error(
      error?.response?.data?.message || error.message || "Unknown error occurred"
    );
  }
};


export const deleteFile = async (hashId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    await getLogedInUserId();

    const response = await axiosInstance.delete(`/file/${hashId}`);

    if (response.data.status === 200) {
      return { success: true };
    } else {
      return {
        success: false,
        error: response.data?.data?.message || "Failed to delete file",
      };
    }
  } catch (error: any) {
    console.error("Delete error:", error?.response?.data || error.message || error);
    return {
      success: false,
      error: error?.response?.data?.message || error.message || "Unknown error",
    };
  }
};
