import Appointment from "../models/Appointment.js";

async function save(appointment) {
    return await Appointment.create(appointment);
}

async function findOne(filter) {
    return await Appointment.findOne(filter);
}

async function findAll(){
    return await Appointment.find();
}

async function find(filter) {
    return await Appointment.find(filter);
}

async function updateOne(filter, appointment){
    return await Appointment.updateOne(filter, appointment);
}

async function deleteOne(filter){
    return await Appointment.deleteOne(filter);
}


export { findOne, save, updateOne, find, findAll, deleteOne }