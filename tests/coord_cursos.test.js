const Coord_cursos = require('../server/classes/coord_cursos')

describe('Test de la clase Participante', () => {
    test('Añadir un curso (datos correctos)', async () => {
        let cc = new Coord_cursos(92943376, 'Emilio', 'i12gonee@uco.es', 'emiliocc')
        const funcion = await cc.añadir_curso('curso', '2023-09-01', '2023-10-01', 40, 20, 'ponente', 'descripcion', 'aula')
        expect(funcion).toBe(true)
    })

    test('Añadir un curso (datos incorrectos)', async () => {
        let cc = new Coord_cursos(92943376, 'Emilio', 'i12gonee@uco.es', 'emiliocc')
        const funcion = await cc.añadir_curso('2023-09-01', '2023-10-01', 40, 20, 'ponente', 'descripcion', 'aula') //FALTAN DATOS
        expect(funcion).toBe(false)
    })

    test('Editar un curso (datos correctos)', async () => {
        let cc = new Coord_cursos(92943376, 'Emilio', 'i12gonee@uco.es', 'emiliocc')
        const funcion = await cc.editar_curso('nuevo curso', 'antiguo curso','2023-09-01', '2023-10-01', 40, 20, 'ponente', 'descripcion', 'aula')
        expect(funcion).toBe(true)
    })

    test('Editar un curso (datos incorrectos)', async () => {
        let cc = new Coord_cursos(92943376, 'Emilio', 'i12gonee@uco.es', 'emiliocc')
        const funcion = await cc.editar_curso('2023-09-01', '2023-10-01', 40, 20, 'ponente', 'descripcion', 'aula') //FALTAN DATOS
        expect(funcion).toBe(false)
    })

    test('Eliminar un curso (datos correctos)', async () => {
        let cc = new Coord_cursos(92943376, 'Emilio', 'i12gonee@uco.es', 'emiliocc')
        const funcion = await cc.eliminar_curso(12347865)
        expect(funcion).toBe(true)
    })

    test('Eliminar un curso (datos incorrectos)', async () => {
        let cc = new Coord_cursos(92943376, 'Emilio', 'i12gonee@uco.es', 'emiliocc')
        const funcion = await cc.eliminar_curso() //NO RECIBE DATOS
        expect(funcion).toBe(false)
    })
})