import {Router} from "express";
import {createDoctor} from "../controllers/doctorController.js";
import {doctorValidate} from "../middlewares/doctorMiddleware.js";


const doctorRoutes = Router();

doctorRoutes.post('/', doctorValidate, createDoctor);

export default doctorRoutes;