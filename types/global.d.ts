
interface ExperienceType {
    _id: string;
    title: string;
    company: string;
    location: string;
    from: string;
    to: string;
    promoted: boolean;
    description: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

interface SkillType {
    _id: string,
    name: string,
    type: string,
    hidden: boolean,
    userId: string;
    createdAt: string;
    updatedAt: string;
}