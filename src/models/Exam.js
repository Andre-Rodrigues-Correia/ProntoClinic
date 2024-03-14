import mongoose, {Schema, model} from "mongoose";

const ExamSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        min: {
            type: Number,
            required: [true, 'Min is required'],
        },
        max: {
            type: Number,
            required: [true, 'Max is required'],
        },
        label: {
            type: String,
            required: [true, 'Label is required'],
            trim: true,
        },
        value: {
            type: String,
            required: [true, 'Value is required'],
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)

export default model('Exam', ExamSchema)