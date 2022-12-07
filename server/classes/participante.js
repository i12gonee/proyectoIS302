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

    inscribirse_curso(){
        connection.connect()

        const query = `INSERT INTO participantes_cursos(participantes_id_p, cursos_id_curso)
                        VALUES(${this.#dni_}, ${this.#curso_})`

        /*connection.query(query, (err, rows) => {
            if(err) throw err
            console.log('INSCRITO')
        })*/

        console.log(this.#dni_)
    }
}


let participante = new Participante(123, 'Paco', 'ALgar', 'lmknjbh', 'hbnjkml,', 97654)

participante.inscribirse_curso()


module.exports =  Participante