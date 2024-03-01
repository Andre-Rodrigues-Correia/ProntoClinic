import request from 'supertest'
import app from '../../src/app.js'
import {connectDB} from "../../src/database/connection.js";
import Doctor from "../../src/models/Doctor.js";
import Clinic from "../../src/models/Clinic.js";
import {findOne} from "../../src/services/doctorService.js";

beforeAll(async () =>{
    await connectDB();
});

afterAll(async () => {
    await Doctor.collection.drop();
    await Clinic.collection.drop()
});


describe('Should test auth signin router', function () {
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

    test('Should create new doctor with success in auth signup route', async() => {
        return request(app).post('/auth/signup-doctor').send(doctor).then((res) => {
            expect(res.body.message).toEqual('Doctor and Clinic created with success');
            expect(res.status).toEqual(200)
        });
    })
});

describe('Should test auth signin router', function () {

    test('should not must log in with with incorrect mail', async ()=> {
        return request(app).post('/auth/signin-doctor').send({
            mail: 'andre.correia@gmail.com',
            password: '$Mobr@l123'
        }).then((res) => {
            expect(res.status).toEqual(404)
            expect(res.body.message).toEqual('Doctor not found')
        })
    })

    test('should not must log in with with incorrect password', async ()=> {
        return request(app).post('/auth/signin-doctor').send({
            mail: 'andre.correia.testes@gmail.com',
            password: '$Mobr@l123..'
        }).then((res) => {
            expect(res.status).toEqual(403)
            expect(res.body.message).toEqual('Incorrect password')
    })
    })

    test('should must log in with succcess', async ()=> {
        return request(app).post('/auth/signin-doctor').send({
            mail: 'andre.correia.testes@gmail.com',
            password: '$Mobr@l123'
        }).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('token')
        })
    })
});