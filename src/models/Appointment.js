import mongoose, {Schema, model} from "mongoose";

const AppointmentsSchema = new Schema(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: [true, 'PatientId is required'],
        },
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: 'Doctor',
            required: [true, 'DoctorId is required'],
        },
        clinicId: {
            type: Schema.Types.ObjectId,
            ref: 'Clinic',
            required: [true, 'ClinicId is required'],
        },
        record:{
            type: Object,
        },
        status: {
            type: String,
            required: [true, 'Status is required'],
            trim: true,
            enum: ['scheduled', 'confirmed', 'canceled', 'completed', 'Rescheduled', 'absent', 'onHold', 'started'],
            default:'onHold'
        },
        date: {
            type: Date,
            required: [true, 'Date appointment is required']
        },
        local: {
            type: Schema.Types.ObjectId,
            required: [true, 'Local is required']
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)

export default model('Appointments', AppointmentsSchema)