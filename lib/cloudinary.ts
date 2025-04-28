import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const createFolder = async (folderName: string) => {
  try {
    const result = await cloudinary.api.create_folder(folderName);
    return result;
  } catch (err) {
    throw new Error(`Failed to create folder: ${err}`);
  }
}

export const listFolders = async (parentFolder?: string) => {
    try {
      const options = parentFolder
        ? { type: 'upload', prefix: `${parentFolder}/`, max_results: 500 }
        : { type: 'upload', max_results: 500 };
  
      const result = await cloudinary.api.sub_folders(parentFolder || '');
      return result.folders;
    } catch (err) {
      throw new Error(`Failed to list folders: ${err}`);
    }
}