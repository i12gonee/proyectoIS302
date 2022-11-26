const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const mysql = require('mysql2')

//start server
const app = express()
const port = 8000

//connect to database (local)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'i12almuf',
    password: 'basededatos_is',
    database: 'bd_is'
})

app.use('/', express.static(path.join(__dirname, '../client')))

app.post('/', urlencodedParser, (req, res) => {
    let nombre = req.body.usuario
    let contraseña = req.body.contraseña

    console.log(`Usuario: ${nombre}\nContraseña: ${contraseña}`)
    
    connection.connect()

    connection.query('SELECT nombre_p, contrasena_p FROM PARTICIPANTES', (err, rows) => {
        if(err) throw err

        for(let i = 0; i<rows.length; i++){
            if(rows[i].nombre_p === nombre && rows[i].contrasena_p === contraseña){
                console.log(rows[i])
                console.log('contraseña correcta')
                return res.redirect('/')
            } else {
                console.log('contraseña icorrecta')
            }
        }
    })

    connection.query('SELECT nombre_cc, contrasena_cc FROM COORD_CURSOS', (err, rows) => {
        if(err) throw err

        for(let i = 0; i<rows.length; i++){
            if(rows[i].nombre_cc === nombre && rows[i].contrasena_cc === contraseña){
                console.log(rows[i])
                console.log('contraseña correcta')
                res.redirect('/')
            } else {
                console.log('contraseña incorrecta') 
            }
        }
    })

    connection.query('SELECT nombre_cr, contrasena_cr FROM COORD_RECURSOS', (err, rows) => {
        if(err) throw err

        for(let i = 0; i<rows.length; i++){
            if(rows[i].nombre_cr === nombre && rows[i].contrasena_cr === contraseña){
                console.log(rows[i])
                console.log('contraseña correcta')
                res.redirect('/')
            } else {
                console.log('contraseña incorrecta') 
            }
        }
    })

    connection.end()
    
})

app.listen(port, () => {
    console.log('Listening in http://localhost:'+port)
})