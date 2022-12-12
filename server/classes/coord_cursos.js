const Usuario = require('./usuario')
const {connection} = require('../database/connection')

class Coord_Cursos extends Usuario{    
    
    #dni_
    
    constructor(id_usuario, nombre, apellidos, correo_electronico, contraseña){
        super(id_usuario, nombre, apellidos, correo_electronico, contraseña)

        this.#dni_ = id_usuario
    }

    añadir_curso(id_curso, nombre_curso, fecha_inicio, fecha_final, n_inscripciones, ponentes, descripcion, aula){
        const query = `INSERT INTO cursos(id_curso, nombre_curso, fecha_inicio, fecha_final, max_inscripciones, ponente, descripcion, aula, id_cc)
                        VALUES(${id_curso}, '${nombre_curso}', '${fecha_inicio}', '${fecha_final}', ${n_inscripciones}, '${ponentes}', '${descripcion}', '${aula}', ${this.#dni_})`

        connection.connect()

        connection.query(query, (err, rows) => {
            if(err) return false

            console.log('Curso añadido a la base de datos')
            console.log(rows)
        })

        return true
    }

    eliminar_curso(id_curso){
        const query = `DELETE FROM cursos WHERE id_curso = ${id_curso}`

        connection.connect()

        connection.query(query, (err, rows) => {
            if(err) return false

            console.log('Curso eliminado de la base de datos')
            console.log(rows)
        })

        return true
    }
}

module.exports = Coord_Cursos