import request from 'supertest'
import app from '../../src/app.js'
import {connectDB} from "../../src/database/connection.js";
import Patient from "../../src/models/Patient.js";
import {findOne} from "../../src/services/patientService.js";
import jwt from 'jsonwebtoken'
import {ObjectId} from 'mongodb';
import 'dotenv/config.js'

const SECRET = process.env.SECRET;


beforeAll(async () =>{
    await connectDB();
})

afterAll(async () => {
    await Patient.collection.drop();
})

let token = ''


describe('Should test patient post routes', () => {
    test('Should create new patient with success', () => {
        const clinicId = new ObjectId()

        const patient = {
            name: 'DoctorName DoctorSurname',
            mail: 'andre.correia.testes@gmail.com',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '224.334.390-86',
            phone: 99999999999,
            clinic: clinicId
        }

        const payload = {
            _id: 'Id Doctor',
            name: 'Doctor name',
            mail: 'doctor@mail',
            rule: 'doctor'
        }

        token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

        return request(app).post('/patient').send(patient).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Patient created with success');
            expect(res.status).toEqual(200)
        });
    });


    test('Should create new patient without permission', () => {
        const clinicId = new ObjectId()

        const patient = {
            name: 'DoctorName DoctorSurname',
            mail: 'andre.correia.testes@gmail.com',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '224.334.390-86',
            phone: 99999999999,
            clinic: clinicId
        }

        const payload = {
            _id: 'Id Doctor',
            name: 'Doctor name',
            mail: 'doctor@mail',
            rule: ''
        }

        token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

        return request(app).post('/patient').send(patient).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Dont permission for this content');
            expect(res.status).toEqual(403)
        });
    });

    test('Should not create new patient with invalid Name', () => {
        const clinicId = new ObjectId()

        const patient = {
            name: 'PatientDontSurname',
            mail: 'andre.correia.testes@gmail.com',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '224.334.390-86',
            phone: 99999999999,
            clinic: clinicId
        }

        const payload = {
            _id: 'Id Doctor',
            name: 'Doctor name',
            mail: 'doctor@mail',
            rule: 'doctor'
        }

        token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

        return request(app).post('/patient').send(patient).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Complete name is required');
            expect(res.status).toEqual(400)
        });
    })

    test('Should not create new patient with invalid mail', () => {
        const clinicId = new ObjectId()

        const patient = {
            name: 'PatientName PatientSurname',
            mail: 'andre.correia.testes#gmail.com',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '224.334.390-86',
            phone: 99999999999,
            clinic: clinicId
        }

        const payload = {
            _id: 'Id Doctor',
            name: 'Doctor name',
            mail: 'doctor@mail',
            rule: 'doctor'
        }

        token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

        return request(app).post('/patient').send(patient).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('E-mail is invalid');
            expect(res.status).toEqual(400)
        });
    });

    test('Should not create new patient with invalid biologicalsex', () => {
        const clinicId = new ObjectId()

        const patient = {
            name: 'PatientName PatientSurname',
            mail: 'andre.correia.testes@gmail.com',
            birthday: '10/10/2000',
            biologicalSex: 'O',
            cpf: '224.334.390-86',
            phone: 99999999999,
            clinic: clinicId
        }

        const payload = {
            _id: 'Id Doctor',
            name: 'Doctor name',
            mail: 'doctor@mail',
            rule: 'doctor'
        }

        token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

        return request(app).post('/patient').send(patient).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Biologic sex is invalid');
            expect(res.status).toEqual(400)
        });
    });


    test('Should not create new patient without birthday', () => {
        const clinicId = new ObjectId()

        const patient = {
            name: 'PatientName PatientSurname',
            mail: 'andre.correia.testes@gmail.com',
            biologicalSex: 'M',
            cpf: '224.334.390-86',
            phone: 99999999999,
            clinic: clinicId
        }

        const payload = {
            _id: 'Id Doctor',
            name: 'Doctor name',
            mail: 'doctor@mail',
            rule: 'doctor'
        }

        token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

        return request(app).post('/patient').send(patient).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Birthday is required');
            expect(res.status).toEqual(400)
        });
    });

    test('Should not create new patient with CPF', () => {
        const clinicId = new ObjectId()

        const patient = {
            name: 'PatientName PatientSurname',
            mail: 'andre.correia.testes@gmail.com',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '224.334.390-8',
            phone: 99999999999,
            clinic: clinicId
        }

        const payload = {
            _id: 'Id Doctor',
            name: 'Doctor name',
            mail: 'doctor@mail',
            rule: 'doctor'
        }

        token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

        return request(app).post('/patient').send(patient).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('CPF is invalid');
            expect(res.status).toEqual(400)
        });
    });
});



