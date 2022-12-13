const nodemailer = require('nodemailer')

const generate_id = () => {
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let id = ""

    for(var i = 0; i<8; i++){
        var random = parseInt(Math.random() * 10)
        id += numbers.at(random);
    }

    return parseInt(id)
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

module.exports.generate_id = generate_id
module.exports.send_email = send_email