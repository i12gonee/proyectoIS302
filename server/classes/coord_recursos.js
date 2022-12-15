const Usuario = require('./usuario')
const Recurso = require('./recurso')
const connection = require('../database/connection')

class Coord_Recursos extends Usuario{

    #dni_

    constructor(dni, nombre_completo, correo_electronico, contraseña){
        super(dni, nombre_completo, correo_electronico, contraseña)
        this.#dni_ = dni
    }

    añadir_recurso(nombre_recurso, tipo_recurso, id_curso){

        const recurso = new Recurso(nombre_recurso, tipo_recurso, id_curso, this.#dni_)

        const query = `INSERT INTO recursos(id_recurso, nombre_recurso, tipo_recurso, id_curso, nombre_curso, id_cr)
                        VALUES(${recurso.id_recurso}, '${recurso.nombre_recurso}', '${recurso.tipo_recurso}', ${recurso.id_curso}, ${recurso.nombre_curso}, ${recurso.id_cr})`

        connection.connect()

        connection.query(query, (err, rows) => {
            if(err) return false

            console.log('Recurso añadido a la base de datos')

            return true
        })
    }

    editar_recurso(nombre_recurso, tipo_recurso, id_recurso){
        const query = `UPDATE recursos SET nombre_recurso = '${nombre_recurso}',
                                           tipo_recurso = '${tipo_recurso}' 
                        WHERE id_recurso = ${id_recurso}`

        connection.connect()

        connection.query(query, (err, rows) => {
            if(err) return false

            console.log('EDITADO')
        })

        return true
    }
    
    eliminar_recurso(id_recurso){
    	const query = `DELETE FROM recursos WHERE id_recurso = ${id_recurso}`

        connection.connect()

        connection.query(query, (err, rows) => {
            if(err) return false

            console.log('Recurso eliminado de la base de datos')

            return true
        })
    }
}

module.exports = Coord_Recursos