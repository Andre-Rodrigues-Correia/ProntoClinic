import Clinic from "../models/Clinic.js";

async function save(clinic) {
    return await Clinic.create(clinic);
}

async function findOne(filter) {
    return await Clinic.findOne(filter);
}

export { findOne, save }