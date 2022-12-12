const Usuario = require('./usuario')
const {connection} = require('../database/connection')
const Curso = require('./curso')

class Coord_Cursos extends Usuario{    
    
    #dni_
    
    constructor(id_usuario, nombre, apellidos, correo_electronico, contraseña){
        super(id_usuario, nombre, apellidos, correo_electronico, contraseña)

        this.#dni_ = id_usuario
    }

    añadir_curso(nombre_curso, fecha_inicio, fecha_final, n_inscripciones, ponentes, descripcion, aula){
        const curso = new Curso(nombre_curso, fecha_inicio, fecha_final, n_inscripciones, ponentes, descripcion, aula, this.#dni_)
        
        const query = `INSERT INTO cursos(id_curso, nombre_curso, fecha_inicio, fecha_final, max_inscripciones, ponente, descripcion, aula, id_cc)
                        VALUES(${curso.id_curso}, '${curso.nombre_curso}', '${curso.fecha_inicio}', '${curso.fecha_final}', ${curso.n_inscripciones}, '${curso.ponentes}', '${curso.descripcion}', '${curso.aula}', ${curso.id_cc})`

        connection.connect()

        connection.query(query, (err, rows) => {
            if(err) return false

            console.log('Curso añadido a la base de datos')

            return true
        })
    }

    editar_curso(new_nombre, last_nombre, new_fecha_inicio, new_fecha_final, new_max_incripciones, new_ponentes, new_descripcion, new_aula){
        const query = `UPDATE cursos SET nombre_curso = '${new_nombre}',
                                        fecha_inicio = '${new_fecha_inicio}',
                                        fecha_final = '${new_fecha_final}',
                                        max_inscripciones = ${new_max_incripciones},
                                        ponente = '${new_ponentes}',
                                        descripcion = '${new_descripcion}',
                                        aula = '${new_aula}' 
                        WHERE nombre_curso = '${last_nombre}'`

        connection.connect()

        connection.query(query, (err, rows) => {
            if(err) return false

            console.log('EDITADO')

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

            return true

        })
    }
}

module.exports = Coord_Cursos