/*import Participante from '../classes/participante.js'
import Curso from '../classes/curso.js'

let participante = new Participante("dfgvhbjn", "fghj", "fcgvhbj", "drfghj")
let curso1 = new Curso("1", "23456", "esdrftgyhuj", 4, "poi", "jhvgcf", "ghjk", "gvhbjnkml")
let curso2 = new Curso("2", "23456", "esdrftgyhuj", 4, "poi", "jhvgcf", "ghjk", "gvhbjnkml")

//console.log(curso)
//console.log(participante)

participante.inscribirse_en_curso(curso1)
participante.inscribirse_en_curso(curso2)


participante.ver_historial_cursos()

*/

//cosas que no son de paco:

var x = 0;

const style= `
    border-radius: 11px 11px 0px 0px;
    `;

const style2= `
    border-radius: 11px;
    `;



function cru(){
    if (x == 0) {
        document.getElementById("crus").classList.add("iconactive");
        document.getElementById("crus").textContent = "close";
        x++;
        document.getElementById("despl").innerHTML = `<div class="desplegable"></div>`;
        document.getElementById("curso").style.cssText=style;

    }
    else{
        document.getElementById("crus").classList.add("iconactive");
        document.getElementById("crus").textContent = "menu";
        x--;
        document.getElementById("despl").innerHTML = `<div class="desplegable2"></div>`;
    }
}