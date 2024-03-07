import mongoose, {Schema, model} from "mongoose";

const PatientRecordSchema = new Schema(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: true
        },
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        },
        medicalRecord: {
            anamnese:{
                complaint: {
                    type: String,
                    trim: true,
                    default: ''
                },
                historyPresentIllness: {
                    type: String,
                    trim: true,
                    default: ''
                },
                historyPreviousIllness:{
                    type: String,
                    trim: true,
                    default: ''
                },
                previousMedications: {
                    type: String,
                    trim: true,
                    default: ''
                },
                allergies: {
                    type: String,
                    trim: true,
                    default: ''
                },
                observations: {
                    type: String,
                    trim: true,
                    default: ''
                },
                othersInformations: {
                    type: String,
                    trim: true,
                    default: ''
                }
            },
            prescriptions: {
                exams: [
                    {
                        name: String,
                        variation: {
                            min: Number,
                            max: Number
                        },
                        value: Number
                    }
                ],
                medicines: [
                    {
                        type: Object
                    }
                ],
                otherPrescriptions: {
                    type: String
                }
            }
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)

export default model('PatientRecord', PatientRecordSchema)
