const Usuario = require('./usuario')
const connection = require('../database/connection')

class Participante extends Usuario{

    #id_curso_
    #dni_

    constructor(dni, nombre, apellidos = '', correo_electronico, contraseña, id_curso = 0){
        super(dni, nombre, apellidos, correo_electronico, contraseña)

        this.#id_curso_ = id_curso
        this.#dni_ = dni
    }

    get id_curso(){return this.#id_curso_}

    set id_curso(id_curso){this.#id_curso_ = id_curso}

    inscribirse_curso(){
        connection.connect()

        const query = `INSERT INTO participantes_cursos(participantes_id_p, cursos_id_curso)
                        VALUES(${this.#dni_}, ${this.#id_curso_})`

        if(!this.#dni_ && !this.#id_curso_) return false

        connection.query(query, (err, rows) => {
            if(err) return false
            console.log('INSCRITO')
        })

        return true
    }

    darse_de_alta_curso(){
        connection.connect()

        const query = `DELETE FROM participantes_cursos 
                        WHERE participantes_id_p = ${this.#dni_}`

        if(!this.#dni_) return false

        connection.query(query, (err, rows) => {
            if(err) throw err

            console.log('Dado de alta correctamente')
        })

        return true
    }
}

module.exports = Participante