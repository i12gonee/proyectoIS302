const style= `
transform: translateY(2rem) scale(1);
`;

function arrimba(){
    document.getElementById("usu").classList.add("funcionactive");
    document.getElementById("usu").style.cssText=style;
}

function arrimba2(){
    document.getElementById("contra").classList.add("funcionactive2");
    document.getElementById("contra").style.cssText=style;
}

function volver(){
    window.location.replace("/coordcursos")
}