import PatientRecord from "../models/PatientRecord.js";

async function save(record) {
    return await PatientRecord.create(record);
}

async function findOne(filter) {
    return await PatientRecord.findOne(filter);
}

async function findAll(){
    return await PatientRecord.find();
}

async function find(filter) {
    return await PatientRecord.find(filter);
}

async function updateOne(filter, record){
    return await PatientRecord.updateOne(filter, record);
}

async function deleteOne(filter){
    return await PatientRecord.deleteOne(filter);
}


export { findOne, save, updateOne, find, findAll, deleteOne }