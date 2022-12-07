const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const Participante = require('./classes/participante')
const {connection} = require('./database/connection');

const app = express()
const port = 8000
const url = 'http://localhost:' + port
const urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use('/', express.static(path.join(__dirname, '../client')))
app.use('/password', express.static(path.join(__dirname, '../client/accountset')))
app.use('/participant', express.static(path.join(__dirname, '../client/registered')))
app.use('/coordcursos', express.static(path.join(__dirname, '../client/coordcursos')))

app.set('view engine', 'ejs')

let dni, nombre, apellidos, email, pass
let participante //Declaramos un usuario vacío
let type_user

app.post('/register', urlencodedParser, (req, res) => {    
    dni = req.body.dni
    nombre = req.body.nombre
    apellidos =  req.body.apellidos
    email = req.body.email
    pass = ""

    participante = new Participante(dni, nombre, apellidos, email, pass)

    send_email(email)

    res.redirect('/')
})

app.post('/pass', urlencodedParser, (req, res) => {
    let pass = req.body.pass

    usuario.contraseña = pass

    usuario.register()

    console.log('USUARIO REGISTRADO')

    res.redirect('/')
})

app.post('/login', urlencodedParser, (req, res) => {
    nombre = req.body.usuario
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
                switch(type_user){
                    case 0:
                        res.redirect('/participant')
                    break;

                    case 1:
                        res.redirect('/coordcursos')
                    break;
                    
                    case 2:
                        res.redirect('/')
                    break;
                }
            } else {
                console.log("no")
                res.json('Incorrect Username and/or Password!');
            }
        })
    }
})

app.get('/', (req, res) => {
    app.set('views', path.join(__dirname, '../client'))

    connection.query('SELECT * FROM cursos', (err, rows) => {
        if(err) throw err

        console.log(rows)

        res.render('index', {cursos: rows})
    })
})

app.get('/participant', (req, res) => {
    app.set('views', path.join(__dirname, '../client/registered'))

    connection.query('SELECT * FROM cursos', (err, rows) => {
        if(err) throw err

        console.log(rows)

        res.render('regist', {cursos: rows, nombre: nombre})
    })
})

app.get('/coordcursos', (req, res) => {
    app.set('views', path.join(__dirname, '../client/coordcursos'))

    connection.query('SELECT * FROM cursos', (err, rows) => {
        if(err) throw err

        console.log(rows)

        res.render('coordcur', {cursos: rows, nombre: nombre})
    })
})

app.get('/password', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/accountset/account.html'))
})

app.listen(port, () => {
    console.log('Listening in ' + url)
})

//---------------ADDITIONAL---------------//
const is_in_querys = (matrix) => {
    for(let i = 0; i<matrix.length; i++){
        if(matrix[i].length !== 0){
            type_user = i
            console.log(i)
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
//----------------------------------------//
