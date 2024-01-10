import {Router} from "express";
import {createDoctor, updateDoctor} from "../controllers/doctorController.js";
import {doctorValidate} from "../middlewares/doctorMiddleware.js";
import {encryptPasswordMiddleware} from "../middlewares/passwordMiddleware.js";


const doctorRoutes = Router();

doctorRoutes.post('/', doctorValidate, encryptPasswordMiddleware, createDoctor);
doctorRoutes.put('/:id', doctorValidate, encryptPasswordMiddleware, updateDoctor);

export default doctorRoutes;