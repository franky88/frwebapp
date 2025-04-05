import mongoose, { Schema, Document } from 'mongoose';

interface ISkills extends Document {
    name: string;
    type: string;
    hidden?: boolean;
    userId?: mongoose.Types.ObjectId;
}

const SkillsSchema = new Schema<ISkills>(
    {
        name: {type: String, required: true},
        type: {type: String, required: true},
        hidden: {type: Boolean, default: false},
        userId: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

export const Skills = mongoose.models.Skills || mongoose.model<ISkills>("Skills", SkillsSchema);