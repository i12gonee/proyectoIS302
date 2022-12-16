const Usuario = require('./usuario')
const connection = require('../database/connection')
const Curso = require('./curso')

class Coord_Cursos extends Usuario{    
    
    #dni_
    
    constructor(dni, nombre, apellidos, correo_electronico, contraseña){
        super(dni, nombre, apellidos, correo_electronico, contraseña)

        this.#dni_ = dni
    }

    añadir_curso(nombre_curso, fecha_inicio, fecha_final, max_inscripciones, precio, ponentes, descripcion, aula){
        connection.connect()

        if(!nombre_curso || !fecha_inicio || !fecha_final || !max_inscripciones || !precio || !ponentes || !descripcion || !aula || !this.#dni_){
            return false
        }

        const curso = new Curso(nombre_curso, fecha_inicio, fecha_final, max_inscripciones, precio, ponentes, descripcion, aula, this.#dni_)

        const query = `INSERT INTO cursos(id_curso, nombre_curso, fecha_inicio, fecha_final, max_inscripciones, precio, ponente, descripcion, aula, id_cc)
                        VALUES(${curso.id_curso}, '${curso.nombre_curso}', '${curso.fecha_inicio}', '${curso.fecha_final}', ${curso.max_inscripciones}, ${curso.precio}, '${curso.ponentes}', '${curso.descripcion}', '${curso.aula}', ${curso.id_cc})`

        connection.query(query, (err, rows) => {
            if(err) return false
        })

        return true
    }

    editar_curso(new_nombre, last_nombre, new_fecha_inicio, new_fecha_final, new_max_inscripciones, new_precio, new_ponentes, new_descripcion, new_aula){
        const query = `UPDATE cursos SET nombre_curso = '${new_nombre}',
                                        fecha_inicio = '${new_fecha_inicio}',
                                        fecha_final = '${new_fecha_final}',
                                        max_inscripciones = ${new_max_inscripciones},
                                        precio = ${new_precio},
                                        ponente = '${new_ponentes}',
                                        descripcion = '${new_descripcion}',
                                        aula = '${new_aula}' 
                        WHERE nombre_curso = '${last_nombre}'`

        if(!new_nombre || !last_nombre || !new_fecha_inicio || !new_fecha_final || !new_max_inscripciones || !new_precio || !new_ponentes || !new_descripcion || !new_aula) return false
        
        connection.connect()

        connection.query(query, (err, rows) => {
            if(err) return false
        })

        return true
    }

    eliminar_curso(id_curso){
        const query = `DELETE FROM cursos WHERE id_curso = ${id_curso}`

        if(!id_curso){
            return false
        }

        connection.connect()

        connection.query(query, (err, rows) => {
            if(err) return false
        })

        return true
    }
}

module.exports = Coord_Cursos