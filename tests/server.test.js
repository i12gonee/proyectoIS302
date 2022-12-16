const app = require('../server/routes/routes')
const request = require('supertest')

describe('GET responses', () => {
    test('Main page', async () => {
        const response = await request(app).get('/').send()
        expect(response.statusCode).toBe(200)
    })

    test('Participante page', async () => {
        const response = await request(app).get('/participant').type('text/html')
        expect(response.text).toBeDefined();
    })

    test('Coord_cursos page', async () => {
        const response = await request(app).get('/coordcursos').type('text/html')
        expect(response.text).toBeDefined();
    })

    test('Coord_recursos page', async () => {
        const response = await request(app).get('/coordrecursos').type('text/html')
        expect(response.text).toBeDefined();
    })

    test('Login page', async () => {
        const response = await request(app).get('/login_page').type('text/html')
        expect(response.text).toBeDefined();
    })

    test('Register page', async () => {
        const response = await request(app).get('/register_page').type('text/html')
        expect(response.text).toBeDefined();
    })
})