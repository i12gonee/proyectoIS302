const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'i12almuf',
    password: 'basededatos_is',
    database: 'bd_is',
    multipleStatements: true
})

module.exports = {connection}