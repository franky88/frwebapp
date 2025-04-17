import mongoose, { Schema, Document } from 'mongoose';

interface IExperience extends Document {
    title: string;
    company: string;
    location: string;
    from: Date;
    to?: Date;
    promoted?: boolean;
    description?: string;
    url?: string;
    image?: string;
    userId?: mongoose.Types.ObjectId;
}

const ExperienceSchema = new Schema<IExperience>(
    {
        title: {type: String, required: true},
        company: {type: String, required: true},
        location: {type: String, required: true},
        from: {type: Date, required: true},
        to: {type: Date},
        promoted: {type: Boolean, default: false},
        description: {type: String},
        url: {type: String},
        image: {type: String},
        userId: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

export const Experience = mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);