const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const Usuario = require('./classes/usuario')
const {connection} = require('./database/connection');

const app = express()
const port = 8000
const url = 'http://localhost:' + port
const urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use('/', express.static(path.join(__dirname, '../client')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../client'))

app.get('/', (req, res) => {
    connection.query('SELECT * FROM cursos', (err, rows) => {
        if(err) throw err

        console.log(rows)

        res.render('index', {cursos: rows})
    })
})


app.post('/register', urlencodedParser, (req, res) => {    
    let dni = req.body.dni
    let nombre = req.body.nombre
    let apellidos =  req.body.apellidos
    let email = req.body.email

    send_email(email)

    /*
        Una vez enviado el email, el admin accederá a un formulario para asignarle una contraseña al usuario, una vez el 
        servidor recoja esos datos, se creará un nuevo objeto partcipante, coord_cursos, coord_recursos, dependiendo de lo
        que escoja el administrador y se guardará dentro de la base de datos.
    */

    res.redirect('/')
    
})

app.post('/login', urlencodedParser, (req, res) => {
    let nombre = req.body.usuario
    let contraseña = req.body.contraseña

    console.log(`Usuario: ${nombre}\nContraseña: ${contraseña}`)

    const querys = [
        `SELECT nombre_p, mail_p, contrasena_p FROM participantes WHERE nombre_p = '${nombre}' OR mail_p = '${nombre}' AND contrasena_p = '${contraseña}'`,

        `SELECT nombre_cc, mail_cc, contrasena_cc FROM coord_cursos WHERE nombre_cc = '${nombre}' OR mail_cc = '${nombre}' AND contrasena_cc = '${contraseña}'`,

        `SELECT nombre_cr, mail_cr, contrasena_cr FROM coord_recursos WHERE nombre_cr = '${nombre}' OR mail_cr = '${nombre}' AND contrasena_cr = '${contraseña}'`
    ]

    connection.connect()

    if(nombre && contraseña){
        connection.query(querys.join(';'), (error, rows) => {
            if (error) throw error;

            console.log(rows)

            if(is_in_querys(rows)){
                res.redirect('/')
            } else {
                console.log("no")
                res.json('Incorrect Username and/or Password!');
            }
        })
    }
})

app.listen(port, () => {
    console.log('Listening in ' + url)
})

//---------------ADDITIONAL---------------//
const is_in_querys = (matrix) => {
    for(let i = 0; i<matrix.length; i++){
        if(matrix[i].length !== 0){
            return true
        }
    }

    return false
}

const send_email = (email) => {
    const html = `<h1>El usuario ${email} quiere registrarse en la web</h1>
                  <h2>Pulse el siguiente enlace para asiganarle una contraseña</h2>
                  <a href = "http://localhost:8000/">ASIGNAR CONTRASEÑA</a>`
    
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
//----------------------------------------//
