import request from 'supertest'
import app from '../../src/app.js'
import {connectDB} from "../../src/database/connection.js";
import Patient from "../../src/models/Patient.js";
import {find, findAll, findOne} from "../../src/services/recordService.js";
import PatientRecord from "../../src/models/PatientRecord.js";
import jwt from 'jsonwebtoken'
import {ObjectId} from 'mongodb';
import 'dotenv/config.js'


const SECRET = process.env.SECRET;


beforeAll(async () =>{
    await connectDB();
})

afterAll(async () => {
    await PatientRecord.collection.drop();
})

let token = ''
let recordId = new ObjectId()
const patientId = new ObjectId()
const doctorId = new ObjectId()

describe('Should test record post routes', () => {
    test('Should create new record with success', () => {

        const record = {
            _id: recordId,
            doctorId: doctorId,
            patientId: patientId,
            medicalRecord: {
                anamnese: {
                    complaint: 'complaint field',
                    historyPresentIllness: 'lorem ipsum',
                    historyPreviousIllness: 'lorem ipsum',
                    previousMedications: 'lorem ipsum',
                    allergies: 'lorem ipsum',
                    observations: 'lorem ipsum',
                    othersInformations: 'lorem ipsum'
                },
                prescriptions: {
                    medicines: [{
                        name: 'medicine x',
                        variations: {
                            min: 1,
                            max: 99
                        },
                        value: 80
                    }],
                    exams: [{
                        name: 'exam x'
                    }],
                    otherPrescriptions: 'lorem ipsum'
                }
            },

        }

        const payload = {
            _id: 'Id Doctor',
            name: 'Doctor name',
            mail: 'doctor@mail',
            rule: 'doctor'
        }

        token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

        return request(app).post('/record').send(record).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Record created with success');
            expect(res.status).toEqual(200)
        });
    });

    test('Should not create new record without doctorID', () => {
        const record = {
            patientId: patientId,
            medicalRecord: {
                anamnese: {
                    complaint: 'complaint field',
                    historyPresentIllness: 'lorem ipsum',
                    historyPreviousIllness: 'lorem ipsum',
                    previousMedications: 'lorem ipsum',
                    allergies: 'lorem ipsum',
                    observations: 'lorem ipsum',
                    othersInformations: 'lorem ipsum'
                },
                prescriptions: {
                    medicines: [{
                        name: 'medicine x',
                        variations: {
                            min: 1,
                            max: 99
                        },
                        value: 80
                    }],
                    exams: [{
                        name: 'exam x'
                    }],
                    otherPrescriptions: 'lorem ipsum'
                }
            },

        }

        const payload = {
            _id: 'Id Doctor',
            name: 'Doctor name',
            mail: 'doctor@mail',
            rule: 'doctor'
        }

        token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

        return request(app).post('/record').send(record).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('doctorId is required');
            expect(res.status).toEqual(400)
        });
    });
});


describe('Should test record update routes', function () {
    let record = {
        doctorId: doctorId,
        patientId: patientId,
        medicalRecord: {
            anamnese: {
                complaint: 'complaint field',
                historyPresentIllness: 'lorem ipsum',
                historyPreviousIllness: 'lorem ipsum',
                previousMedications: 'lorem ipsum',
                allergies: 'lorem ipsum',
                observations: 'lorem ipsum',
                othersInformations: 'lorem ipsum'
            },
            prescriptions: {
                medicines: [{
                    name: 'medicine x',
                    variations: {
                        min: 1,
                        max: 99
                    },
                    value: 80
                }],
                exams: [{
                    name: 'exam x'
                }],
                otherPrescriptions: 'lorem ipsum'
            }
        },

    }


    test('Should update record with success', async () => {
        record = await findOne({ _id: recordId});

        const updatedRecord = {
            doctorId: doctorId,
            patientId: patientId,
            medicalRecord: {
                anamnese: {
                    complaint: 'complaint field updated',
                    historyPresentIllness: 'lorem ipsum',
                    historyPreviousIllness: 'lorem ipsum',
                    previousMedications: 'lorem ipsum',
                    allergies: 'lorem ipsum',
                    observations: 'lorem ipsum',
                    othersInformations: 'lorem ipsum'
                },
                prescriptions: {
                    medicines: [{
                        name: 'medicine x',
                        variations: {
                            min: 1,
                            max: 99
                        },
                        value: 80
                    }],
                    exams: [{
                        name: 'exam x'
                    }],
                    otherPrescriptions: 'lorem ipsum'
                }
            },

        }
        return request(app).put(`/record/${record._id}`).send(updatedRecord).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Record updated with success');
            expect(res.status).toEqual(200);
        });
    })
});

