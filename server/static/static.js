const path = require('path')

const express = require('express')

const client_dir = '/home/pacoalgar/Documentos/uco/proyectoIS302/client'

const app = express()

//Set static files
app.use('/', express.static(path.join(client_dir)))
app.use('/password', express.static(path.join(client_dir, '/accountset')))
app.use('/page_inscribirse', express.static(path.join(client_dir, '/accountset')))
app.use('/participant', express.static(path.join(client_dir, '/registered')))
app.use('/coordcursos', express.static(path.join(client_dir, '/coordcursos')))
app.use('/add_cursos_form', express.static(path.join(client_dir, '/coordcursos/form_add')))
app.use('/edit_cursos_form', express.static(path.join(client_dir, '/coordcursos/form_edit')))
app.use('/delete_cursos_form', express.static(path.join(client_dir, '/coordcursos/form_delete')))
app.use('/login_page', express.static(path.join(client_dir, '/inicreg')))
app.use('/register_page', express.static(path.join(client_dir, '/inicreg')))
app.use('/error_page', express.static(path.join(client_dir, '/error')))

//Set dinamic files
app.set('view engine', 'ejs')

module.exports = app