import request from 'supertest'
import app from '../../src/app.js'
import {connectDB} from "../../src/database/connection.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'
import Exam from "../../src/models/Exam.js";


const SECRET = process.env.SECRET;


beforeAll(async () =>{
    await connectDB();
})

afterAll(async () => {
    await Exam.collection.drop();
})

let token = ''



describe('Should test exam  post routes', () => {
    test('Should create new exam with success', () => {

        const exam = {
            name: 'Exame A',
            min: 0,
            max: 100
        }

        const payload = {
            _id: 'Id Doctor',
            name: 'Doctor name',
            mail: 'doctor@mail',
            rule: 'doctor'
        }

        token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

        return request(app).post('/exam').send(exam).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Exam created with success');
            expect(res.status).toEqual(200)
        });
    });

    test('Should not create new record without doctorID', () => {
        const exam = {
            main: 0,
            max: 100
        }

        const payload = {
            _id: 'Id Doctor',
            name: 'Doctor name',
            mail: 'doctor@mail',
            rule: 'doctor'
        }

        token = jwt.sign(payload, SECRET, {expiresIn: '1h'})
        return request(app).post('/exam').send(exam).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Name is required');
            expect(res.status).toEqual(400)
        });
    });
});
