import request from 'supertest'
import app from '../src/app'

// beforeAll(async () => await db.connect());
// afterEach(async () => await db.clear());
// afterAll(async () => await db.close());


describe("GET /api/v1/todos", () => {
    it('responds with an array of todos', async () => {
        const response = await request(app)
            .get('/api/v1/todos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        expect(response.body).toHaveProperty('length')
    })
})

describe("POST /api/v1/todos with invalid req body", () => {
    it('It should respond with an error if the todo is invalid', async () => {
        const response = await request(app)
            .post('/api/v1/todos')
            .set('Accept', 'application/json')
            .send({ content: '' })
            .expect('Content-Type', /json/)
            .expect(422)
        expect(response.body).toHaveProperty('message')
    })
    it('It should respond with an inserted One result', async () => {
        const response = await request(app)
            .post('/api/v1/todos')
            .set('Accept', 'application/json')
            .send({ content: 'API test todo' })
            .expect('Content-Type', /json/)
            .expect(201)
        expect(response.body).toHaveProperty('_id')
        expect(response.body).toHaveProperty('content')
        expect(response.body.content).toBe("API test todo")
    })
})

describe("GET /api/v1/todos/:id correct body", () => {
    it('It should respond with an 422 error as Id passed is not a valid ObjectId', async () => {
        const response = await request(app)
            .get('/api/v1/todos/1234')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)
        expect(response.body).toHaveProperty('message')
    })
    it('It should respond with an 404 error', async () => {
        const response = await request(app)
            .get('/api/v1/todos/65be8bcb84b81d67caf3f54b')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
        expect(response.body).toHaveProperty('message')
    })
    it('It should respond with an Todo', async () => {
        const response = await request(app)
            .get('/api/v1/todos/65be8bbb74b85d67caf3f54b')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        expect(response.body).toHaveProperty('_id')
        expect(response.body).toHaveProperty('content')
        expect(response.body.content).toBe('test ById todo')
        expect(response.body._id).toBe('65be8bbb74b85d67caf3f54b')
    })
})

describe("PUT /api/v1/todos/:id", () => {
    it("should return 200 with the new updates", async () => {
        const response = await request(app)
            .put('/api/v1/todos/65be8bbb74b85d67caf3f54b')
            .set('Accept', 'application/json')
            .send({ done: 'true' })
            .expect('Content-type', /json/)
            .expect(200)
        // expect()
    })
})

