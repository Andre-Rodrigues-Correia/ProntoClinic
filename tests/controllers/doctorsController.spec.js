import request from 'supertest'
import app from '../../src/app.js'
import {connectDB} from "../../src/database/connection.js";
import Doctor from "../../src/models/Doctor.js";
import Clinic from "../../src/models/Clinic.js";
beforeAll(async () =>{
    await connectDB();
})

afterAll(async () => {
    Doctor.collection.drop();
    Clinic.collection.drop()
})

describe('Should test doctor routes', function () {

    test('Should create new doctor with success', () => {

        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctor@mail.com',
            password: '$Mobr@l123',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '224.334.390-86',
            specialty: 'specialty',
            phone: 99999999999
        }

        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('Doctor and Clinic created with success');
            expect(res.status).toEqual(200)
        });
    })

    test('Should not create new doctor with equal mail', () => {

        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctor@mail.com',
            password: '$Mobr@l123',
            birthday: '10/10/2001',
            biologicalSex: 'F',
            cpf: '224.334.390-86',
            specialty: 'specialty2',
            phone: 99999999998
        }

        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('Doctor already exists');
            expect(res.status).toEqual(400)
        });
    })


    test('Should not create new doctor dont surname', () => {
        const doctor = {
            name: 'DoctorName',
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
                expect(res.body.message).toEqual('Complete name is required');
                expect(res.status).toEqual(400)
            });
    })

    test('Should not create new doctor dont mail', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: ''
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('E-mail is required');
            expect(res.status).toEqual(400)
        });
    })

    test('Should not create new doctor with invalid mail', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctormail.com'
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('E-mail is invalid');
            expect(res.status).toEqual(400)
        });
    })

    test('Should not create new doctor dont password', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctor@mail.com',
            password: ''
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('Password is required');
            expect(res.status).toEqual(400)
        });
    })

    test('Should not create new doctor with weak password', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctor@mail.com',
            password: '1234'
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('Weak password');
            expect(res.status).toEqual(400)
        });
    })

    test('Should not create new doctor dont birthday', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctor@mail.com',
            password: '$Mobr@l123',
            birthday: ''
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('Birthday is required');
            expect(res.status).toEqual(400)
        });
    })

    test('Should not create new doctor with invalid birthday', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctor@mail.com',
            password: '$Mobr@l123',
            birthday: '10/10/2000e'
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('Minimum age must be 18 or invalid date');
            expect(res.status).toEqual(400)
        });
    })

    test('Should not create new doctor with age less than 18 years', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctor@mail.com',
            password: '$Mobr@l123',
            birthday: '10/10/2010'
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('Minimum age must be 18 or invalid date');
            expect(res.status).toEqual(400)
        });
    })


    test('Should not create new doctor dont biologic sex', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctor@mail.com',
            password: '$Mobr@l123',
            birthday: '10/10/2000',
            biologicalSex: ''
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('Biologic sex is required');
            expect(res.status).toEqual(400)
        });
    })

    test('Should not create new doctor with invalid biologic sex', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctor@mail.com',
            password: '$Mobr@l123',
            birthday: '10/10/2000',
            biologicalSex: 'O'
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('Biologic sex is invalid');
            expect(res.status).toEqual(400)
        });
    })

    test('Should not create new doctor dont cpf', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctor@mail.com',
            password: '$Mobr@l123',
            birthday: '10/10/2000',
            biologicalSex: 'M'
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('CPF is required');
            expect(res.status).toEqual(400)
        });
    })

    test('Should not create new doctor with invalid cpf', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctor@mail.com',
            password: '$Mobr@l123',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '1234'
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('CPF is invalid');
            expect(res.status).toEqual(400)
        });
    })

    test('Should not create new doctor dont phone number', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctor@mail.com',
            password: '$Mobr@l123',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '224.334.390-86'
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('Phone number is required');
            expect(res.status).toEqual(400)
        });
    })

    test('Should not create new doctor dont phone number', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctor@mail.com',
            password: '$Mobr@l123',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '224.334.390-86',
            phone: 123
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('Phone number is invalid');
            expect(res.status).toEqual(400)
        });
    })

    test('Should not create new doctor dont specialty', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'doctor@mail.com',
            password: '$Mobr@l123',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '224.334.390-86',
            phone: 99999999999
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('Specialty sex is required');
            expect(res.status).toEqual(400)
        });
    })
});