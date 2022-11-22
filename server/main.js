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
    console.log(`Usuario: ${req.body.usuario}\nContraseña: ${req.body.contraseña}`)
    res.redirect('/')
})

app.get('/bd',  (req, res) => {
    connection.connect()

    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
        if(err) throw err
        console.log(rows[0].solution)
        //console.log(fields)
    })

    connection.end()
})

app.listen(port, () => {
    console.log('Listening in http://localhost:'+port)
})