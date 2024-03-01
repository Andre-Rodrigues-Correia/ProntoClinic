import {Router} from "express";
import {
    createPatient,
    findPatient,
    findAllPatients,
    updatePatient,
    deleteOnePatient
} from "../controllers/patientController.js";
import {checkRule, verifyToken} from "../middlewares/authMiddleware.js";
import {patientValidate} from "../middlewares/patientMiddleware.js";


const patientRoutes = Router();

patientRoutes.post('/', patientValidate, verifyToken, checkRule(['doctor', 'admin', 'secretary']) , createPatient);
patientRoutes.put('/:id', patientValidate, verifyToken, checkRule(['doctor', 'admin', 'secretary']), updatePatient);
patientRoutes.get('/:id', verifyToken, checkRule(['doctor', 'admin', 'secretary']), findPatient);
patientRoutes.get('/', verifyToken, checkRule(['doctor', 'admin', 'secretary']), findAllPatients);
patientRoutes.delete('/:id', verifyToken, checkRule(['doctor', 'admin', 'secretary']), deleteOnePatient);
export default patientRoutes;