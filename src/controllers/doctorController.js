import logger from "../utils/logger.js";
import {ObjectId} from 'mongodb';
import {findOne, save} from "../services/doctorService.js";
import {save as saveClinic} from "../services/clinicService.js"
async function createDoctor(req, res) {
    const clinicId = new ObjectId()

    try {
        const existsDoctor = await findOne({
            mail: req.body.mail
        })

        if(existsDoctor){
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

    } catch (e) {
        logger.error(`Error in doctor controller: ${e.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }

}

export { createDoctor }