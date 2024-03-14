import { Router} from "express";
import doctorRoutes from "./routes/doctorRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import appointmentsRoutes from "./routes/appointmentsRoutes.js";
import examRoutes from "./routes/examRoutes.js";

const router = Router()

router.use('/doctor', doctorRoutes)
router.use('/auth', authRoutes)
router.use('/patient', patientRoutes)
router.use('/record', recordRoutes)
router.use('/appointment', appointmentsRoutes)
router.use('/exam', examRoutes)

router.all('/*', (req, res) => {
    return res.status(404).json({
        message: 'Route not found!'
    })
})

export default router;