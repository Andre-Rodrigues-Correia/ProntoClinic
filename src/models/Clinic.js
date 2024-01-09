import mongoose, {Schema, model} from "mongoose";

const ClinicSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        doctors: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Doctor'
            }
        ],
        receptionists: [
            {
                type: Schema.Types.ObjectId
            }
        ],
        patients: [
            {
                type: Schema.Types.ObjectId
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)

export default model('Clinic', ClinicSchema)