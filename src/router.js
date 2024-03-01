import { Router} from "express";
import doctorRoutes from "./routes/doctorRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";

const router = Router()

router.use('/doctor', doctorRoutes)
router.use('/auth', authRoutes)
router.use('/patient', patientRoutes)

router.all('/*', (req, res) => {
    return res.status(404).json({
        message: 'Route not found!'
    })
})

export default router;