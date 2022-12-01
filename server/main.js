const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session');
const urlencodedParser = bodyParser.urlencoded({ extended: true })

const Usuario = require('./classes/usuario')
const {connection} = require('./database/connection');

const app = express()
const port = 8000

app.use('/', express.static(path.join(__dirname, '../client')))

app.use(session({
    secret: 'CB>uStqGpClDY4BCQBbKWOl**jy@/Zrvo5m7mCvai#NzYbqb/26mrKTeTTzvDcRd>n>Sczj3>3RG/2su/I+#6l/AJ#',
    resave: true,
    saveUninitialized: true
}))

app.post('/register', urlencodedParser, (req, res) => {
    let dni = req.body.dni
    let nombre = req.body.nombre
    let apellidos =  req.body.apellidos
    let email = req.body.email

    console.log(dni, nombre, apellidos, email)

    const usuario = new Usuario(dni, nombre, apellidos, email, "pasword")

    console.log(usuario.dni)

    usuario.register()

    res.redirect('/')
})

app.post('/login', urlencodedParser, (req, res, next) => {
    let nombre = req.body.usuario
    let contraseña = req.body.contraseña

    console.log(`Usuario: ${nombre}\nContraseña: ${contraseña}`)

    const querys = [
        `SELECT nombre_p, contrasena_p FROM PARTICIPANTES WHERE nombre_p = '${nombre}' AND contrasena_p = '${contraseña}'`,

        `SELECT nombre_cc, contrasena_cc FROM COORD_CURSOS WHERE nombre_cc = '${nombre}' AND contrasena_cc = '${contraseña}'`,

        `SELECT nombre_cr, contrasena_cr FROM COORD_RECURSOS WHERE nombre_cr = '${nombre}' AND contrasena_cr = '${contraseña}'`
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

    connection.end()

})

app.listen(port, () => {
    console.log('Listening in http://localhost:'+port)
})

const is_in_querys = (matrix) => {
    for(let i = 0; i<matrix.length; i++){
        if(matrix[i].length !== 0){
            return true
        }
    }

    return false
}