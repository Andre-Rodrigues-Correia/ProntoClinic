import {Router} from "express";
import {signInDoctor} from "../controllers/authController.js";
import {createDoctor} from "../controllers/doctorController.js";
import {doctorValidate} from "../middlewares/doctorMiddleware.js";
import {encryptPasswordMiddleware} from "../middlewares/passwordMiddleware.js";


const authRoutes = Router();

authRoutes.post('/signup-doctor', doctorValidate, encryptPasswordMiddleware, createDoctor)
authRoutes.post('/signin-doctor', signInDoctor);

export default authRoutes;