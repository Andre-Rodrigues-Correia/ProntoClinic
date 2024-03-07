import { validateMondoDbId } from "../utils/validators.js";
import {Schema} from "mongoose";
function recordValidate(req, res, next){

    const { patientId, doctorId, medicalRecord } = req.body;


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

    if(!medicalRecord?.anamnese.complaint){
        return res.status(400).json({
            message: 'complaint is required'
        })
    }

    next();
}

export {recordValidate}