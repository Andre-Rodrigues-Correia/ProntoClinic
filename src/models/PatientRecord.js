import mongoose, {Schema, model} from "mongoose";
//prontuário

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
        fields: {
            anamnese:{
                complaint: {
                    type: String,
                    trim: true
                },
                historyPresentIllness: {
                    type: String,
                    trim: true
                },
                historyPreviousIllness:{
                    type: String,
                    trim: true 
                },
                previousMedications: {
                    type: String,
                    trim: true 
                },
                allergies: {
                    type: String,
                    trim: true 
                },
                observations: {
                    type: String,
                    trim
                },
                othersInformations: {
                    type: String,
                    trim
                }
            },
            prescriptions: {
                medicines: [
                    {
                        type: String
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