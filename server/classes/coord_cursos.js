const Usuario = require('../classes/usuario')
const {connection} = require('../database/connection')
const Curso = require('../classes/curso')

class Coord_Cursos extends Usuario{
    #cursos_disponibles_ = []
    
    constructor(id_usuario, nombre_completo, correo_electronico, contraseña){
        super(id_usuario, nombre_completo, correo_electronico, contraseña)
    }

    añadir_curso(curso){
        const query = `INSERT INTO cursos(id_curso, nombre_curso, fecha_inicio, fecha_final, max_inscripciones, ponente, descripcion, aula)
                        VALUES(${curso.id_curso}, ${curso.nombre_curso}, '${curso.fecha_inicio}', '${curso.fecha_final}', ${curso.n_inscripciones}, '${curso.ponentes}', '${curso.descripcion}', '${curso.aula}')`

        connection.connect()

        connection.query(query, (err, rows) => {
            if(err) throw err

            console.log('Curso añadido a la base de datos')
            console.log(rows)
        })

        connection.end()
    }

    eliminar_cursos(curso){
        for(let i = 0; i<this.#cursos_disponibles_.length; i++){
            if(this.#cursos_disponibles_.at(i) === curso){
                this.#cursos_disponibles_.slice(i)
                return true
            }
        }

        return false
    }

}

module.exports = Coord_Cursos