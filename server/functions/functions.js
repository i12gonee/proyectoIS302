const nodemailer = require('nodemailer')
const { callbackPromise } = require('nodemailer/lib/shared')
const connection = require('../database/connection')

const generate_id = () => {
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let id = ""

    for(var i = 0; i<8; i++){
        var random = parseInt(Math.random() * 10)
        id += numbers.at(random);
    }

    return parseInt(id)
}

const send_email_to_admin = (email_user) => {
    const html = `<h1>El usuario ${email_user} quiere registrarse en la web</h1>
                  <h2>Pulse el siguiente enlace para asiganarle una contraseña</h2>
                  <a href = "http://localhost:8000/password">ASIGNAR CONTRASEÑA</a>`
    
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 8000,
        service: 'gmail',
        auth: {
            user: 'proyectois302@gmail.com',
            pass: 'jvfxtrudpyefzalr'
        }
    })

    const mailOptions = {
        from: 'proyectois302@gmail.com',
        to: 'proyectois302@gmail.com',
        subject: 'Nuevo registro',
        html: html
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) throw err
    
        console.log('Mensaje enviado: ' + info.response)
    })
}

const send_email_to_user = (email_user, password) => {
    
    const html = `<h1>¡El administrador le ha establecido una contraseña para cuenta!</h1>
                  <h2>Correo: ${email_user}</h2>
                  <h2>Contraseña: ${password}</h2>
                  <a href = "http://localhost:8000/login_page">Acceda para iniciar sesión</a>`
                  
    
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 8000,
        service: 'gmail',
        auth: {
            user: 'proyectois302@gmail.com',
            pass: 'jvfxtrudpyefzalr'
        }
    })

    console.log(email_user)

    const mailOptions = {
        from: 'proyectois302@gmail.com',
        to: email_user,
        subject: '¡Su contraseña está disponible!',
        html: html
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) throw err
    
        console.log('Mensaje enviado: ' + info.response)
    })
}

const get_name_curso = (id_curso) => {
    const query = `SELECT nombre_curso FROM cursos 
                    WHERE id_curso = ${id_curso}`
    
    connection.connect()

    connection.query(query, (err, rows) => {
        if(err) throw err

        nombre_curso = rows[0].nombre_curso
    })
}

module.exports.generate_id = generate_id
module.exports.send_email_to_admin = send_email_to_admin
module.exports.send_email_to_user = send_email_to_user
module.exports.get_name_curso = get_name_curso