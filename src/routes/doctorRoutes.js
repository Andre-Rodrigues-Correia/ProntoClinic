import {Router} from "express";
import {
    createDoctor,
    deleteOneDoctor,
    findDoctor,
    updateDoctor,
    validateDoctorMail
} from "../controllers/doctorController.js";
import {doctorValidate} from "../middlewares/doctorMiddleware.js";
import {encryptPasswordMiddleware} from "../middlewares/passwordMiddleware.js";
import {checkRule, verifyToken} from "../middlewares/authMiddleware.js";


const doctorRoutes = Router();

doctorRoutes.get('/:id',verifyToken, checkRule(['doctor', 'admin']), findDoctor);
doctorRoutes.post('/', doctorValidate, encryptPasswordMiddleware, createDoctor);
doctorRoutes.post('/activate', validateDoctorMail)
doctorRoutes.put('/:id',verifyToken, checkRule(['doctor', 'admin']), doctorValidate, encryptPasswordMiddleware, updateDoctor);
doctorRoutes.delete('/:id',verifyToken, checkRule(['doctor', 'admin']), deleteOneDoctor);

export default doctorRoutes;