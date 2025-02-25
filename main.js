var sesion = false;

function iniciarSesion() {
    var form = document.getElementById("formLogin").submit();

    console.log(form);
    var usuario = form.getElementById("usuario");
    var pass = form.getElementById("password");

    if (usuario == "YOELMARICO69" && pass == "culo") {
        alert("SESION INICIADA");
    } 
}  