describe('Should test record get routes', function () {

    let record = {
        patientId: patientId,
        doctorId: doctorId,
        medicalRecord: {
            anamnese: {
                complaint: 'complaint field',
                historyPresentIllness: 'lorem ipsum',
                historyPreviousIllness: 'lorem ipsum',
                previousMedications: 'lorem ipsum',
                allergies: 'lorem ipsum',
                observations: 'lorem ipsum',
                othersInformations: 'lorem ipsum'
            },
            prescriptions: {
                medicines: [{
                    name: 'medicine x',
                    variations: {
                        min: 1,
                        max: 99
                    },
                    value: 80
                }],
                exams: [{
                    name: 'exam x'
                }],
                otherPrescriptions: 'lorem ipsum'
            }
        },

    }

    const payload = {
        _id: 'Id Doctor',
        name: 'Doctor name',
        mail: 'doctor@mail',
        rule: 'doctor'
    }

    token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

    test('Should not return record dont token', async () => {
        record = await findOne({ _id: recordId});
        return request(app).get(`/record`).then((res) => {
            expect(res.body.message).toEqual('Token is required');
            expect(res.status).toEqual(403);
        });
    });

    test('Should not return record with invalid id', async () => {
        return request(app).get(`/record/231156645465`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Internal server error');
            expect(res.status).toEqual(500);
        });
    });

    test('Should not return record with invalid token', async () => {
        return request(app).get(`/record/${record._id}`).set('Authorization', '').then((res) => {
            expect(res.status).toEqual(403);
            expect(res.body.message).toEqual('Token is required');
        });
    });

    test('Should return record with valid id', async () => {
        return request(app).get(`/record/${record._id}`).set('Authorization', token).then((res) => {
            expect(res.status).toEqual(200);
        });
    });

    test('Should return all patients', async () => {
        return request(app).get(`/record`).set('Authorization', token).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message.length).toBeGreaterThan(0)
        });
    });


    test('Should return all patients', async () => {
        return request(app).get(`/record/patient/${record.patientId}`).set('Authorization', token).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message.length).toBeGreaterThan(0)
        });
    });

});


describe('Should test record delete routes', function () {
    let record = {
        _id: recordId,
        doctorId: doctorId,
        patientId: patientId,
        medicalRecord: {
            anamnese: {
                complaint: 'complaint field',
                historyPresentIllness: 'lorem ipsum',
                historyPreviousIllness: 'lorem ipsum',
                previousMedications: 'lorem ipsum',
                allergies: 'lorem ipsum',
                observations: 'lorem ipsum',
                othersInformations: 'lorem ipsum'
            },
            prescriptions: {
                medicines: [{
                    name: 'medicine x',
                    variations: {
                        min: 1,
                        max: 99
                    },
                    value: 80
                }],
                exams: [{
                    name: 'exam x'
                }],
                otherPrescriptions: 'lorem ipsum'
            }
        },

    }

    const payload = {
        _id: 'Id Doctor',
        name: 'Doctor name',
        mail: 'doctor@mail',
        rule: 'doctor'
    }

    token = jwt.sign(payload, SECRET, {expiresIn: '1h'})

    test('Should not delete record dont id', async () => {
        record = await findOne({ _id: recordId });
        return request(app).delete(`/record/`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Route not found!');
            expect(res.status).toEqual(404);
        });
    });

    test('Should not delete record with invalid id', async () => {
        return request(app).delete(`/record/231156645465`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Internal server error');
            expect(res.status).toEqual(500);
        });
    });

    test('Should not delete record dont valid token', async () => {
        return request(app).delete(`/record/${record._id}`).set('Authorization', '').then((res) => {
            expect(res.body.message).toEqual('Token is required');
            expect(res.status).toEqual(403);
        });
    });

    test('Should delete record with valid id', async () => {
        return request(app).delete(`/record/${record._id}`).set('Authorization', token).then((res) => {
            expect(res.body.message).toEqual('Record deleted with success');
            expect(res.status).toEqual(200);
        });
    });
});
