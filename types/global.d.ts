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
}