import {
    validateCompleteName,
    validateStrongPassword,
    validateCpf,
    validateBirthday,
    validateBiologicSext,
    validateMail,
    validatePhoneNumber
} from "../utils/validators.js";
function doctorValidate(req, res, next){

    const { name, mail, password, birthday, biologicalSex, cpf, phone, specialty } = req.body;

    if(!name){
        return res.status(400).json({
            message: 'Complete name is required'
        })
    }

    if(!validateCompleteName(name)){
        return res.status(400).json({
            message: 'Complete name is required'
        })
    }

    if(!mail){
        return res.status(400).json({
            message: 'E-mail is required'
        })
    }
    if(!validateMail(mail)){
        return res.status(400).json({
            message: 'E-mail is invalid'
        })
    }

    if(!password){
        return res.status(400).json({
            message: 'Password is required'
        })
    }

    if(!validateStrongPassword(password)){
        return res.status(400).json({
            message: 'Weak password'
        })
    }

    if(!birthday){
        return res.status(400).json({
            message: 'Birthday is required'
        })
    }

    if(!validateBirthday(birthday)){
        return res.status(400).json({
            message: 'Minimum age must be 18 or invalid date'
        })
    }

    if(!biologicalSex){
        return res.status(400).json({
            message: 'Biologic sex is required'
        })
    }

    if(!validateBiologicSext(biologicalSex)){
        return res.status(400).json({
            message: 'Biologic sex is invalid'
        })
    }

    if(!cpf){
        return res.status(400).json({
            message: 'CPF is required'
        })
    }

    if(!validateCpf(cpf)){
        return res.status(400).json({
            message: 'CPF is invalid'
        })
    }

    if(!phone){
        return res.status(400).json({
            message: 'Phone number is required'
        })
    }

    if(!validatePhoneNumber(phone)){
        return res.status(400).json({
            message: 'Phone number is invalid'
        })
    }

    if(!specialty){
        return res.status(400).json({
            message: 'Specialty is required'
        })
    }


    next();
}

export {doctorValidate}