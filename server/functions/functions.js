const nodemailer = require('nodemailer')

const is_in_querys = (matrix) => {
    for(let i = 0; i<matrix.length; i++){
        if(matrix[i].length !== 0){
            type_user = i
            return true
        }
    }

    return false
}

const send_email = (email) => {
    const html = `<h1>El usuario ${email} quiere registrarse en la web</h1>
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

module.exports.is_in_querys = is_in_querys
module.exports.send_email = send_email