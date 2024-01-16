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
import {verifyToken} from "../middlewares/authMiddleware.js";


const doctorRoutes = Router();

doctorRoutes.get('/:id',verifyToken, findDoctor);
doctorRoutes.post('/', doctorValidate, encryptPasswordMiddleware, createDoctor);
doctorRoutes.post('/activate', validateDoctorMail)
doctorRoutes.put('/:id', doctorValidate, encryptPasswordMiddleware, updateDoctor);
doctorRoutes.delete('/:id', deleteOneDoctor);

export default doctorRoutes;