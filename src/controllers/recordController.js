import {save, findOne, updateOne, find, findAll, deleteOne} from "../services/recordService.js";
import logger from "../utils/logger.js";


async function createRecord(req, res){
    try {
        const newRecord = await save(req.body);

        return res.status(200).json({
            message: 'Record created with success'
        })

    }catch (error) {
        logger.error(`Error in record controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }

}

async function findRecord(req, res){
    const recordId = req.params.id;

    try {
        const filter = {_id: recordId}

        const record = await findOne(filter)

        if(!record){
            return res.status(400).json({
                message: 'Record not found with this id'
            })
        }

        return res.status(200).json({
            message: record
        })

    }catch (error){
        logger.error(`Error in record controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}


async function findRecordForPatient(req, res){
    const patientId = req.params.id;

    try {
        const filter = {patientId: patientId}

        const records = await find(filter)

        if(records.lenght <= 0){
            return res.status(400).json({
                message: 'Records not found with patient this id'
            })
        }

        return res.status(200).json({
            message: records
        })

    }catch (error){
        logger.error(`Error in record controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}


async function findAllRecords(req, res){
    try {
        const records = await findAll();
        return res.status(200).json({
            message: records
        })

    }catch (error) {
        logger.error(`Error in record controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function updateRecord(req, res){
    const recordId = req.params.id;

    const filter = {_id: recordId}

    try {
        const existsRecord = await findOne(filter)

        if(!existsRecord){
            return res.status(400).json({
                message: 'Record not found with this id'
            })
        }

        await updateOne(filter, req.body);

        return res.status(200).json({
            message: 'Record updated with success'
        })

    }catch (error) {
        logger.error(`Error in record controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}


async function deleteOneRecord(req, res){

    const recordId = req.params.id;

    try {
        const filter = {_id: recordId}

        const record = await findOne(filter)

        if(!record){
            return res.status(400).json({
                message: 'Record not found with this id'
            })
        }

        const deletedRecord = await deleteOne(filter);

        if(deletedRecord.deletedCount <= 0){
            return res.status(500).json({
                message: 'Internal server error'
            })
        }

        return res.status(200).json({
            message: 'Record deleted with success'
        })

    }catch (error){
        logger.error(`Error in record controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export { createRecord, findRecord, findAllRecords, findRecordForPatient, updateRecord, deleteOneRecord }