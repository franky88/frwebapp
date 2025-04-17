import mongoose, { Schema, Document } from 'mongoose';

interface ICategory extends Document {
    name: string;
}
  
const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true },
    },
    { timestamps: true }
);

interface IProject extends Document {
    name: string;
    description: string;
    categoryId?: mongoose.Types.ObjectId;
    categoryName: string;
    url?: string;
    image?: string;
    userId?: mongoose.Types.ObjectId;
}

const ProjectSchema = new Schema<IProject>(
    {
        name: {type: String, required: true},
        description: {type: String, required: false},
        categoryId: {type: String, required: true},
        categoryName: { type: String, required: true },
        url: {type: String},
        image: {type: String},
        userId: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

export const Category = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
export const Project = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);