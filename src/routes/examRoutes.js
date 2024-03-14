import {Router} from "express";

import {checkRule, verifyToken} from "../middlewares/authMiddleware.js";
import {createExam, findAllExams} from "../controllers/examController.js";
import {examValidate} from "../middlewares/examsMiddleware.js";


const examRoutes = Router();

examRoutes.post('/', examValidate, verifyToken, checkRule(['doctor']), createExam)
examRoutes.get('/', verifyToken, checkRule(['doctor']), findAllExams);


export default examRoutes;