const functions = require('../functions/functions')

class Recurso{
    #id_recurso_
    #nombre_recurso_
    #tipo_recurso_
    #id_curso_
    #nombre_curso_
    #id_cr_

    constructor(nombre_recurso, tipo_recurso, id_curso, nombre_curso, id_cr){
        this.#id_recurso_ = functions.generate_id()
        this.#nombre_recurso_ = nombre_recurso
        this.#tipo_recurso_ = tipo_recurso
        this.#id_curso_ = id_curso
        this.#nombre_curso_ = nombre_curso
        this.#id_cr_ = id_cr
    }

    get id_recurso(){return this.#id_recurso_}
    get nombre_recurso(){return this.#nombre_recurso_}
    get tipo_recurso(){return this.#tipo_recurso_}
    get id_curso(){return this.#id_curso_}
    get nombre_curso(){return this.#nombre_curso_}
    get id_cr(){return this.#id_cr_}

    set id_recurso(id_recurso){this.#id_recurso_ = id_recurso}
    set nombre_recurso(nombre_recurso){this.#nombre_recurso_ = nombre_recurso}
    set tipo_recurso(tipo_recurso){this.#tipo_recurso_ = tipo_recurso}
    set id_curso(id_curso){this.#id_curso_ = id_curso}
    set nombre_curso(nombre_curso){this.#nombre_curso_ = nombre_curso}
    set id_cr(id_cr){this.#id_cr_ = id_cr}
}

module.exports = Recurso