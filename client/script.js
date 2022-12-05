var x = 0;

const style= `
    border-radius: 11px 11px 0px 0px;
    `;

const style2= `
    border-radius: 11px;
    `;

function cru(){
    if (x == 0) {
        document.getElementById("crus").textContent = "close";
        x++;
        document.getElementById("despl").innerHTML = `<div class="desplegable">
                                                        <div class="Description one">Descripción:</div>
                                                        <div class="Description">Descripción detallada del curso, de que tratará, temario, competencias, etc.</div>
                                                        <div class="Description two">Aula:</div>
                                                        <div class="Description 3">Aula en la que se realizarán los cursos.</div>
                                                    </div>`;
        document.getElementById("curso").style.cssText=style;

    }
    else{
        document.getElementById("crus").textContent = "menu";
        x--;
        document.getElementById("despl").innerHTML = `<div class="desplegable2">
                                                    <div class="Description one">Descripción:</div>
                                                    <div class="Description">Tu turututuuu turututu tu turututuu turutu</div>
                                                    <div class="Description two">Aula:</div>
                                                    <div class="Description 3">Alto Manolo</div>
                                                    </div>`;
    }
}

const {connection} = require('../server/database/connection');


connection.connect()

connection.query('SELECT * FROM cursos', (err, rows) => {
    if(err) throw err

    console.log(rows)

    document.innerHTML += `
    <link rel="stylesheet" href="styles.css">
    <script src="script.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <div class="Curso 1" id="curso">
        <div>
            <h1 class="titulo uno">${rows[0].nombre_curso}</h1>
            <p class="plazo">Plazo de inscripcion: 25/11/22 - 31/12/22</p>
        </div>
        <a class="botonisc">
            Inscribirse
        </a>
        <span onclick="cru(this)" id="crus" class="material-icons menu">menu</span>
        </div>
    </div>`
})

connection.end()