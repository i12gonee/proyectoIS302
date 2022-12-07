const Usuario = require('./usuario')
const {connection} = require('../database/connection')

class Participante extends Usuario{

    #curso_
    #dni_

    constructor(dni, nombre, apellidos, correo_electronico, contraseña, curso){
        super(dni, nombre, apellidos, correo_electronico, contraseña)

        this.#curso_ = curso
        this.#dni_ = dni
    }

    get curso(){return this.#curso_}

    set curso(curso){this.#curso_ = curso}

    inscribirse_curso(){
        connection.connect()

        const query = `INSERT INTO participantes_cursos(participantes_id_p, cursos_id_curso)
                        VALUES(${this.#dni_}, ${this.#curso_})`

        if(!this.#dni_ && !this.#curso_){
            return false   
        }

        connection.query(query, (err, rows) => {
            if(err) throw err
            console.log('INSCRITO')
        })

        return true
    }

    darse_de_alta_curso(){
        connection.connect()

        const query = `DELETE FROM participantes_cursos 
                        WHERE participantes_id_p = ${this.#dni_}`

        if(!this.#dni_){
            return false
        }

        connection.query(query, (err, rows) => {
            if(err) throw err

            console.log('Dado de alta correctamente')
        })

        return true
    }
}

module.exports = Participante