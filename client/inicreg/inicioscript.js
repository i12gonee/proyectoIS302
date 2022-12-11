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
    window.location.replace("/")
}

function showoverlay() {

    document.getElementById("over").style.display = "flex";
    document.getElementById("cont").style.backgroundColor = "#2c2c2cbc";
    
}

function hideoverlay() {

    document.getElementById("over").style.display = "none";
    document.getElementById("cont").style.backgroundColor = "rgba(255, 255, 255, 0.481)";
    
}

/*
if (//condicion para paco) {
    showoverlay();
}
*/