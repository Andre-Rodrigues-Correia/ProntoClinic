import logger from "../utils/logger.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import {findOne as findOneDoctor} from "../services/doctorService.js";
import 'dotenv/config.js'

const SECRET = process.env.SECRET

async function signInDoctor(req, res) {
    const {mail, password} = req.body

    const filter = {
        mail: mail
    }

    try {
        const doctor = await findOneDoctor(filter);

        if(!doctor){
            return res.status(404).json({
                message: 'Doctor not found'
            });
        }

        if(!bcrypt.compareSync(password, doctor.password)){
            return res.status(403).json({
                message: 'Incorrect password'
            });
        }

        const payload = {
            _id: doctor._id,
            name: doctor.name,
            mail: doctor.mail,
            rule: 'doctor'
        }

        const token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

        res.status(200).json({
            token
        })

    }catch (error) {
        logger.error(`Error in auth controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}


export { signInDoctor }