describe('Should test patient update routes', function () {
    const clinicId = new ObjectId()

    let patient = {
        name: 'PatientName PatientSurname',
        mail: 'andre.correia.testes@gmail.com',
        biologicalSex: 'M',
        birthday: '10/10/2000',
        cpf: '224.334.390-86',
        phone: 99999999999,
        clinic: clinicId
    }



    test('Should not update dont surname', async () => {

        patient = await findOne({ mail: patient.mail });

        const payload = {
            _id: 'Id Doctor',
            name: 'Doctor name',
            mail: 'doctor@mail',
            rule: 'doctor'
        }

        token = jwt.sign(payload, SECRET, {expiresIn: '1h'})


        const updatedPatient = {
            name: 'PatientNameUpdate',
            mail: 'andre.correia.testes@gmail.com',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '224.334.390-86',
            phone: 99999999999,
            clinic: clinicId
        }
        return request(app).put(`/patient/${patient._id}`).send(updatedPatient).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Complete name is required');
            expect(res.status).toEqual(400)
        });
    });

    test('Should update patient with success', async () => {
        patient = await findOne({ mail: patient.mail });

        const updatedPatient = {
            name: 'PatientName patientSurname',
            mail: 'andre.correia.testes@gmail.com',
            birthday: '10/10/2000',
            biologicalSex: 'M',
            cpf: '224.334.390-86',
            phone: 99999999999,
            clinic: clinicId
        }
        return request(app).put(`/patient/${patient._id}`).send(updatedPatient).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Patient updated with success');
            expect(res.status).toEqual(200);
        });
    })
});


describe('Should test patient get routes', function () {
    const clinicId = new ObjectId()

    let patient = {
        name: 'PatientName PatientSurname',
        mail: 'andre.correia.testes@gmail.com',
        biologicalSex: 'M',
        birthday: '10/10/2000',
        cpf: '224.334.390-86',
        phone: 99999999999,
        clinic: clinicId
    }

    const payload = {
        _id: 'Id Doctor',
        name: 'Doctor name',
        mail: 'doctor@mail',
        rule: 'doctor'
    }

    token = jwt.sign(payload, SECRET, {expiresIn: '1h'});

    test('Should not return patient dont id', async () => {
        patient = await findOne({ mail: patient.mail });
        return request(app).get(`/patien`).then((res) => {
            expect(res.body.message).toEqual('Route not found!');
            expect(res.status).toEqual(404);
        });
    });

    test('Should not return patient with invalid id', async () => {
        patient = await findOne({ mail: patient.mail });
        return request(app).get(`/patient/231156645465`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Internal server error');
            expect(res.status).toEqual(500);
        });
    });

    test('Should not return patient with invalid token', async () => {
        patient = await findOne({ mail: patient.mail });
        return request(app).get(`/patient/${patient._id}`).set('Authorization', '').then((res) => {
            expect(res.status).toEqual(403);
            expect(res.body.message).toEqual('Token is required');
        });
    });

    test('Should return patient with valid id', async () => {
        patient = await findOne({ mail: patient.mail });
        return request(app).get(`/patient/${patient._id}`).set('Authorization', token).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message.mail).toEqual(patient.mail);
        });
    });

    test('Should return all patients', async () => {
        return request(app).get(`/patient`).set('Authorization', token).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message.length).toBeGreaterThan(0)
        });
    });

});

describe('Should test patient delete routes', function () {
    const clinicId = new ObjectId()

    let patient = {
        name: 'PatientName PatientSurname',
        mail: 'andre.correia.testes@gmail.com',
        biologicalSex: 'M',
        birthday: '10/10/2000',
        cpf: '224.334.390-86',
        phone: 99999999999,
        clinic: clinicId
    }

    const payload = {
        _id: 'Id Doctor',
        name: 'Doctor name',
        mail: 'doctor@mail',
        rule: 'doctor'
    }

    token = jwt.sign(payload, SECRET, {expiresIn: '1h'});

    test('Should not delete patient dont id', async () => {
        patient = await findOne({ mail: patient.mail });
        return request(app).delete(`/patient/`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Route not found!');
            expect(res.status).toEqual(404);
        });
    });

    test('Should not delete patient with invalid id', async () => {
        return request(app).delete(`/patient/231156645465`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Internal server error');
            expect(res.status).toEqual(500);
        });
    });

    test('Should not delete patient dont valid token', async () => {
        return request(app).delete(`/patient/${patient._id}`).set('Authorization', '').then((res) => {
            expect(res.body.message).toEqual('Token is required');
            expect(res.status).toEqual(403);
        });
    });

    test('Should delete patient with valid id', async () => {
        return request(app).delete(`/patient/${patient._id}`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Patient deleted with success');
            expect(res.status).toEqual(200);
        });
    });
});


