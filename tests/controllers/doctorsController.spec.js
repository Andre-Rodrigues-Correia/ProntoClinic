import request from 'supertest'
import app from '../../src/app.js'
import {connectDB} from "../../src/database/connection.js";
import Doctor from "../../src/models/Doctor.js";
import Clinic from "../../src/models/Clinic.js";
import {findOne, save} from "../../src/services/doctorService.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'

const SECRET = process.env.SECRET;

beforeAll(async () =>{
    await connectDB();
})

afterAll(async () => {
    await Doctor.collection.drop();
    await Clinic.collection.drop()
})

let token = ''

describe('Should test doctor post route', function () {

    test('Should create new doctor with success', () => {

        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'andre.correia.testes@gmail.com',
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
            mail: 'andre.correia.testes@gmail.com',
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
            mail: 'doctorprontotestesemerrorouchancemail.com'
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('E-mail is invalid');
            expect(res.status).toEqual(400)
        });
    })

    test('Should not create new doctor dont password', () => {
        const doctor = {
            name: 'DoctorName DoctorSurname',
            mail: 'andre.correia.testes@gmail.com',
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
            mail: 'andre.correia.testes@gmail.com',
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
            mail: 'andre.correia.testes@gmail.com',
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
            mail: 'andre.correia.testes@gmail.com',
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
            mail: 'andre.correia.testes@gmail.com',
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
            mail: 'andre.correia.testes@gmail.com',
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
            mail: 'andre.correia.testes@gmail.com',
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
            mail: 'andre.correia.testes@gmail.com',
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
            mail: 'andre.correia.testes@gmail.com',
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
            mail: 'andre.correia.testes@gmail.com',
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
            mail: 'andre.correia.testes@gmail.com',
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
            mail: 'andre.correia.testes@gmail.com',
            password: '$Mobr@l123',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '224.334.390-86',
            phone: 99999999999
        }
        return request(app).post('/doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('Specialty is required');
            expect(res.status).toEqual(400)
        });
    })
});


describe('Should test doctor update routes', function () {
    let doctor = {
        name: 'DoctorNameUpdate DoctorSurnameUpdate',
        mail: 'andre.correia.testes@gmail.com',
        password: '$Mobr@l123',
        birthday: '10/10/2000',
        biologicalSex: 'M',
        cpf: '584.640.230-57',
        specialty: 'specialty',
        phone: 99999999997,
    }


    test('Should not update dont surname', async () => {
        doctor = await findOne({ mail: doctor.mail });

        const payload = {
            _id: doctor._id,
            name: doctor.name,
            mail: doctor.mail,
            rule: 'doctor'
        }

        token = jwt.sign(payload, SECRET, {expiresIn: '1h'})


        const updatedDoctor = {
            name: 'DoctorNameUpdate',
            mail: 'andre.correia.testes@gmail.com',
            password: '$Mobr@l123',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '584.640.230-57',
            specialty: 'specialty updated',
            phone: 99999999997,
        }
        return request(app).put(`/doctor/${doctor._id}`).send(updatedDoctor).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Complete name is required');
            expect(res.status).toEqual(400)
        });
    });


    test('Should update doctor with success', async () => {
        doctor = await findOne({ mail: doctor.mail });
        const updatedDoctor = {
            name: 'DoctorNameUpdate SurnameUpdate',
            mail: 'andre.correia.testes@gmail.com',
            password: '$Mobr@l123',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '584.640.230-57',
            specialty: 'specialty updated',
            phone: 99999999997,
        }
        return request(app).put(`/doctor/${doctor._id}`).send(updatedDoctor).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Doctor updated with success');
            expect(res.status).toEqual(200);
        });
    })
});


describe('Should test doctor get routes', function () {
    let doctor = {
        name: 'Doctor getDoctor',
        mail: 'andre.correia.testes@gmail.com',
        password: '$Mobr@l123',
        birthday: '10/10/2000',
        biologicalSex: 'M',
        cpf: '517.908.300-10',
        specialty: 'specialty',
        phone: 89999999997,
    }

    test('Should not return doctor dont id', async () => {
        doctor = await findOne({ mail: doctor.mail });
        return request(app).get(`/doctor/`).then((res) => {
            expect(res.body.message).toEqual('Route not found!');
            expect(res.status).toEqual(404);
        });
    });

    test('Should not return doctor with invalid id', async () => {
        doctor = await findOne({ mail: doctor.mail });
        return request(app).get(`/doctor/231156645465`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Internal server error');
            expect(res.status).toEqual(500);
        });
    });

    test('Should not return doctor with invalid token', async () => {
        doctor = await findOne({ mail: doctor.mail });
        return request(app).get(`/doctor/${doctor._id}`).set('Authorization', '').then((res) => {
            console.log(res.body)
            expect(res.status).toEqual(403);
            expect(res.body.message).toEqual('Token is required');
        });
    });

    test('Should return doctor with valid id', async () => {
        doctor = await findOne({ mail: doctor.mail });
        return request(app).get(`/doctor/${doctor._id}`).set('Authorization', token).then((res) => {
            console.log(res.body)
            expect(res.status).toEqual(200);
            expect(res.body.message.mail).toEqual(doctor.mail);
        });
    });
});

describe('Should test validate mail route', function () {
    test('Should not validate mail with incorrect code', async () => {
        return request(app).post(`/doctor/activate`).send({
            mail: 'andre.correia.testes@gmail.com',
            code: '1234'
        }).then((res) => {
            expect(res.body.message).toEqual('Not possible validate account');
            expect(res.status).toEqual(500);
        });
    });


    test('Should validate mail with correct code', async () => {
        const doctor = await findOne({ mail: 'andre.correia.testes@gmail.com'});
        return request(app).post(`/doctor/activate`).send({
            mail: 'andre.correia.testes@gmail.com',
            code: doctor.statusCode
        }).then((res) => {
            expect(res.body.message).toEqual('Account activated with success');
            expect(res.status).toEqual(200);
        });
    });
});



describe('Should test doctor delete routes', function () {
    let doctor = {
        name: 'Doctor delete',
        mail: 'andre.correia.testes@gmail.com',
        password: '$Mobr@l123',
        birthday: '10/10/2000',
        biologicalSex: 'M',
        cpf: '160.053.220-95',
        specialty: 'specialty',
        phone: 59999999997,
    }

    test('Should not delete doctor dont id', async () => {
        doctor = await findOne({ mail: doctor.mail });
        return request(app).delete(`/doctor/`).then((res) => {
            expect(res.body.message).toEqual('Route not found!');
            expect(res.status).toEqual(404);
        });
    });

    test('Should not delete doctor with invalid id', async () => {
        return request(app).delete(`/doctor/231156645465`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Internal server error');
            expect(res.status).toEqual(500);
        });
    });

    test('Should not delete doctor dont valid token', async () => {
        return request(app).delete(`/doctor/${doctor._id}`).set('Authorization', '').then((res) => {
            expect(res.body.message).toEqual('Token is required');
            expect(res.status).toEqual(403);
        });
    });

    test('Should delete doctor with valid id', async () => {
        return request(app).delete(`/doctor/${doctor._id}`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Doctor deleted with success');
            expect(res.status).toEqual(200);
        });
    });
});
