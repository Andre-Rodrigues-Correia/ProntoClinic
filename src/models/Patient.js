import mongoose, {Schema, model} from "mongoose";

const PatientSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        mail: {
            type: String,
            required: [true, 'Mail is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Mail is invalid'],
        },
        birthday: {
            type: Date,
            required: [true, 'Birthday is required'],
            trim: true
        },
        biologicalSex: {
            type: String,
            required: [true, 'Biologic sex is required'],
            trim: true,
            enum: ['M', 'F']
        },
        cpf: {
            type: String,
            required: [true, 'CPF is required'],
            unique: true,
            validate: {
                validator: function (cpf) {
                    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
                    return cpfRegex.test(cpf);
                },
                message: 'CPF format is invalid',
            },
        },
        phone: {
            type: Number,
            required: [true, 'Phone number is required'],
            unique: true,
            validate: {
                validator: function (phone) {
                    const phoneRegex = /^\d{11}$/;
                    return phoneRegex.test(phone);
                }
            },
            message: 'Phone number is invalid'
        },
        clinic: {
            type: Schema.Types.ObjectId,
            ref: 'Clinic',
            required: true
        },
        appoinments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Appointments'
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)

export default model('Patient', PatientSchema)