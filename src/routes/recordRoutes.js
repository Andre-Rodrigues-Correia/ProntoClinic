import {Router} from "express";

import {checkRule, verifyToken} from "../middlewares/authMiddleware.js";
import {recordValidate} from "../middlewares/recordMiddleware.js";
import {
    createRecord, deleteOneRecord,
    findAllRecords,
    findRecord,
    findRecordForPatient,
    updateRecord
} from "../controllers/recordController.js";


const recordRoutes = Router();

recordRoutes.post('/', recordValidate, verifyToken, checkRule(['doctor']), createRecord)
recordRoutes.get('/', verifyToken, checkRule(['doctor']), findAllRecords);
recordRoutes.get('/:id', verifyToken, checkRule(['doctor']), findRecord);
recordRoutes.get('/patient/:id', verifyToken, checkRule(['doctor']), findRecordForPatient);
recordRoutes.put('/:id', recordValidate, verifyToken, checkRule(['doctor']), updateRecord);
recordRoutes.delete('/:id', verifyToken, checkRule(['doctor']), deleteOneRecord)
export default recordRoutes;