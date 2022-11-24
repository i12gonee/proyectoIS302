const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
//const mysql = require('mysql2')

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

/*
app.post('/', urlencodedParser, (req, res) => {
    let nombre = req.body.usuario
    let contraseña = req.body.contraseña

    console.log(`Usuario: ${nombre}\nContraseña: ${contraseña}`)
    connection.connect()

    connection.query(`SELECT nombre_cc, contrasena_cc FROM COORD_CURSOS WHERE nombre_cc = '${nombre}'`, (err, rows, fields) => {
        if(err) throw err
        console.log(rows)

        if(rows[0].contrasena_cc !== contraseña){
            return res.sendStatus(400)
        }

        res.redirect('/')
    })

    //connection.end()

})
*/

app.listen(port, () => {
    console.log('Listening in http://localhost:'+port)
})