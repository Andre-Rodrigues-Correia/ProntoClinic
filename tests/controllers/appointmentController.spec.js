import request from 'supertest'
import app from '../../src/app.js'
import {connectDB} from "../../src/database/connection.js";
import {find, findAll, findOne} from "../../src/services/appointmentsService.js";
import Appointment from "../../src/models/Appointment.js";
import jwt from 'jsonwebtoken'
import {ObjectId} from 'mongodb';
import 'dotenv/config.js'
import {Schema} from "mongoose";


const SECRET = process.env.SECRET;


beforeAll(async () =>{
    await connectDB();
})

afterAll(async () => {
    await Appointment.collection.drop();
})

let token = ''
let appointmentId = new ObjectId()
let patientId = new ObjectId()
let doctorId = new ObjectId()
let clinicId = new ObjectId()
let recordId = new ObjectId()
describe('Should test appointment post routes', () => {
    test('Should create new appointment with success', () => {

        const appointment = {
            _id: appointmentId,
            patientId: patientId,
            doctorId: doctorId,
            clinicId: clinicId,
            record: recordId,
            status: 'onHold',
            date: new Date(),
            local: clinicId,
        }

        const payload = {
            _id: 'Id Doctor',
            name: 'Doctor name',
            mail: 'doctor@mail',
            rule: 'doctor'
        }

        token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

        return request(app).post('/appointment').send(appointment).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Appointment created with success');
            expect(res.status).toEqual(200)
        });
    });

    test('Should not create new appointment without doctorID', () => {
        const appointment = {
            _id: appointmentId,
            patientId: patientId,
            clinicId: clinicId,
            record: recordId,
            status: 'onHold',
            date: new Date(),
            local: clinicId,
        }

        const payload = {
            _id: 'Id Doctor',
            name: 'Doctor name',
            mail: 'doctor@mail',
            rule: 'doctor'
        }

        return request(app).post('/appointment').send(appointment).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('doctorId is required');
            expect(res.status).toEqual(400)
        });
    });
});


describe('Should test record update routes', function () {
    let appointment = {
        _id: appointmentId,
        patientId: patientId,
        doctorId: doctorId,
        clinicId: clinicId,
        record: recordId,
        status: 'onHold',
        date: new Date(),
        local: clinicId,
    }

    const payload = {
        _id: 'Id Doctor',
        name: 'Doctor name',
        mail: 'doctor@mail',
        rule: 'doctor'
    }

    token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

    test('Should update record with success', async () => {
        appointment = await findOne({ _id: appointmentId});

        let appointmentUpdated = {
            _id: appointmentId,
            patientId: patientId,
            doctorId: doctorId,
            clinicId: clinicId,
            record: recordId,
            status: 'confirmed',
            date: new Date(),
            local: clinicId,
        }
        return request(app).put(`/appointment/${appointment._id}`).send(appointmentUpdated).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Appointment updated with success');
            expect(res.status).toEqual(200);
        });
    })
});

describe('Should test appointment get routes', function () {

    let appointment = {
        _id: appointmentId,
        patientId: patientId,
        doctorId: doctorId,
        clinicId: clinicId,
        record: recordId,
        status: 'onHold',
        date: new Date(),
        local: clinicId,
    }

    const payload = {
        _id: 'Id Doctor',
        name: 'Doctor name',
        mail: 'doctor@mail',
        rule: 'doctor'
    }

    token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

    test('Should not return appoint dont token', async () => {
        return request(app).get(`/appointment`).then((res) => {
            expect(res.body.message).toEqual('Token is required');
            expect(res.status).toEqual(403);
        });
    });

    test('Should not return appointment with invalid id', async () => {
        return request(app).get(`/appointment/231156645465`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Internal server error');
            expect(res.status).toEqual(500);
        });
    });

    test('Should not return appointment with invalid token', async () => {
        return request(app).get(`/appointment/${appointment._id}`).set('Authorization', '').then((res) => {
            expect(res.status).toEqual(403);
            expect(res.body.message).toEqual('Token is required');
        });
    });

    test('Should return appointment with valid id', async () => {
        return request(app).get(`/appointment/${appointment._id}`).set('Authorization', token).then((res) => {
            expect(res.status).toEqual(200);
        });
    });

    test('Should return all patients', async () => {
        return request(app).get(`/appointment`).set('Authorization', token).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message.length).toBeGreaterThan(0)
        });
    });


    test('Should return all patients', async () => {
        return request(app).get(`/appointment/patient/${appointment.patientId}`).set('Authorization', token).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message.length).toBeGreaterThan(0)
        });
    });

});


describe('Should test appointment delete routes', function () {
    let appointment = {
        _id: appointmentId,
        patientId: patientId,
        doctorId: doctorId,
        clinicId: clinicId,
        record: recordId,
        status: 'onHold',
        date: new Date(),
        local: clinicId,
    }

    const payload = {
        _id: 'Id Doctor',
        name: 'Doctor name',
        mail: 'doctor@mail',
        rule: 'doctor'
    }

    token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

    test('Should not delete appointment dont id', async () => {
        appointment = await findOne({ _id: appointmentId });
        return request(app).delete(`/appointment/`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Route not found!');
            expect(res.status).toEqual(404);
        });
    });

    test('Should not delete appointment with invalid id', async () => {
        return request(app).delete(`/appointment/231156645465`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Internal server error');
            expect(res.status).toEqual(500);
        });
    });

    test('Should not delete appointment dont valid token', async () => {
        return request(app).delete(`/appointment/${appointment._id}`).set('Authorization', '').then((res) => {
            expect(res.body.message).toEqual('Token is required');
            expect(res.status).toEqual(403);
        });
    });

    test('Should delete record with valid id', async () => {
        return request(app).delete(`/appointment/${appointment._id}`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Appointment deleted with success');
            expect(res.status).toEqual(200);
        });
    });
});
