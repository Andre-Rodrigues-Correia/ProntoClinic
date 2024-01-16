import jwt from 'jsonwebtoken'
import logger from "../utils/logger.js";
import 'dotenv/config.js'

const SECRET = process.env.SECRET
async function verifyToken(req, res, next){

    const token = req.header('Authorization')

    if(!token){
        return res.status(403).json({
            message: 'Token is required'
        })
    }

    try {
        req.user = jwt.verify(token, SECRET);
        next()
    }catch (error) {
        logger.error(`Error in auth middleware: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export { verifyToken }