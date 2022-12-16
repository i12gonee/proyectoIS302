const Participante = require('../server/classes/participante')

describe('Test de la clase Participante', () => {
    test('Incribirse en un curso (datos correctos)', async () => {
        let p = new Participante(18423531, 'Pilar', 'Vivas', 'pilar@uco.es', 'gtnyj', 12347865)
        const funcion = await p.inscribirse_curso()
        expect(funcion).toBe(true)
    })

    test('Incribirse en un curso (datos incorrectos)', async () => {
        let p = new Participante('Pilar', 'Vivas', 'pilar@uco.es', 'gtnyj', 12347865) //FALTA DNI
        const funcion = await p.inscribirse_curso()
        expect(funcion).toBe(false)
    })

    test('Darse de alta en un curso (datos correctos)', async () => {
        let p = new Participante(18423531, 'Pilar', 'Vivas', 'pilar@uco.es', 'gtnyj', 12347865)
        const funcion = await p.darse_de_alta_curso()
        expect(funcion).toBe(true)
    })

    test('Darse de alta en un curso (datos incorrectos)', async () => {
        let p = new Participante('Pilar', 'Vivas', 'pilar@uco.es', 'gtnyj', 12347865) //FALTA DNI
        const funcion = await p.inscribirse_curso()
        expect(funcion).toBe(false)
    })
})