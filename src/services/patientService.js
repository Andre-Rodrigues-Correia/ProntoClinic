import Patient from "../models/Patient.js";

async function save(patient) {
    return await Patient.create(patient);
}

async function findOne(filter) {
    return await Patient.findOne(filter);
}

async function findAll(){
    return await Patient.find();
}

async function find(filter) {
    return await Patient.find(filter).select('-password');
}

async function updateOne(filter, patient){
    return await Patient.updateOne(filter, patient);
}

async function deleteOne(filter){
    return await Patient.deleteOne(filter);
}

async function verifyExistisPatient(patient){
    const filter = {
        $or: [
            {mail: patient.mail},
            {cpf: patient.cpf},
            {phone: patient.phone}
        ]
    }

    return await Patient.find(filter);
}

export { findOne, save, updateOne, find, findAll, verifyExistisPatient, deleteOne }