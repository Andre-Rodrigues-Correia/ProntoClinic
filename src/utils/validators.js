import {ObjectId} from "mongodb";

function validateCompleteName(name) {
    name = name.trim();

    const names = name.split(' ');

    if (names.length < 2) {
        return false;
    }

    for (const n of names) {
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s']+$/u.test(n)) {
            return false;
        }
    }
    return true;
}



function validateStrongPassword(password) {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+\.]{8,}$/;

    return strongPasswordRegex.test(password);
}



function validateBirthday(birthday) {

    const birthdayAux = new Date(birthday);

    if (isNaN(birthdayAux.getTime())) {
        return false;
    }


    const minimumAge = 18;
    const today = new Date();


    if ((today.getFullYear() - birthdayAux.getFullYear()) < minimumAge) {
        return false;
    }

    return true;
}

function validateBiologicSext(biologicalSex){
    const permittedSex = ['M', 'F']

    return permittedSex.includes(biologicalSex);
}

function validateCpf(cpf) {
    const clearCpf = cpf.toString().replace(/\D/g, '');

    if (clearCpf.length !== 11) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(clearCpf.charAt(i)) * (10 - i);
    }

    let rest = sum % 11;
    let checkDigit1 = rest < 2 ? 0 : 11 - rest;
    if (checkDigit1 !== parseInt(clearCpf.charAt(9))) {
        return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(clearCpf.charAt(i)) * (11 - i);
    }
    rest = sum % 11;
    let checkDigit2 = rest < 2 ? 0 : 11 - rest;
    if (checkDigit2 !== parseInt(clearCpf.charAt(10))) {
        return false;
    }

    return true;
}

function validateMail(mail){
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return mailRegex.test(mail)
}

function validatePhoneNumber(phone){
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phone);
}

function validateMondoDbId(mongoDbId){
    return ObjectId.isValid(mongoDbId);
}

export {validateCompleteName, validateBirthday, validateStrongPassword, validateBiologicSext, validateCpf, validatePhoneNumber, validateMail, validateMondoDbId}