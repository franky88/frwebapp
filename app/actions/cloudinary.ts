'use server';

import { createFolder, listFolders } from '@/lib/cloudinary';

export const  createCloudinaryFolder = async (folderName: string) => {
  return await createFolder(folderName);
}

export async function getCloudinaryFolders(parentFolder?: string) {
    return await listFolders(parentFolder);
}