import {
    validateCompleteName,
    validateStrongPassword,
    validateCpf,
    validateBirthday,
    validateBiologicSext,
    validateMail,
    validatePhoneNumber, validateMondoDbId
} from "../utils/validators.js";
function patientValidate(req, res, next){

    const { name, mail, birthday, biologicalSex, cpf, phone, clinic } = req.body;

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

    if(!birthday){
        return res.status(400).json({
            message: 'Birthday is required'
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

    if(!validateMondoDbId(clinic)){
        return res.status(400).json({
            message: 'MondoDb ID is invalid'
        })
    }

    next();
}

export {patientValidate}