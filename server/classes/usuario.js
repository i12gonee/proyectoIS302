const {connection} = require('../database/connection')

class Usuario{
    //------Private-----
    #dni_
    #nombre_completo_
    #correo_electronico_
    #contraseña_

    //-----Public-----
    constructor(dni, nombre, apellidos, correo_electronico, contraseña){
        this.#dni_ = dni
        this.#nombre_completo_ = nombre + ' ' + apellidos
        this.#correo_electronico_ = correo_electronico
        this.#contraseña_ = contraseña
    }

    get dni(){return this.#dni_}
    get nombre_completo(){return this.#nombre_completo_}
    get correo_electronico(){return this.#correo_electronico_}
    get contraseña(){return this.#contraseña_}

    set dni(dni){this.#dni_ = dni}
    set nombre_completo(nombre_completo){this.#nombre_completo_ = nombre_completo}
    set correo_electronico(correo_electronico){this.#correo_electronico_ = correo_electronico}
    set contraseña(contraseña){this.#contraseña_ = contraseña}

    
    register(res){
        
        let es_coord_recursos = false //Estas variables se pondran en true cuando el sistema sepa si el usuario es alguno de los tres tipos 
        let es_coord_cursos = false //Estas variables se pondran en true cuando el sistema sepa si el usuario es alguno de los tres tipos
        let es_participante = true //Estas variables se pondran en true cuando el sistema sepa si el usuario es alguno de los tres tipos

        const register_querys = [
            `INSERT INTO participantes(id_p, nombre_p, mail_p, contrasena_p) 
            VALUES(${this.#dni_}, '${this.#nombre_completo_}', '${this.#correo_electronico_}', '${this.#contraseña_}')`,
            
            `INSERT INTO coord_cursos(id_cc, nombre_cc, mail_cc, contrasena_cc) 
            VALUES(${this.#dni_}, '${this.#nombre_completo_}', '${this.#correo_electronico_}', '${this.#contraseña_}')`,

            `INSERT INTO coord_recursos(id_cr, nombre_cr, mail_cr, contrasena_cr) 
            VALUES(${this.#dni_}, '${this.#nombre_completo_}', '${this.#correo_electronico_}', '${this.#contraseña_}')`

        ]

        connection.connect()

        if(this.#dni_ && this.#nombre_completo_ && this.#correo_electronico_ && this.#contraseña_){
            if(es_participante){
                connection.query(register_querys[0], (err, rows) => {
                    if(err) throw err
        
                    console.log(rows)
                })
            } else if(es_coord_cursos){
                connection.query(register_querys[1], (err, rows) => {
                    if(err) throw err
        
                    console.log(rows)
                })
            } else if(es_coord_recursos){
                connection.query(register_querys[2], (err, rows) => {
                    if(err) throw err
        
                    console.log(rows)
                })
            } else {
                console.log("NO SE ESPECIFICO TIPO DE USER")
            }           
        } else {
            console.log('FALTAN DATOS')
        }

        connection.end()
    }
}

module.exports = Usuario