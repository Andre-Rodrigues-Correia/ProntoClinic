import logger from "../utils/logger.js";
import {save, findOne, findAll, updateOne, deleteOne, verifyExistisPatient} from "../services/patientService.js";
async function createPatient (req, res){
    try {
        const existsPatient = await verifyExistisPatient(req.body)

        if(existsPatient.length){
            return res.status(400).json({
                message: 'Patient already exists'
            });
        }
        console.log('aqui')
        const newPatient = await save(req.body)

        return res.status(200).json({
            message: 'Patient created with success'
        })

    }catch (error) {
        logger.error(`Error in patient controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }

}

async function findPatient(req, res){
    const patientId = req.params.id;

    try {
        const filter = {_id: patientId}

        const patient = await findOne(filter)

        if(!patient){
            return res.status(400).json({
                message: 'Patient not found with this id'
            })
        }

        return res.status(200).json({
            message: patient
        })

    }catch (error){
        logger.error(`Error in patient controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function findAllPatients(req, res){
    try {
        const patients = await findAll();
        return res.status(200).json({
            message: patients
        })


    }catch (error) {
        logger.error(`Error in patient controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function updatePatient(req, res){
    const patientId = req.params.id;

    const filter = {_id: patientId}

    try {
        const existsPatient = await findOne(filter)

        if(!existsPatient){
            return res.status(400).json({
                message: 'Patient not found with this id'
            })
        }

        await updateOne(filter, req.body);

        return res.status(200).json({
            message: 'Patient updated with success'
        })

    }catch (error) {
        logger.error(`Error in Patient controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function deleteOnePatient(req, res){

    const patientId = req.params.id;

    try {
        const filter = {_id: patientId}

        const patient = await findOne(filter)

        if(!patient){
            return res.status(400).json({
                message: 'Patient not found with this id'
            })
        }

        const deletedPatient = await deleteOne(filter);

        if(deletedPatient.deletedCount <= 0){
            return res.status(500).json({
                message: 'Internal server error'
            })
        }

        return res.status(200).json({
            message: 'Patient deleted with success'
        })

    }catch (error){
        logger.error(`Error in patient controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}


export {createPatient, findPatient, findAllPatients, updatePatient, deleteOnePatient }