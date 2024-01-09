import Doctor from "../models/Doctor.js";

async function save(doctor) {
    return await Doctor.create(doctor)
}

async function findOne(filter) {
    return await Doctor.findOne(filter);
}

export { findOne, save }