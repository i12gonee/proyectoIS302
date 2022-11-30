const connection = require('../database/connection')

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

    
    register(){ 
        const register_query = `INSERT INTO PARTICIPANTES(id_p, nombre_p, mail_p, contrasena_p) 
                                VALUES(${this.#dni_}, '${this.#nombre_completo_}', '${this.#correo_electronico_}', '${this.#contraseña_}')`

        connection.connect()

        const is_in_db = () => {
            connection.query('SELECT * FROM PARTICIPANTES', (err, rows) => {
                if(err) throw err
                
                for(let i = 0; i<rows.length; i++){
                    if(rows.at(i).id_p === this.#dni_){
                        console.log('ya esta')
                        return true
                    }
                }
    
                return false
            })
        }
        
        if(!is_in_db()){
            connection.query(register_query, (err, rows) => {
                if(err) throw err
                console.log(rows)
            })
        }

        connection.end()
    }
}

module.exports = Usuario