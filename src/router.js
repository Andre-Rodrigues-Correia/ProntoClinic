import { Router} from "express";
import doctorRoutes from "./routes/doctorRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const router = Router()

router.use('/doctor', doctorRoutes)
router.use('/auth', authRoutes)

router.all('/*', (req, res) => {
    return res.status(404).json({
        message: 'Route not found!'
    })
})

export default router;