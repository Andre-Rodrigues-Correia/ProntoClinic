import {save, findOne, updateOne, find, findAll, deleteOne} from "../services/appointmentsService.js";
import logger from "../utils/logger.js";


async function createAppointment(req, res){
    try {
        const newAppointment = await save(req.body);

        return res.status(200).json({
            message: 'Appointment created with success'
        })

    }catch (error) {
        logger.error(`Error in appointment controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }

}

async function findAppointment(req, res){
    const appointmentId = req.params.id;

    try {
        const filter = {_id: appointmentId}

        const appointment = await findOne(filter)

        if(!appointment){
            return res.status(400).json({
                message: 'Appointment not found with this id'
            })
        }

        return res.status(200).json({
            message: appointment
        })

    }catch (error){
        logger.error(`Error in patient controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}


async function findAppointmentForPatient(req, res){
    const patientId = req.params.id;

    try {
        const filter = {patientId: patientId}

        const appointments = await find(filter)

        if(appointments.lenght <= 0){
            return res.status(400).json({
                message: 'Appointments not found with patient this id'
            })
        }

        return res.status(200).json({
            message: appointments
        })

    }catch (error){
        logger.error(`Error in patient controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}


async function findAllAppointments(req, res){
    try {
        const appointments = await findAll();
        return res.status(200).json({
            message: appointments
        })

    }catch (error) {
        logger.error(`Error in patient controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function updateAppointment(req, res){
    const appointmentId = req.params.id;

    const filter = {_id: appointmentId}

    try {
        const existsAppointment = await findOne(filter)

        if(!existsAppointment){
            return res.status(400).json({
                message: 'Appointment not found with this id'
            })
        }

        await updateOne(filter, req.body);

        return res.status(200).json({
            message: 'Appointment updated with success'
        })

    }catch (error) {
        logger.error(`Error in Patient controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}


async function deleteOneAppointment(req, res){

    const appointmentId = req.params.id;

    try {
        const filter = {_id: appointmentId}

        const appointment = await findOne(filter)

        if(!appointment){
            return res.status(400).json({
                message: 'Appointment not found with this id'
            })
        }

        const deletedAppointment = await deleteOne(filter);

        if(deletedAppointment.deletedCount <= 0){
            return res.status(500).json({
                message: 'Internal server error'
            })
        }

        return res.status(200).json({
            message: 'Appointment deleted with success'
        })

    }catch (error){
        logger.error(`Error in record controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export { createAppointment, findAppointment, findAllAppointments, findAppointmentForPatient, updateAppointment, deleteOneAppointment }