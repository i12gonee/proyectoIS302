const style= `
transform: translateY(2rem) scale(1);
`;

function arrimba(){
    document.getElementById("nomb").classList.add("funcionactive");
    document.getElementById("nomb").style.cssText=style;
}

function arrimba2(){
    document.getElementById("aplld").classList.add("funcionactive2");
    document.getElementById("aplld").style.cssText=style;
}

function arrimba3(){
    document.getElementById("dni").classList.add("funcionactive3");
    document.getElementById("dni").style.cssText=style;
}

function arrimba4(){
    document.getElementById("mailtext").classList.add("funcionactive4");
    document.getElementById("mailtext").style.cssText=style;
}

function volver(){
    window.location.replace("../index.html")
}