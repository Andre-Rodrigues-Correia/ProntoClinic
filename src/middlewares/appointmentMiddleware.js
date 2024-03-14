import { validateMondoDbId } from "../utils/validators.js";
import {Schema} from "mongoose";
function appointmentValidate(req, res, next){

    const { patientId, doctorId, clinicId, record, status, date, local } = req.body;

    if(!patientId){
        return res.status(400).json({
            message: 'patientId is required'
        })
    }

    if(!validateMondoDbId(patientId)){
        return res.status(400).json({
            message: 'patientId is invalid'
        })
    }

    if(!doctorId){
        return res.status(400).json({
            message: 'doctorId is required'
        })
    }
    if(!validateMondoDbId(doctorId)){
        return res.status(400).json({
            message: 'doctorId is invalid'
        })
    }

    if(!clinicId){
        return res.status(400).json({
            message: 'clinicId is required'
        })
    }
    if(!validateMondoDbId(clinicId)){
        return res.status(400).json({
            message: 'clinicId is invalid'
        })
    }

    if(!date){
        return res.status(400).json({
            message: 'date is required'
        })
    }

    if(!record){
        return res.status(400).json({
            message: 'record is required'
        })
    }

    if(!status){
        return res.status(400).json({
            message: 'status is required'
        })
    }

    next();
}

export {appointmentValidate}