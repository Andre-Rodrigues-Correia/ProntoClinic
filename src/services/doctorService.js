import Doctor from "../models/Doctor.js";

async function save(doctor) {
    return await Doctor.create(doctor)
}

async function findOne(filter) {
    return await Doctor.findOne(filter);
}

async function find(filter) {
    return await Doctor.find(filter).select('-password -cpf -phone');
}

async function updateOne(filter, doctor){
    return await Doctor.updateOne(filter, doctor);
}

async function deleteOne(filter){
    return await Doctor.deleteOne(filter);
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

export { findOne, save, updateOne, find, verifyExistisDoctor, deleteOne }