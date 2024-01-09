import {validateCompleteName, validateBirthday, validateStrongPassword, validateBiologicSext, validateCpf, validatePhoneNumber, validateMail} from "../../src/utils/validators.js";


describe('Should test complete Name validator', function () {
    test('should return false dont surname', () => {
        const isValid = validateCompleteName('Name');
        expect(isValid).toBe(false);
    });
    test('Should return true with name and surname', () => {
        const isValid = validateCompleteName('Name Surname');
        expect(isValid).toBe(true);
    });
    test('Should return true with name and surnames', () => {
        const isValid = validateCompleteName('Name Surname Surname2');
        expect(isValid).toBe(true);
    });
});


describe('Should test birthday validator', function () {
    test('should return false with invalid date', () => {
        const date = new Date('error')
        const isValid = validateBirthday(date);
        expect(isValid).toBe(false);
    });

    test('should return false with age low 18', () => {
        const date = new Date('10/10/2020')
        const isValid = validateBirthday(date);
        expect(isValid).toBe(false);
    });

    test('should return true with correct date and age', () => {
        const date = new Date('10/10/2000')
        const isValid = validateBirthday(date);
        expect(isValid).toBe(true);
    });
});


describe('Should test password validator', function () {
    // Strong passowrd must contain
    // 1 capital letter
    // 1 lower case
    // 1 special character
    // Minimum size of 8 characters

    test('should return false with weak password', () => {
        const password1 = validateStrongPassword('1234');
        const password2 = validateStrongPassword('abcd');
        const password3 = validateStrongPassword('Abc123');
        const password4 = validateStrongPassword('Abc123.');
        expect(password1).toBe(false);
        expect(password2).toBe(false);
        expect(password3).toBe(false);
        expect(password4).toBe(false);
    });

    test('should return true with strong password', () => {
        const strongPassword = validateStrongPassword('$Mobr@l123.');
        expect(strongPassword).toBe(true);
    })
});

describe('Should test biologic sex validator', function () {
    test('should return false with ivalid biologic sex', () => {
        const biologicSex1 = validateBiologicSext('A');
        const biologicSex2 = validateBiologicSext('f');

        expect(biologicSex1).toBe(false);
        expect(biologicSex2).toBe(false);

    });

    test('should return true with correct biologic sex', () => {
        const biologicSex1 = validateBiologicSext('M');
        const biologicSex2 = validateBiologicSext('F');

        expect(biologicSex1).toBe(true);
        expect(biologicSex2).toBe(true);
    })
});


describe('Should test cpf validator', function () {
    test('should return false with ivalid cpf', () => {
        const cpf1 = validateCpf(123456789410);
        const cpf2 = validateCpf('123.456.789-10');

        expect(cpf1).toBe(false);
        expect(cpf2).toBe(false);

    });

    test('should return true with correct cpf', () => {
        // CPF generated in 4devs cpf generator: 514.237.480-00
        const validCpf1 = validateCpf('514.237.480-00');
        const validCpf2 = validateCpf('51423748000');

        expect(validCpf1).toBe(true);
        expect(validCpf2).toBe(true);
    })
});


describe('Should test phone Number validator', function () {
    test('should return false with ivalid phone number', () => {
        const phone1 = validatePhoneNumber(999999);
        const phone2 = validatePhoneNumber('(99) 99999-9999');

        expect(phone1).toBe(false);
        expect(phone2).toBe(false);

    });

    test('should return true with correct phone number', () => {
        const phone = validatePhoneNumber(99999999999);

        expect(phone).toBe(true);
    })
});


describe('Should test email validator', function () {
    test('should return false with ivalid email', () => {
        const mail1 = validateMail('mail.com');
        const mail2 = validateMail('mail@mail');

        expect(mail1).toBe(false);
        expect(mail2).toBe(false);

    });

    test('should return true with correct mail', () => {
        const mail = validateMail('mail@mail.com');

        expect(mail).toBe(true);
    })
});