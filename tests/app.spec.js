import request from 'supertest'
import app from '../src/app.js'


test('should reponse in source', () => {
    return request(app).get('/')
        .then((res) => {
            expect(res.body.message).toEqual('Route not found!');
        });
});