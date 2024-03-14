import Exam from "../models/Exam.js";

async function save(exam) {
    return await Exam.create(exam);
}

async function findOne(filter) {
    return await Exam.findOne(filter);
}

async function findAll(){
    return await Exam.find();
}

async function find(filter) {
    return await Exam.find(filter);
}

async function updateOne(filter, exam){
    return await Exam.updateOne(filter, exam);
}

async function deleteOne(filter){
    return await Exam.deleteOne(filter);
}


export { findOne, save, updateOne, find, findAll, deleteOne }