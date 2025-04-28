interface ExperienceType {
    _id: string;
    title: string;
    company: string;
    location: string;
    from: string;
    to: string;
    promoted: boolean;
    description: string;
    url: string;
    image: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

interface SkillType {
    _id: string;
    name: string;
    type: string;
    hidden: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

interface CategoryType {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface ProjectType {
    _id: string;
    name: string;
    description: string;
    categoryId: string;
    categoryName: string;
    url: string;
    image: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

interface FolderType {
    id: string;
    name: string;
    parentId: string;
}

interface FolderTypeResponse {
    status: number;
    data: FolderType[]
}

interface FileType {
    url: string;
    name: string;
    hash: string;
    size: string;
    downloads: number;
    views: number;
    folderId: string | null;
    premiumOnly: boolean;
    reportedDate: string | null;
    extension: string;
    server: string;
    type: string;
    uploadDate: string;
}

interface FileTypeResponse {
    status: number;
    data: FileType
}

interface FileTypeResponseAll {
    status: number;
    perPage: number;
    page: number
    totalItems: number;
    totalPages: number;
    data: FileType[]
}