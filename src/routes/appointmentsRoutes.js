import {Router} from "express";
import {checkRule, verifyToken} from "../middlewares/authMiddleware.js";
import {appointmentValidate} from "../middlewares/appointmentMiddleware.js";
import {
    createAppointment, deleteOneAppointment,
    findAllAppointments,
    findAppointment,
    findAppointmentForPatient, updateAppointment
} from "../controllers/appointmentController.js";



const appointmentsRoutes = Router();

appointmentsRoutes.post('/', verifyToken, appointmentValidate, checkRule(['doctor']), createAppointment);
appointmentsRoutes.get('/', verifyToken, checkRule(['doctor']), findAllAppointments);
appointmentsRoutes.get('/:id', verifyToken, checkRule(['doctor']), findAppointment);
appointmentsRoutes.get('/patient/:id', verifyToken, checkRule(['doctor']), findAppointmentForPatient);
appointmentsRoutes.put('/:id', verifyToken, appointmentValidate, checkRule(['doctor']), updateAppointment);
appointmentsRoutes.delete('/:id', verifyToken, checkRule(['doctor']), deleteOneAppointment);

export default appointmentsRoutes;