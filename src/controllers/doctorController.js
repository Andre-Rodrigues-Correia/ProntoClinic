import logger from "../utils/logger.js";
import {ObjectId} from 'mongodb';
import {findOne, save, updateOne, find, deleteOne, verifyExistisDoctor} from "../services/doctorService.js";
import {save as saveClinic} from "../services/clinicService.js"
import {encryptPassword} from "../utils/passwordUtils.js";
import {sendActivationMailDoctor} from "../services/mailService.js";


async function createDoctor(req, res) {
    const clinicId = new ObjectId()

    try {
        const existsDoctor = await verifyExistisDoctor(req.body);

        if(existsDoctor.length){
            return res.status(400).json({
                message: 'Doctor already exists'
            })
        }

        const statusCode = await sendActivationMailDoctor(req.body.mail);

        const newDoctor = await save({clinic: clinicId, statusCode: statusCode, ...req.body})

        const clinic = {
            name: req.body.name,
            doctors: [new ObjectId(newDoctor._id)]
        }

        const newClinic = await saveClinic({_id: clinicId, ...clinic})

        return res.status(200).json({
            message: 'Doctor and Clinic created with success'
        })

    } catch (error) {
        logger.error(`Error in doctor controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }

}

async function findDoctor(req, res){
    const doctorId = req.params.id;

    try {
        const filter = {_id: doctorId}

        const doctor = await findOne(filter)

        if(!doctor){
            return res.status(400).json({
                message: 'Doctor not found with this id'
            })
        }

        return res.status(200).json({
            message: doctor
        })

    }catch (error){
        logger.error(`Error in doctor controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function updateDoctor(req, res){
    const doctorId = req.params.id;

    const filter = {_id: doctorId}

    try {
        const existsDoctor = await findOne(filter)

        if(!existsDoctor){
            return res.status(400).json({
                message: 'Doctor not found with this id'
            })
        }

        await updateOne(filter, req.body);

        return res.status(200).json({
            message: 'Doctor updated with success'
        })

    }catch (error) {
        logger.error(`Error in doctor controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}


async function deleteOneDoctor(req, res){

    const doctorId = req.params.id;

    try {
        const filter = {_id: doctorId}

        const doctor = await findOne(filter)

        if(!doctor){
            return res.status(400).json({
                message: 'Doctor not found with this id'
            })
        }

        const deletedDoctor = await deleteOne(filter);

        if(deletedDoctor.deletedCount <= 0){
            return res.status(500).json({
                message: 'Internal server error'
            })
        }

        return res.status(200).json({
            message: 'Doctor deleted with success'
        })

    }catch (error){
        logger.error(`Error in doctor controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function validateDoctorMail(req, res){

    const {mail, code} = req.body

    if(!mail){
        return res.status(400).json({
            message: 'Mail is required'
        })
    }

    if(!code){
        return res.status(400).json({
            message: 'Code is required'
        })
    }

    const filter = {mail: mail}

    try {
        const doctor = await findOne(filter)

        if(!doctor){
            return res.status(400).json({
                message: 'Doctor not found with this mail'
            })
        }

        if(code === doctor.statusCode){

            await updateOne(filter, {status: true, ...req.body});

            return res.status(200).json({
                message: 'Account activated with success'
            })
        }

        return res.status(500).json({
            message: 'Not possible validate account'
        });

    }catch (error) {
        logger.error(`Error in doctor controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export { createDoctor, updateDoctor, findDoctor, deleteOneDoctor, validateDoctorMail }