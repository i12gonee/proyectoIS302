import Participante from '../classes/participante.js'
import Curso from '../classes/curso.js'

let participante = new Participante("dfgvhbjn", "fghj", "fcgvhbj", "drfghj")
let curso1 = new Curso("1", "23456", "esdrftgyhuj", 4, "poi", "jhvgcf", "ghjk", "gvhbjnkml")
let curso2 = new Curso("2", "23456", "esdrftgyhuj", 4, "poi", "jhvgcf", "ghjk", "gvhbjnkml")

//console.log(curso)
//console.log(participante)

participante.inscribirse_en_curso(curso1)
participante.inscribirse_en_curso(curso2)


participante.ver_historial_cursos()