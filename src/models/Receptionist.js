import mongoose, {Schema, model} from "mongoose";

const RecepcionistSchema = new Schema(
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
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'The password must contain at least 6 characters'],
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
        clinic: {
            type: Schema.Types.ObjectId,
            ref: 'Clinic',
            required: true
        },
        status: {
            type: Boolean,
            required: true,
            default: false,
        },
        statusCode: {
            type: String,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)

export default model('Receptionist', RecepcionistSchema)