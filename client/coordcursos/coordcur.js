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

function editar(){
    window.location.replace("form_add/form_add.html")
}