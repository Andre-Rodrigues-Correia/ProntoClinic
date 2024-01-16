import nodemailer from 'nodemailer'
import logger from "../utils/logger.js";

const MAIL = 'andre.correia.testes@gmail.com'
const PASS_MAIL = 'mash iglw ppok cawa'

async function sendActivationMailDoctor(userMail){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: MAIL,
            pass: PASS_MAIL,
        },
    });

    const activationCode = Math.random().toString(36).substring(7);

    const mailOptions = {
        from: MAIL,
        to: userMail,
        subject: 'Ative sua conta',
        text: `Seu código de ativação é: ${activationCode}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return activationCode;
    }catch (error) {
        logger.error(`Error in mail service: ${error.message}`)
        return false
    }
}

async function validateDoctorCode(mail, code){

}

export {sendActivationMailDoctor}