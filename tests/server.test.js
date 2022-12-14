const app = require('../server/app')
const request = require('supertest')

describe('Server tests', () => {
    test('Main page', async () => {
        const response = await request(app).get('/').send()
        expect(response.statusCode).toBe(200)
    })

    test('Participant page', async () => {
        const response = await request(app).get('/participant').send()
        expect(response.statusCode).toBe(301)
    })

    test('Coord_cursos page', async () => {
        const response = await request(app).get('/coordcursos').send()
        expect(response.statusCode).toBe(301)
    })

    test('Coord_recursos page', async () => {
        const response = await request(app).get('/coordrecursos').send()
        expect(response.statusCode).toBe(301)
    })
})