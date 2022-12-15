const functions = require('../functions/functions')

class Curso{
    #id_curso_
    #nombre_curso_
    #fecha_inicio_
    #fecha_final_
    #max_inscripciones_
    #precio_
    #ponentes_
    #descripcion_
    #aula_
    #id_cc_

    constructor(nombre_curso, fecha_inicio, fecha_final, max_inscripciones, precio, ponentes, descripcion, aula, id_cc){
        this.#id_curso_ = functions.generate_id()
        this.#nombre_curso_ = nombre_curso
        this.#fecha_inicio_ = fecha_inicio
        this.#fecha_final_ = fecha_final
        this.#max_inscripciones_ = max_inscripciones
        this.#precio_ = precio
        this.#ponentes_ = ponentes
        this.#descripcion_ = descripcion
        this.#aula_ = aula
        this.#id_cc_ = id_cc
    }

    get id_curso(){return this.#id_curso_}
    get nombre_curso(){return this.#nombre_curso_}
    get fecha_inicio(){return this.#fecha_inicio_}
    get fecha_final(){return this.#fecha_final_}
    get max_inscripciones(){return this.#max_inscripciones_}
    get precio(){return this.#precio_}
    get ponentes(){return this.#ponentes_}
    get descripcion(){return this.#descripcion_}
    get aula(){return this.#aula_}
    get id_cc(){return this.#id_cc_}

    set id_curso(id_curso){this.#id_curso_ = id_curso}
    set nombre_curso(nombre_curso){this.#nombre_curso_ = nombre_curso}
    set fecha_inicio(fecha_inicio){this.#fecha_inicio_ = fecha_inicio}
    set fecha_final(fecha_final){this.#fecha_final_ = fecha_final}
    set max_inscripciones(max_inscripciones){this.#max_inscripciones_ = max_inscripciones}
    set precio(precio){this.#precio_ = precio}
    set ponentes(ponentes){this.#ponentes_ = ponentes}
    set descripcion(descripcion){this.#descripcion_ = descripcion}
    set aula(aula){this.#aula_ = aula}
    set id_cc(id_cc){this.#id_cc_ = id_cc}
}

module.exports = Curso