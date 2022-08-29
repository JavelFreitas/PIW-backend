const request = require('supertest');
const app = require('../index');

const user_url = '/usuarios'

describe("post '/' - Create User", () => {
    it("should respond with 200 status code", async () => {
        const response = await request(app).post(`${user_url}`).send({
            id: 1,
            name: 'name', 
            email: 'email@gmail.com', 
            senha: '123'
        });

        expect(response.statusCode).toBe(200);
    })
})