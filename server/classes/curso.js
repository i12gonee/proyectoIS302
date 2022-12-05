class Curso{
    #id_curso_
    #nombre_curso_
    #fecha_inicio_
    #fecha_final_
    #n_inscripciones_
    #ponentes_
    #descripcion_
    #aula_
    #recursos_

    constructor(id_curso, nombre_curso, fecha_inicio, fecha_final, n_inscripciones, ponentes, descripcion, aula, recursos,){
        this.#id_curso_ = id_curso
        this.#nombre_curso_ = nombre_curso
        this.#fecha_inicio_ = fecha_inicio
        this.#fecha_final_ = fecha_final
        this.#n_inscripciones_ = n_inscripciones
        this.#ponentes_ = ponentes
        this.#descripcion_ = descripcion
        this.#aula_ = aula
        this.#recursos_ = recursos
    }

    get id_curso(){return this.#id_curso_}
    get nombre_curso(){return this.#nombre_curso_}
    get fecha_inicio(){return this.#fecha_inicio_}
    get fecha_final(){return this.#fecha_final_}
    get n_inscripciones(){return this.#n_inscripciones_}
    get ponentes(){return this.#ponentes_}
    get descripcion(){return this.#descripcion_}
    get aula(){return this.#aula_}
    get recursos(){return this.#recursos_}

    set id_curso(id_curso){this.#id_curso_ = id_curso}
    set nombre_curso(nombre_curso){this.#nombre_curso_ = nombre_curso}
    set fecha_inicio(fecha_inicio){this.#fecha_inicio_ = fecha_inicio}
    set fecha_final(fecha_final){this.#fecha_final_ = fecha_final}
    set n_inscripciones(n_inscripciones){this.#n_inscripciones_ = n_inscripciones}
    set ponentes(ponentes){this.#ponentes_ = ponentes}
    set descripcion(descripcion){this.#descripcion_ = descripcion}
    set aula(aula){this.#aula_ = aula}
    set recursos(recursos){this.#recursos_ = recursos}
}

module.exports = Curso