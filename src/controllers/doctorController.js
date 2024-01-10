import logger from "../utils/logger.js";
import {ObjectId} from 'mongodb';
import {findOne, save, updateOne, find, verifyExistisDoctor} from "../services/doctorService.js";
import {save as saveClinic} from "../services/clinicService.js"
import {encryptPassword} from "../utils/passwordUtils.js";


async function createDoctor(req, res) {
    const clinicId = new ObjectId()

    try {
        const existsDoctor = await verifyExistisDoctor(req.body);

        if(existsDoctor.length){
            return res.status(400).json({
                message: 'Doctor already exists'
            })
        }

        const newDoctor = await save({clinic: clinicId, ...req.body})

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

async function updateDoctor(req, res){
    const doctorId = req.params.id;

    if(!doctorId){
        return res.status(400).json({
            message: 'Parameter Id is required'
        })
    }

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

export { createDoctor, updateDoctor }