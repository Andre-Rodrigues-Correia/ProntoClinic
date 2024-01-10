import Doctor from "../models/Doctor.js";

async function save(doctor) {
    return await Doctor.create(doctor)
}

async function findOne(filter) {
    return await Doctor.findOne(filter);
}

async function find(filter) {
    return await Doctor.find(filter);
}

async function updateOne(filter, doctor){
    return await Doctor.updateOne(filter, doctor);
}

async function verifyExistisDoctor(doctor){
    const filter = {
        $or: [
            {mail: doctor.mail},
            {cpf: doctor.cpf},
            {phone: doctor.phone}
        ]
    }

    return await Doctor.find(filter);
}

export { findOne, save, updateOne, find, verifyExistisDoctor }